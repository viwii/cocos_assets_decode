package main

import (
	"math"
	"os"
	"path/filepath"
	"strings"
)

var PerLen float64 = 5

type Point struct {
	x float64
	y float64
}

func base(a1 Point, c Point, a2 Point) (float64, float64, float64) {
	ax := a1.x - 2*c.x + a2.x
	ay := a1.y - 2*c.y + a2.y
	bx := 2*c.x - 2*a1.x
	by := 2*c.y - 2*a1.y

	A := 4 * (ax*ax + ay*ay)
	B := 4 * (ax*bx + ay*by)
	C := bx*bx + by*by

	return A, B, C
}

//速度函数
/*
s(t_) = Sqrt[A*t*t+B*t+C]
*/

func s(t float64, A float64, B float64, C float64) float64 {
	return math.Sqrt(A*t*t + B*t + C)
}

//长度函数
/*
L(t) = Integrate[s[t], t]
L(t_) = ((2*Sqrt[A]*(2*A*t*Sqrt[C + t*(B + A*t)] + B*(-Sqrt[C] + Sqrt[C + t*(B + A*t)])) +
(B^2 - 4*A*C) (Log[B + 2*Sqrt[A]*Sqrt[C]] - Log[B + 2*A*t + 2 Sqrt[A]*Sqrt[C + t*(B + A*t)]])) /
(8* A^(3/2)));
*/

func L(t float64, A float64, B float64, C float64) float64 {
	temp1 := math.Sqrt(C + t*(B+A*t))
	temp2 := (2*A*t*temp1 + B*(temp1-math.Sqrt(C)))
	temp3 := math.Log(B + 2*math.Sqrt(A)*math.Sqrt(C))
	temp4 := math.Log(B + 2*A*t + 2*math.Sqrt(A)*temp1)
	temp5 := 2 * math.Sqrt(A) * temp2
	temp6 := (B*B - 4*A*C) * (temp3 - temp4)

	return (temp5 + temp6) / (8 * math.Pow(A, 1.5))
}

func InvertL(t float64, l float64, A float64, B float64, C float64) float64 {
	t1 := t
	var t2 float64

	for {
		t2 = t1 - (L(t1, A, B, C)-l)/s(t1, A, B, C)
		if math.Abs(t1-t2) < 0.000001 { // 如果几乎不再变化，即收敛
			break
		}

		t1 = t2
	}

	return t2

}

func final(left float64, a1 Point, c Point, a2 Point) ([]Point, float64) {
	A, B, C := base(a1, c, a2)
	len := L(1, A, B, C)

	var l float64 = left
	var points []Point
	for {
		//根据 L 函数的反函数，求得 l 对应的 t 值
		t := InvertL(l/len, l, A, B, C)

		if l+PerLen >= len {
			return points, len - l
		}

		l += PerLen

		//根据贝塞尔曲线函数，求得取得此时的x,y坐标
		x := (1-t)*(1-t)*a1.x + 2*(1-t)*t*c.x + t*t*a2.x
		y := (1-t)*(1-t)*a1.y + 2*(1-t)*t*c.y + t*t*a2.y

		points = append(points, Point{x, y})
	}

}

func main() {
	dir := os.Args[1]
	var fileAry []string
	filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if strings.HasSuffix(path, ".json") {
			fileAry = append(fileAry, path)
		}

		return nil
	})

	for i := 0; i < len(fileAry); i++ {

	}

	final(0, Point{50, 50}, Point{500, 600}, Point{800, 200})
}
