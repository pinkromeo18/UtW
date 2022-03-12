
//rule.js

var rule={}
rule.road = 0
rule.wall = 1
rule.door = 2
rule.ups = 3
rule.downs = 4
rule.object = 5
;
rule.rule_view = 0
rule.rule_walk = 1
;

var v={
  wall:'壁０１２３４５６７８９',
  door:'扉',
  ups:'上',
  downs:'下',
  object:'！',
  road:'床　道', //例外は全てroad  
}
var w={
  wall:'壁０１２３４５６７８９',
  door:'扉',
  road:'床　道上下！', //例外は全てroad   
}
rule.v =v ,rule.w=w;

rule.iswall=(s,rule_walk)=>{
  var name='wall'
  var a=(rule_walk)?w[name]:v[name];  
  return a.indexOf(s)!=-1
}
rule.isdoor=(s,rule_walk)=>{
  var name='door'
  var a=(rule_walk)?w[name]:v[name];  
  return a.indexOf(s)!=-1
}
rule.isups=(s,rule_walk)=>{
  var name='ups'
  var a=(rule_walk)?w['road']:v[name];  
  return a.indexOf(s)!=-1
}
rule.isdowns=(s,rule_walk)=>{
  var name='downs'
  var a=(rule_walk)?w['road']:v[name];  
  return a.indexOf(s)!=-1
}
rule.isobject=(s,rule_walk)=>{
  var name='object'
  var a=(rule_walk)?w['road']:v[name];  
  return a.indexOf(s)!=-1
}
rule.isroad=(s,rule_walk)=>{
  var name='road'
  var a=(rule_walk)?w[name]:v[name];  
  return a.indexOf(s)!=-1
}


export {rule}
;
