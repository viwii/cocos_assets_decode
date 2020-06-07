package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"io"
	"io/ioutil"
	"log"
	"math"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"unicode"

	"github.com/BurntSushi/graphics-go/graphics"
	"github.com/bitly/go-simplejson"
)

type Content struct {
	Name         string    `json:"Name"`
	Texture      string    `json:"texture"`
	Rect         []int     `json:"rect"`
	Offset       []float64 `json:"offset"`
	OriginalSize []float64 `json:"originalSize"`
	CapInsets    []float64 `json:"capInsets"`
	Rotated      int       `json:"rotated"`
	Idx          int64
}

type Item struct {
	Type        string  `json:"__type__"`
	ContentData Content `json:"content" `
}

func ReadAll(filePth string) ([]byte, error) {
	f, err := os.Open(filePth)
	if err != nil {
		return nil, err
	}

	return ioutil.ReadAll(f)
}

func TrimStringSpace(str string) string {
	strs := []string{"\n", " ", "\t", "\f", "\r", "\v"}
	for _, strItem := range strs {
		str = strings.Replace(str, strItem, "", -1)
	}

	return str
}

func getFilelist(path string) []string {
	var files []string
	err := filepath.Walk(path, func(path string, f os.FileInfo, err error) error {
		if f == nil {
			return err
		}
		if f.IsDir() {
			return nil
		}
		files = append(files, path)

		return nil
	})
	if err != nil {
		fmt.Printf("filepath.Walk() returned %v\n", err)
	}

	return files
}

//调用os.MkdirAll递归创建文件夹
func createPath(filePath string) error {
	if !isExist(filePath) {
		err := os.MkdirAll(filePath, os.ModePerm)
		return err
	}
	return nil
}

// 判断所给路径文件/文件夹是否存在(返回true是存在)
func isExist(path string) bool {
	_, err := os.Stat(path) //os.Stat获取文件信息
	if err != nil {
		if os.IsExist(err) {
			return true
		}
		return false
	}
	return true
}

func getJsonFilelist(path string) []string {
	var files []string
	err := filepath.Walk(path, func(path string, f os.FileInfo, err error) error {
		if f == nil {
			return err
		}
		if f.IsDir() {
			return nil
		}
		strLen := len(path)
		if strLen > 5 && path[strLen-5:] == ".json" {
			files = append(files, path)
		}

		return nil
	})
	if err != nil {
		fmt.Printf("filepath.Walk() returned %v\n", err)
	}

	return files
}

func writeFile(fileName string, data []byte) {
	f, err := os.OpenFile(fileName, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0600)
	defer f.Close()
	if err != nil {
		fmt.Println(err.Error())
	} else {
		_, err = f.Write([]byte(data))
	}
}

// 保存Png图片
func saveImage(path string, img image.Image) (err error) {
	// 需要保存的文件
	imgfile, err := os.Create(path)
	defer imgfile.Close()

	// 以PNG格式保存文件
	err = png.Encode(imgfile, img)
	if err != nil {
		//log.Fatal("path", path, "---", img, err)
	}
	return
}

