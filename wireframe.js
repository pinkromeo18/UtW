import "//pinkromeo18.github.io/use/use.js"
import "//pinkromeo18.github.io/use/is.js"
import {rule} from "//pinkromeo18.github.io/UtW/rule.js"


export function wireframe(mapdata){
  /*  
  var mapdata =`
壁あ壁
扉上道
壁下壁
`.trim().split('\n').join('')
*/

  if(is.string(mapdata)){    
    mapdata=mapdata.split(/\r?\n/).join('')    
  }else if(is.array(mapdata)){
    mapdata=mapdata.flat().join('')
  }
  
  //console.log(mapdata);
  fn.path=(ary,g)=>{
    g=g||1;
    ary=ary.map(d=>d*g)
    var p =new Path2D();
    p.moveTo(ary[0],ary[1]);
    for(var i=2;i<ary.length;i+=2)
      p.lineTo(ary[i],ary[i+1]);
    p.closePath()
    return p;
  }

  return fn.canvas((ctx)=>{

    ctx.stroke2=(...arg)=>arg.filter(d=>d).map(d=>ctx.stroke(d))
    ctx.fill2=(...arg)=>arg.filter(d=>d).map(d=>ctx.fill(d))

    var width=320,g=20,b=0.4,w2=width/2,p=0.5

    ctx.canvas.width=width,ctx.canvas.height=width;
    var c_wall='#000'
    var c_line='#fff'
    //
    ctx.fillStyle=c_wall;
    ctx.strokeStyle=c_line;
    ctx.lineWidth=2  
    //ctx.lineCap = 'round';  
    //
    var _back=fn.path([0,0,16,0,16,16,0,16],g)
    ctx.fill(_back)

    var _3s,_3d,_4f,_4d,_4o

    //0 1 2
    //3 4 5
    //6 7 8
    _3s=fn.path([3,3,5,5,5,11,3,13],g)

    _3d=fn.path([3+p,5+p,5-p,6+p/2,5-p,11+p,3+p,13-p],g)

    _4o=fn.path([6-p,11+p,10+p,11+p,11+p,13-p,5-p,13-p],g) 

    _4d=fn.path([5,5,11,5,11,13,5,13],g)
    
    //mip a little big
    var mip= ctx.lineWidth/4/g
    // * * +
    // * *
    // +
    _4f=fn.path([3-mip,3-mip,13+mip,3-mip,13+mip,13+mip,3-mip,13+mip],g)

    var {
      isroad,
      iswall,
      isdoor,
      isupstair,
      isdownstair,
      isobject,
      isdefined,
    }=rule.view

    //0 1 2
    //3 4 5
    //6 7 8

    ;[0,2,1,3,5,4,6,8,7].map(d=>draw(d,mapdata[d]))
    return;
    //
    function draw(num,ch){
      if(isroad(ch))return;
      var flg147=(num===1||num===4||num===7)
      if( !flg147 && isupstair(ch))return;
      if( !flg147 && isdownstair(ch))return;
      if( !flg147 && isobject(ch))return;

      //
      var sx=1,sy=1,lcr=0;
      if(num===0||num===1||num===2) sx=sy=6/10
      else if(num===3||num===4||num===5) sx=sy=1
      else if(num===6||num===7||num===8) sx=sy=10/6
      //
      if(num===2||num===5||num===8) sx=sx*-1
      //
      if(num===0||num===3||num===6) lcr=10*g
      else if(num===1||num===4||num===7) lcr=0
      else if(num===2||num===5||num===8) lcr=-10*g

      if( flg147 && isupstair(ch)) sy=sy*-1
      
      //var r=6/10,lcr=10*g
      //ctx.stroke(_4f);
      ctx.translate(w2,w2)
      ctx.scale(sx,sy)
      ctx.translate(-w2,-w2)
      //
      //side door is special      
      if(!flg147){
        if(iswall(ch)) ctx.fill(_3s),ctx.stroke(_3s);
        if(isdoor(ch)) ctx.fill(_3s),ctx.stroke2(_3s,_3d);
      }
      //
      if(sx<0) ctx.translate(lcr,0)
      else ctx.translate(-1*lcr,0)
      
      if(iswall(ch)) ctx.fill(_4f),ctx.stroke(_4f);
      if(num!=7 && isdoor(ch)) ctx.fill(_4f),ctx.stroke2(_4f,_4d);

      if(flg147 && (isdownstair(ch)||isupstair(ch)) ){
        ctx.fillStyle=c_line,ctx.fill(_4o)
      }
      if( flg147 && isobject(ch)) ctx.stroke(_4o)

      //reset
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle=c_wall;
    }

  })
  
}

/*
 import {wireframe} from "https://pinkromeo18.github.io/UtW/wireframe.js"
 if(fn.q('#demo'))
 fn.q('#demo').src=wireframe(`壁扉壁道道道道道道`)
*/
