import {fn} from "https://pinkromeo18.github.io/UtW/fn.js";

export function Mover(w,h){

  w=w||20,h=h||20;
  var def={x:0,y:0,v:'N',c:'A'}
  ;
  var o=Object.assign({},def,{w,h});
  o.move=(x,y,v,nonupdate)=>{
    v=v.toUpperCase();
    v=fn.isv(v)?v:'N';
    var c=fn.v2char(v);
    if(nonupdate) return {x,y,v,c};
    //
    o.x=x
    o.y=y
    o.v=v
    o.c=c
    //
    return o.get();
  }
  o.ismove=(x,y)=>{ 
    var {w,h}=o;
    return !fn.out_of_range(x,y,w,h);
  }
  o.walk=(key,nonupdate)=>{
    key=key.toUpperCase();
    var flg=fn.iskey(key)
    if(!flg)return o.get();
    //
    var {v,x,y}=o;
    var nv = fn.k2v(key,v);
    var d =fn.diffxy(v,nv);
    var dx=d[0],dy=d[1];
    if(key==='_L'||key==='_R') return o.move(x,y,nv,nonupdate);
    return o.move(x+dx,y+dy,v,nonupdate)
  }
  o.iswalk=(key)=>{
    var nonupdate=true;
    var {x,y}=o.walk(key,nonupdate)
    return o.ismove(x,y)
  }
  o.get=()=>{
    var {x,y,v,c}=o;
    return {x,y,v,c}
  }
  o.clone=()=>{
    var {x,y,v,w,h}=o;
    var _o=Mover(w,h)
    _o.move(x,y,v);
    return _o;    
  }
  ;
  console.log('Mover v1.2 add nonupdate mode')
  console.log(JSON.stringify(Object.keys(o),null,2));
  return o;
}


/* usage
var m=Mover(32,32);
var {x,y,v,c}=m.move(0,0,'N')
goz.add('debug',1,1);
goz.pos('debug',x,y);
goz.txt('debug',c)
goz.keyloop((k)=>{
    
   if(!m.iswalk(k))return;
   var {x,y,v,c}=m.walk(k);
   goz.pos('debug',x,y);
   goz.txt('debug',c)
  
});
*/