func getImage() {

	//end := strings.Trim(, unicode.IsSpace)

	StrMap := make(map[string][]Content)

	files := getJsonFilelist("./gamecaches")
	var jsonStrings []string
	for _, fileName := range files {
		strbytes, _ := ReadAll(fileName)
		str := string(strbytes)

		//处理空格Tab,回车
		str = TrimStringSpace(str)

		for {
			idx := strings.Index(str, "{\"__type__\":\"cc.SpriteFrame\"")
			if idx == -1 {
				break
			}

			str = str[idx:]
			index := strings.Index(str, "}}")
			if idx != -1 {
				jsonStrings = append(jsonStrings, str[:index+2])
			}

			str = str[index+2:]
		}
	}

	for _, strItem := range jsonStrings {

		var p1 Item
		err := json.Unmarshal([]byte(strItem), &p1) // 貌似这种解析方法需要提前知道 json 结构
		if err != nil {
			fmt.Println("err: ", err)
		}

		//log.Println(p1.ContentData.Name, p1.ContentData.Texture)

		ctd := p1.ContentData
		if ctd.Rotated == 1 {
			ex := ctd.Rect[2]
			ctd.Rect[2] = ctd.Rect[3]
			ctd.Rect[3] = ex
		}

		if ary, ok := StrMap[ctd.Texture]; ok {
			StrMap[ctd.Texture] = append(ary, ctd)
		} else {
			ary = []Content{ctd}
			StrMap[ctd.Texture] = ary
		}

	}

	assets := getFilelist("./raw-assets")

	var picFiles []string
	for _, name := range assets {
		if len(name) > 4 && (name[len(name)-4:] == ".png") {
			picFiles = append(picFiles, name)
		}

		if len(name) > 4 && (name[len(name)-4:] == ".jpg") {
			log.Println(name)
		}
	}

	//fmt.Println(StrMap)

	FileMap := make(map[string]string)
	// for keyStr, _ := range StrMap {
	// 	for _, fileName := range picFiles {
	// 		if strings.Index(fileName[5:], "-") != -1 {
	// 			fmt.Println(keyStr, fileName)
	// 			if keyStr[:2] == fileName[11:13] {

	// 				FileMap[keyStr] = fileName
	// 			}
	// 		} else {
	// 			fmt.Println(keyStr, fileName)
	// 			if strings.Index(fileName, keyStr) != -1 {
	// 				FileMap[keyStr] = fileName
	// 			}
	// 		}

	// 	}
	// }
	//FileMap["1c64c38eb"] = "raw-assets\\1c\\1c64c38eb.png"
	//FileMap["02delMVqdBD70a/HSD99FK"] = "raw-assets\\res-raw-assets-1e-1ef04113c.566c2.png"
	FileMap["1322cc1aa"] = "raw-assets\\res-raw-assets-13-1322cc1aa.754a8.png"
	FileMap["14521b872"] = "raw-assets\\res-raw-assets-14-14521b872.c93cd.png"
	FileMap["166026c0a"] = "raw-assets\\res-raw-assets-16-166026c0a.c1818.png"
	FileMap["178ad14a1"] = "raw-assets\\res-raw-assets-17-178ad14a1.47eab.png"
	FileMap["17bb09aea"] = "raw-assets\\res-raw-assets-17-17bb09aea.c1d62.png"
	FileMap["19f00dc8a"] = "raw-assets\\res-raw-assets-19-19f00dc8a.d8ef7.png"
	FileMap["1a5aa04de"] = "raw-assets\\res-raw-assets-1a-1a5aa04de.61551.png"
	FileMap["1b0cd85c7"] = "raw-assets\\res-raw-assets-1b-1b0cd85c7.b345e.png"
	FileMap["1bcbb97d1"] = "raw-assets\\res-raw-assets-1b-1bcbb97d1.ec391.png"
	FileMap["1d6236e6d"] = "raw-assets\\res-raw-assets-1d-1d6236e6d.3db36.png"
	FileMap["1dd96add7"] = "raw-assets\\res-raw-assets-1d-1dd96add7.74f35.png"
	FileMap["1ef04113c"] = "raw-assets\\res-raw-assets-1e-1ef04113c.566c2.png"
	fmt.Println("---end")

	ImageMap := make(map[string]image.Image)

	for keyStr, imgItem := range FileMap {
		game1, err := os.Open(imgItem)
		if err != nil {
			fmt.Println("3", err)
		}
		defer game1.Close()

		gameImg, _, err := image.Decode(game1) //解码
		if err != nil {
			fmt.Println("2", err)
		}

		ImageMap[keyStr] = gameImg
	}

	//fmt.Println(ImageMap, StrMap)

	for keyStr, itemAry := range StrMap {
		switch ImageMap[keyStr].(type) {
		case *image.NRGBA:
			grgbImg := ImageMap[keyStr].(*image.NRGBA)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				if info.Rotated == 1 {
					dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
					err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
					if err != nil {
						fmt.Println("1", err)
					} else {
						fmt.Println("./images/" + info.Name + ".png")
						saveImage("./images/"+info.Name+".png", dst)
					}

				} else {
					saveImage("./images/"+info.Name+".png", subImg)
				}

			}

		case *image.Paletted:
			grgbImg := ImageMap[keyStr].(*image.Paletted)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				if info.Rotated == 1 {
					dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
					err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
					if err != nil {
						fmt.Println("4", err)
					} else {
						fmt.Println("./images/" + info.Name + ".png" + "  " + keyStr)
						saveImage("./images/"+info.Name+".png", dst)
					}

				} else {
					saveImage("./images/"+info.Name+".png", subImg)
				}
			}
		}
	}
}

