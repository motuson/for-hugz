/* SCRIPT BY BERNKASTEL */

const GLOBAL_LATENCY = 140; //change GLOBAL_LATENCY to your lowest usual ping

const JOB_BRAWLER = 10;

// Brawler Skills
const SKILL_HAYMAKER = 67169965;
const SKILL_HAYMAKER_2 = 67169994;
const SKILL_HAYMAKER_3 = 67169966;
const SKILL_HAYMAKER_4 = 67169995;
const SKILL_HAYMAKER_5 = 67169964;
const SKILL_HAYMAKER_DURATION = 2850;
//const SKILL_HAYMAKER_DISTANCE = 158.2;
const SKILL_HAYMAKER_DISTANCE = 0;
const SKILL_HAYMAKER_STAGE_DELAY = 1020;

const SKILL_GROUNDPOUND = 0x0400A028;
const SKILL_GROUNDPOUND_2 = 0x0400A046;
const SKILL_GROUNDPOUND_DURATION = 3223;

const SKILL_PILEDRIVER = 67189965;
const SKILL_PILEDRIVER_2 = 67189994;
const SKILL_PILEDRIVER_3 = 67189966;
const SKILL_PILEDRIVER_4 = 67189995;
const SKILL_PILEDRIVER_5 = 67189964;
const SKILL_PILEDRIVER_DURATION = 1955;
//const SKILL_PILEDRIVER_DISTANCE = 163.5;
const SKILL_PILEDRIVER_DISTANCE = 0;

const SKILL_JACKHAMMER = 67199965;
const SKILL_JACKHAMMER_2 = 67199994;
const SKILL_JACKHAMMER_3 = 67199966;
const SKILL_JACKHAMMER_4 = 67199995;
const SKILL_JACKHAMMER_5 = 67199964;
const SKILL_JACKHAMMER_DURATION = 1536;
const SKILL_JACKHAMMER_DISTANCE = 0;
const SKILL_JACKHAMMER_MIN_DURATION = 500;
const SKILL_JACKHAMMER_LOCKOUT_DELAY = 700;

const SKILL_TAUNT = 67239765;
const SKILL_TAUNT_DURATION = 1900;
const SKILL_ENRAGE = 67248965;
const SKILL_ENRAGE_DURATION = 1680;

const SKILL_FLIPKICK = 0x040272F5;
const SKILL_FLIPKICK_3 = 67269366;
const SKILL_FLIPKICK_2 = 0x04027312;
const SKILL_FLIPKICK_DURATION = 2066;

const SKILL_COUNTER = 0x040052DA;
const SKILL_COUNTER_DURATION = 792;
const SKILL_COUNTER_PUNCH = 0x040189C0;
const SKILL_COUNTER_PUNCH_2 = 67209694;
const SKILL_COUNTER_PUNCH_DURATION = 1860;
const SKILL_COUNTER_PUNCH_ABNORMALITY = 0x009AEC28;
const SKILL_COUNTER_PUNCH_AVAILABLE_DURATION = 6000;

const SKILL_ROUNDHOUSE_KICK = 0x040115BC;
const SKILL_ROUNDHOUSE_KICK_2 = 0x040115DA;
const SKILL_ROUNDHOUSE_KICK_DURATION = 846;
const SKILL_ROUNDHOUSE_KICK_LOCKOUT_DURATION = 400;

const SKILL_BULLRUSH = 0x0400C6D4;
const SKILL_RAMPAGE = 67279874;

const SKILL_QUICK_DASH = 0x04061AE4;
const SKILL_QUICK_DASH_DURATION = 620;
const SKILL_QUICK_DASH_DISTANCE = 150;

const SKILL_PUNCH = 67120064;
const SKILL_PUNCH_DURATION = 1560;
const SKILL_PUNCH_DISTANCE = 70;
const SKILL_PUNCH_CLEAR_TIME = 500;

const SKILL_PUNCH2 = 67120065;
const SKILL_PUNCH2_DURATION = 1270;

const SKILL_PUNCH3 = 67120066;
const SKILL_PUNCH3_DURATION = 930;

const SKILL_PUNCH4 = 67120067;
const SKILL_PUNCH4_DURATION = 1725;

const SKILL_PUNCH_CHAIN_1 = 67130065;
const SKILL_PUNCH_CHAIN_START = 67130076;
const SKILL_PUNCH_CHAIN_START_2 = 67130074;
const SKILL_PUNCH_CHAIN_START_3 = 67130075;
const SKILL_PUNCH_CHAIN_1_DURATION = 1190;
const SKILL_PUNCH_CHAIN_1_DISTANCE = 90;

