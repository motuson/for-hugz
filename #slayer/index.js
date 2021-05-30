/* SCRIPT BY BERNKASTEL */

//change GLOBAL_LATENCY to your lowest usual ping
const GLOBAL_LATENCY = 125;


//DONT TOUCH ANYTHING UNDER HERE =============================
const JOB_SLAYER = 2;

//Slayer skills

const S_KDS = 67129964;
const S_KDS_D = 3080;

const S_WW = 67139964;
const S_WW_D = 3100;

const S_Roll = 67149064;
const S_Roll2 = 67149094;
const S_Roll_D = 880;

const S_Dash = 67159164;
const S_Dash_D = 710;

const S_Shout = 67179064;
const S_Shout_D = 715;

const S_OHS = 67189764; //chains from HT, KDS, WW, EVI, SB, Kick, Leaping
const S_OHS2 = 67189794;
const S_OHS_D = 3350;

const S_UOHS = 67358964; //starts with OHS ID
const S_UOHS2 = 67358994;
const S_UOHS_D = 3350;

const S_LEAP = 67199664;
const S_LEAP_D = 2160;
const S_LEAP_DIST = 100;

const S_HT = 67229364; //has SK glyph for fast HT x1.25
const S_HT_D = 2300;

const S_SB = 67239564;
const S_SB_D = 2100;

const S_KICK = 67259764; //has self glyph x1.25
const S_KICK_D = 1500;

const S_FURY = 67269264;
const S_FURY_D = 980;

const S_OP = 67289064;
const S_OP_D = 210;

const S_TENA = 67299164;
const S_TENA_D1 = 490;
const S_TENA_D2 = 720;

const S_ICB = 67309064; //unlocks UOHS
const S_ICB_D = 1180;

const S_ELBOW = 67318964;
const S_ELBOW_D = 1150;

const S_MS = 67339064; //chains from OHS, EVI
const S_MS2 = 67339094;
const S_MS_D = 3650;

const S_EVI = 67348964; //chains from same as OHS
const S_EVI2 = 67348994;
const S_EVI_D = 1910;

const S_RETAL = 67209864;
const S_RETAL_D = 1630;

const S_P = 67120064;
const S_P2 = 67120065;
const S_P3 = 67120066;
const S_P4 = 67120067;
const S_P_D = 845;
const S_P2_D = 1030;
const S_P3_D = 760;
const S_P4_D = 1650;

const S_DB1 = 67249664;
const S_DB2 = 67249665;
const S_DB3 = 67249666;
const S_DB1_D = 600;
const S_DB2_D = 595;
const S_DB3_D = 1540;


const SKILL_CHARGING = 67279264;
const SKILL_CHARGING_DISTANCE = 494;
const SKILL_CHARGING_DURATION = 990;