func walk(node interface{}, depth int, outAry *[]map[string]interface{}, altasMap *map[string]string) {
	switch node.(type) {
	case []interface{}:
		ary := node.([]interface{})
		for _, item := range ary {
			walk(item, depth+1, outAry, altasMap)
		}
	case map[string]interface{}:
		mp := node.(map[string]interface{})
		(*outAry) = append((*outAry), mp)
		switch mp["__type__"] {
		case "cc.JsonAsset":
			data, _ := json.Marshal(mp["json"])
			var str bytes.Buffer
			_ = json.Indent(&str, []byte(data), "", "    ")
			writeFile("./out/"+mp["_name"].(string)+".json", str.Bytes())
		case "cc.Sprite":
			//fmt.Println(mp["__type__"], depth)
		case "cc.ScrollView":
			//fmt.Println(mp["__type__"], depth)
		case "cc.SpriteFrame":
			//fmt.Println(mp["__type__"], depth)
		case "cc.SpriteAtlas":
			altas := mp["_spriteFrames"].(map[string]interface{})
			for key, item := range altas {
				itm := item.(map[string]interface{})
				(*altasMap)[itm["__uuid__"].(string)] = key
			}
			//fmt.Println(mp["__type__"], depth)
		case "cc.AnimationClip":
			//fmt.Println(mp["__type__"], depth)
		case "cc.Node":
			//fmt.Println(mp["__type__"], depth)
		case "cc.Label":
			//fmt.Println(mp["__type__"], depth)
		case "cc.Animation":
			//fmt.Println(mp["__type__"], depth)
		case "cc.SceneAsset":
			//fmt.Println(mp["__type__"], mp["_name"], depth)
			//fmt.Println(mp["__type__"], mp["_name"], depth)
		case "cc.Scene":
			//fmt.Println(mp["__type__"], mp["_name"], depth)
			//fmt.Println(mp["__type__"], depth)
		case "cc.PrivateNode":
			//引擎內部
		case "cc.Prefab":
			//fmt.Println(mp["__type__"], mp["_name"], depth)
		case "cc.AudioClip":
			//fmt.Println(mp["__type__"], depth)
		case "cc.ProgressBar":
			//fmt.Println(mp["__type__"], depth)
		case "cc.RichText":
			//fmt.Println(mp["__type__"], depth)
		default:
			//fmt.Println("unhandle", mp["__type__"], depth)
		}

		if depth == 3 {
			if mp["__type__"] == nil {
				//fmt.Println(mp)
			} else {
				//fmt.Println(mp["__type__"], depth)
			}

		}

	}
}

func parse_file(data interface{}) {
	nodeAry := data.([]interface{})
	for _, dd := range nodeAry {
		switch dd.(type) {
		case []interface{}:
			dAry := dd.([]interface{})
			if reflect.TypeOf(dAry[0]).String() == "map[string]interface {}" {
				mp := dAry[0].(map[string]interface{})
				if mp["__type__"] == "cc.SceneAsset" {
					data, _ := json.Marshal(dAry)
					var str bytes.Buffer
					_ = json.Indent(&str, []byte(data), "", "    ")
					writeFile("./out/"+mp["_name"].(string)+".fire.json", str.Bytes())
				} else if mp["__type__"] == "cc.Prefab" {
					data, _ := json.Marshal(dAry)
					var str bytes.Buffer
					_ = json.Indent(&str, []byte(data), "", "    ")
					writeFile("./out/"+mp["_name"].(string)+".prefab.json", str.Bytes())
				}
			}
		case map[string]interface{}:
			// mp := dd.(map[string]interface{})
			// switch mp["__type__"] {
			// case "cc.SpriteAtlas":
			// 	fmt.Println(mp["__type__"])
			// }
		}
	}
}

func checkFileIsExist(filename string) bool {
	var exist = true
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		exist = false
	}
	return exist
}