const SKILL_PUNCH_CHAIN_2 = 67130066;
const SKILL_PUNCH_CHAIN_2_DURATION = 1795;
const SKILL_PUNCH_CHAIN_3 = 67130067;
const SKILL_PUNCH_CHAIN_3_DURATION = 1940;
const SKILL_PUNCH_CHAIN_4 = 67130068;
const SKILL_PUNCH_CHAIN_4_DURATION = 1980;

const SKILL_DIVINE_WRATH = 0x040075F8;
const SKILL_DIVINE_WRATH_CANCEL_DELAY = 0;

const SKILL_RETALIATE = 67229864;
const SKILL_RETALIATE_DURATION = 1000;
const SKILL_HIGHKICK = 67259764;
const SKILL_GROWING_FURY = 67288965;
const SKILL_GROWING_FURY_DURATION = 1350;

const GLOBAL_LOCK_DELAY = 800;

module.exports = function brawler(dispatch) {
  let cid;
  let job;
  let model;
  let player;
  let enabled = false;
  let aspd;
  let HMDis;
  let actionStageLast;
  
  let atkid = [];
  let atkid_base = 0xFEFEFFEE;
  
  let disabSkill = [];
  let startTime = [];
  let timer = [];
  let skillActive = false;
  let skillSpeed;
  let lastPunch = SKILL_PUNCH_CHAIN_1;
  
  let desyncToggle = true;
  let Ignore1 = false;
  
  let hayPart2Timer;
  let counterTimer;
  let bullrushActive = false;
  let bRBuff = false;
  
  let lastBlockActive;
  let blockActive;
  let counterAvailable;
  
  let xloc;
  let yloc;
  let zloc;
  let wloc;
  let timeloc;
  let lastLastEvent;
  let lastLastSkill;
  
  let punchCounter = 0;
  let clearPunchCounter;
  
  let collisionLocX;		
  let collisionLocY;		
  let collisionLocZ;
  let collisionLocW;
  
  let lastSkill;
  let lastEvent;
  let lastEventTime;
  let GLOBAL_LOCK_DELAY = 500;
  
  var atkArr;

  dispatch.hook('sLogin', 1, (event) => {
    ({cid, model} = event);
	player = event.name;
    job = (model - 10101) % 100;
    enabled = [JOB_BRAWLER].includes(job);
  });
  
  function toggle(message){
	dispatch.toClient('sWhisper', 1, {
				player: cid,
				unk1: 0,
				gm: 0,
				unk2: 0,
				author: 'Script',
				recipient: player,
				message: message,
			});	
}
  
  function fakeEnd_sorc(event, duration){
	  xloc = false;
	  yloc = false;
	  zloc = false;
	  wloc = false;
	  if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
	  }
	  if(lastSkill == SKILL_PUNCH_CHAIN_START){
		  clearTimeout(timer[lastPunch]);
	  }
	  
	  var aaa = 1;
	  if(event.skill == SKILL_TAUNT){
		  aaa = 1 / aspd;
	  }
	  
	  atkid[event.skill] = atkid_base;
	  atkid_base--;
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: event.skill,
			stage: 0,
			speed: aspd * aaa,
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
		timer[event.skill] = setTimeout(
			function(event){
				skillActive = false;
				if(lastSkill == SKILL_BULLRUSH){return false;}
				if(event.skill != lastSkill){return false;}
						dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: xloc || event.x1,
						y: yloc || event.y1,
						z: zloc || event.z1,
						w: wloc || event.w,
						model: model,
						skill: event.skill,
						type: 0,
						id: atkid[event.skill],
						});
				}, duration / (aspd * aaa), event);
	}
	
	
	function force_end(event, unkz){
		skillActive = false;
		dispatch.toClient('sActionEnd', 1, {
			source: cid,
			x: event.x || event.x1,
			y: event.y || event.y1,
			z: event.z || event.z1,
			w: event.w,
			model: model,
			skill: event.skill,
			type: unkz, //0x02
			id: atkid[event.skill],
		});
	}
	
	
  
    function fakeEnd_sorc_dist(event, duration, dist){
		if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
		}
		skillSpeed = aspd;
		zzz = 1;
		if(event.skill == SKILL_JACKHAMMER) skillSpeed = 1;
		if(event.skill == SKILL_QUICK_DASH) skillSpeed = 1;
		if (event.skill == SKILL_JACKHAMMER || event.skill == SKILL_QUICK_DASH){
			zzz = aspd;
		}
	  atkid[event.skill] = atkid_base;
	  atkid_base--;
		
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: event.skill,
			stage: 0,
			speed: skillSpeed,
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
		
		var newX;
		var newY;
		var angle = parseFloat(event.w);
		angle = angle / 10000;
		angle = angle / 1.043;
		
		var vvv = 6744;
		
		newX = Math.cos(angle) * dist;
		newY = Math.sin(angle) * dist;
		
		timer[event.skill] = setTimeout(
			function(event){
				skillActive = false;
				if(event.skill != lastSkill && event.skill != SKILL_GROWING_FURY){return;}
				if(lastSkill == SKILL_BULLRUSH){return false;}
						dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x1 + newX,
						y: event.y1 + newY,
						z: event.z1 + 2,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 0,
						id: atkid[event.skill],
						});
				}, duration / aspd * zzz, event);
  }
  
  function fakeEnd_sorc_punch(event, duration, dist, skillx){
		if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
		}
		skillSpeed = aspd;
		zzz = 1;
	  atkid[skillx] = atkid_base;
	  atkid_base--;
	  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x1,
			y: event.y1,
			z: event.z1,
			w: event.w,
			model: model,
			skill: skillx,
			stage: 0,
			speed: skillSpeed,
			id: atkid[skillx],
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
		
		newX = Math.cos(angle) * dist;
		newY = Math.sin(angle) * dist;
		
		timer[skillx] = setTimeout(
			function(event){
				skillActive = false;
				if(lastSkill == 1){return;}
				if(lastSkill == SKILL_PUNCH_CHAIN_1 || lastSkill == SKILL_PUNCH_CHAIN_2 || lastSkill == SKILL_PUNCH_CHAIN_3 || lastSkill == SKILL_PUNCH_CHAIN_4 || lastSkill == SKILL_PUNCH_CHAIN_START || lastSkill == SKILL_PUNCH_CHAIN_START_2 || lastSkill == SKILL_PUNCH_CHAIN_START_3){
						dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x1 + newX,
						y: event.y1 + newY,
						z: event.z1 + 2,
						w: event.w,
						model: model,
						skill: skillx,
						type: 0,
						id: atkid[skillx],
				});}
				}, duration / aspd * zzz, event);
  }
  
  
    dispatch.hook('sAbnormalityBegin', 1, (event) =>{
	  if(!enabled) return;
		if(event.target.low != cid.low || event.target.high != cid.high || event.target.unsigned != cid.unsigned){
			return;
		}
	  if(job == JOB_BRAWLER && event.id == SKILL_COUNTER_PUNCH_ABNORMALITY){
		  clearTimeout(counterTimer);
		  counterAvailable = true;
	  }
  });
  
  dispatch.hook('S_EACH_SKILL_RESULT', 1, (event) => {
		if(event.target.low == cid.low && event.target.high == cid.high && event.target.unsigned == cid.unsigned){
			if(event.setTargetAction != 0){
				//lastSkill = 1;
			}
		}
	});
  
  dispatch.hook('sAbnormalityEnd', 1, (event) =>{
	  if(!enabled) return;
	  if(event.target.low != cid.low || event.target.high != cid.high || event.target.unsigned != cid.unsigned){
		return;
	}
	if(event.id == 10153090){
		if(lastSkill == SKILL_BULLRUSH){
			  bRBuff = false;
		dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: collisionLocX,
						y: collisionLocY,
						z: collisionLocZ,
						w: collisionLocW,
						model: model,
						skill: SKILL_BULLRUSH,
						type: 0,
						id: atkid[SKILL_BULLRUSH],
		});
		  }
	}
	if(job == JOB_BRAWLER && event.id == SKILL_COUNTER_PUNCH_ABNORMALITY){
		counterAvailable = false;
	}
  });
   
  dispatch.hook('cPressSkill', 1, (event) => {
	  if(!enabled) return;
	  if(event.start == 1){punchCounter = 0;}
	  if (event.skill == SKILL_COUNTER){
		  lastBlockActive = blockActive;
		  blockActive = event.start;
	  }
	  
	  if(lastSkill == SKILL_BULLRUSH && event.skill != SKILL_BULLRUSH && event.start == 1){
		  bRBuff = false;
		  dispatch.toClient('sAbnormalityEnd', 1, {
			target: cid,
			id: 10153090,
		});
		dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						model: model,
						skill: SKILL_BULLRUSH,
						type: 0,
						id: atkid[SKILL_BULLRUSH],
		});
		  }
	  if(job == JOB_BRAWLER && event.skill == SKILL_COUNTER && event.start == 0){
		  if(lastSkill == SKILL_COUNTER){
		  dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						model: model,
						skill: event.skill,
						type: 51,
						id: atkid[event.skill],
						});
		  }
	  }
	  if(job == JOB_BRAWLER && event.skill == SKILL_COUNTER && event.start == 1){
		  if(hayPart2Timer) clearTimeout(hayPart2Timer);
		  if(skillActive) force_end(lastEvent, 4);
		  if(lastSkill != SKILL_PUNCH && lastSkill != SKILL_PUNCH2 && lastSkill != SKILL_PUNCH3 && lastSkill != SKILL_PUNCH4 || 1 == 1){
			  if(timer[lastSkill]){
		  clearTimeout(timer[lastSkill]);
		}
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
	  }
	  }
	  
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_BULLRUSH && event.start == 1){
		  if(timer[lastSkill]) clearTimeout(timer[lastSkill]);
		  if(hayPart2Timer) clearTimeout(hayPart2Timer);
		  if(skillActive) force_end(lastEvent, 6);
		  skillActive = true;
		  atkid[event.skill] = atkid_base;
			atkid_base--;
			bRBuff = true;
		  dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: event.x,
			y: event.y,
			z: event.z,
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
			movement: [{ duration: 2950, speed: 1, unk: 1, distance: 340, }],
		});
		setTimeout(function(event){
			if(lastSkill == SKILL_BULLRUSH && bRBuff == true){
			dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: collisionLocX || event.x,
			y: collisionLocY || event.y,
			z: collisionLocZ || event.z,
			w: collisionLocW || event.w,
			model: model,
			skill: event.skill,
			stage: 1,
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
		});}}, 2950, event);
		setTimeout(function(event){
		if(lastSkill == SKILL_BULLRUSH && bRBuff == true){
			bRBuff = false;
			dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: collisionLocX || event.x,
						y: collisionLocY || event.y,
						z: collisionLocZ || event.z,
						w: collisionLocW || event.w,
						model: model,
						skill: event.skill,
						type: 0,
						id: atkid[event.skill],
		});
		  dispatch.toClient('sAbnormalityEnd', 1, {
			target: cid,
			id: 10153090,
		});}}, 3600, event);
	  }
	if(lastSkill != event.skill && event.start == 1){
	  	lastSkill = event.skill;
	    lastEvent = event;
	}
  });
  
  dispatch.hook('sCrestMessage', 1, (event) => {
	if(job != JOB_BRAWLER){return};
	if(event.type == 6){
		clearTimeout(HMDis);
		disabSkill[SKILL_HAYMAKER] = false;
	}
});

