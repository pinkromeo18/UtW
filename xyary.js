import "https://pinkromeo18.github.io/use/is.js"
import {fn} from "https://pinkromeo18.github.io/UtW/fn.js"

is.flatarray= a =>{
  if(!is.array(a)) return false;
  var b = a.flat();
  return b.length===a.length
}
is.xyary= a => is.object(a) && is.not.undefined(a._ary);

function mode0(obj,w,h){
  //w h is always value
  if(is.flatarray(obj)){
    var _ary=fn.splitArray(obj,w);
    return {w,h,_ary}
  }else if(is.array(obj)){
    //2dimension
    return {w,h,_ary}
  }else if(is.string(obj)){
    //string '000111000'
    obj = obj.slice(0,w*h)
    return mode0(obj.split(''),w,h)    
  }else{
    return console.error('dont reached mode0')
  }  
}

function pa(a,b,c){  
  //dont use is.null();
  const re_cr = /\r\n|\r|\n/g;

  if(is.array(a) && is.integer(b) && is.integer(c) && !is.flatarray(a) ){
    //right!
  }
  else if(is.array(a) && is.integer(b) && is.integer(c) && is.flatarray(a) ){    
    var ary=a,w=b,h=c
    var o=mode0(ary,w,h) 
    return pa(o._ary,o.w,o.h)    
  }
  else if(is.array(a) && is.integer(b) && is.undefined(c)){
    c=b;
    var ary=a,w=b,h=c
    var o=mode0(ary,w,h) 
    return pa(o._ary,o.w,o.h)    
  }
  else if(is.array(a) && is.integer(b) && is.undefined(c)){
    c=b;
    var ary=a,w=b,h=c
    var o=mode0(ary,w,h) 
    return pa(o._ary,o.w,o.h)    
  }
  else if(is.array(a) && is.undefined(b) && is.undefined(c)){
    b=c=~~Math.sqrt(a.length)
    var ary=a,w=b,h=c
    var o=mode0(ary,w,h) 
    return pa(o._ary,o.w,o.h)    
  }
  //   
  else if( is.integer(a) && is.integer(b) && is.not.undefined(c)){
    //pa(3,3,'a')
    var w=a,h=b
    var ary=Array.from({length:w*h}).map(d=>c)
    var o=mode0(ary,w,h) 
    return pa(o._ary,o.w,o.h)
  }
  else if( is.string(a) && is.integer(b) && is.integer(c)){
    // pa('000000000',3,3)
    var w=b,h=c
    var str=a.replace(re_cr,'')
    var o=mode0(str,w,h) 
    return pa(o._ary,o.w,o.h)
  }
  else if(is.string(a) && (is.string(b)||is.regexp(b)) && is.undefined(c)){
    // pa('000\n000\n000','\n')
    var wk= a.split(b);
    var w=wk[0].length,h=wk.length
    var str=a.replace(b,'')
    var o=mode0(str,w,h) 
    return pa(o._ary,o.w,o.h)
  }
  else if(is.string(a) && is.undefined(b)){
    //mode2 pa('000\n000\n000')
    //console.log('in')
    a=a.trim();//
    if(re_cr.test(a)) return pa(a,re_cr);
    var size = ~~Math.sqrt(a.length)
    return pa(a,size,size)
  }
  else if(is.xyary(a)){
  //else if(is.object(a) && is.not.undefined(a._ary)){
    return pa(a._ary,a.w,a.h)
  }
  else{
    return console.error('bad data',a,b,c)
  }

  var o={}
  o._ary=a
  o.w=b
  o.h=c
  return o;
}

////////////////////////////////////////////////
export function xyary(a,b,c){
  
  var o=Object.assign({},pa(a,b,c))
  o.set=(x,y,c)=>{
    var {w,h}=o;
    if(fn.out_of_range(x,y,w,h)) return o;
    o._ary[y][x]=c;
    return o;
  }
  o.sets=(x,y,obj)=>{
    if(!is.xyary(obj)) return o.sets(x,y,xyary(obj))
    ;
    for(var dy=0;dy<obj.h;dy++)
      for(var dx=0;dx<obj.w;dx++)
        o.set(x+dx,y+dy,obj.get(dx,dy))
    ;
    return o;    
  }
  o.get=(x,y,def)=>{
    var {w,h}=o;
    if(fn.out_of_range(x,y,w,h))return def;
    return o._ary[y][x];
  }
  o.getr=(cx,cy,r,def)=>{
    var d = ~~(r/2)
    var x=cx-d,y=cy-d,w=r,h=r
    return o.gets(x,y,w,h,def);
  }
  o.gets=(_x,_y,w,h,def)=>{
    var _o = xyary(w,h,def)
    for(var y=_y,dy=0; y<h; y++,dy++)
      for(var x=_x,dx=0; x<w; x++,dx++)
        _o.set(dx,dy,o.get(x,y,def))
    ;
    return _o;
  }
  o.rot=(n)=>{
    //left is +, right is -
    //console.log(o._ary)
    var f = n>0?fn.rotL:fn.rotR,wk
    for(var i=0;i< Math.abs(n);i++)
      o._ary = f(o._ary), wk=o.w,o.w=o.h,o.h=wk
    ;
    return o;
  }
  o.rotR=()=>o.rot(-1)
  o.rotL=()=>o.rot(1)
  o.clone=()=>xyary(o);
  o.toString=()=>o._ary.flat().join('')
  o.toView=(x,y,c)=>{
    if(is.undefined(x)) return o._ary.map(d=>d.join('')).join('\n')
    return o.clone().set(x,y,c).toView()
  }
  o.toArray=(n)=>n?o._ary.flat():o._ary;
  //o.toArray(1) is flat
  ;
  if(window && !window.__xyary__){
   console.log("xyary v1.1")
   console.log(JSON.stringify(Object.keys(o),null,2))
   window.__xyary__ = true;
  }
  ;
  return o
}