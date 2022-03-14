# UtW
UtW mean Under the World

```
import {fn} from "https://pinkromeo18.github.io/UtW/fn.js"
```
```
import {Mover} from "https://pinkromeo18.github.io/UtW/Mover.js"
```

## Mover.js
```js
import {Goz} from "https://pinkromeo18.github.io/goz/goz.js";
var goz =Goz('.goz','https://pinkromeo18.github.io/goz/mons/');
import {Mover} from "https://pinkromeo18.github.io/UtW/Mover.js"

var m=Mover(32,32);
var {x,y,v,c}=m.move(0,0,'N')
goz.add('debug',1,1);
goz.pos('debug',x,y);
goz.txt('debug',c)

goz.keyloop((k)=>{

  if(!m.iswalk(k))return;
  console.log(m.walk(k,'nonupdate'))
  var {x,y,v,c}=m.walk(k);
  goz.pos('debug',x,y);
  goz.txt('debug',c)

});
```

---
## rule.js
```js
import {rule} from "https://pinkromeo18.github.io/UtW/rule.js"

var {view,walk}=rule;
view.iswall(ch)
view.isroad(ch)
view.isupstair(ch)
view.isdownstair(ch)
view.isobject(ch)

```

```
　道、移動可能。
　壁、移動不可。
　岩、腕力で破壊可能。階層により難度があがる。
　通り抜け壁、すり抜け可能な壁。壁に見えるが、そのまま移動可能。
　扉、通常扉、調べることで移動可能。
　隠し扉、壁に見える。調べることで移動可能。
　竜頭の扉、魔法の扉。竜頭の鍵で解錠。高度な解錠魔法で可能。
　獅子の扉、魔法の扉。獅子の鍵で解錠。中程度の解錠魔法で可能。
　巨人の扉、魔法の扉。巨人の鍵で解錠。並みの解錠魔法で可能。
　錠付き扉、解錠技能で可能。解錠魔法は不可。
　鉄格子の扉、スイッチが押されていると扉が開く。
　北扉一方通行、北側からは扉、反対は壁。北から南へ移動可能。
　東扉一方通行、東側からは扉、反対は壁。東から西へ移動可能。
　南扉一方通行、南側からは扉、反対は壁。南から北へ移動可能。
　西扉一方通行、西側からは扉、反対は壁。西から東へ移動可能。
　上り階段、上の階に移動する。上の階が地上の場合、街へ戻る。
　下り階段、下の階に移動する。
　プレート、掲示板。床に刻まれた迷宮のメッセージ。
　メモ、落書き。床の隅に書かれた拙いメッセージ。
　ボーン、骨。朽ちた躯。調べることができる。
　スイッチ南壁、押すと鉄格子が開く。常に南壁。
　昇降機、エレベータ。階層を指定して移動できる。
　脱出床、強制脱出。街へ戻る。
　転移床、ワープ、入るとどこかにワープする。
　暗闇床、ダークゾーン、魔法的暗闇。視界闇。入ると魔法効果消失。
　棘の床、ピット、小ダメージを受ける。回避可。
　回転床、常に右に回転する。いつの間にか方向転換している。
　落とし穴、下の階に落ちる。中ダメージを受ける。
　浮遊床、浮遊の魔法を強制的に得る。ピット、回転床、落とし穴に無効化。
　封魔床、魔法禁止の床。魔法を使うことができない。戦闘中も同様。
　敵固定、固定戦闘。一度倒すと階層移動しない限り消滅する。  
```

---
## xyary
xyary is 2 dimension utility

```js
import {xyary} from "https://pinkromeo18.github.io/UtW/xyary.js"

function debug(str,json){
  document.querySelector('pre')
    .textContent = (json)?JSON.stringify(str,void 0,2):str;
}

//xyary(w,h,value)
var a = xyary(3,3,0);
var b= xyary(`000000000`,3,3)
var c= xyary(`
000
000
000
`.trim(),'\n')
var r=3,w=3,h=3;
a._ary //base

a.set(1,1,5) //left top
a.sets(1,1, xyary(3,3,0) );

a.get(1,1,'0') //0
a.getr(1,1,r,'0') //cx cy r 
a.gets(1,1,w,h,'0') //left top
a.rotR()
a.rotL()
a.clone()

a.toString()
a.toView() //'\n';
a.toArray() //2 dimension
a.toArray(1) //flat


var da="222000222"
var ret=xyary(`
000
000
000
`)

ret.sets(1,1,da)

debug(ret.toView(0,0,'x'))

```


### interface
```
[
  "_ary",
  "w",
  "h",
  "set",
  "sets",
  "get",
  "getr",
  "gets",
  "rot",
  "rotV",
  "rotR",
  "rotL",
  "clone",
  "toString",
  "toView",
  "toArray",
  "toViewWiz"
]
```

### toWiz
```
import {xyary, toWiz} from "https://pinkromeo18.github.io/UtW/xyary.js"

var d=toWiz(`
・壁・
壁　壁
・壁・
`)

var w=xyary(d);
w.get(0,0).N

console.log( w.toViewWiz(0,0,'＊')

```