dispatch.hook('cChat', 1, (event) => {
	return;
	if(event.message.includes("desync1")){
		if(desyncToggle == false){
			desyncToggle = true;
			}
			else{
			desyncToggle = false;
			}
		var msg = "Desync toggle is "+desyncToggle+".";
		toggle(msg);	
		return false;
	}
});

dispatch.hook('sStartCooltimeSkill', 1, (event) => {
	  if(job != JOB_BRAWLER){return};
	  if(event.skill == SKILL_HAYMAKER){
		  disabSkill[event.skill] = true;
		  HMDis = setTimeout(function(){disabSkill[SKILL_HAYMAKER] = false;}, SKILL_HAYMAKER_DURATION / aspd);
	  }
});

dispatch.hook('cStartTargetedSkill', 1, (event) => {
	  if(!enabled) return;
	  if(event.skill == (SKILL_RAMPAGE - 10)){
		  bRBuff = false;
		  force_end(lastEvent, 4);
		  //lastSkill = 1;
	  }
});
  
  dispatch.hook('cStartSkill', 1, (event) => {
	  if(!enabled) return;
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(event.skill == SKILL_RAMPAGE){
		  //lastSkill = 1;
	  }
	  if(event.skill != SKILL_PUNCH && event.skill != SKILL_PUNCH2 && event.skill != SKILL_PUNCH3 && event.skill != SKILL_PUNCH4 && event.skill != SKILL_PUNCH_CHAIN_START){
		  punchCounter = 0;
	  }
	  if(!disabSkill[event.skill] /*&& bullrushActive == false */){
		  if(lastSkill == SKILL_BULLRUSH && event.skill != SKILL_COUNTER_PUNCH && event.skill != SKILL_HIGHKICK && event.skill != SKILL_GROWING_FURY){
			  bRBuff = false;
		  dispatch.toClient('sAbnormalityEnd', 1, {
			target: cid,
			id: 10153090,
		});
		dispatch.toClient('sActionEnd', 1, {
						source: cid,
						x: event.x1,
						y: event.y1,
						z: event.z1,
						w: event.w,
						model: model,
						skill: SKILL_BULLRUSH,
						type: 0,
						id: atkid[SKILL_BULLRUSH],
		});
		  }
				clearTimeout(hayPart2Timer);
	  if(job == JOB_BRAWLER && (event.skill == SKILL_HAYMAKER || event.skill == SKILL_HAYMAKER_3 || event.skill == SKILL_HAYMAKER_2 || event.skill == SKILL_HAYMAKER_4 || event.skill == SKILL_HAYMAKER_5)){
		  event.skill = SKILL_HAYMAKER;
		  disabSkill[event.skill] = true;
		  if(skillActive && lastSkill != SKILL_HAYMAKER) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc_dist(event, SKILL_HAYMAKER_DURATION, SKILL_HAYMAKER_DISTANCE);
		  
		  hayPart2Timer = setTimeout(function(event){
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
			  });
			  
		}, SKILL_HAYMAKER_STAGE_DELAY / aspd, event);
	  }

	  if(job == JOB_BRAWLER && event.skill == SKILL_GROUNDPOUND){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_GROUNDPOUND] = false;}, GLOBAL_LOCK_DELAY * 0.7);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_GROUNDPOUND_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_TAUNT){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_TAUNT] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_TAUNT_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_ENRAGE){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_ENRAGE] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_ENRAGE_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_RETALIATE){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_RETALIATE] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc(event, SKILL_RETALIATE_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_COUNTER_PUNCH && counterAvailable){
		  var timer = setTimeout(function(){disabSkill[SKILL_COUNTER_PUNCH] = false;}, GLOBAL_LOCK_DELAY);
			clearTimeout(counterTimer);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_COUNTER_PUNCH_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PILEDRIVER || event.skill == SKILL_PILEDRIVER_3 || event.skill == SKILL_PILEDRIVER_5)){
		  event.skill = SKILL_PILEDRIVER;
		  if(disabSkill[SKILL_PILEDRIVER] != true){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PILEDRIVER] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc_dist(event, SKILL_PILEDRIVER_DURATION, SKILL_PILEDRIVER_DISTANCE);}
	  }
	  	  	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_JACKHAMMER || event.skill == SKILL_JACKHAMMER_3 || event.skill == SKILL_JACKHAMMER_5)){
		  event.skill = SKILL_JACKHAMMER;
		  if(disabSkill[SKILL_JACKHAMMER] != true){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_JACKHAMMER] = false;}, SKILL_JACKHAMMER_LOCKOUT_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc_dist(event, SKILL_JACKHAMMER_DURATION, SKILL_JACKHAMMER_DISTANCE);}
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_FLIPKICK || event.skill == SKILL_FLIPKICK_3)){
		  event.skill = SKILL_FLIPKICK;
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_FLIPKICK] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_FLIPKICK_DURATION);
	  }
	  
	  if (job == JOB_BRAWLER && event.skill == SKILL_PUNCH) {
		  if(punchCounter == 0){
			  event.skill = SKILL_PUNCH;
		  }
		  if(punchCounter == 1){
			  event.skill = SKILL_PUNCH2;
		  }
		  if(punchCounter == 2){
			  event.skill = SKILL_PUNCH3;
		  }
		  if(punchCounter == 3){
			  event.skill = SKILL_PUNCH4;
		  }
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_PUNCH){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PUNCH] = false;}, 100);
		  skillActive = true;
		  dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153061,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153060,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		  fakeEnd_sorc(event, SKILL_PUNCH_DURATION);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, SKILL_PUNCH_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_PUNCH2){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PUNCH2] = false;}, GLOBAL_LOCK_DELAY);
		  skillActive = true;
		  dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153062,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153060,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		  fakeEnd_sorc(event, SKILL_PUNCH2_DURATION);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, SKILL_PUNCH2_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_PUNCH3){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PUNCH3] = false;}, GLOBAL_LOCK_DELAY);
		  skillActive = true;
		  dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153063,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153060,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		  fakeEnd_sorc(event, SKILL_PUNCH3_DURATION);
		  clearTimeout(clearPunchCounter);
		  punchCounter++;
		  clearPunchCounter = setTimeout(function(){punchCounter = 0;}, SKILL_PUNCH3_DURATION);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_PUNCH4){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PUNCH4] = false;}, GLOBAL_LOCK_DELAY);
		  skillActive = true;
		  dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153064,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		dispatch.toClient('sAbnormalityBegin', 1, {
			target: cid,
			source: cid,
			id: 10153060,
			duration: 3000,
			unk: 0,
			stacks: 1,
		});
		  fakeEnd_sorc(event, SKILL_PUNCH4_DURATION);
		  punchCounter = 0;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PUNCH_CHAIN_START || event.skill == SKILL_PUNCH_CHAIN_START_2 || event.skill == SKILL_PUNCH_CHAIN_START_3)){
		  event.skill = SKILL_PUNCH_CHAIN_START;
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_PUNCH_CHAIN_START] = false;}, 100);
		  skillActive = true;
		  if(punchCounter == 1){
		  fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_1_DURATION, SKILL_PUNCH_CHAIN_1_DISTANCE, SKILL_PUNCH_CHAIN_1);
		  lastPunch = SKILL_PUNCH_CHAIN_1;
		  }
		  if(punchCounter == 2){
		  fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_2_DURATION, 0, SKILL_PUNCH_CHAIN_2);
		  lastPunch = SKILL_PUNCH_CHAIN_2;
		  }
		  if(punchCounter == 3){
		  fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_3_DURATION, 0, SKILL_PUNCH_CHAIN_3);
		  lastPunch = SKILL_PUNCH_CHAIN_3;
		  }
		  if(punchCounter == 0){
		  fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_4_DURATION, 0, SKILL_PUNCH_CHAIN_4);
		  lastPunch = SKILL_PUNCH_CHAIN_4;
		  }
		  event.skill = lastPunch;
		  punchCounter = 0;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_GROWING_FURY){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_GROWING_FURY] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc_dist(event, SKILL_GROWING_FURY_DURATION, 0);
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_ROUNDHOUSE_KICK){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_ROUNDHOUSE_KICK] = false;}, SKILL_ROUNDHOUSE_KICK_LOCKOUT_DURATION);
		  if(skillActive) force_end(lastEvent, 4);
		  skillActive = true;
		  fakeEnd_sorc(event, SKILL_ROUNDHOUSE_KICK_DURATION);
	  }
	  
	 if(job == JOB_BRAWLER && event.skill == SKILL_QUICK_DASH){
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_QUICK_DASH] = false;}, GLOBAL_LOCK_DELAY);
		  if(skillActive) force_end(lastEvent, 6);
		  skillActive = true;
		  fakeEnd_sorc_dist(event, SKILL_QUICK_DASH_DURATION, SKILL_QUICK_DASH_DISTANCE);
	  } 
	  }
	  if(event.skill == SKILL_COUNTER_PUNCH && !counterAvailable){
		  return;
	  }
	  if(event.skill != SKILL_HIGHKICK && event.skill != SKILL_GROWING_FURY){
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
	  if(desyncToggle){
		  if(event.skill != SKILL_HAYMAKER && event.skill != SKILL_PILEDRIVER && event.skill != SKILL_ROUNDHOUSE_KICK && event.skill != SKILL_JACKHAMMER && event.skill != SKILL_FLIPKICK){
	  dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: event.skill,		
						stage: 0,		
						x: event.x1,		
						y: event.y1,		
						z: event.z1,		
						w: event.w,		
						});	
		  }
		  if(event.skill == SKILL_FLIPKICK){
			  dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_FLIPKICK,		
						stage: 0,		
						x: event.x1,		
						y: event.y1,		
						z: event.z1,		
						w: event.w,		
						});	 
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_FLIPKICK_2,		
						stage: 0,		
						x: event.x1,		
						y: event.y1,		
						z: event.z1,		
						w: event.w,		
						});	
		  }
		  if(event.skill == SKILL_COUNTER_PUNCH){
			  dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_COUNTER_PUNCH_2,		
						stage: 0,		
						x: event.x1,		
						y: event.y1,		
						z: event.z1,		
						w: event.w,		
						});
			dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_COUNTER_PUNCH,		
						stage: 0,		
						x: event.x1,		
						y: event.y1,		
						z: event.z1,		
						w: event.w,		
						});
		  }
	  }
  });

  dispatch.hook('sActionStage', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
		  actionStageLast = event;
		  if(job == JOB_BRAWLER && event.skill == SKILL_BULLRUSH){
			  return false;
		  if(skillActive) force_end(lastEvent, 4);
	  }
	  if(bRBuff == true){
			  return false;
		  }
		  
	if(event.skill.toString()[0] != '6' || event.skill.toString()[1] != '7'){
		//lastSkill = 1;
	}

	  if(job == JOB_BRAWLER && event.skill == SKILL_DIVINE_WRATH){
		  var timer = setTimeout(function(event){
			  dispatch.toServer('cStartSkill', 1, {
				skill: SKILL_PUNCH,
				w: event.w,
				x1: event.x,
				y1: event.y,
				z1: event.z,
				x2: 0,
				y2: 0,
				z2: 0,
				unk1: 1,
				unk2: 0,
				unk3: 0,
				target: 0
			  });
		  }, SKILL_DIVINE_WRATH_CANCEL_DELAY, event);
	  }
		if(bullrushActive == false){
	  if(job == JOB_BRAWLER && (event.skill == SKILL_ROUNDHOUSE_KICK || event.skill == SKILL_ROUNDHOUSE_KICK_2)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_COUNTER_PUNCH || event.skill == SKILL_COUNTER_PUNCH_2)){
		  		  if(desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_COUNTER){
		  return false;
	  }

	  if(job == JOB_BRAWLER && event.skill == SKILL_TAUNT){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_ENRAGE){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PUNCH_CHAIN_1 || event.skill == SKILL_PUNCH_CHAIN_2 || event.skill == SKILL_PUNCH_CHAIN_3 || event.skill == SKILL_PUNCH_CHAIN_4)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PUNCH || event.skill == SKILL_PUNCH2 || event.skill == SKILL_PUNCH3 || event.skill == SKILL_PUNCH4)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == (SKILL_PUNCH + 30) || event.skill == (SKILL_PUNCH2 + 30) || event.skill == (SKILL_PUNCH3 + 30) || event.skill == (SKILL_PUNCH4 + 30))){
		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_HAYMAKER || event.skill == SKILL_HAYMAKER_2 || event.skill == SKILL_HAYMAKER_3 || event.skill == SKILL_HAYMAKER_4 || event.skill == SKILL_HAYMAKER_5)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_GROUNDPOUND || event.skill == SKILL_GROUNDPOUND_2)){
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_PILEDRIVER || event.skill == SKILL_PILEDRIVER_2 || event.skill == SKILL_PILEDRIVER_3 || event.skill == SKILL_PILEDRIVER_4 || event.skill == SKILL_PILEDRIVER_5)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_JACKHAMMER || event.skill == SKILL_JACKHAMMER_2 || event.skill == SKILL_JACKHAMMER_3 || event.skill == SKILL_JACKHAMMER_4 || event.skill == SKILL_JACKHAMMER_5)){
		  		  if(!desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_FLIPKICK || event.skill == SKILL_FLIPKICK_2 || event.skill == SKILL_FLIPKICK_3)){
		  		  if(desyncToggle){
		  dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_RETALIATE)){
		  if(Ignore1){
			  event.x1 = event.x;
			  event.y1 = event.y;
			  event.z1 = event.z;
			  fakeEnd_sorc(event, SKILL_RETALIATE_DURATION);
		  }
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_GROWING_FURY){
		  return false;
	  }
	  
	 if(job == JOB_BRAWLER && (event.skill == SKILL_QUICK_DASH)){
		  return false;
	  }
	  }}
  });
  
  dispatch.hook('sActionEnd', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
		  if(event.skill == SKILL_BULLRUSH){
			  return false;
		  }
		  if(bRBuff == true){
			  return false;
		  }
	  
	  if(bullrushActive == false && lastSkill != SKILL_PUNCH_CHAIN_START){
		
	  if(job == JOB_BRAWLER && (event.skill == SKILL_ROUNDHOUSE_KICK || event.skill == SKILL_ROUNDHOUSE_KICK_2)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_COUNTER_PUNCH || event.skill == SKILL_COUNTER_PUNCH_2)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_COUNTER){
		  return false;
	  }

	  if(job == JOB_BRAWLER && event.skill == SKILL_TAUNT){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_ENRAGE){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PUNCH_CHAIN_1 || event.skill == SKILL_PUNCH_CHAIN_2 || event.skill == SKILL_PUNCH_CHAIN_3 || event.skill == SKILL_PUNCH_CHAIN_4)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_PUNCH || event.skill == SKILL_PUNCH2 || event.skill == SKILL_PUNCH3 || event.skill == SKILL_PUNCH4)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == (SKILL_PUNCH + 30) || event.skill == (SKILL_PUNCH2 + 30) || event.skill == (SKILL_PUNCH3 + 30) || event.skill == (SKILL_PUNCH4 + 30))){
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_HAYMAKER || event.skill == SKILL_HAYMAKER_2 || event.skill == SKILL_HAYMAKER_3 || event.skill == SKILL_HAYMAKER_4 || event.skill == SKILL_HAYMAKER_5)){
		  disabSkill[SKILL_HAYMAKER] = false;
		  if(actionStageLast.stage != 1 || actionStageLast.skill != event.skill){
		  clearTimeout(hayPart2Timer);
		  return;
		  }
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_GROUNDPOUND || event.skill == SKILL_GROUNDPOUND_2)){
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_PILEDRIVER || event.skill == SKILL_PILEDRIVER_2 || event.skill == SKILL_PILEDRIVER_3 || event.skill == SKILL_PILEDRIVER_4 || event.skill == SKILL_PILEDRIVER_5)){
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_JACKHAMMER || event.skill == SKILL_JACKHAMMER_2 || event.skill == SKILL_JACKHAMMER_3 || event.skill == SKILL_JACKHAMMER_4 || event.skill == SKILL_JACKHAMMER_5)){
		  return false;
	  }

	  if(job == JOB_BRAWLER && (event.skill == SKILL_FLIPKICK || event.skill == SKILL_FLIPKICK_2 || event.skill == SKILL_FLIPKICK_3)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_RETALIATE)){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && event.skill == SKILL_GROWING_FURY){
		  return false;
	  }
	  
	  if(job == JOB_BRAWLER && (event.skill == SKILL_QUICK_DASH)){
		  return false;
	  }
	  }
	  if(bullrushActive == true && event.skill != SKILL_BULLRUSH){
		  setTimeout(function(){bullrushActive = false;},200);
	  }}
  });

  dispatch.hook('sStartCooltimeSkill', 1, (event) => {
	  if(!enabled) return;
	  event.cooldown -= GLOBAL_LATENCY;
	  return true;
  });
  
  
  dispatch.hook('sPlayerStatUpdate', 1, (event) => {
	  if(!enabled) return;
    aspd = (event.bonusAttackSpeed + event.baseAttackSpeed) / 100;
  });
  
  dispatch.hook('cNotifyLocationInAction', 1, (event) =>{
	  if(!enabled) return;
	  if(lastSkill != SKILL_BULLRUSH || event.skill != SKILL_DIVINE_WRATH || event.skill != SKILL_RAMPAGE){
		  collisionLocX = event.x;		
	  collisionLocY = event.y;		
	  collisionLocZ = event.z;
	  collisionLocW = event.w;
		  setTimeout(function(event){
			dispatch.toServer('cNotifyLocationInAction', 1, {
						skill: event.skill,
						stage: event.stage,
						x: event.x,
						y: event.y,
						z: event.z,
						w: event.w,
						});
		}, 0, event);
		setTimeout(function(event){		
			dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: event.skill,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});		
		}, 100, event);
		if(event.skill == SKILL_HAYMAKER){
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
				setTimeout(function(event){
					dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_HAYMAKER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
				}, 100, event);
		  }
		  if(event.skill == SKILL_JACKHAMMER){ 
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						setTimeout(function(event){
							dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_JACKHAMMER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						}, 100, event);
		  }
		  if(event.skill == SKILL_PILEDRIVER){ 
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						setTimeout(function(event){
							dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_3,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_4,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_PILEDRIVER_5,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});
						}, 100, event);
		  }
		  if(event.skill == SKILL_ROUNDHOUSE_KICK){ 
						dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_ROUNDHOUSE_KICK_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	
						setTimeout(function(){
							dispatch.toServer('cNotifyLocationInAction', 1, {		
						skill: SKILL_ROUNDHOUSE_KICK_2,		
						stage: event.stage,		
						x: event.x,		
						y: event.y,		
						z: event.z,		
						w: event.w,		
						});	}, 100, event);
		  }
	return false;
	  }
  });
  
  dispatch.hook('cPlayerLocation', 1, (event) =>{
	  if(!enabled) return;
	xloc = event.x2;
	yloc = event.y2;
	zloc = event.z2;
	wloc = event.w;
	timeloc = event.time + 1;
  });
  
  dispatch.hook('sActionStage', 1, (event) =>{
	  if(!enabled) return;
	  if (event.source.low != cid.low || event.source.high != cid.high || event.source.unsigned != cid.unsigned) {
            return;
        }
	if(event.skill.toString()[0] == '1' && event.skill.toString()[1] == '3' && event.skill.toString()[7] == '3' && event.skill.toString()[8] == '2'){
		disabSkill[SKILL_RETALIATE] = true;
		Ignore1 = true;
	}
  });
  dispatch.hook('sActionEnd', 1, (event) =>{
	  if(!enabled) return;
	  if (event.source.low != cid.low || event.source.high != cid.high || event.source.unsigned != cid.unsigned) {
            return;
        }
	if(event.skill.toString()[0] == '1' && event.skill.toString()[1] == '3' && event.skill.toString()[7] == '3' && event.skill.toString()[8] == '2'){
		disabSkill[SKILL_RETALIATE] = false;
		setTimeout(function(){Ignore1 = false;}, 400);
	}
  });
};
