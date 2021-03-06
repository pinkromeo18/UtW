# UtW
UtW mean Under the World

```
import {fn} from "https://pinkromeo18.github.io/UtW/fn.js"
```
```
import {Mover} from "https://pinkromeo18.github.io/UtW/Mover.js"
```


### rule.js
```js
import {rule} from "https://pinkromeo18.github.io/UtW/rule.js"

var {view,walk}=rule;
view.iswall(ch)
view.isroad(ch)
view.isupstair(ch)
view.isdownstair(ch)
view.isobject(ch)

```


## 方針
ウィザードリィ型の迷宮データを簡単に作成、操作できる。




## 仕様 Mover
- 枠を指定して、その間を移動できる。
- キー操作によって、移動できる。
```
キーの仕様は、バーチャルキーをつかう。
_U：前進
_D：後退
_L：左回転
_R：右回転
A：前進
BXY
LR：横歩き左右
SP
```
- 北が上。

```
[
  "x",
  "y",
  "v",
  "c",
  "w",
  "h",
  "move",
  "ismove",
  "walk",
  "iswalk",
  "get"
]
```


## 仕様
- 20x20マスの迷宮データを操作する
- 20x20マスの迷宮データを、41x41の文字列で表現する。
```
(0,0)の右の壁と(1,0)の左の壁は同じ。
柱壁柱壁柱　　柱０柱１柱
壁　壁　壁　　０＞壁＜壁
柱　柱　柱　　柱　柱　柱
```
```
20x20の文字列のデータ
柱０柱１柱２柱３柱４柱５柱６柱７柱８柱９柱０柱１柱２柱３柱４柱５柱６柱７柱８柱９柱
０床　床　床　床　床　床　床　床　床　床　
柱　柱　柱　柱　柱　柱　柱　柱　柱　柱　柱
１床　床　床　床　床　床　床　床　床　床　
柱　柱　柱　柱　柱　柱　柱　柱　柱　柱　柱
２床　床　床　床　床　床　床　床　床　床　
柱　柱　柱　柱　柱　柱　柱　柱　柱　柱　柱
３床　床　床　床　床　床　床　床　床　床　
柱　柱　柱　柱　柱　柱　柱　柱　柱　柱　柱
４床　床　床　床　床　床　床　床　床　床　
柱　柱　柱　柱　柱　柱　柱　柱　柱　柱　柱
５床　床　床　床　床　床　床　床　床　床　
...
```
- 文字列表示するため、座標系は、左上が（０、０）。最大は（１９、１９）
- データ上は北が上。
```
・北・
西床東
・南・
```
- 床の情報は、床の下と天上の情報を保持する。いずれかひとつ。
- 現在の方向を上にして、データを取得できる。データの東西南北回転。
- 現在座標を基準に、キー情報によって次の座標を取得。
- 指示した座標が、移動可能かどうかチェックする。壁に進入できない。

- シンボルルール。見た目と移動の判定は違う。
```
非常に重要。
壁かどうか。絶対に侵入できない。
扉かどうか。方向キーで移動はできないが、条件付きで侵入できる。
上り階段かどうか。侵入可能。
下り階段かどうか。侵入可能。
道かどうか。侵入可能。
床のイベントオブジェクトかどうか。指定されていないシンボルは全てイベントオブジェクト。侵入可能。
```

- 見た目上の表示と移動判定は違う。
```
//rule.js を読み込む
wallable；壁表示。壁らしい。
doorable：扉表示。扉らしい。
upstair：上り階段表示。天上に塗りつぶした四角い枠がある。
downstair：下り階段表示。床に塗りつぶした四角い枠がある。
roadable：道表示。基本何も表示しない。
objectable：イベント表示。床に四角い枠がある。

//移動判定
wall:
door
upstair:
downstair:
road:
object:
```

### 想定interface
```
var dat='...';
var f1=UtW(dat,foots)
f1.get(x,y)
f1.set(x,y,`・壁・壁床壁・壁・`)
f1.set(x,y,'N','壁')
var mask=f1.getFoots()
```


---
## Note. 板型迷宮と箱型迷宮の違い
ウィザードリィ型の迷宮は、板型迷宮に分類される。

### 板型迷宮
- マップサイズと歩行数が同じ。
```
２０ｘ２０マスであれば、４００マス歩行できる。
```
- 一マスに対して、東西南北の壁の状態、床の状態を持つ。
```
正方形とすると一マスの表示に３ｘ３の情報が必要。ただし、・はいわゆる壁の柱であるため情報として不要。
・北・
西床東
・南・
```
- 迷宮データが煩雑。データの作成に、単純に箱型の九倍の情報量が必要。
- 方眼紙に直感的に迷宮を書いた時には、板型迷宮となる。
```
・北・
西床東 x 20x20 = 9x400 = 3600
・南・
```

### 箱型迷宮
- 壁があるほど、歩行数がすくなくなるが、表現が直感的。
```
壁壁壁壁壁
壁　壁　壁
壁　扉　壁
壁　壁　壁
壁壁壁壁壁
```
- データ処理しやすい。ドラクエのようなフィールドマップは、箱型迷宮。
- 箱に扉を加えるため、箱の六面全てが扉となる。
- 踏破できないマスが多発する。ゲームの面白さにマイナス。
```　　　　　　　
壁壁壁壁壁　　壁？壁
壁　壁　壁　　　壁
壁　扉　壁　　壁に囲まれると、踏破できなく、視認もできない。
壁　壁　壁
壁壁壁壁壁
```

