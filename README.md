# UtW
UtW mean Under the World

```
```


---
## xyary
xyary is 2 dimension utility
```
import {xyary} from "https://pinkromeo18.github.io/xyary/xyary.js"
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
  "rotR",
  "rotL",
  "clone",
  "toString",
  "toView",
  "toArray"
]
```
```js
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

