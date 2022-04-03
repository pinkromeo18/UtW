//window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT=10*60*1000

import "https://pinkromeo18.github.io/use/use.js"
import "https://pinkromeo18.github.io/use/is.js"
import {key,sleep} from "https://pinkromeo18.github.io/UtW/key.js"

//elf.js is element control for view
function get(el){
  var obj={}
  // await 
  obj.log=async(str,lcr)=>{
    const len = ~~(geth(el)/2 + 0.6) ,cep='\n'
    var stack = str.split(cep)
    const {txt}=obj
    while(stack.length!=0){
      var ary=stack.slice(0,len)
      txt(ary.join(cep+cep),lcr)
      await key()     
      stack.splice(0,1)
    }
    return obj
  }
  obj.$sel=0
  obj.sel=async(str,cursor)=>{
    cursor = cursor||'＊'
    const boxmax = geth(el),
          {txt}=obj
    var pos = 0 // pos is 0~boxmax-1
    var ary = str.split('\n')
    var arymax = ary.length
    var i = 0 // i is 0~arymax-1
    var k
    
    while(k!=='A'){
      if(k==='_U'){
        if(pos===0) i--
        else pos=modu(--pos, boxmax>arymax?arymax:boxmax )
        if(i<0) i=0;
      }else if(k==='_D'){
        if(pos===boxmax-1) i++
        else pos=modu(++pos, boxmax>arymax?arymax:boxmax )
        var absmax =Math.abs(arymax-boxmax)
        if(i>absmax) i=absmax;
      }
      if(k==='_U' || k==='_D' || k===void 0/*firstdraw*/){
        //draw
        //console.log(i,pos)
        var mark= cursor ,sp='　',cep='\n'
        var temp = ary.slice(i,i+boxmax)
        .map((d,i)=>(i===pos)?mark+d:sp+d).join(cep)
        txt(temp)
      }
      k=await key()
    }

    //if(k==='A'){
    var selectnumber = pos+i
    //console.log(selectnumber)
    obj.$sel=selectnumber
    //return selectnumber
    //}

    return obj;
  }

  function modu(a,n){return ((a % n ) + n ) % n}

  //
  obj.text=obj.txt =(str,lcr)=>{
    lcr = lcr||'l'
    lcr = lcr[0]
    if(str===void 0) str=''
    if(lcr==='l') lcr ='left'
    else if(lcr==='c') lcr ='center'
    else if(lcr==='r') lcr ='right'    
    el.style.textAlign = lcr
    el.textContent = str
    return obj
  }
  obj.img =(file,baseurl,coverflg)=>{
    if(!file){
      el.style.backgroundImage=''
      el.style.backgroundColor=''
      return obj
    }
    if(/^#/.test(file)){
      el.style.backgroundImage='';
      el.style.backgroundColor=file;
      return obj
    }
    if(baseurl) file = baseurl + file
    el.style.backgroundColor='';    
    el.style.backgroundImage= `url(${file})`;
    el.style.backgroundSize = (coverflg)?'cover':'';
    return obj
  }

  obj.pos=(x,y)=>{
    const unit = getpx()
    el.style.left = x*unit +'px'
    el.style.top = y*unit +'px'
    return obj
  }
  obj.size=(w,h)=>{
    const unit = getpx()
    el.style.width = w*unit +'px'
    el.style.height = h*unit +'px'
    return obj
  }
  obj.border=(thin)=>{
    //borderbox
    thin = thin||0  
    var padding = 0 +'px'
    if(thin) padding= getpx() - thin +'px'
    //console.log(padding)    
    el.style.border = thin +'px'+' solid'
    el.style.padding = padding;
    el.style.borderRadius= thin +'px'
    return obj
  }
  obj.show=(flg)=>{
    //true false
    el.style.display = (flg)?'block':'none'
    return obj
  } 
  return obj
}

function isborder(el){
  const num=parseInt(el.style.padding||0)
  return num!=0
}

function geth(el){
  const unit =getpx()
  var height = parseFloat(el.style.height||0)
  if(isborder(el)) height =height-unit*2
  return ~~(height/unit)
}

function getpx() {
  var el = fn.q('.gp')||document.documentElement  
  return parseFloat(getComputedStyle(el).fontSize)||16
}