func handle_laya(input string, output string) {
	f, err := os.Open(input)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var strs []string
	rd := bufio.NewReader(f)
	for {
		line, err := rd.ReadString('\n') //以'\n'为结束符读入一行

		if err != nil || io.EOF == err {
			break
		}

		if -1 == strings.IndexByte(line, ':') {
			fmt.Println(line)
			strs = append(strs, line)
			continue
		}

		var data []byte
		flag := 0
		for i := 0; i < len(line); i++ {
			if flag == 0 {
				if !unicode.IsSpace(int32(line[i])) {
					data = append(data, '"')
					data = append(data, line[i])
					flag++
				} else {
					data = append(data, line[i])
				}
			} else if flag == 1 {
				if line[i] == ':' {
					data = append(data, '"')
					data = append(data, line[i:]...)
					break
				} else {
					data = append(data, line[i])
				}
			}

		}

		strs = append(strs, string(data))
	}

	var fout *os.File
	var err1 error
	if checkFileIsExist(output) { //如果文件存在
		fout, err1 = os.OpenFile(output, os.O_APPEND, 0666) //打开文件
		fmt.Println("文件存在", err1)
	} else {
		fout, err1 = os.Create(output) //创建文件
		fmt.Println("文件不存在", err1)
	}

	for _, str := range strs {
		fout.WriteString(str)
	}

	fout.Close()
}

func save_laya(outFile string, context string) {
	var strs []string
	for {

		idx := -1
		for i := 0; i < len(context); i++ {
			if context[i] == '\n' {
				idx = i
				break
			}
		}

		if idx == -1 {
			break
		}

		line := context[:idx+1]
		if -1 == strings.IndexByte(line, ':') {
			strs = append(strs, line)
			if idx < len(context)-1 {
				context = context[idx+1:]
			} else {
				break
			}

			continue
		}

		var data []byte
		flag := 0
		lastSpace := false
		for i := 0; i < len(line); i++ {
			if flag == 0 {
				if !unicode.IsSpace(int32(line[i])) {
					data = append(data, '"')
					data = append(data, line[i])
					flag++
				} else {
					data = append(data, line[i])
				}
			} else if flag == 1 {
				if line[i] == ':' {
					data = append(data, '"')
					data = append(data, line[i])
					flag++
				} else {
					data = append(data, line[i])
				}
			} else if flag == 2 {
				if lastSpace && line[i] == '.' {
					data = append(data, '0')
					data = append(data, line[i:]...)
					lastSpace = false
					break
				} else if unicode.IsSpace(int32(line[i])) {
					lastSpace = true
				} else {
					lastSpace = false
				}

				data = append(data, line[i])
			}
		}

		strs = append(strs, string(data))

		if idx < len(context)-1 {
			context = context[idx+1:]
		} else {
			break
		}

	}

	var fout *os.File
	//var err1 error
	if checkFileIsExist(outFile) { //如果文件存在
		fout, _ = os.OpenFile(outFile, os.O_TRUNC, 0666) //打开文件
		//fmt.Println("文件存在", err1)
	} else {
		fout, _ = os.Create(outFile) //创建文件
		//fmt.Println("文件不存在", err1)
	}

	for _, str := range strs {
		i := 0
		for ; i < 5 && i < len(str); i++ {
			if str[i] != '\t' {
				//fmt.Println(i)
				break
			}
		}

		str = str[i:]

		fout.WriteString(str)
	}
	fout.WriteString("}")
	fout.Close()
}

func __main() {
	//getImage()
	//parse_cocos_plist("./plist/Icon/Icon", "./plist/Icon/out/")

	//fmt.Println("Parameters:", os.Args[1])

	//parse_texturepack_json(os.Args[1], os.Args[1]+"/")

}

