# UtW
UtW mean Under the World

## 方針
ウィザードリィ型の迷宮データを簡単に作成、操作できる。

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
10x10の文字列のデータ
柱０柱１柱２柱３柱４柱５柱６柱７柱８柱９柱
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
東床西
・南・
```
- 迷宮データが煩雑。データの作成に、単純に箱型の九倍の情報量が必要。
- 方眼紙に直感的に迷宮を書いた時には、板型迷宮となる。
```
・北・
東床西 x 20x20 = 9x400 = 3600
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