function getel(query){
  if(!query)return void 0
  if(is.domNode(query))return query

  //
  var mode='tag',
      tag ='',
      cls='',
      id ='',
      f=(d)=>d.replaceAll('.',' ').trim(),
      f1=(d)=>d.replace('#','').trim()

  //query
  //div.a.b.c#aaaa
  for(const ch of query.split('')){
    if(ch==='.') mode='cls'
    else if(ch==='#') mode='id'
    ;
    if(mode==='tag') tag+=ch
    else if(mode==='cls') cls+=ch
    else if(mode==='id') id+=ch
  }
  tag=tag||'div'
  const temp = `<${tag} id="${f1(id)}" class="${f(cls)}"></${tag}>`
  //console.log(temp)
  return fn.i3(temp)
}

function mode_of_game(el,p){  
  const cssid="#mode_of_game"
  const css=`
@font-face {
  font-family: 'goz';
  src: url('https://pinkromeo18.github.io/junk/DotGothic16-Regular.ttf') format('truetype');  
}

.x2{
  transform:scale(2);
  transform-origin:left top;  
}
.x3{
  transform:scale(3);
  transform-origin:left top;  
}
.x4{
  transform:scale(4);
  transform-origin:left top;  
}

.gp,.gc{
  box-sizing:border-box;
  border-color:white;
}
.gp,.gc{
  font-size:10px;
  color:white;
  background:black;
  -webkit-font-smoothing:none;
  font-family:"goz";
  text-transform:uppercase;
  font-variant-east-asian: full-width;
  font-feature-settings: "fwid";
  line-height:1.0;
  background-size: contain;
  background-repeat: no-repeat;
}
.gp{background:black;width:320px;height:320px; position:relative;}
.gc{top:0;left:0;white-space:pre-wrap; position:absolute;}
.gc{background-position: center bottom;}  
  `

  if(!fn.q(cssid)) fn.a2(fn.i3(`<style id="${cssid.replace('#','')}">${css} </style>`),document.head)    

  const cls_el ='gc',cls_p='gp'
  el.classList.add(cls_el)
  if(p) p.classList.add(cls_p)

}

export function elf(query,parent,gameflg){
  var el = getel(query),
      p = is.domNode(parent)?parent:is.object(parent)?parent.el:fn.q(parent) 
  if(p) fn.a2(el,p)
  if(gameflg) mode_of_game(el,p)
  var obj = Object.assign(get(el),{el,query})
  return obj;
}



/*

///////////////////
import {elf} from "https://pinkromeo18.github.io/UtW/elf.js"
import {wireframe} from "https://pinkromeo18.github.io/UtW/wireframe.js"

//usage
var $p=elf('#goz.x2','body')
var $frame =elf('#frame',$p,1).size(32,32).pos(0,0).border(2)
var $dungeon=elf('#dungeon',$p,1).size(30,30).pos(1,1)
var $background =elf('#background',$p,1).size(30,30).pos(1,1)
var $image = elf('#image',$p,1).size(20,20).pos(6,6).border(0)
var $hint=elf('#hint',$p,1).size(30,1).pos(1,0.5)
var $log=elf('#log',$p,1).size(30,2*3-1+2).pos(1,2).border(1)

var url="https://pinkromeo18.github.io/flyme/img/"
var url2="https://pinkromeo18.github.io/goz/mons/"
$background.img('FaleJixu.jpg',url,1).show(false)
$image.img('ajin4-min.png',url2)
$hint.text('＊　ああっと　＊','c')
$log.text(`
罠。扉を開けると、像がある。
像は、青銅でできており青錆が年代を語る。
青銅の像は、四つの腕を持ち、そのうち三つに何か。
`.split('\n').join('\n\n').trim(),'c').show(false)


$dungeon.img(wireframe(`壁扉壁道道道道道道`),'',1)

/////////

var $p=elf('#goz','body')
var $frame =elf('#frame',$p,1).size(32,32).pos(0,0).border(1)
var $log =elf('#log',$p,1).size(30,7).pos(1,1).border(1)
;(async()=>{

  var temp="0123456789".split('').map(d=>'line'+d).join('\n')
  await $log.sel(temp,'＞')
  $log.show(false)
  await sleep(300)
  $log.show(true),$log.text('end')
  console.log($log)


})();

*/