module.exports = function slayer(dispatch) {
  let cid;
  let job;
  let model;
  let enabled = false;
  let aspd;
  
  let atkid = [];
  let atkid_base = 0xFEFEFFEE;
  
  let disabSkill = [];
  let startTime = [];
  let timer = [];
  let finishcheck = [];
  let finish = [];
  let backstabActive = false;
  
  let ICBActive = false;
  let kickHTActive = false;
  let furyWWActive = false;
  let msgSuppress;
  
  let punchCounter = 0;
  let clearPunchCounter;
  
  let glyphState = [];
  
  let timer2;
  
  let lastSkillTime = [];		
  let lastSkillDelay;	
  let lastLastSkill;  
  let lastLastSkillDelay;		
  let lastSkillStart;		
  let lastSkillEvent;		
  let RecheckTimer;
  
  let xloc;
  let yloc;
  let zloc;
  let wloc;
  let timeloc;
  
  let lastSkill = 0;
  let lastEvent = {skill: undefined};
  let lastEventTime;
  let GLOBAL_LOCK_DELAY = 250;
  
  var atkArr;

  dispatch.hook('sLogin', 1, (event) => {
    ({cid, model} = event);

    job = (model - 10101) % 100;
    enabled = [JOB_SLAYER].includes(job);
  });
  
  function fakeDB(event, duration){
		if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
		}
		if(finish[lastSkill] == false){
			force_end(lastEvent, 4);
		}
		finish[SKILL_CHARGING] = true;
	clearTimeout(finishcheck[event.skill]);	
	finish[event.skill] = false;
	var d = new Date();		
				lastSkillStart = d.getTime();		
				lastLastSkillDelay = lastSkillDelay;
	  atkid[event.skill] = atkid_base;
	  atkid_base--;
	  
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x,
			y: event.y,
			z: event.z,
			w: event.w,
			model: model,
			skill: event.skill,
			stage: 0,
			speed: aspd,
			id: atkid[event.skill],
			unk: 1.0,
			unk1: 0,
			toX: 0,
			toY: 0,
			toZ: 0,
			unk2: 0,
			unk3: 0,
			movement: [],
		});
		lastSkillDelay = duration / aspd;
			setTimeout(function(){
		lastSkillEvent = {		
						source: cid,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 0,
						id: atkid[event.skill],		
						};
			}, duration/ aspd, event);
		finishcheck[event.skill] = setTimeout(function(event){finish[event.skill] = true;},(duration / aspd),event);
		timer[event.skill] = setTimeout(
			function(event){
						dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 0,
						id: atkid[event.skill],
						});
				}, duration / aspd, event);
  }
	
	  function charge(event){
		  finish[SKILL_CHARGING] = true;
	  if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
	  }
	  clearTimeout(finishcheck[event.skill]);
	  finish[event.skill] = false;
	  var d = new Date();		
				lastSkillStart = d.getTime();		
				lastLastSkillDelay = lastSkillDelay;
	  atkid[event.skill] = atkid_base;
	  atkid_base--;
	  setTimeout(function(){
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: event.skill,
			stage: 0,
			speed: 1,
			id: atkid[event.skill],
			unk: 1.0,
			unk1: 0,
			toX: 0,
			toY: 0,
			toZ: 0,
			unk2: 0,
			unk3: 0,
			movement: [],
		});
		dispatch.toClient('sInstantDash', 1, {
			source: cid,
			unk1: 0,
			unk2: 0,
			unk3: 0,
			x: event.x2,
			y: event.y2,
			z: event.z2,
			w: event.w,
		});
	  }, 0);
		var zzzz = Math.pow((Math.pow((event.x1 - event.x2),2)+Math.pow((event.y1 - event.y2),2)),0.5) / SKILL_CHARGING_DISTANCE * SKILL_CHARGING_DURATION;
		lastSkillDelay = zzzz;
		setTimeout(function(){
		lastSkillEvent = {
						source: cid,
						x: event.x2,
						y: event.y2,
						z: event.z2,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 39,
						id: atkid[event.skill],
						};
		}, zzzz, event);
		timer[event.skill] = setTimeout(function(event){
			if(lastSkill == SKILL_CHARGING){
			dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x2,
						y: event.y2,
						z: event.z2,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 39,
						id: atkid[event.skill],
						});
			finish[event.skill] = true;
		}}, zzzz, event);
	}
	
	
	function force_end(event, unkz){
		dispatch.toClient('sActionEnd', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: event.skill,
			type: unkz, //0x02
			id: atkid[event.skill],
		});
	}
	
	function force_endchain(event, unkz){
		var skillC = event.skill + 30;
		dispatch.toClient('sActionEnd', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: skillC,
			type: unkz, //0x02
			id: atkid[skillC],
		});
	}
	
	
    function fakeEnd_sorc_dist(event, duration, dist){
		if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
		}
		xloc = false;
		if(event.skill == S_OHS && ICBActive == true){
			event.skill = 67358964;
		}
		if(lastEvent != 'undefined' && lastEvent.skill == S_OHS && ICBActive == true){
			lastEvent.skill = 67358964;
		}
		var yyy = 1;
		if(event.skill == S_KICK && glyphState[23060] == 1){
			yyy = 1.25;
		}
		if(event.skill == S_HT && kickHTActive == true){
			yyy = 1.25;
			kickHTActive = false;
		}
		if(event.skill == S_WW && furyWWActive == true){
			yyy = 1.25;
			furyWWActive = false;
		}
		var zzz = 0;
		if((event.skill == S_OHS || event.skill == S_UOHS) && (lastSkill == S_DB3 || lastSkill == S_FURY || lastSkill == S_HT || lastSkill == S_KDS || lastSkill == S_WW || lastSkill == S_EVI || lastSkill == S_SB || lastSkill == S_KICK || lastSkill == S_LEAP || lastSkill == S_P4) && finish[lastSkill] == false){
			var zzz = 30;
			duration = 1300;
			force_endchain(lastEvent, 4);
			finish[lastSkill] = true;
			clearTimeout(timer2);
			disabSkill[S_MS] = false;
		}
		if(event.skill == S_EVI && (lastSkill == S_OHS || lastSkill == S_UOHS || lastSkill == S_HT || lastSkill == S_KDS || lastSkill == S_WW || lastSkill == S_SB || lastSkill == S_KICK || lastSkill == S_LEAP || lastSkill == S_P4) && finish[lastSkill] == false){
			var zzz = 30;
			duration = 1500;
			force_endchain(lastEvent, 4);
			finish[lastSkill] = true;
			clearTimeout(timer2);
			disabSkill[S_MS] = false;
		}
		if(event.skill == S_MS && (lastSkill == S_OHS || lastSkill == S_UOHS || lastSkill == S_EVI) && finish[lastSkill] == false){
			var zzz = 30;
			duration = 1660;
			force_endchain(lastEvent, 4);
			finish[lastSkill] = true;
			clearTimeout(timer2);
		}
		if(event.skill == S_KDS && (lastSkill == S_DB1 || lastSkill == S_DB2 || lastSkill == S_DB3) && finish[lastSkill] == false){
			var zzz = 30;
			duration = 2380;
			force_endchain(lastEvent, 4);
			finish[lastSkill] = true;
			clearTimeout(timer2);
		}
		if(finish[lastSkill] == false && zzz == 0){
			force_end(lastEvent, 4);
			finish[lastSkill] = true;
		}
		if(event.skill == S_ICB || event.skill == S_OP || event.skill == S_Shout || event.skill == S_TENA || event.skill == S_Dash){
			yyy = 1/aspd;
		}
		finish[SKILL_CHARGING] = true;
	clearTimeout(finishcheck[event.skill]);	
	finish[event.skill] = false;
	var d = new Date();		
				lastSkillStart = d.getTime();		
				lastLastSkillDelay = lastSkillDelay;
	  atkid[event.skill + zzz] = atkid_base;
	  atkid_base--;
	  
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: event.skill + zzz,
			stage: 0,
			speed: aspd * yyy,
			id: atkid[event.skill + zzz],
			unk: 1.0,
			unk1: 0,
			toX: 0,
			toY: 0,
			toZ: 0,
			unk2: 0,
			unk3: 0,
			movement: [],
		});
		
		var newX;
		var newY;
		var angle = parseFloat(event.w);
		angle = angle / 10000;
		angle = angle / 1.043;
		var vvv = 66772;
		newX = Math.cos(angle) * dist;
		newY = Math.sin(angle) * dist;
		lastSkillDelay = duration / aspd;
		setTimeout(function(){
			if((event.skill == S_ICB || event.skill == S_TENA) && xloc != false){
					event.x1 = xloc;
					event.y1 = yloc;
					event.z1 = zloc;
					event.w = wloc;
				}
		lastSkillEvent = {
						source: cid,
						x: event.x1 + newX,
						y: event.y1 + newY,
						z: event.z1 + 2,
						w: event.w,
						model: model,
						skill: event.skill + zzz,
						type: 0,
						id: atkid[event.skill + zzz],
						};
		}, duration / (aspd * yyy), event);
		finishcheck[event.skill] = setTimeout(function(event){finish[event.skill] = true;},(duration / aspd),event);
		timer[event.skill] = setTimeout(
			function(event){
				if((event.skill == S_ICB || event.skill == S_TENA) && xloc != false){
					event.x1 = xloc;
					event.y1 = yloc;
					event.z1 = zloc;
					event.w = wloc;
				}
						dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x1 + newX,
						y: event.y1 + newY,
						z: event.z1 + 2,
						w: event.w,
						model: model,
						skill: event.skill + zzz,
						type: 0,
						id: atkid[event.skill + zzz],
						});
				}, duration / (aspd * yyy), event);
  }
  
  
  dispatch.hook('sCrestInfo', 1, (event) => {
	if(!enabled){return};
	event.glyphs.forEach(function(element){
		glyphState[element.id] = element.enabled;
	});
});