//laya脚本处理
func _main() {
	//handle_laya("./PcLoginScene.scene", "./PcLoginScene.json")
	data, err := ReadAll("./input/bundle.js")
	if err != nil {
		fmt.Println("ReadAll error", err)
		return
	}

	var files []string

	str := string(data)
	for {
		idx := strings.Index(str, "REG(")
		if idx == -1 {
			break
		}

		str = str[idx+5:]
		fileName := ""
		edx := strings.IndexByte(str, '"')
		if -1 != edx {
			fileName = str[:edx]
		}
		str = str[edx:]

		files = append(files, fileName)
		// fIndex := strings.Index(str, ".uiView")

		// str = str[fIndex+10:]

		// eIndex := strings.Index(str, ";")
		// context := str[:eIndex]
		// fmt.Println("context", context)
		// str = str[eIndex:]
	}

	strCtx := string(data)
	FileMap := make(map[string]string)
	for {
		idx := strings.Index(strCtx, "uiView = {")
		if idx == -1 {
			break
		}

		fileName := ""
		for i := idx; i > 0; i-- {

			if unicode.IsSpace(int32(strCtx[i])) {
				fileName = strCtx[i+1 : idx-1]
				break
			}
		}

		if len(strCtx) > 9 {
			strCtx = strCtx[idx+9:]
			eIndex := strings.Index(strCtx, ";")
			//fmt.Println(strCtx[:eIndex])
			FileMap[fileName] = strCtx[:eIndex-1]
			strCtx = strCtx[eIndex:]
		}

	}

	//NewFileMap := make(map[string]string)
	for keyStr, value := range FileMap {
		for _, path := range files {
			//fmt.Println(keyStr, path)
			//if strings.EndWith(path, keyStr)
			if len(path) > len(keyStr) && path[len(path)-len(keyStr):] == keyStr {
				//NewFileMap[path] = value
				strs := strings.Split(path, ".")
				pt := "./"
				for i := 0; i < len(strs)-1; i++ {
					pt += strs[i] + "/"
				}
				_, err := os.Stat(pt)
				if os.IsNotExist(err) {
					os.MkdirAll(pt, os.ModePerm)
				}

				path = strings.Replace(path, ".", "/", -1)
				//fmt.Println(value)
				save_laya(path, value)
			}
		}
	}

	//fmt.Println(NewFileMap)
}

// func main() {
// 	//spritefameMap := make(map[string]map[string]interface{})
// 	fileMap := make(map[string][]map[string]interface{})
// 	structMap := make(map[string]interface{})
// 	files := getFilelist("./program/res")

// 	uuidScriptMap := make(map[string]string)
// 	altasMap := make(map[string]string)

// 	strbytes, _ := ReadAll("./program/src/project.js")
// 	str := string(strbytes)

// 	//处理空格Tab,回车
// 	//str = TrimStringSpace(str)
// 	var jsonStrings []string
// 	for {
// 		fmt.Println("--------------end1")
// 		idx := strings.Index(str, "cc._RF.push(t")
// 		if idx == -1 {

// 			break
// 		}
// 		fmt.Println("--------------end")
// 		str = str[idx:]
// 		index := strings.Index(str, ")")
// 		if idx != -1 {
// 			jsonStrings = append(jsonStrings, str[:index+2])
// 			strs := strings.Split(str[:index+2], "\"")
// 			//fmt.Println(strs[1], strs[3])
// 			uuidScriptMap[strs[1]] = strs[3]

// 			indexend := strings.Index(str, "cc._RF.pop();")
// 			writeFile("./out/"+strs[3]+".js", ([]byte)(str[index+2:indexend]))
// 		}

// 		str = str[index+2:]
// 	}

// 	//fmt.Println(jsonStrings)

// 	for _, fileName := range files {
// 		fmt.Println(fileName)
// 		strbytes, _ := ReadAll(fileName)

// 		root, _ := simplejson.NewJson(strbytes)
// 		var outAry []map[string]interface{}
// 		walk(root.Interface(), 1, &outAry, &altasMap)
// 		structMap[fileName] = root.Interface()
// 		fileMap[fileName] = outAry
// 	}

// 	// fmt.Println(altasMap)

// 	// for _, item := range fileMap {
// 	// 	for _, mp := range item {
// 	// 		if mp["__type__"] == "cc.SpriteFrame" {
// 	// 			if im, ok := mp["_name"]; ok {
// 	// 				spritefameMap[im.(string)] = mp
// 	// 			}

// 	// 			if im, ok := mp["content"]; ok {
// 	// 				cm := im.(map[string]interface{})
// 	// 				spritefameMap[cm["name"].(string)] = mp
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }

