import {fn} from "https://pinkromeo18.github.io/UtW/fn.js";

export function Mover(w,h){

  w=w||20,h=h||20;
  var def={x:0,y:0,v:'N',c:'A'}
  ;
  var o=Object.assign({},def,{w,h});
  o.move=(x,y,v)=>{
    o.x=x;
    o.y=y;
    v=v.toUpperCase();
    o.v=fn.isv(v)?v:'N';
    o.c=fn.v2char(o.v);
    return o.get();
  }
  o.ismove=(x,y)=>{ 
    var {w,h}=o;
    return !fn.out_of_range(x,y,w,h);
  }
  o.walk=(key)=>{
    key=key.toUpperCase();
    var flg=fn.iskey(key)
    if(!flg)return o.get();
    //
    var {v,x,y}=o;
    var nv = fn.k2v(key,v);
    var d =fn.diffxy(v,nv);
    var dx=d[0],dy=d[1];
    if(key==='_L'||key==='_R') return o.move(x,y,nv);
    return o.move(x+dx,y+dy,v)
  }
  o.iswalk=(key)=>{
    key=key.toUpperCase();
    var flg=fn.iskey(key)
    if(!flg)return false;
    //
    var {v,x,y}=o;
    var nv = fn.k2v(key,v);
    var d =fn.diffxy(v,nv);
    var dx=d[0],dy=d[1];
    if(key==='_L'||key==='_R') return o.ismove(x,y);
    return o.ismove(x+dx,y+dy)
  }
  o.get=()=>{    
    var {x,y,v,c}=o;
    return {x,y,v,c}
  }
  ;
  console.log('Mover v1.0')
  console.log(JSON.stringify(Object.keys(o),null,2));
  return o;
}

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