dispatch.hook('sSystemMessage', 1, (event) => {
	if(!enabled){return};
	if((event.message == '@2059' || event.message == '@36') && msgSuppress == event.message){
		return false;
	}
	msgSuppress = event.message;	
});

dispatch.hook('sShowDeadUi', 1, (event) => {
	if(!enabled){return};
	ICBActive = false;
});

dispatch.hook('sCrestApply', 1, (event) => {
	if(!enabled){return};
	glyphState[event.id] = event.enabled;
});
  
  dispatch.hook('cStartTargetedSkill', 1, (event) => {
	  if(!enabled) return;
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(!disabSkill[event.skill]){
		  lastSkillDelay = 999999;
		  setTimeout(function(){dispatch.toServer('cStartTargetedSkill', 1, event);},25);
		  setTimeout(function(){dispatch.toServer('cStartTargetedSkill', 1, event);},50);
		  setTimeout(function(){dispatch.toServer('cStartTargetedSkill', 1, event);},75);
		  setTimeout(function(){dispatch.toServer('cStartTargetedSkill', 1, event);},100);
		  if(job == JOB_SLAYER && event.skill != S_P){
			  punchCounter = 0;
	  }
  if(job == JOB_SLAYER && event.skill == SKILL_CHARGING){
		  charge(event);
		  aspd = aspd + 0.6;
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_CHARGING] = false;}, GLOBAL_LOCK_DELAY);
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	    lastEvent = event;
	  }
  });
  
  dispatch.hook('sInstantDash', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
		return false;
	  }
  });
  
  dispatch.hook('cStartComboInstantSkill', 1, (event) => {
	  if(!enabled) return;
	  
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(!disabSkill[event.skill]){
		  lastSkillDelay = 999999;
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},25);
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},50);
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},75);
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},100);
		  if(job == JOB_SLAYER && event.skill != S_P){
			  punchCounter = 0;
	  }
		  if(job == JOB_SLAYER && event.skill == S_DB1){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_DB1] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_DB1_D);
	  }
	  if(job == JOB_SLAYER && event.skill == S_DB2){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_DB2] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_DB2_D);
	  }
	  if(job == JOB_SLAYER && event.skill == S_DB3){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_DB3] = false;}, GLOBAL_LOCK_DELAY * 2);
		  disabSkill[S_MS] = true;
		  setTimeout(function(){disabSkill[S_MS] = false;}, S_DB3_D / aspd);
		  disabSkill[S_EVI] = true;
		  setTimeout(function(){disabSkill[S_EVI] = false;}, S_DB3_D / aspd);
		  fakeDB(event, S_DB3_D);
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
	  
  });
  
  dispatch.hook('cStartInstanceSkill', 1, (event) => {
	  if(!enabled) return;
	  
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(!disabSkill[event.skill]){
		  lastSkillDelay = 999999;
		  setTimeout(function(){dispatch.toServer('cStartInstanceSkill', 1, event);},25);
		  setTimeout(function(){dispatch.toServer('cStartInstanceSkill', 1, event);},50);
		  setTimeout(function(){dispatch.toServer('cStartInstanceSkill', 1, event);},75);
		  setTimeout(function(){dispatch.toServer('cStartInstanceSkill', 1, event);},100);
		  if(job == JOB_SLAYER && event.skill != S_P){
			  punchCounter = 0;
	  }
		if(job == JOB_SLAYER && event.skill == S_ELBOW){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_ELBOW] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_ELBOW_D);
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
  });
		  
  
  dispatch.hook('cStartSkill', 1, (event) => {
	  if(!enabled) return;
	  lastSkillDelay = 999999;
	  if(event.skill == S_KDS && (lastSkill != 0 && finish[lastSkill] == false && lastSkill != S_DB1 && lastSkill != S_DB2 && lastSkill != S_DB3)){
		  return;
	  }
	  
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(!disabSkill[event.skill] && (finish[SKILL_CHARGING] != false || event.skill == S_KDS || event.skill == S_Roll)){
		  msgSuppress = 0;
		  if(event.skill.toString()[0] == '6' && (event.skill.toString()[6] == '9' || event.skill.toString()[6] == '6') && event.skill != S_RETAL){
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},25);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},50);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},75);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},100);
		  }
	  if(job == JOB_SLAYER && event.skill != S_P){
			  punchCounter = 0;
	  }
	  if (job == JOB_SLAYER && event.skill == S_P) {
		  if(punchCounter == 0){
			  event.skill = S_P;
		  }
		  if(punchCounter == 1){
			  event.skill = S_P2;
		  }
		  if(punchCounter == 2){
			  event.skill = S_P3;
		  }
		  if(punchCounter == 3){
			  event.skill = S_P4;
		  }
	  }
	  
	  if(job == JOB_SLAYER && event.skill == S_P){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_P] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_P_D);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, S_P_D);
		  disabSkill[S_EVI] = true;
		  var timer3 = setTimeout(function(){disabSkill[S_EVI] = false;}, S_P_D / aspd);
	  }
	  
	  if(job == JOB_SLAYER && event.skill == S_P2){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_P2] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_P2_D);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, S_P2_D);
		  disabSkill[S_EVI] = true;
		  var timer3 = setTimeout(function(){disabSkill[S_EVI] = false;}, S_P2_D / aspd);
	  }
	  if(job == JOB_SLAYER && event.skill == S_P3){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_P3] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_P3_D);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, S_P3_D);
		  disabSkill[S_EVI] = true;
		  var timer3 = setTimeout(function(){disabSkill[S_EVI] = false;}, S_P3_D / aspd);
	  }
	  if(job == JOB_SLAYER && event.skill == S_P4){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_P4] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_P4_D);
		  clearTimeout(clearPunchCounter);
		  punchCounter = 0;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, S_P4_D);
	  }
	  
	  if(job == JOB_SLAYER && event.skill == S_KDS){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_KDS] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_KDS_D / aspd);
		  fakeEnd_sorc_dist(event, S_KDS_D, 100);
	  }
	  if(job == JOB_SLAYER && event.skill == S_WW){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_WW] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_WW_D / aspd);
		  fakeEnd_sorc_dist(event, S_WW_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_Roll){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_Roll] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_OHS] = true;
		  setTimeout(function(){disabSkill[S_OHS] = false;}, S_Roll_D / aspd);
		  disabSkill[S_MS] = true;
		  setTimeout(function(){disabSkill[S_MS] = false;}, S_Roll_D / aspd);
		  disabSkill[S_EVI] = true;
		  setTimeout(function(){disabSkill[S_EVI] = false;}, S_Roll_D / aspd);
		  disabSkill[S_HT] = true;
		  setTimeout(function(){disabSkill[S_HT] = false;}, S_Roll_D / aspd);
		  fakeEnd_sorc_dist(event, S_Roll_D, 150);
	  }
	  if(job == JOB_SLAYER && event.skill == S_Dash){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_Dash] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_Dash_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_Shout){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_Shout] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_Shout_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_OHS && finish[S_OHS] != false && finish[S_UOHS] != false){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_OHS] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_OHS_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_LEAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_LEAP] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_LEAP_D / aspd);
		  fakeEnd_sorc_dist(event, S_LEAP_D, S_LEAP_DIST);
	  }
	  if(job == JOB_SLAYER && event.skill == S_HT){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_HT] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_HT_D / aspd);
		  fakeEnd_sorc_dist(event, S_HT_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_SB){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_SB] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_SB_D / aspd);
		  fakeEnd_sorc_dist(event, S_SB_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_KICK){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_KICK] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  timer2 = setTimeout(function(){disabSkill[S_MS] = false;}, S_KICK_D / aspd);
		  fakeEnd_sorc_dist(event, S_KICK_D, 0);
		  if(glyphState[23076] == 1){
			  kickHTActive = true;
			  setTimeout(function(){kickHTActive = false;}, 10000);
		  }
	  }
	  if(job == JOB_SLAYER && event.skill == S_FURY){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_FURY] = false;}, GLOBAL_LOCK_DELAY);
		  disabSkill[S_MS] = true;
		  setTimeout(function(){disabSkill[S_MS] = false;}, S_FURY_D / aspd);
		  disabSkill[S_EVI] = true;
		  setTimeout(function(){disabSkill[S_EVI] = false;}, S_FURY_D / aspd);
		  fakeEnd_sorc_dist(event, S_FURY_D, 0);
		  if(glyphState[23032] == 1){
			  furyWWActive = true;
			  setTimeout(function(){furyWWActive = false;}, 5000);
		  }
	  }
	  if(job == JOB_SLAYER && event.skill == S_OP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_OP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_OP_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_TENA){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_TENA] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, (S_TENA_D1 + S_TENA_D2), 0);
		  setTimeout(function(event){
			  if(lastSkill == S_TENA){
			  dispatch.toClient('sActionStage', 1, {
				source: cid,
				x: event.x1,
				y: event.y1,
				z: event.z1,
				w: event.w,
				model: model,
				skill: event.skill,
				stage: 1,
				speed: aspd,
				id: atkid[event.skill],
				unk: 1.0,
				unk1: 0,
				toX: 0,
				toY: 0,
				toZ: 0,
				unk2: 0,
				unk3: 0,
				movement: [],
			  });}
		}, S_TENA_D1 / aspd, event);
	  }
	  if(job == JOB_SLAYER && event.skill == S_ICB){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_ICB] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_ICB_D, 0);
		  ICBActive = true;
		  setTimeout(function(){ICBActive = false;},20000);
	  }
	  if(job == JOB_SLAYER && event.skill == S_MS && finish[S_MS] != false){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_MS] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_MS_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_EVI && finish[S_EVI] != false){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_EVI] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_EVI_D, 0);
	  }
	  if(job == JOB_SLAYER && event.skill == S_RETAL){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RETAL] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_RETAL_D, 0);
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
  });

  dispatch.hook('sActionStage', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
	  var d = new Date();		
				lastSkillTime[1] = d.getTime();		
				lastSkillTime[3] = event.skill;
	  if(job == JOB_SLAYER && (event.skill == S_DB1 || event.skill == S_DB2 || event.skill == S_DB3)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_P || event.skill == S_P2 || event.skill == S_P3 || event.skill == S_P4)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_KDS)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_WW)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Roll || event.skill == S_Roll2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Dash)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Shout)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_OHS || event.skill == S_OHS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_UOHS || event.skill == S_UOHS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_LEAP)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_HT)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_SB)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_KICK)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_FURY)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_OP)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_TENA)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_ICB)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_ELBOW)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_MS || event.skill == S_MS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_EVI || event.skill == S_EVI2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_RETAL)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == SKILL_CHARGING)){
		  return false;
	  }
	  }
  });
  
  dispatch.hook('sActionEnd', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
	  var d = new Date();
				lastSkillTime[2] = d.getTime();
			if (((lastSkillTime[2] - lastSkillTime[1]) > lastLastSkillDelay) && (event.skill == lastLastSkill || event.skill == lastLastSkill + 30) && (lastLastSkill == lastSkillTime[3] || lastLastSkill == (lastSkillTime[3] - 30))){
				if(lastSkill != S_OP && lastSkill != S_Roll && lastLastSkill != S_OP){
				clearTimeout(timer[lastSkill]);
				}
				RecheckTimer = setTimeout(function(){
					if(lastSkill == S_OP || lastLastSkill == S_OP || lastSkill == S_Roll){return;}
					/*dispatch.toClient('sActionEnd', 1, lastSkillEvent);*/}, (lastSkillDelay + lastSkillStart - lastSkillTime[1] - lastLastSkillDelay));
			}
	  if(job == JOB_SLAYER && (event.skill == S_DB1 || event.skill == S_DB2 || event.skill == S_DB3)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_P || event.skill == S_P2 || event.skill == S_P3 || event.skill == S_P4)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_KDS)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_WW)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Roll || event.skill == S_Roll2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Dash)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_Shout)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_OHS || event.skill == S_OHS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_UOHS || event.skill == S_UOHS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_LEAP)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_HT)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_SB)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_KICK)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_FURY)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_OP)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_TENA)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_ICB)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_ELBOW)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_MS || event.skill == S_MS2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_EVI || event.skill == S_EVI2)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == S_RETAL)){
		  return false;
	  }
	  if(job == JOB_SLAYER && (event.skill == SKILL_CHARGING)){
		  if(finish[SKILL_CHARGING] == false){
			  dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						model: model,
						skill: event.skill,
						type: event.unk,
						id: atkid[event.skill],
						});
			finish[event.skill] = true;
		  }
		  return false;
	  }
	  }  
  });

  dispatch.hook('sStartCooltimeSkill', 1, (event) => {
	  if(!enabled) return;
	  event.cooldown -= GLOBAL_LATENCY;
	  return true;
  });
  
  
  dispatch.hook('sPlayerStatUpdate', 1, (event) => {
	  if(!enabled) return;
    aspd = (event.bonusAttackSpeed + event.baseAttackSpeed) / event.baseAttackSpeed;
  });
  
  dispatch.hook('cPlayerLocation', 1, (event) =>{
	  if(!enabled) return;
	xloc = event.x2;
	yloc = event.y2;
	zloc = event.z2;
	wloc = event.w;
	timeloc = event.time + 1;
  });
  
  dispatch.hook('cNotifyLocationInAction', 1, (event) =>{
	  if(!enabled) return;
	  setTimeout(function(event){
			dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		}, 20, event);
	return false;
  });
  dispatch.hook('cNotifyLocationInDash', 1, (event) =>{
	  if(!enabled) return;
	  setTimeout(function(event){
			dispatch.toServer('cNotifyLocationInDash', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		}, 50, event);
	return false;
  });
  dispatch.hook('sActionStage', 1, (event) =>{
	  if(!enabled) return;
	  if (event.source.low != cid.low || event.source.high != cid.high || event.source.unsigned != cid.unsigned) {
            return;
        }
	if(event.skill.toString()[0] == '1' && event.skill.toString()[1] == '3' && event.skill.toString()[7] == '3' && event.skill.toString()[8] == '2'){
		disabSkill[S_RETAL] = true;
	}
  });
  dispatch.hook('sActionEnd', 1, (event) =>{
	  if(!enabled) return;
	  if (event.source.low != cid.low || event.source.high != cid.high || event.source.unsigned != cid.unsigned) {
            return;
        }
	if(event.skill.toString()[0] == '1' && event.skill.toString()[1] == '3' && event.skill.toString()[7] == '3' && event.skill.toString()[8] == '2'){
		disabSkill[S_RETAL] = false;
	}
  });
};