// 	// for fileName, item := range fileMap {
// 	// 	for _, mp := range item {
// 	// 		if mp["__type__"] == "cc.SceneAsset" {
// 	// 			parse_file(structMap[fileName])
// 	// 		}
// 	// 	}
// 	// }
// }

// func main() {
// 	f, err := os.Open("bundle.js")
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer f.Close()

// 	rd := bufio.NewReader(f)

// 	var lines []string
// 	for {
// 		line, err := rd.ReadString('\n') //以'\n'为结束符读入一行

// 		if err != nil || io.EOF == err {
// 			break
// 		}

// 		str := strings.TrimSpace(line)
// 		lines = append(lines, str)

// 		//fmt.Println(strings.TrimSpace(line))
// 	}

// 	// for _, str := range lines {
// 	// 	strs := strings.Split(str, ": [")
// 	// 	if len(strs) >= 2 {
// 	// 		index, err := strconv.Atoi(strs[0])
// 	// 		if err == nil {
// 	// 			//fmt.Println(index, str)
// 	// 		}
// 	// 	}
// 	// }

// 	for _, str := range lines {
// 		if len(str) > 2 && str[1] == '.' && str[0] == '"' && str[len(str)-1] != '"' {

// 			idx := strings.Index(str[1:], "\"")
// 			fmt.Println(str[1 : idx+1])
// 		}
// 	}
// }

func parse_cocos_plist(filepath string, savepath string) {

	//end := strings.Trim(, unicode.IsSpace)

	StrMap := make(map[string][]Content)

	files := []string{filepath + ".json"}
	var jsonStrings []string
	for _, fileName := range files {
		strbytes, _ := ReadAll(fileName)
		str := string(strbytes)

		//处理空格Tab,回车
		str = TrimStringSpace(str)

		for {
			idx := strings.Index(str, "{\"__type__\":\"cc.SpriteFrame\"")
			if idx == -1 {
				break
			}

			str = str[idx:]
			index := strings.Index(str, "}}")
			if idx != -1 {
				jsonStrings = append(jsonStrings, str[:index+2])
			}

			str = str[index+2:]
		}
	}

	for _, strItem := range jsonStrings {

		var p1 Item
		err := json.Unmarshal([]byte(strItem), &p1) // 貌似这种解析方法需要提前知道 json 结构
		if err != nil {
			fmt.Println("err: ", err)
		}

		//log.Println(p1.ContentData.Name, p1.ContentData.Texture)

		ctd := p1.ContentData
		if ctd.Rotated == 1 {
			ex := ctd.Rect[2]
			ctd.Rect[2] = ctd.Rect[3]
			ctd.Rect[3] = ex
		}

		if ary, ok := StrMap[ctd.Texture]; ok {
			StrMap[ctd.Texture] = append(ary, ctd)
		} else {
			ary = []Content{ctd}
			StrMap[ctd.Texture] = ary
		}

	}

	fmt.Println(StrMap)

	game1, err := os.Open(filepath + ".png")
	if err != nil {
		fmt.Println("3", err)
	}
	defer game1.Close()

	gameImg, _, err := image.Decode(game1) //解码
	if err != nil {
		fmt.Println("2", err)
	}

	for keyStr, itemAry := range StrMap {
		switch gameImg.(type) {
		case *image.NRGBA:
			grgbImg := gameImg.(*image.NRGBA)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				if info.Rotated == 1 {
					dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
					err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
					if err != nil {
						fmt.Println("1", err)
					} else {
						fmt.Println(savepath + info.Name)
						saveImage(savepath+info.Name, dst)
					}

				} else {
					saveImage(savepath+info.Name, subImg)
				}

			}

		case *image.Paletted:
			grgbImg := gameImg.(*image.Paletted)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				if info.Rotated == 1 {
					dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
					err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
					if err != nil {
						fmt.Println("4", err)
					} else {
						fmt.Println(savepath + info.Name + ".png" + "  " + keyStr)
						saveImage(savepath+info.Name, dst)
					}

				} else {
					saveImage(savepath+info.Name, subImg)
				}
			}
		}
	}
}

