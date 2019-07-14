package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

// "__type__": "cc.SpriteFrame",
//         "content": {
//             "name": "miniProgromBg",
//             "texture": "e6TVwdn1pOD6zuLODWyU7i",
//             "rect": [
//                 550,
//                 807,
//                 78,
//                 78
//             ],
//             "offset": [
//                 0,
//                 0
//             ],
//             "originalSize": [
//                 78,
//                 78
//             ],
//             "capInsets": [
//                 30,
//                 30,
//                 30,
//                 30
//             ]
//         }

type Content struct {
	Name         string    `json:"Name"`
	Texture      string    `json:"texture"`
	Rect         []int     `json:"rect"`
	Offset       []float64 `json:"offset"`
	OriginalSize []float64 `json:"originalSize"`
	CapInsets    []float64 `json:"capInsets"`
	Rotated      int       `json:"rotated"`
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

func main() {

	//end := strings.Trim(, unicode.IsSpace)

	StrMap := make(map[string][]Content)

	files := getFilelist("./json")
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
	}

	FileMap := make(map[string]string)
	for keyStr, _ := range StrMap {
		for _, fileName := range picFiles {

			if keyStr[:2] == fileName[11:13] {
				FileMap[keyStr] = fileName
			}
		}
	}

	fmt.Println(FileMap)

	ImageMap := make(map[string]image.Image)

	for keyStr, imgItem := range FileMap {
		game1, err := os.Open(imgItem)
		if err != nil {
			fmt.Println(err)
		}
		defer game1.Close()

		gameImg, _, err := image.Decode(game1) //解码
		if err != nil {
			fmt.Println(err)
		}

		ImageMap[keyStr] = gameImg
	}

	for keyStr, itemAry := range StrMap {
		switch ImageMap[keyStr].(type) {
		case *image.NRGBA:
			grgbImg := ImageMap[keyStr].(*image.NRGBA)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				file1, err := os.Create("./images/" + info.Name + ".png")
				if err != nil {
					fmt.Println(err)
				}
				defer file1.Close()

				png.Encode(file1, subImg)
			}

		case *image.Paletted:
			grgbImg := ImageMap[keyStr].(*image.Paletted)
			for _, info := range itemAry {
				subImg := grgbImg.SubImage(image.Rect(info.Rect[0], info.Rect[1], info.Rect[0]+info.Rect[2], info.Rect[1]+info.Rect[3]))

				file1, err := os.Create("./images/" + info.Name + ".png")
				if err != nil {
					fmt.Println(err)
				}
				defer file1.Close()

				png.Encode(file1, subImg)
			}
		}
	}

	// img, _, err := image.Decode(file) //解码
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// rgbImg := img.(*image.Paletted)
	// grgbImg := gameImg.(*image.NRGBA)

	// for _, info := range m {
	// 	if info["__type__"] == "cc.SpriteFrame" {
	// 		mp := info["content"].(map[string]interface{})
	// 		//fmt.Println(mp["rect"])

	// 		var rect [4]int
	// 		rotated := mp["rotated"] != nil && mp["rotated"].(float64) == 1

	// 		ary := mp["rect"].([]interface{})
	// 		for i := 0; i < 4; i++ {
	// 			if rotated && i == 2 {
	// 				rect[2] = int(ary[3].(float64))
	// 			} else if rotated && i == 3 {
	// 				rect[3] = int(ary[2].(float64))
	// 			} else {
	// 				rect[i] = int(ary[i].(float64))
	// 			}
	// 		}

	// 		if mp["texture"].(string) == "e6TVwdn1pOD6zuLODWyU7i" {
	// 			subImg := rgbImg.SubImage(image.Rect(rect[0], rect[1], rect[0]+rect[2], rect[1]+rect[3])) //图片裁剪x0 y0 x1 y1

	// 			file1, err := os.Create("./images/" + mp["name"].(string) + ".png")
	// 			if err != nil {
	// 				fmt.Println(err)
	// 			}
	// 			defer file1.Close()

	// 			png.Encode(file1, subImg)
	// 		} else {
	// 			subImg := grgbImg.SubImage(image.Rect(rect[0], rect[1], rect[0]+rect[2], rect[1]+rect[3])) //图片裁剪x0 y0 x1 y1

	// 			file1, err := os.Create("./images/" + mp["name"].(string) + ".png")
	// 			if err != nil {
	// 				fmt.Println(err)
	// 			}
	// 			defer file1.Close()

	// 			png.Encode(file1, subImg)
	// 		}
	// 	}
	// }

	//jpeg.Encode(file1, img, &jpeg.Options{5})
}
