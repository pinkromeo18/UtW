var fn={}
  fn.between=(x,z,y)=>{ return z >= x && z <= y}
  
  fn.out_of_range=(x,y,w,h)=>{
    if(!fn.between(0,x,w-1))return true;
    if(!fn.between(0,y,h-1))return true;
    return false;      
  }
  fn.iskey=(k)=>{
    //move key
    var dat='_U,A,_D,_L,_R,L,R';
    k=k.toUpperCase();
    if(dat.split(',').filter(d=>d===k).length===0)return false;
    return true;
  }
  fn.isv=(k)=>{
    //move key
    var dat='N,E,S,W';
    k=k.toUpperCase();
    if(dat.split(',').filter(d=>d===k).length===0)return false;
    return true;
  }

  fn.v2char=(v)=>{
    v=v.toUpperCase();
    if(v==='N')return 'A'
    else if(v==='E')return '>'
    else if(v==='S')return 'V'
    else if(v==='W')return '<'
    else return 'A'
  }

  fn.turn=(v,num)=>{
    //+ is R, - is L
    var dat="NESW",a=4,n=dat.indexOf(v)
    return dat[ (a*10+n+num)%a ];    
  }

  fn.k2v=(k,now)=>{
    k=k.toUpperCase();
    if(k==='_U')return now    
    if(k==='A')return now
    if(k==='_D')return fn.turn(now,2)    
    if(k==='_L')return fn.turn(now,-1)    
    if(k==='_R')return fn.turn(now,1)    
    if(k==='L')return fn.turn(now,-1)    
    if(k==='R')return fn.turn(now,1)
    return now;
  }  

  fn.diffxy=(now,next)=>{
    //      N-y
    // -x W   E +x
    //      S+y
    var a=now.toUpperCase(),b=next.toUpperCase()
    var none=[0,0];
    ;
    if(a=='N'){
      if(b=='N')return [0,-1]
      else if(b==='S')return [0,1]

      else if(b=='E')return [1,0]
      else if(b==='W')return [-1,0]      
      else return none;
    }
    if(a=='E'){
      if(b=='E')return [1,0]
      else if(b==='W')return [-1,0]

      else if(b=='N')return [0,-1]
      else if(b==='S')return [0,1] 
      else return none;
    }
    if(a=='S'){
      if(b=='N')return [0,-1]
      else if(b==='S')return [0,1]

      else if(b=='E')return [1,0]
      else if(b==='W')return [-1,0]       
      else return none;
    }
    if(a=='W'){
      if(b=='E')return [1,0]
      else if(b==='W')return [-1,0]

      else if(b=='N')return [0,-1]
      else if(b==='S')return [0,1]       
      else return none;
    }
    return none;    
  }

;
export{fn}
;