//
// type Content struct {
// 	Name         string    `json:"Name"`
// 	Texture      string    `json:"texture"`
// 	Rect         []int     `json:"rect"`
// 	Offset       []float64 `json:"offset"`
// 	OriginalSize []float64 `json:"originalSize"`
// 	CapInsets    []float64 `json:"capInsets"`
// 	Rotated      int       `json:"rotated"`
// }
func parse_texturepack_json(filepath string, savepath string) {
	createPath(savepath)

	strbytes, _ := ReadAll(filepath + ".json")

	res, err := simplejson.NewJson([]byte(strbytes))

	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}

	//获取json字符串中的 result 下的 timeline 下的 rows 数组
	resMap, _ := res.Get("frames").Map()

	var ContendAry []Content
	for keyStr, value := range resMap {
		var ct Content
		ct.Name = keyStr
		ct.Texture = keyStr

		valMap := value.(map[string]interface{})
		rectMap := valMap["frame"].(map[string]interface{})

		x, _ := rectMap["x"].(json.Number).Int64()
		y, _ := rectMap["y"].(json.Number).Int64()
		w, _ := rectMap["w"].(json.Number).Int64()
		h, _ := rectMap["h"].(json.Number).Int64()
		ct.Rect = append(ct.Rect, int(x))
		ct.Rect = append(ct.Rect, int(y))
		ct.Rect = append(ct.Rect, int(w))
		ct.Rect = append(ct.Rect, int(h))

		//if valMap["rotated"].(bool) {
		ct.Rotated = 0
		//}

		if ct.Rotated == 1 {
			ex := ct.Rect[2]
			ct.Rect[2] = ct.Rect[3]
			ct.Rect[3] = ex
		}

		ContendAry = append(ContendAry, ct)
	}

	fmt.Println("-------------------------")

	game1, err := os.Open(filepath + ".png")
	if err != nil {
		fmt.Println("3", err)
	}
	defer game1.Close()

	gameImg, _, err := image.Decode(game1) //解码
	if err != nil {
		fmt.Println("2", err)
	}

	for _, info := range ContendAry {
		switch gameImg.(type) {
		case *image.NRGBA:
			grgbImg := gameImg.(*image.NRGBA)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("1", err)
				} else {
					fmt.Println(savepath + info.Name + ".png")
					saveImage(savepath+info.Name, dst)
				}

			} else {
				saveImage(savepath+info.Name, subImg)
			}
		case *image.Paletted:

			grgbImg := gameImg.(*image.Paletted)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("4", err)
				} else {
					saveImage(savepath+info.Name, dst)
				}

			} else {
				saveImage(savepath+info.Name, subImg)
			}

		}
	}

}

func parse_texturepack_json1(filepath string, savepath string) {
	createPath(savepath)

	strbytes, _ := ReadAll(filepath + ".json")

	res, err := simplejson.NewJson([]byte(strbytes))

	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}

	//获取json字符串中的 result 下的 timeline 下的 rows 数组
	resMap, _ := res.Get("frames").Map()

	var ContendAry []Content
	for keyStr, value := range resMap {
		var ct Content
		ct.Name = keyStr + ".png"
		ct.Texture = keyStr + ".png"

		rectMap := value.(map[string]interface{})
		//rectMap := valMap["frame"].(map[string]interface{})

		x, _ := rectMap["x"].(json.Number).Int64()
		y, _ := rectMap["y"].(json.Number).Int64()
		w, _ := rectMap["w"].(json.Number).Int64()
		h, _ := rectMap["h"].(json.Number).Int64()
		ct.Rect = append(ct.Rect, int(x))
		ct.Rect = append(ct.Rect, int(y))
		ct.Rect = append(ct.Rect, int(w))
		ct.Rect = append(ct.Rect, int(h))

		//if valMap["rotated"].(bool) {
		ct.Rotated = 0
		//}

		if ct.Rotated == 1 {
			ex := ct.Rect[2]
			ct.Rect[2] = ct.Rect[3]
			ct.Rect[3] = ex
		}

		ContendAry = append(ContendAry, ct)
	}

	fmt.Println("-------------------------")

	game1, err := os.Open(filepath + ".png")
	if err != nil {
		fmt.Println("3", err)
	}
	defer game1.Close()

	gameImg, _, err := image.Decode(game1) //解码
	if err != nil {
		fmt.Println("2", err)
	}

	for _, info := range ContendAry {
		switch gameImg.(type) {
		case *image.NRGBA:
			grgbImg := gameImg.(*image.NRGBA)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("1", err)
				} else {
					fmt.Println(savepath + info.Name + ".png")
					saveImage(savepath+strings.Replace(info.Name, "_", ".", 1), dst)
				}

			} else {
				saveImage(savepath+strings.Replace(info.Name, "_", ".", 1), subImg)
			}
		case *image.Paletted:

			grgbImg := gameImg.(*image.Paletted)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("4", err)
				} else {
					saveImage(savepath+strings.Replace(info.Name, "_", ".", 1), dst)
				}

			} else {
				saveImage(savepath+strings.Replace(info.Name, "_", ".", 1), subImg)
			}

		}
	}

}

