(this.webpackJsonpxivsim=this.webpackJsonpxivsim||[]).push([[0],{101:function(t,e,a){},107:function(t,e,a){},112:function(t,e,a){"use strict";a.r(e);var n={};a.r(n),a.d(n,"counter",(function(){return T})),a.d(n,"main",(function(){return ct})),a.d(n,"welcome",(function(){return ut})),a.d(n,"dncdemo",(function(){return re}));var i,o=a(0),r=a.n(o),s=a(8),c=a.n(s),l=(a(101),a(30)),u=a(43),m=a(29),h=a(75),d=a(76),f=(a(107),a(27)),g=a(7),p=a(113),v=a(155),y=a(158),b=a(157),k=a(159),D=a(153),C=a(61);!function(t){t.INCREMENT="increment",t.DECREMENT="decrement",t.SET_JOURNEY="set_journey"}(i||(i={}));var E=Object(D.a)({root:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}),T=Object(l.b)((function(t){return{counter:t.counter}}))((function(t){var e=E();return r.a.createElement(v.a,{className:e.root},r.a.createElement(b.a,null,r.a.createElement(C.a,{className:e.title,color:"textSecondary",gutterBottom:!0},"Count: ",t.counter)),r.a.createElement(y.a,null,r.a.createElement(p.a,{variant:"outlined",color:"secondary",onClick:function(){t.dispatch({type:i.DECREMENT})}},"Decrement"),r.a.createElement(k.a,{orientation:"vertical"}),r.a.createElement(p.a,{variant:"outlined",color:"primary",onClick:function(){t.dispatch({type:i.INCREMENT})}},"Increment")))})),S=a(48),w=a(42),j=a(165),M=a(166),O=a(169),F=a(164),x=a(185),B=a(168),P=a(187),G=a(167),A=a(82),N=a.n(A),L=a(81),R=a.n(L),I=a(3),U={hp:105,mp:79,str:90,vit:100,dex:115,int:85,mnd:80,mainStat:function(){return U.dex},autoAttackStat:function(){return U.dex}},H={flourishingCascade:{name:"Flourishing Cascade",duration:20},flourishingFountain:{name:"Flourishing Fountain",duration:20},flourishingWindmill:{name:"Flourishing Windmill",duration:20},flourishingShower:{name:"Flourishing Shower",duration:20},flourishingFanDance:{name:"Flourishing Fan Dance",duration:20}},W={name:"Standard Finish",duration:60},J={name:"Technical Finish",duration:20},z={name:"Devilment",duration:20},q={potency:110,traitDamageMult:1,autoAttackDelay:3.12},V={name:"Cascade",baseCastTime:0,baseRecastTime:2.5,potency:250,traitDamageMult:1.2,isGCD:!0,comboInteraction:!0,proc:H.flourishingCascade,procChance:.5,animationLock:.75},X={cascade:V,reverseCascade:{name:"Reverse Cascade",baseCastTime:0,baseRecastTime:2.5,potency:300,traitDamageMult:1.2,isGCD:!0,animationLock:.75},fountain:{name:"Fountain",baseCastTime:0,baseRecastTime:2.5,potency:100,comboPotency:300,comboActions:[V],traitDamageMult:1.2,isGCD:!0,comboInteraction:!0,proc:H.flourishingFountain,procChance:.5,animationLock:.75},fountainFall:{name:"Fountainfall",baseCastTime:0,baseRecastTime:2.5,potency:350,traitDamageMult:1.2,isGCD:!0,animationLock:.75},risingWindmill:{name:"Rising Windmill",baseCastTime:0,baseRecastTime:2.5,potency:300,traitDamageMult:1.2,isGCD:!0,animationLock:.75},bloodshower:{name:"Bloodshower",baseCastTime:0,baseRecastTime:2.5,potency:350,traitDamageMult:1.2,isGCD:!0,animationLock:.75},saberDance:{name:"Saber Dance",baseCastTime:0,baseRecastTime:2.5,potency:600,traitDamageMult:1.2,isGCD:!0,animationLock:.75},flourish:{name:"Flourish",baseCastTime:0,baseRecastTime:60,cooldown:60,traitDamageMult:0,isGCD:!1,animationLock:.75},standardStep:{name:"Standard Step",baseCastTime:0,baseRecastTime:1.5,cooldown:30,traitDamageMult:0,isGCD:!0,animationLock:1.5},technicalStep:{name:"Technical Step",baseCastTime:0,baseRecastTime:1.5,cooldown:120,traitDamageMult:0,isGCD:!0,animationLock:1.5},step:{name:"Step",baseCastTime:0,baseRecastTime:1,traitDamageMult:0,isGCD:!0,animationLock:1},standardFinish:{name:"Standard Finish",baseCastTime:0,baseRecastTime:1.5,potency:1e3,traitDamageMult:1.2,isGCD:!0,animationLock:.75},prePullStandard:{name:"Standard Finish",baseCastTime:0,baseRecastTime:1.5,potency:1e3,traitDamageMult:1.2,isGCD:!0,animationLock:.75},technicalFinish:{name:"Technical Finish",baseCastTime:0,baseRecastTime:1.5,potency:1500,traitDamageMult:1.2,isGCD:!0,animationLock:.75},fanDance:{name:"Fan Dance",baseCastTime:0,baseRecastTime:.75,potency:150,cooldown:1.01,traitDamageMult:1.2,isGCD:!1,animationLock:.75,proc:H.flourishingFanDance,procChance:.5},fanDance3:{name:"Fan Dance III",baseCastTime:0,baseRecastTime:1,potency:200,cooldown:1,traitDamageMult:1.2,isGCD:!1,animationLock:.75},devilment:{name:"Devilment",baseCastTime:0,baseRecastTime:120,cooldown:120,traitDamageMult:0,isGCD:!1,animationLock:.75}},Y={rootJourney:[{path:"",elementId:"main",children:[{path:"/",elementId:"welcome",label:"Home",icon:"home"},"divider",{path:"/DNCDemo",elementId:"dncdemo",label:"Dancer Demo"}]}]},_={stats:{mainStat:4871,weaponDamage:128,crit:3969,det:2067,dhit:2762,spellSpeed:380,skillSpeed:380,tenacity:380},jobMod:{dancer:U}.dancer},$=a(163),K=a(35),Q=a(160),Z=a(161),tt=a(115),et=a(162),at=a(80),nt=a.n(at),it=function(t){var e=t.icon,a=t.path,n=t.label,i=t.navigate,o=t.divider;return r.a.createElement(tt.a,{button:!0,divider:o,onClick:function(){return i(a)}},e&&r.a.createElement(Q.a,null,r.a.createElement(Z.a,{fontSize:"small"},e)),r.a.createElement(et.a,{primary:n}))};var ot=Object(l.b)((function(t){var e;return{rootJourney:(null===(e=t.journey)||void 0===e?void 0:e.rootJourney)||[]}}))((function(t){console.log("entered NavMenu FC",window.location.href);var e=t.rootJourney,a=Object(g.f)(),i=Object(o.useState)([]),s=Object(f.a)(i,2),c=s[0],l=s[1];return Object(o.useEffect)((function(){var t=function(t){return function e(a){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return console.log("entered makeNavItems with count=",a.length),console.log("views exports:",n),a.reduce((function(a,s,c){var l=Object(K.a)(a);if("divider"===s)l.push(r.a.createElement(k.a,{key:"".concat(o,".").concat(c)}));else{var u=nt.a.join(i,s.path);s.label&&s.elementId&&n[s.elementId]&&l.push(r.a.createElement(it,{icon:s.icon,path:u,label:s.label,navigate:t,key:"".concat(o,".").concat(c),divider:!!s.divider})),s.children&&(l=l.concat(e(s.children,u,o+1)))}return l}),[])}}(a)(e);l(t)}),[e]),r.a.createElement($.a,null,c)})),rt=Object(D.a)((function(t){return Object(P.a)({root:{display:"flex"},appBar:{transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen})},menuButton:{marginRight:t.spacing(2)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(w.a)(Object(w.a)({display:"flex",alignItems:"center",padding:t.spacing(0,1)},t.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:t.spacing(3),transition:t.transitions.create("margin",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:t.transitions.create("margin",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen}),marginLeft:0},title:{flexGrow:1}})})),st="MainLayout";function ct(){console.log(st,"Entered MainLayout");var t=rt(),e=r.a.useState(!1),a=Object(f.a)(e,2),n=a[0],i=a[1],o=function(){console.log(st,"entered handleDrawerClosed"),i(!1)};return r.a.createElement("div",{className:t.root},r.a.createElement(F.a,null),r.a.createElement(j.a,{onClickAway:function(){console.log(st,"onClickAway event"),o()}},r.a.createElement("div",null,r.a.createElement(M.a,{position:"fixed",className:Object(I.a)(t.appBar,Object(S.a)({},t.appBarShift,n))},r.a.createElement(G.a,null,r.a.createElement(B.a,{color:"inherit","aria-label":"open drawer",onClick:function(){console.log(st,"entered handleDrawerOpen"),i(!0)},edge:"start",className:Object(I.a)(t.menuButton,n&&t.hide)},r.a.createElement(R.a,null)),r.a.createElement(C.a,{className:t.title,variant:"h6",noWrap:!0},"XIVSim"))),r.a.createElement(x.a,{className:t.drawer,variant:"persistent",anchor:"left",open:n,classes:{paper:t.drawerPaper}},r.a.createElement("div",{className:t.drawerHeader},r.a.createElement(B.a,{onClick:o},r.a.createElement(N.a,null))),r.a.createElement(k.a,null),r.a.createElement(ot,null)))),r.a.createElement("main",{className:Object(I.a)(t.content,Object(S.a)({},t.contentShift,n))},r.a.createElement("div",{className:t.drawerHeader}),r.a.createElement(O.a,null,r.a.createElement(g.a,null))))}var lt=Object(D.a)({root:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}),ut=function(){var t=lt();return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{className:t.root},r.a.createElement(b.a,null,r.a.createElement(C.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Welcome"),r.a.createElement(C.a,{variant:"body2",component:"p"},"Welcome to XIVSim")),r.a.createElement(y.a,null,r.a.createElement(p.a,{size:"small"},"Learn More"))))},mt=a(85),ht=a(69),dt=a.n(ht),ft=a(83),gt=a(18),pt=a(19),vt=a(28),yt=a(33),bt=a(31),kt=a(177),Dt=a(178),Ct=a(183),Et=a(181),Tt=a(186),St=a(182),wt=a(179),jt=a(180),Mt={mp:1e4,main:340,sub:380,div:3300,threat:569},Ot=a(50),Ft=a(25),xt=function(t,e){return Math.random()*(e-t)+t},Bt=function(t){return t/100},Pt=function(t){return Math.floor(165*(t-340)/340+100)/100},Gt=function(t,e){return Math.floor(130*(e-t.main)/t.div+1e3)/1e3},At=function(t,e){return Math.floor(100*(e-t.sub)/t.div+1e3)/1e3},Nt=function(t,e){return Math.floor(550*(e-t.sub)/t.div)/10},Lt=function(t,e){return Math.floor(200*(e-t.sub)/t.div+50)/10},Rt=function(t,e){return Math.floor(200*(e-t.sub)/t.div+1400)/1e3},It=function(t,e,a,n,i,o,r,s,c,l,u){return u=u||xt(.95,1.05),Math.floor(Math.floor(Math.floor(Bt(t)*function(t,e,a,n){return Math.floor(Math.floor(t.main*e/1e3+a)*(n/3))}(e,a,n,i)*Pt(o)*Gt(e,r)*At(e,s)*c)*function(t,e){return Math.floor(130*(e-t.sub)/t.div+1e3)/1e3}(e,l))*u)},Ut=function(t,e,a,n,i,o,r,s,c){return c=c||xt(.95,1.05),Math.floor(Math.floor(Bt(t)*function(t,e,a){return Math.floor(t.main*e/1e3+a)}(e,a,n)*Pt(i)*Gt(e,o)*At(e,r)*s)*c)},Ht=function(){function t(e,a,n,i){Object(gt.a)(this,t),this.player=void 0,this.levelMod=void 0,this.printLog=void 0,this.currentTime=void 0,this.maxTime=void 0,this.damageDealt=void 0,this.gcdTimer=void 0,this.autoAttackTimer=void 0,this.comboTimer=void 0,this.comboAction=void 0,this.log=void 0,this.cooldowns=void 0,this.animLock=void 0,this.buffs=void 0,this.player=e,this.levelMod=a,this.printLog=i,this.currentTime=0,this.maxTime=100*n,this.damageDealt=0,this.gcdTimer=0,this.comboTimer=0,this.autoAttackTimer=0,this.log=[],this.cooldowns=[],this.animLock=0,this.buffs=[]}return Object(pt.a)(t,[{key:"dealDamage",value:function(t){this.damageDealt+=t}},{key:"jumpToNextGCD",value:function(){this.jumpTimeBy(this.gcdTimer)}},{key:"jumpToAutoAttack",value:function(){this.jumpTimeBy(this.autoAttackTimer)}},{key:"jumpAnimationLock",value:function(){this.jumpTimeBy(this.animLock)}},{key:"jumpTimeBy",value:function(t){this.currentTime+=t,this.gcdTimer=Math.max(this.gcdTimer-t,0),this.autoAttackTimer=Math.max(this.autoAttackTimer-t,0),this.comboTimer=Math.max(this.comboTimer-t,0),this.animLock=Math.max(this.animLock-t,0),this.cooldownsJumpBy(t),this.buffsJumpBy(t)}},{key:"summary",value:function(){return{totalDamage:this.damageDealt,dps:100*this.damageDealt/this.currentTime,duration:this.currentTime/100,totalActions:this.log.length}}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"useSkill",value:function(t){var e,a=this.getCurrentTime(),n=t.potency?t.potency:0;t.comboPotency&&this.comboTimer>0&&(null===(e=t.comboActions)||void 0===e?void 0:e.includes(this.comboAction))&&(n=t.comboPotency,this.comboTimer=0);var i=!1,o=!1,r=0;if(n>0){var s=Ut(n,this.levelMod,this.player.jobMod.mainStat(),this.player.stats.weaponDamage,this.player.stats.mainStat,this.player.stats.det,this.player.stats.tenacity,1.2),c=Lt(this.levelMod,this.player.stats.crit)/100+this.calcCritChanceFromBuffs(),l=Nt(this.levelMod,this.player.stats.dhit)/100+this.calcDHitChanceFromBuffs();r=Math.floor(s*this.calcDamageMultFromBuffs()),Math.random()<=c&&(r=Math.floor(r*Rt(this.levelMod,this.player.stats.crit)),i=!0),Math.random()<=l&&(r=Math.floor(1.25*r),o=!0)}else r=0;var u={name:t.name,damage:r,totalDamage:this.damageDealt,potency:n,directHit:o,crit:i,timestamp:a};return t.comboInteraction&&(this.comboAction=t,this.comboTimer=1e3),t.animationLock&&(this.animLock=100*t.animationLock),u}},{key:"useOGCD",value:function(t){return t.potency?this.useSkill(t):(t.animationLock&&(this.animLock=t.animationLock),{timestamp:this.getCurrentTime(),comment:"Used ".concat(t.name)})}},{key:"useAutoAttack",value:function(t){var e=this.getCurrentTime(),a=It(t.potency,this.levelMod,this.player.jobMod.autoAttackStat(),this.player.stats.weaponDamage,t.autoAttackDelay,this.player.stats.mainStat,this.player.stats.det,this.player.stats.tenacity,t.traitDamageMult,this.player.stats.skillSpeed),n=Lt(this.levelMod,this.player.stats.crit)/100+this.calcCritChanceFromBuffs(),i=Nt(this.levelMod,this.player.stats.dhit)/100+this.calcDHitChanceFromBuffs(),o=Math.floor(a*this.calcDamageMultFromBuffs()),r=!1,s=!1;return Math.random()<=n&&(o=Math.floor(o*Rt(this.levelMod,this.player.stats.crit)),r=!0),Math.random()<=i&&(o=Math.floor(1.25*o),s=!0),{name:"Auto Attack",damage:o,totalDamage:this.damageDealt,potency:t.potency,directHit:s,crit:r,timestamp:e}}},{key:"getCooldown",value:function(t){return this.cooldowns.find((function(e){return e.name===t}))}},{key:"removeCooldown",value:function(t){this.cooldowns=this.cooldowns.filter((function(e){return e.name!==t.name}))}},{key:"addCooldown",value:function(t){this.getCooldown(t.name)&&this.removeCooldown(t),this.cooldowns.push({name:t.name,duration:100*t.duration}),this.cooldowns.sort((function(t,e){return t.duration-e.duration}))}},{key:"cooldownsJumpBy",value:function(t){var e=this.cooldowns.map((function(e){return e.duration=e.duration-t,e}));this.cooldowns=e.filter((function(t){return t.duration>.001}))}},{key:"getBuff",value:function(t){return this.buffs.find((function(e){return e.name===t}))}},{key:"getBuffs",value:function(){return this.buffs}},{key:"removeBuff",value:function(t){this.buffs=this.buffs.filter((function(e){return e.name!==t.name}))}},{key:"addBuff",value:function(t){this.getBuff(t.name)&&this.removeBuff(t),this.buffs.push({name:t.name,duration:100*t.duration}),this.buffs.sort((function(t,e){return t.duration-e.duration}))}},{key:"buffsJumpBy",value:function(t){var e=this.buffs.map((function(e){return e.duration=e.duration-t,e}));this.buffs=e.filter((function(t){return t.duration>.001}))}},{key:"triggerGCD",value:function(t){this.gcdTimer=t}},{key:"calcDamageMultFromBuffs",value:function(){return 1}},{key:"calcCritChanceFromBuffs",value:function(){return 0}},{key:"calcDHitChanceFromBuffs",value:function(){return 0}},{key:"createDataPointsAreaChart",value:function(){var t,e,a,n=this,i=[],o=[];return this.log.forEach((function(r){r.damage>0&&((t=i.find((function(t){return t.name===r.name})))||(a=new Array(Math.ceil(n.log[n.log.length-1].timestamp/100)+1).fill([0,0]).map((function(t,e){return[e,0]})),i.push({name:r.name,totalDamage:0,crit:0,dhit:0,critdhit:0,hits:0,damage:a}),(t=i.find((function(t){return t.name===r.name}))).damage.forEach((function(e,a){t.damage[a][0]=a}))),r.crit&&!r.directHit?t.crit++:!r.crit&&r.directHit?t.dhit++:r.crit&&r.directHit&&t.critdhit++,t.hits++,t.damage.find((function(t){return Math.ceil(r.timestamp/100)===t[0]}))[1]+=r.damage,t.totalDamage+=r.damage),r.damage>0&&((e=o.find((function(t){return t.name===r.name})))?e.damage+=r.damage:o.push({name:r.name,damage:r.damage}))})),{damagePoints:i,abilityDamage:o,log:{logs:this.getLog(),summary:this.summary()},totalTime:this.currentTime/100}}},{key:"getLog",value:function(){return this.log}}]),t}(),Wt=function(){function t(){Object(gt.a)(this,t),this.esprit=void 0,this.feathers=void 0,this.maxEsprit=void 0,this.maxFeathers=void 0,this.procs=void 0,this.stepsRemaining=void 0,this.inStandard=void 0,this.inTechnical=void 0,this.esprit=0,this.feathers=0,this.maxEsprit=100,this.maxFeathers=4,this.procs=[],this.stepsRemaining=0,this.inStandard=!1,this.inTechnical=!1}return Object(pt.a)(t,[{key:"getEsprit",value:function(){return this.esprit}},{key:"getFeathers",value:function(){return this.feathers}},{key:"addEsprit",value:function(t){var e=Math.min(this.maxEsprit-this.esprit,t);return this.esprit=this.esprit+e,e}},{key:"addFeather",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=Math.min(this.maxFeathers-this.feathers,t);return this.feathers=this.feathers+e,e}},{key:"removeEsprit",value:function(t){return!(this.esprit<t)&&(this.esprit=this.esprit-t,!0)}},{key:"removeFeather",value:function(){return!(this.feathers<1)&&(this.feathers=this.feathers-1,!0)}},{key:"getProcs",value:function(){return this.procs}},{key:"getProcByName",value:function(t){return this.procs.find((function(e){return e.name===t}))}},{key:"removeProc",value:function(t){this.procs=this.procs.filter((function(e){return e.name!==t.name}))}},{key:"addProc",value:function(t){this.getProcByName(t.name)&&this.removeProc(t),this.procs.push({name:t.name,duration:100*t.duration}),this.procs.sort((function(t,e){return t.duration-e.duration}))}},{key:"procsJumpBy",value:function(t){var e=this.procs.map((function(e){return e.duration=e.duration-t,e}));this.procs=e.filter((function(t){return t.duration>0}))}},{key:"getStepsRemaining",value:function(){return this.stepsRemaining}},{key:"removeStep",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.stepsRemaining=Math.max(this.stepsRemaining-t,0)}},{key:"setRemainingSteps",value:function(t){this.stepsRemaining=t}},{key:"setInStandard",value:function(t){t?(this.inStandard=!0,this.setRemainingSteps(2)):this.inStandard=!1}},{key:"setInTechnical",value:function(t){t?(this.inTechnical=!0,this.setRemainingSteps(4)):this.inTechnical=!1}},{key:"getInStandard",value:function(){return this.inStandard}},{key:"getInTechnical",value:function(){return this.inTechnical}},{key:"getInDance",value:function(){return this.getInStandard()||this.getInTechnical()}}]),t}(),Jt=function(t){Object(yt.a)(a,t);var e=Object(bt.a)(a);function a(t,n,i,o,r){var s;return Object(gt.a)(this,a),(s=e.call(this,t,n,i,r)).opener=void 0,s.state=void 0,s.teamGCD=void 0,s.queuedSkill=void 0,s.opener=o,s.state=new Wt,s.teamGCD=0,s.registerProcs(),s.registerCooldowns(),s}return Object(pt.a)(a,[{key:"getDancerComment",value:function(){return{feathers:this.state.getFeathers(),esprit:this.state.getEsprit(),procs:this.state.getProcs().reduce((function(t,e){return t+"".concat(e.name,"(").concat((e.duration/100).toFixed(2),") ")}),""),buffs:this.getBuffs().reduce((function(t,e){return t+"".concat(e.name,"(").concat((e.duration/100).toFixed(2),") ")}),""),cooldowns:this.cooldowns.reduce((function(t,e){return t+"".concat(e.name,"(").concat((e.duration/100).toFixed(2),") ")}),""),gcdTimer:this.gcdTimer}}},{key:"useSkill",value:function(t){var e=Object(Ot.a)(Object(Ft.a)(a.prototype),"useSkill",this).call(this,t);return t.onUse&&t.onUse(this.state),e.comment=this.getDancerComment(),e}},{key:"useOGCD",value:function(t){var e=Object(Ot.a)(Object(Ft.a)(a.prototype),"useOGCD",this).call(this,t);return t.onUse&&t.onUse(this.state),e.comment=this.getDancerComment(),e.name?e:{name:t.name,damage:0,totalDamage:this.damageDealt,potency:0,directHit:!1,crit:!1,timestamp:e.timestamp,comment:e.comment}}},{key:"useAutoAttack",value:function(t){var e=Object(Ot.a)(Object(Ft.a)(a.prototype),"useAutoAttack",this).call(this,t);return e.comment=this.getDancerComment(),e}},{key:"calcDamageMultFromBuffs",value:function(){var t=1;return this.getBuffs().forEach((function(e){switch(e.name){case W.name:case J.name:t*=1.05}})),t}},{key:"calcCritChanceFromBuffs",value:function(){var t=0;return this.getBuffs().forEach((function(e){switch(e.name){case z.name:t+=.2}})),t}},{key:"calcDHitChanceFromBuffs",value:function(){var t=0;return this.getBuffs().forEach((function(e){switch(e.name){case z.name:t+=.2}})),t}},{key:"printDamageLogLine",value:function(t){var e,a,n,i="".concat((t.timestamp/100).toFixed(2).padStart(6," "),"| ").concat(t.potency.toString().padStart(4," "),"p | Feathers: ").concat(null===(e=t.comment)||void 0===e?void 0:e.feathers," Esprit: ").concat(null===(a=t.comment)||void 0===a?void 0:a.esprit.toString().padStart(3," ")," | ").concat(t.damage.toString().padStart(6," ")," | ").concat(t.name," ");t.crit&&(i+="C"),t.directHit&&(i+="D"),i+=" | Procs: ".concat(null===(n=t.comment)||void 0===n?void 0:n.procs),console.log(i)}},{key:"jumpTimeBy",value:function(t){this.state.procsJumpBy(t),this.teamGCD=Math.max(this.teamGCD-t,0),Object(Ot.a)(Object(Ft.a)(a.prototype),"jumpTimeBy",this).call(this,t)}},{key:"simulateTeamGCD",value:function(){var t=0;this.getBuff(J.name)?t=7:this.getBuff(W.name)&&(t=2);for(var e=0;e<t;e++)this.generateEsprit(.2)}},{key:"getNextGCD",value:function(){if(this.state.getInDance()){if(this.state.getStepsRemaining()>0)return X.step;if(0===this.state.getStepsRemaining()){if(this.state.getInStandard())return X.standardFinish;if(this.state.getInTechnical())return X.technicalFinish}}if(!this.getCooldown(X.standardStep.name))return X.standardStep;if(!this.getCooldown(X.technicalStep.name))return X.technicalStep;var t=this.getCooldown(X.flourish.name)?this.getCooldown(X.flourish.name).duration:0;return this.state.getEsprit()>=50&&0===this.getShortestGCDProcTimer().procs&&t<=250?X.saberDance:this.getShortestGCDProcTimer().procs>0&&t<=250||250*this.getShortestGCDProcTimer().procs>this.getShortestGCDProcTimer().duration?this.getGCDProcToUse():this.state.getEsprit()>=50&&this.shouldUseSaberDance()?X.saberDance:this.getGCDProcToUse()?this.getGCDProcToUse():this.comboAction===X.cascade?X.fountain:X.cascade}},{key:"jumpToNextEvent",value:function(){var t,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=[this.autoAttackTimer,this.gcdTimer,this.teamGCD,null===(t=this.cooldowns[0])||void 0===t?void 0:t.duration];e||a.push(this.animLock),(a=a.sort((function(t,e){return t-e})))[0]&&this.jumpTimeBy(a[0])}},{key:"doNextAction",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.jumpToNextEvent(t),!this.queuedSkill&&this.opener.length>0&&(this.queuedSkill=this.opener.shift()),0===this.teamGCD&&(this.simulateTeamGCD(),this.teamGCD=250),0===this.autoAttackTimer)return this.doAutoAttack();if(this.queuedSkill){if(0===this.gcdTimer&&this.queuedSkill.isGCD){var e=this.queuedSkill;return this.queuedSkill=null,this.doNextGCD(e)}if(0===this.animLock){if(!this.queuedSkill.isGCD){var a=this.queuedSkill;return this.queuedSkill=null,this.doNextOGCD(a)}this.jumpToNextEvent(!0)}}else{if(0===this.gcdTimer)return this.doNextGCD();if(0===this.animLock){var n=this.getNextOGCD();if(n)return this.doNextOGCD();this.jumpToNextEvent(!0)}}return null}},{key:"getNextOGCD",value:function(){return this.animLock>0?null:!this.getCooldown(X.devilment.name)&&100*X.devilment.animationLock<=this.gcdTimer&&this.shouldUseDevilment()?X.devilment:!this.getCooldown(X.flourish.name)&&100*X.flourish.animationLock<=this.gcdTimer&&this.shouldUseFlourish()?X.flourish:!this.getCooldown(X.fanDance3.name)&&100*X.fanDance3.animationLock<=this.gcdTimer&&this.state.getProcByName(H.flourishingFanDance.name)?X.fanDance3:!this.getCooldown(X.fanDance.name)&&100*X.fanDance.animationLock<=this.gcdTimer&&this.shouldUseFanDance()?X.fanDance:null}},{key:"doNextOGCD",value:function(t){var e;return t||(t=this.getNextOGCD()),(e=this.useSkill(t)).damage>0&&this.dealDamage(e.damage),e}},{key:"doNextGCD",value:function(t){this.jumpToNextGCD(),t||(t=this.getNextGCD());var e=this.useSkill(t);return this.dealDamage(e.damage),this.gcdTimer=100*t.baseRecastTime,e}},{key:"doAutoAttack",value:function(){this.jumpToAutoAttack();var t=this.useAutoAttack(q);return this.dealDamage(t.damage),this.autoAttackTimer=100*q.autoAttackDelay,t}},{key:"run",value:function(){for(var t;this.getCurrentTime()<this.maxTime;)(t=this.doNextAction())&&this.log.push(t)}},{key:"registerProcs",value:function(){var t=this;X.cascade.onUse=function(e){t.generateEsprit(),Math.random()<X.cascade.procChance&&t.state.addProc(X.cascade.proc)},X.fountain.onUse=function(e){t.generateEsprit(),Math.random()<X.fountain.procChance&&t.state.addProc(X.fountain.proc)},X.fanDance.onUse=function(e){Math.random()<X.fanDance.procChance&&t.state.addProc(X.fanDance.proc),t.addCooldown({name:X.fanDance.name,duration:X.fanDance.cooldown}),t.state.removeFeather()},X.fanDance3.onUse=function(e){t.state.removeProc(H.flourishingFanDance),t.addCooldown({name:X.fanDance3.name,duration:X.fanDance3.cooldown})},X.reverseCascade.onUse=function(e){t.generateEsprit(),t.state.removeProc(H.flourishingCascade),t.featherProc(.5)},X.fountainFall.onUse=function(e){t.generateEsprit(),t.state.removeProc(H.flourishingFountain),t.featherProc(.5)},X.risingWindmill.onUse=function(e){t.generateEsprit(),t.state.removeProc(H.flourishingWindmill),t.featherProc(.5)},X.bloodshower.onUse=function(e){t.generateEsprit(),t.state.removeProc(H.flourishingShower),t.featherProc(.5)},X.saberDance.onUse=function(e){t.state.removeEsprit(50)}}},{key:"registerCooldowns",value:function(){var t=this;X.flourish.onUse=function(e){t.addCooldown({name:X.flourish.name,duration:X.flourish.cooldown}),t.state.addProc(H.flourishingCascade),t.state.addProc(H.flourishingFountain),t.state.addProc(H.flourishingWindmill),t.state.addProc(H.flourishingShower),t.state.addProc(H.flourishingFanDance)},X.devilment.onUse=function(e){t.addCooldown({name:X.devilment.name,duration:X.devilment.cooldown}),t.addBuff({name:z.name,duration:z.duration})},X.standardStep.onUse=function(e){t.addCooldown({name:X.standardStep.name,duration:X.standardStep.cooldown}),t.triggerGCD(1.5),t.state.setRemainingSteps(2),t.state.setInStandard(!0)},X.technicalStep.onUse=function(e){t.addCooldown({name:X.technicalStep.name,duration:X.technicalStep.cooldown}),t.triggerGCD(1.5),t.state.setRemainingSteps(4),t.state.setInTechnical(!0)},X.step.onUse=function(e){t.triggerGCD(1),t.state.removeStep()},X.standardFinish.onUse=function(e){t.triggerGCD(1.5),t.state.setInStandard(!1),t.addBuff({name:W.name,duration:W.duration})},X.prePullStandard.onUse=function(e){t.triggerGCD(1.5),t.state.setInStandard(!1),t.addBuff({name:W.name,duration:W.duration}),t.addCooldown({name:X.standardStep.name,duration:X.standardStep.cooldown-15})},X.technicalFinish.onUse=function(e){t.triggerGCD(1.5),t.state.setInTechnical(!1),t.addBuff({name:J.name,duration:J.duration})}}},{key:"featherProc",value:function(t){return Math.random()<t&&(this.state.addFeather(),!0)}},{key:"shouldUseFlourish",value:function(){return!this.state.getProcByName(H.flourishingFanDance.name)}},{key:"shouldUseFanDance",value:function(){return!(!this.isBursting()&&(this.state.getProcByName(H.flourishingFanDance.name)||this.state.getFeathers()<4))&&this.state.getFeathers()>0}},{key:"generateEsprit",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.3;Math.random()<t&&this.state.addEsprit(10)}},{key:"shouldUseDevilment",value:function(){return!!this.getBuff(J.name)}},{key:"shouldUseSaberDance",value:function(){return!!(this.state.getEsprit()>80||this.isBursting())}},{key:"isBursting",value:function(){return!!this.getBuff(J.name)}},{key:"getGCDProcToUse",value:function(){return this.state.getProcByName(H.flourishingFountain.name)?X.fountainFall:this.state.getProcByName(H.flourishingShower.name)?X.bloodshower:this.state.getProcByName(H.flourishingCascade.name)?X.reverseCascade:this.state.getProcByName(H.flourishingWindmill.name)?X.risingWindmill:null}},{key:"getShortestGCDProcTimer",value:function(){var t,e,a,n,i=[null===(t=this.state.getProcByName(H.flourishingFountain.name))||void 0===t?void 0:t.duration,null===(e=this.state.getProcByName(H.flourishingShower.name))||void 0===e?void 0:e.duration,null===(a=this.state.getProcByName(H.flourishingCascade.name))||void 0===a?void 0:a.duration,null===(n=this.state.getProcByName(H.flourishingWindmill.name))||void 0===n?void 0:n.duration].filter((function(t){return t>0}));return{duration:Math.min.apply(Math,Object(K.a)(i)),procs:i.length}}}]),a}(Ht),zt=a(84),qt=a.n(zt);var Vt=function(t){Object(yt.a)(a,t);var e=Object(bt.a)(a);function a(t){var n;Object(gt.a)(this,a),n=e.call(this,t);var i=t.data;return n.state={series:n.dataToSeries(i),options:{chart:{id:"dncDemoArea",toolbar:{show:!0,offsetX:0,offsetY:0,tools:{download:!1,selection:!0,zoom:!0,zoomin:!1,zoomout:!1,pan:!1,reset:!0},autoSelected:"zoom"},type:"area",height:350,stacked:!0},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:"2"},legend:{position:"bottom",horizontalAlign:"left"},xaxis:{type:"numeric"},tooltip:{inverseOrder:!0}}},n}return Object(pt.a)(a,[{key:"dataToSeries",value:function(t){var e=this,a=[];return t.forEach((function(t){a.push({name:t.name,data:t.damage})})),a.forEach((function(t){var a=e.smoothData(t.data,10);t.data=a})),a}},{key:"smoothData",value:function(t,e){return function(t,e){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t){return t},n=arguments.length>3?arguments[3]:void 0,i=a,o=[],r=0;r<t.length;r+=1){for(var s=r-e,c=s>=0?s:0,l=r+e+1,u=0,m=c;m<l&&m<t.length;m+=1)u+=i(t[m]),1;o[r]=n?n(t[r],u/(2*e+1)):u/(2*e+1)}return o}(t,e,(function(t){return t[1]}),(function(t,e){return[t[0],Math.floor(e)]}))}},{key:"componentDidUpdate",value:function(t){t.data!==this.props.data&&this.setState({series:this.dataToSeries(this.props.data)})}},{key:"render",value:function(){return r.a.createElement("div",{id:"chart"},r.a.createElement(qt.a,{options:this.state.options,series:this.state.series,type:"area",height:310}))}}]),a}(o.Component),Xt=a(171),Yt=a(175),_t=a(174),$t=a(170),Kt=a(172),Qt=a(173),Zt=a(87),te=a(176),ee=Object(D.a)({table:{minWidth:480}});function ae(t){var e=ee(),a=Object(o.useState)([]),n=Object(f.a)(a,2),i=n[0],s=n[1],c=Object(o.useState)(0),l=Object(f.a)(c,2),u=l[0],m=l[1];return Object(o.useEffect)((function(){var e,a=[],n=0,i=0;t.data.forEach((function(t){t.forEach((function(t){n+=t.totalDamage,(e=a.find((function(e){return e.name===t.name})))?(e.damage=e.damage+t.totalDamage,e.crit=e.crit+t.crit,e.dhit=e.dhit+t.dhit,e.critdhit=e.crit+t.critdhit,e.amount=e.amount+t.hits):(a.push({name:t.name,damage:t.totalDamage,crit:t.crit,dhit:t.dhit,critdhit:t.critdhit,amount:t.hits,damagePercent:0,dps:0}),e=a.find((function(e){return e.name===t.name})))}))})),a.forEach((function(e){e.damagePercent=e.damage/n,e.dps=e.damage/t.totalTime,i+=e.dps,e.damage=e.damage/t.data.length,e.crit=e.crit/t.data.length,e.dhit=e.dhit/t.data.length,e.critdhit=e.critdhit/t.data.length,e.amount=e.amount/t.data.length})),s(a.sort((function(t,e){return e.damage-t.damage}))),m(i)}),[t.data]),r.a.createElement($t.a,{component:Zt.a},r.a.createElement(Xt.a,{className:e.table,size:"small","aria-label":"simple table"},r.a.createElement(Kt.a,null,r.a.createElement(Qt.a,null,r.a.createElement(_t.a,{align:"left"},"Name"),r.a.createElement(_t.a,{align:"right"},"Damage %"),r.a.createElement(_t.a,{align:"right"},"Damage"),r.a.createElement(_t.a,{align:"right"},"Hits"),r.a.createElement(_t.a,{align:"right"},"Crit %"),r.a.createElement(_t.a,{align:"right"},"DHit %"),r.a.createElement(_t.a,{align:"right"},"CDH %"),r.a.createElement(_t.a,{align:"right"},"DPS"))),r.a.createElement(Yt.a,null,i.map((function(t){return r.a.createElement(Qt.a,{key:t.name},r.a.createElement(_t.a,null,t.name),r.a.createElement(_t.a,{align:"right"},(100*t.damagePercent).toFixed(2),"%"),r.a.createElement(_t.a,{align:"right"},t.damage.toFixed(0)),r.a.createElement(_t.a,{align:"right"},t.amount.toFixed(1)),r.a.createElement(_t.a,{align:"right"},(100*t.crit/t.amount).toFixed(1),"%"),r.a.createElement(_t.a,{align:"right"},(100*t.dhit/t.amount).toFixed(1),"%"),r.a.createElement(_t.a,{align:"right"},(100*t.critdhit/t.amount).toFixed(1),"%"),r.a.createElement(_t.a,{align:"right"},t.dps.toFixed(1)))}))),r.a.createElement(te.a,null,r.a.createElement(Qt.a,null,r.a.createElement(_t.a,{size:"medium",align:"left"},"Total"),r.a.createElement(_t.a,{variant:"body",size:"medium",colSpan:7,align:"right"},u.toFixed(1))))))}var ne=a(86);var ie=function(t){Object(yt.a)(a,t);var e=Object(bt.a)(a);function a(t){var n;return Object(gt.a)(this,a),(n=e.call(this,t)).state={selection:t.selection,logs:t.logs},n.handleChange=n.handleChange.bind(Object(vt.a)(n)),n.renderRow=n.renderRow.bind(Object(vt.a)(n)),n}return Object(pt.a)(a,[{key:"componentDidUpdate",value:function(t){t.logs!==this.props.logs&&this.setState({logs:this.props.logs}),t.selection!==this.props.selection&&this.setState({selection:this.props.selection})}},{key:"handleChange",value:function(t){console.log(t),this.setState({selection:t.target.value})}},{key:"renderRow",value:function(t){var e=t.index,a=t.style,n=this.state.logs[this.state.selection].logs[e],i=function(t){function e(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return("00"+t).slice(-e)}var a=t%100,n=(t=(t-a)/100)%60,i=(t=(t-n)/60)%60;return e((t-i)/60)+":"+e(i)+":"+e(n)+"."+e(a)}(n.timestamp),o=n.name;if(n.damage>0){var s=n.damage.toString();n.crit&&(s="*".concat(s,"*")),n.directHit&&(s="".concat(s," (Direct Hit)")),o+=" "+s}return r.a.createElement(tt.a,{style:a,key:e},r.a.createElement(et.a,null,"[",i,"] ",o))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Zt.a,null,r.a.createElement(ne.a,{height:400,width:"auto",itemSize:30,itemCount:this.state.logs[this.state.selection].logs.length},this.renderRow)))}}]),a}(o.Component);function oe(t){var e=t.children,a=t.value,n=t.index,i=Object(mt.a)(t,["children","value","index"]);return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},i),a===n&&r.a.createElement(kt.a,{xs:!0,item:!0},e))}var re=function(t){Object(yt.a)(a,t);var e=Object(bt.a)(a);function a(t){var n;return Object(gt.a)(this,a),(n=e.call(this,t)).state={tabAnchor:null,tab:0,pass1:5,pass2:15,totalTime:0,selectedLog:0,logs:[],data:[],dataArea:[]},n.recalc=n.recalc.bind(Object(vt.a)(n)),n.reset=n.reset.bind(Object(vt.a)(n)),n.componentDidMount=n.componentDidMount.bind(Object(vt.a)(n)),n}return Object(pt.a)(a,[{key:"componentDidMount",value:function(){this.recalc()}},{key:"recalc",value:function(){var t=Object(K.a)(this.state.data),e=Object(K.a)(this.state.logs),a=this.state.totalTime,n=[X.prePullStandard,X.technicalStep,X.step,X.step,X.step,X.step,X.technicalFinish,X.flourish,X.risingWindmill,X.devilment],i=new Jt(_,Mt,400,n);i.run();var o=i.createDataPointsAreaChart();e.push(o.log),t.push(o.damagePoints),a+=o.totalTime;var r=t.reduce((function(t,e){return e.forEach((function(e){var a=t.find((function(t){return t.name===e.name}));a?a.damage.forEach((function(t,a){t[1]=t[1]+e.damage[a][1]})):t.push(e)})),t}),[]);r.forEach((function(e){e.damage.forEach((function(e){e[1]=e[1]/t.length}))})),this.setState({tab:0,data:t,totalTime:a,logs:e.sort((function(t,e){return t.summary.dps-e.summary.dps})),dataArea:r})}},{key:"reset",value:function(){var t=Object(ft.a)(dt.a.mark((function t(){var e;return dt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(e=Object(K.a)(this.state.dataArea)).forEach((function(t){t.damage.forEach((function(t){t[1]=0}))})),this.setState({tab:0,totalTime:0,selectedLog:0,logs:[],data:[],dataArea:e},this.recalc);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return r.a.createElement(v.a,null,r.a.createElement(b.a,null,r.a.createElement(kt.a,{container:!0,spacing:2},r.a.createElement(y.a,null,r.a.createElement(Dt.a,null,r.a.createElement(p.a,{variant:"outlined",onClick:this.recalc,startIcon:r.a.createElement(wt.a,null)},"Add"),r.a.createElement(p.a,{variant:"outlined",onClick:this.reset,startIcon:r.a.createElement(jt.a,null)},"Reset")))),r.a.createElement(kt.a,{container:!0,spacing:2},r.a.createElement(kt.a,{item:!0,sm:!0,xs:12},r.a.createElement(Vt,{data:this.state.dataArea}))),r.a.createElement(kt.a,{container:!0,spacing:2},r.a.createElement(kt.a,{item:!0,xs:12},r.a.createElement(Ct.a,{value:this.state.tab,onChange:function(e,a){1!==a&&t.setState({tab:a})},"aria-label":"simple tabs example"},r.a.createElement(Et.a,{label:"Average Damage",id:"tab-1"}),r.a.createElement(Et.a,{onClick:function(e){t.setState({tabAnchor:e.currentTarget})},label:"View Log",id:"tab-2"}),r.a.createElement(Et.a,{disabled:!0,label:"Configuration",id:"tab-3"})),r.a.createElement(Tt.a,{id:"simple-menu",anchorEl:this.state.tabAnchor,keepMounted:!0,open:Boolean(this.state.tabAnchor),onClose:function(){return t.setState({tabAnchor:null})}},this.state.logs.map((function(e,a){return r.a.createElement(St.a,{key:a,value:a,onClick:function(){t.setState({selectedLog:a,tab:1,tabAnchor:null})}},e.summary.dps.toFixed(1))})))),r.a.createElement(kt.a,{item:!0,xs:12},r.a.createElement(oe,{value:this.state.tab,index:0},r.a.createElement(ae,{data:this.state.data,totalTime:this.state.totalTime})),r.a.createElement(oe,{value:this.state.tab,index:1},r.a.createElement(ie,{selection:this.state.selectedLog,logs:this.state.logs})),r.a.createElement(oe,{value:this.state.tab,index:2},"Configuration here")))))}}]),a}(o.Component),se=function(t){return Object(o.createElement)(n[t.elementId])},ce=Object(l.b)((function(t){var e;return{routes:null===(e=t.journey)||void 0===e?void 0:e.rootJourney}}),(function(t){return{setJourn:function(){var e;t((e=Y,{type:i.SET_JOURNEY,payload:e}))}}}))((function(t){console.log("entered DynamicRouter FC",window.location.href);var e=t.routes,a=t.setJourn,i=Object(o.useState)([]),r=Object(f.a)(i,2),s=r[0],c=r[1];return Object(o.useEffect)((function(){a();var e=function t(e){return console.log("entered makeRoutesConfig"),e.filter((function(t){return"object"===typeof t})).filter((function(t){return void 0!==n[t.elementId]})).map((function(e){var a={path:e.path,element:se(e)};return"object"===typeof e&&e.children&&(a.children=t(e.children)),a}))}(t.routes);c(e)}),[e]),Object(g.h)(s)})),le=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case i.DECREMENT:return t-1;case i.INCREMENT:return t+1;default:return t}},ue={rootJourney:[Y]},me=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,e=arguments.length>1?arguments[1]:void 0;switch(console.log("in journeyReducer with action.type",e.type),e.type){case i.SET_JOURNEY:return console.log("in journeyReducer with payload",e.payload),Object(w.a)(Object(w.a)({},t),e.payload);default:return t}},he=Object(m.combineReducers)({counter:le,journey:me}),de=Object(m.createStore)(he,Object(h.composeWithDevTools)(Object(m.applyMiddleware)(d.a))),fe=function(t){return console.log("public: ","/XIVSim"),r.a.createElement(l.a,{store:de},r.a.createElement(u.a,null,r.a.createElement(ce,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(fe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},96:function(t,e,a){t.exports=a(112)}},[[96,1,2]]]);
//# sourceMappingURL=main.a9f0f0ac.chunk.js.map