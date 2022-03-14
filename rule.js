
  /*
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
  */
  
  //
  var rule={}
  rule.road=0
  rule.wall=1
  rule.door=2
  rule.upstair=3
  rule.downstair=4
  rule.object=5
  //
  var mode={}
  mode.view=0
  mode.walk=1
  mode.special=2
  //
  var {view,walk,special}=mode;
  var {road,wall,door,upstair,downstair,object}=rule;
  var symbols={
    //[view,walk]
    '道':[road,road],'　':[road,road],'・':[road,road],'柱':[road,road],
    '壁':[wall,wall],'０':[wall,wall],'１':[wall,wall],'２':[wall,wall],'３':[wall,wall],'４':[wall,wall],'５':[wall,wall],'６':[wall,wall],'７':[wall,wall],'８':[wall,wall],'９':[wall,wall],'■':[wall,wall],
    '岩':[object,wall,1],
    '通':[wall,road],
    '扉':[door,door],
    '隠':[wall,door],
    '竜':[door,door],
    '獅':[door,door],
    '巨':[door,door],
    '錠':[door,door],

    '鉄':[door,door,1],
    '北':[door,door],
    '東':[door,door],
    '南':[door,door],
    '西':[door,door],
    '上':[object,road],
    '下':[object,road],
    'プ':[object,road],
    'メ':[object,road],
    'ボ':[object,road],

    'ス':[object,road,1],
    '昇':[object,road,1],
    '脱':[object,road],
    '転':[road,road,1],
    '暗':[road,road],
    '棘':[road,road],
    '回':[road,road],
    '落':[object,road],
    '浮':[road,road],
    '封':[road,road],

    '敵':[object,road,1],
  }
  //  
  var is=(ch,mode,rule)=>{
    if(!symbols[ch])
      return console.warn('non-define symbols',ch),true;
    return symbols[ch][mode] === rule
  }
  //
  var view={}
  view.isroad=(ch)=>is(ch,view,road)
  view.iswall=(ch)=>is(ch,view,wall)
  view.isdoor=(ch)=>is(ch,view,door)
  view.isupstair=(ch)=>is(ch,view,upstair)
  view.isdownstair=(ch)=>is(ch,view,downstair)
  view.isobject=(ch)=>is(ch,view,object)
  //
  var walk={}
  walk.isroad=(ch)=>is(ch,walk,road)  
  walk.iswall=(ch)=>is(ch,wall,road)
  walk.isdoor=(ch)=>is(ch,door,road)
  //
  var getspecial=(ch)=>symbols[ch][special];
  //
  var o={view,walk,rule,symbols,getspecial}
  //
  console.log('rule v0.0')
  console.log(JSON.stringify(o,null,2))
  //
  export {o as rule}
  