func parse_laya_atlas_json(filepath string, savepath string) {
	createPath(savepath)

	strbytes, _ := ReadAll(filepath + ".atlas")

	res, err := simplejson.NewJson([]byte(strbytes))

	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}

	//获取json字符串中的 result 下的 timeline 下的 rows 数组
	resMap, _ := res.Get("frames").Map()

	var ContendAry []Content
	for keyStr, value := range resMap {
		var ct Content
		ct.Name = keyStr
		ct.Texture = keyStr

		valMap := value.(map[string]interface{})
		rectMap := valMap["frame"].(map[string]interface{})

		x, _ := rectMap["x"].(json.Number).Int64()
		y, _ := rectMap["y"].(json.Number).Int64()
		w, _ := rectMap["w"].(json.Number).Int64()
		h, _ := rectMap["h"].(json.Number).Int64()
		idx, _ := rectMap["idx"].(json.Number).Int64()
		ct.Rect = append(ct.Rect, int(x))
		ct.Rect = append(ct.Rect, int(y))
		ct.Rect = append(ct.Rect, int(w))
		ct.Rect = append(ct.Rect, int(h))
		ct.Idx = idx
		//if valMap["rotated"].(bool) {
		ct.Rotated = 0
		//}

		if ct.Rotated == 1 {
			ex := ct.Rect[2]
			ct.Rect[2] = ct.Rect[3]
			ct.Rect[3] = ex
		}

		ContendAry = append(ContendAry, ct)
	}

	fmt.Println("-------------------------")

	game1, err := os.Open(filepath + ".png")
	if err != nil {
		fmt.Println("3", err)
	}
	defer game1.Close()

	gameImg1, _, err := image.Decode(game1) //解码
	if err != nil {
		fmt.Println("2", err)
	}

	game2, err := os.Open(filepath + "1.png")
	if err != nil {
		fmt.Println("3", err)
	}
	defer game2.Close()

	gameImg2, _, err := image.Decode(game2) //解码
	if err != nil {
		fmt.Println("2", err)
	}

	for _, info := range ContendAry {
		gameImg := gameImg1
		if info.Idx != 0 {
			gameImg = gameImg2
		}

		switch gameImg.(type) {
		case *image.NRGBA:
			grgbImg := gameImg.(*image.NRGBA)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("1", err)
				} else {
					fmt.Println(savepath + info.Name + ".png")
					saveImage(savepath+strings.Replace(info.Name, ".", ".", 1), dst)
				}

			} else {
				saveImage(savepath+strings.Replace(info.Name, ".", ".", 1), subImg)
			}
		case *image.Paletted:

			grgbImg := gameImg.(*image.Paletted)
			subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

			if info.Rotated == 1 {
				dst := image.NewRGBA(image.Rect(0, 0, info.Rect[3], info.Rect[2]))
				err := graphics.Rotate(dst, subImg, &graphics.RotateOptions{3 * math.Pi / 2})
				if err != nil {
					fmt.Println("4", err)
				} else {
					saveImage(savepath+strings.Replace(info.Name, ".", ".", 1), dst)
				}

			} else {
				saveImage(savepath+strings.Replace(info.Name, ".", ".", 1), subImg)
			}
		default:
			fmt.Println("-------")

		}
	}

}

func main() {
	parse_laya_atlas_json(os.Args[1], os.Args[1]+"/")
}
