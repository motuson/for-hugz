/* SCRIPT BY BERNKASTEL */

//change GLOBAL_LATENCY to your lowest usual ping
const GLOBAL_LATENCY = 130;
const RACE_CARRIED = false; //Kick 1 is faster on Aman Male, Baraka, Castanic F, Human F, Popo. Set to true if you are those races.
const AUTOSEQFIRE = false; //Auto Seq fire after Radiant/Penetrating/TB
const SEQFIREKEY = "4"; //Key for Sequential Fire, find keyboard syntax list here http://robotjs.io/docs/syntax
const VELIKALERT = false; //Alerts you if Velik's Mark drops from boss
const VELIKPREALERT = 0; //Alert after X seconds after Velik had been casted. Set to 0 to disable.
const DISABLE_CHARGE = false; //this will disable charge bar emulation, useful for people who have unstable net and prone to get stuck or server lagging badly
//disabling charge actually does not significantly impact ping tax, because charge skills are actually not ping taxed if you simply release the skill early


//DONT TOUCH ANYTHING UNDER HERE =============================
const JOB_ARCHER = 5;

//Archer skills
const S_ARROW = 67120064; //cStartInstanceSkill
const S_ARROW_D = 385;

const S_ARROWVOLLEY = 67129964; //cStartSkill
const S_ARROWVOLLEY_2 = 67129974;
const S_ARROWVOLLEY_D = 1200;

const S_RADIANT = 67139764; //cPressSkill
const S_RADIANT_D = 570;
const S_RADIANT_1 = 67139774;
const S_RADIANT_2 = 67139775;
const S_RADIANT_3 = 67139776;
const S_RADIANT_4 = 67139777; //cStartInstanceSkill
const S_RADIANT_D2 = 1730;

const S_PENARROW = 67150064;
const S_PENARROW_D = 800;
const S_PENARROW_1 = 67150074;
const S_PENARROW_2 = 67150075;
const S_PENARROW_3 = 67150076;
const S_PENARROW_4 = 67150077; //cStartInstanceSkill / ArrowVolley Blaze Pen / Stun Trap Blaze Pen
const S_PENARROW_D2 = 1300;
const RAPACANCEL = 300; //Auto Seq Fire cancel timing at base aspd.

const S_ARROWRAIN = 67159064; //cStartSkill / Self Speed buff
const S_ARROWRAIN_D = 3150;

const S_BACKSTEP = 67168964; //cStartSkill
const S_BACKSTEP_D = 650;

const S_RAPIDFIRE = 67189764; //cStartComboInstantSkill
const S_RAPIDFIRE_D = 425;
const S_RAPIDFIRE2 = 67189765;
const S_RAPIDFIRE_D2 = 600;
const S_RAPIDFIRE3 = 67189766;
const S_RAPIDFIRE_D3 = 700;
const S_RAPIDFIRE4 = 67189767;
const S_RAPIDFIRE_D4 = 700;
const S_RAPIDFIRE5 = 67189768;
const S_RAPIDFIRE_D5 = 700;
const S_RAPIDFIRE6 = 67189769;
const S_RAPIDFIRE_D6 = 700;
const S_RAPIDFIRE7 = 67189770;
const S_RAPIDFIRE_D7 = 1235;

const S_SLOWTRAP = 67199464; //cStartSkill
const S_SLOWTRAP_D = 1130;

const S_STUNTRAP = 67209264; //cStartSkill / ArrowVolley Blaze Trap
const S_STUNTRAP_D = 1145;

const S_VELIK = 67229164; //cStartInstanceSkill
const S_VELIK_D = 995;

const S_INCINTRAP = 67259564; //cStartSkill
const S_INCINTRAP_D = 1130;

const S_BREAKAWAY = 67269864; //cStartSkill
const S_BREAKAWAY_D = 1310;

const S_WEB = 67279164; //cStartInstanceSkill
const S_WEB_D = 515;

const S_KICK = 67289864; //cStartSkill
const S_KICK_D = 295;
const S_KICK_2 = 67289865;
const S_KICK_D2 = 1180;

const S_POISON = 67299664; //cStartInstanceSkill
const S_POISON_D = 1110;

const S_RESTRAIN = 67309064; //cStartInstanceSkill
const S_RESTRAIN_D = 510;

const S_SEQFIRE = 67329664; //cStartInstanceSkill
const S_SEQFIRE_D = 340;

const S_STUNRTRAP = 67339064; //cStartSkill
const S_STUNRTRAP_D = 1410;

const S_SNARE_T = 67349065;
const S_SNARE_T_D = 1470;

const S_INCINRTRAP = 67359064;
const S_INCINRTRAP_D = 1160;

const S_THUNDER = 67398964; //cStartSkill / speed glyph
const S_THUNDER_D = 3740;

const S_FINDWEAK = 67428964; //cStartSkill
const S_FINDWEAK_D = 1300;

const SKILL_CHARGING = 67438964;
const SKILL_CHARGING_DISTANCE = 494;
const SKILL_CHARGING_DURATION = 990;

const S_TENA = 67418964;
const S_TENA_D1 = 500;
const S_TENA_D2 = 700;

const S_RETAL = 67249864;
const S_RETAL_D = 1570;

const FOCUS_BUFF = 601450;
const SEQFIREID = 600200;
const ARROWRAINLOCK = 1100; //120 aspd value
const ARROWRAINLOCK2 = 4150; //120 aspd value

module.exports = function archer(dispatch) {
  let cid;
  let job;
  let model;
  let player;
  let enabled = false;
  let aspd;
  
  let atkid = [];
  let atkid_base = 0xFEFEFFEE;
  
  let disabSkill = [];
  let startTime = [];
  let timer = [];
  let finishcheck = [];
  let finish = [];
  
  let seqFireCan = false;
  let focusUp = false;
  let focusUp2 = true;
  let stunTrapCan = false;
  let penArrowCan = 1;
  let penArrowCan2 = 1;
  let penArrowCan3 = 1;
  let radiantArrowCan = 1;
  let RadiantActive = 0;
  let PenActive = 0;
  let APState = 0;
  let APStateZ = 0;
  
  let chargeSkillFix = [];
  let chargeSkillFix2;
  let chargeSkillIDx = 0;
  
  let velikTimer;
  
  let noct1 = false;
  let noct2 = false;
  let noct3 = false;
  let noct4 = false;
  let noct5 = false;
  let noct6 = false;
  let ArrowRainDisab = false;
  let TBcc;
  let TBcc2;
  let TBcc3;
  
  let msgSuppress;
  
  let punchCounter = 0;
  let clearPunchCounter;
  
  let glyphState = [];
  
  let timer2;
  let stallSorc = 0;
  
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
	player = event.name;
    job = (model - 10101) % 100;
    enabled = [JOB_ARCHER].includes(job);
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
		var zzzz = Math.pow((Math.pow((event.x1 - event.x2),2)+Math.pow((event.y1 - event.y2),2)),0.5) / SKILL_CHARGING_DISTANCE * SKILL_CHARGING_DURATION +100;
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
	
	function fakeEnd_AP(event, stage, xy, yy, zy){
	  atkid[event.skill] = atkid_base;
	  atkid_base--;
		dispatch.toClient('sActionStage', 1, {
			source: cid,
			x: xy,
			y: yy,
			z: zy,
			w: event.w,
			model: model,
			skill: event.skill,
			stage: stage,
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
	
	function fakeEnd_AP2(event, skillx, duration){
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
			speed: aspd / 1.1,
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
		
		const timer = setTimeout(function(event){
			dispatch.toClient('sActionEnd', 1, {
				source: cid,
				x: event.x1,
				y: event.y1,
				z: event.z1,
				w: event.w,
				model: model,
				skill: skillx,
				type: 0,
				id: atkid[skillx],
			});
		}, duration / aspd, event);
	}
	
	function force_end(event, unkz){
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
	
	function force_endchain(event, unkz){
		var skillC = event.skill + 30;
		dispatch.toClient('sActionEnd', 1, {
			source: cid,
			x: event.x || event.x1,
			y: event.y || event.y1,
			z: event.z || event.z1,
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
		xloc = event.x1;
		yloc = event.y1;
		zloc = event.z1;
		var yyy = 1;
		var zzz = 0;
		if(event.skill == S_ARROWRAIN && glyphState[26077] == 1){
			yyy = 1.4;
		}
		if(event.skill == S_THUNDER && glyphState[26102] == 1){
			yyy = 1.3;
		}
		if(event.skill == S_STUNRTRAP && stunTrapCan){
			yyy = yyy * 1.5;
		}
		if(event.skill == S_ARROWRAIN && (noct1 || noct2 || noct3)){
			yyy = yyy + 0.225;
		}
		if(event.skill == S_ARROWRAIN && (noct4 || noct5 || noct6)){
			yyy = yyy + 0.15;
		}
		if(finish[lastSkill] == false && zzz == 0){
			force_end(lastEvent, 4);
			finish[lastSkill] = true;
		}
		if(event.skill == S_TENA || event.skill == S_FINDWEAK){
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
		
		setTimeout(function(){ArrowRainDisab = true;}, ARROWRAINLOCK / (aspd * yyy));
		setTimeout(function(){ArrowRainDisab = false;}, ARROWRAINLOCK2 / (aspd * yyy));
		
		var newX;
		var newY;
		var angle = parseFloat(event.w);
		angle = angle / 10000;
		angle = angle / 1.043;

		newX = Math.cos(angle) * dist;
		newY = Math.sin(angle) * dist;
		lastSkillDelay = duration / aspd;
		setTimeout(function(){
			if((event.skill == S_TENA || event.skill == S_FINDWEAK) && xloc != false){
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
				if((event.skill == S_TENA || event.skill == S_FINDWEAK) && xloc != false){
					event.x1 = xloc;
					event.y1 = yloc;
					event.z1 = zloc;
					event.w = wloc;
				}
				if(event.skill == S_BACKSTEP || event.skill == S_BREAKAWAY){
					xloc = event.x1 + newX *2;
					yloc = event.y1 + newY *2;
					zloc = event.z1 + 2;
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

dispatch.hook('cCanLockonTarget', 1, function(event) {
    dispatch.toClient('sCanLockonTarget', 1, Object.assign({ ok: true }, event));
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
  if(job == JOB_ARCHER && event.skill == SKILL_CHARGING){
		  charge(event);
		  disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[SKILL_CHARGING] = false;}, GLOBAL_LOCK_DELAY);
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	    lastEvent = event;
	  }
  });
  
  dispatch.hook('cPressSkill', 1, (event) => {
        if (!enabled) return;
		if(job == JOB_ARCHER && event.start == 1){
		  setTimeout(function(){dispatch.toServer('cPressSkill', 1, event);},50);		
		  setTimeout(function(){dispatch.toServer('cPressSkill', 1, event);},100);		
		  setTimeout(function(){dispatch.toServer('cPressSkill', 1, event);},150);		
		  setTimeout(function(){dispatch.toServer('cPressSkill', 1, event);},200);
		chargeSkillFix[chargeSkillIDx] = setInterval(function(event, nnn){
				if((event.skill == S_PENARROW || event.skill == S_RADIANT) && lastSkill == event.skill && event.start == 1 && chargeSkillFix2 != lastSkill){
					dispatch.toServer('cPressSkill', 1, event);
				}
				if(chargeSkillFix2 == lastSkill){
					clearInterval(chargeSkillFix[nnn]);
				}
				if(event.skill == S_PENARROW && PenActive == 0){
					clearInterval(chargeSkillFix[nnn]);
				}
				if(event.skill == S_RADIANT && RadiantActive == 0){
					clearInterval(chargeSkillFix[nnn]);
				}
			}, 100, event, chargeSkillIDx);
		}
		chargeSkillIDx ++;
		if(job == JOB_ARCHER && event.skill == S_RADIANT){
	  RadiantActive = event.start;
		}
		if(job == JOB_ARCHER && event.skill == S_PENARROW){
	  PenActive = event.start;
		}
		if(job == JOB_ARCHER && (event.skill == S_RADIANT || event.skill == S_PENARROW) && event.start == 0){
	  if(stallSorc > 10){
		  console.log('attempt unstuck');
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
	  }
	  stallSorc = stallSorc + 1;
	}
	if(focusUp && focusUp2){
		var rAs = 1.4;
		var pAs = 1.4;
	}
	if(!focusUp || !focusUp2){
		var rAs = radiantArrowCan;
		var pAs = penArrowCan * penArrowCan2 * penArrowCan3;
	}
	if(job == JOB_ARCHER && event.skill == S_RADIANT && RadiantActive == 1){
		if (DISABLE_CHARGE) {lastSkill = S_RADIANT; return;}
		fakeEnd_AP(event,0,event.x,event.y,event.z);
		stallSorc = 0;
		APState = 1;
		setTimeout(function(){
			  if(job == JOB_ARCHER && event.skill == S_RADIANT && RadiantActive == 1 && APState == 1){
				  fakeEnd_AP(event,1,xloc,yloc,zloc);
				  APState = 2;
				  setTimeout(function(){
					  if(job == JOB_ARCHER && event.skill == S_RADIANT && RadiantActive == 1 && APState == 2){
						  fakeEnd_AP(event,2,xloc,yloc,zloc);
						  APState = 3;
						  setTimeout(function(){
					  if(job == JOB_ARCHER && event.skill == S_RADIANT && RadiantActive == 1 && APState == 3){
						  fakeEnd_AP(event,3,xloc,yloc,zloc);
						  APState = 4;
						  }
					},S_RADIANT_D / (aspd * rAs));
						  }
					},S_RADIANT_D / (aspd * rAs));}},S_RADIANT_D / (aspd * rAs));
	}
	if(job == JOB_ARCHER && event.skill == S_PENARROW && PenActive == 1){
		if (DISABLE_CHARGE) {lastSkill = S_PENARROW; return;}
		fakeEnd_AP(event,0,event.x,event.y,event.z);
		stallSorc = 0;
		APStateZ = 1;
		setTimeout(function(){
			  if(job == JOB_ARCHER && event.skill == S_PENARROW && PenActive == 1 && APStateZ == 1){
				  fakeEnd_AP(event,1,xloc,yloc,zloc);
				  APStateZ = 2;
				  setTimeout(function(){
					  if(job == JOB_ARCHER && event.skill == S_PENARROW && PenActive == 1 && APStateZ == 2){
						  fakeEnd_AP(event,2,xloc,yloc,zloc);
						  APStateZ = 3;
						  setTimeout(function(){
					  if(job == JOB_ARCHER && event.skill == S_PENARROW && PenActive == 1 && APStateZ == 3){
						  fakeEnd_AP(event,3,xloc,yloc,zloc);
						  APStateZ = 4;
						  }
					},S_PENARROW_D / (aspd * pAs));
						  }
					},S_PENARROW_D / (aspd * pAs));}},S_PENARROW_D / (aspd * pAs));
	}
  });
  
  dispatch.hook('sAbnormalityRefresh', 1, (event) =>{
	  if(!enabled) return;
	  if(job == JOB_ARCHER && event.id == 600502 && VELIKALERT && VELIKPREALERT > 0){
		  clearTimeout(velikTimer);
		  velikTimer = setTimeout(function(){
		  dispatch.toClient('sWhisper', 1, {
				player: cid,
				unk1: 0,
				gm: 0,
				unk2: 0,
				author: "ArcherScript",
				recipient: player,
				message: "Velik Mark Nearly Expired.",
		  });	},(VELIKPREALERT * 1000));
	  }
  });
  
  dispatch.hook('sAbnormalityBegin', 1, (event) =>{
	  if(!enabled) return;
	  if(job == JOB_ARCHER && event.id == 600502 && VELIKALERT && VELIKPREALERT > 0){
		  clearTimeout(velikTimer);
		  velikTimer = setTimeout(function(){
		  dispatch.toClient('sWhisper', 1, {
				player: cid,
				unk1: 0,
				gm: 0,
				unk2: 0,
				author: "ArcherScript",
				recipient: player,
				message: "Velik Mark Nearly Expired.",
		  });	},(VELIKPREALERT * 1000));
	  }
	  if(event.target.low != cid.low || event.target.high != cid.high || event.target.unsigned != cid.unsigned){
			return;
	  }
	  if(job == JOB_ARCHER && event.id == SEQFIREID){
		  seqFireCan = true;
	  }
	  if(job == JOB_ARCHER && event.id == FOCUS_BUFF){
		  focusUp = true;
		  focusUp2 = true;
	  }
	  if(job == JOB_ARCHER && event.id == 26170){
		  stunTrapCan = true;
	  }
	  if(job == JOB_ARCHER && event.id == 26171){
		  penArrowCan = 1.4; // 40%
		  focusUp2 = false;
		  penArrowCan2 = 1;
		  penArrowCan3 = 1;
	  }
	  if(job == JOB_ARCHER && event.id == 26160){
		  penArrowCan2 = 1.3; // 30%
		  focusUp2 = false;
		  penArrowCan = 1;
		  penArrowCan3 = 1;
	  }
	  if(job == JOB_ARCHER && event.id == 26180){
		  radiantArrowCan = 1.3; // 30%
		  focusUp2 = false;
	  }
	  if(job == JOB_ARCHER && event.id == 26190){
		  penArrowCan3 = 1.3; // 30%
		  focusUp2 = false;
		  penArrowCan = 1;
		  penArrowCan2 = 1;
	  }
	  if(event.id == 920){
		  noct1 = true;
	  }
	  if(event.id == 921){
		  noct2 = true;
	  }
	  if(event.id == 922){
		  noct3 = true;
	  }
	  if(event.id == 916){
		  noct4 = true;
	  }
	  if(event.id == 902){
		  noct5 = true;
	  }
	  if(event.id == 912){
		  noct6 = true;
	  }
  });
  
  dispatch.hook('sAbnormalityEnd', 1, (event) =>{
	  if(!enabled) return;
	  if(job == JOB_ARCHER && event.id == 600502 && VELIKALERT){
		  clearTimeout(velikTimer);
		  dispatch.toClient('sWhisper', 1, {
				player: cid,
				unk1: 0,
				gm: 0,
				unk2: 0,
				author: "ArcherScript",
				recipient: player,
				message: "Velik Mark Expired.",
			});	
	  }
	  if(event.target.low != cid.low || event.target.high != cid.high || event.target.unsigned != cid.unsigned){
		return;
	}
	if(job == JOB_ARCHER && event.id == SEQFIREID){
		  seqFireCan = false;
	  }
	  if(job == JOB_ARCHER && event.id == FOCUS_BUFF){
		  focusUp = false;
	  }
	  if(job == JOB_ARCHER && event.id == 26111){
		  stunTrapCan = false;
	  }
	  if(job == JOB_ARCHER && event.id == 26171){
		  penArrowCan = 1;
		  focusUp2 = true;
	  }
	  if(job == JOB_ARCHER && event.id == 26160){
		  penArrowCan2 = 1;
		  focusUp2 = true;
	  }
	  if(job == JOB_ARCHER && event.id == 26180){
		  radiantArrowCan = 1;
		  focusUp2 = true;
	  }
	  if(job == JOB_ARCHER && event.id == 26190){
		  penArrowCan3 = 1;
		  focusUp2 = true;
	  }
	  if(event.id == 920){
		  noct1 = false;
	  }
	  if(event.id == 921){
		  noct2 = false;
	  }
	  if(event.id == 922){
		  noct3 = false;
	  }
	  if(event.id == 916){
		  noct4 = false;
	  }
	  if(event.id == 902){
		  noct5 = false;
	  }
	  if(event.id == 912){
		  noct6 = false;
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
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},150);
		  setTimeout(function(){dispatch.toServer('cStartComboInstantSkill', 1, event);},200);
		  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE2){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE2] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE3){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE3] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D3);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE4){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE4] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D4);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE5){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE5] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D5);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE6){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE6] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D6);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RAPIDFIRE7){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RAPIDFIRE7] = false;}, GLOBAL_LOCK_DELAY * 2);
		  fakeDB(event, S_RAPIDFIRE_D7);
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
		if(job == JOB_ARCHER && event.skill == S_ARROW){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_ARROW] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_ARROW_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RADIANT_1){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RADIANT_1] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_RADIANT_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RADIANT_2){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RADIANT_2] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_RADIANT_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RADIANT_3){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RADIANT_3] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_RADIANT_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RADIANT_4){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RADIANT_4] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_RADIANT_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_PENARROW_1){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_PENARROW_1] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_PENARROW_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_PENARROW_2){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_PENARROW_2] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_PENARROW_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_PENARROW_3){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_PENARROW_3] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_PENARROW_D2);
	  }
	  if(job == JOB_ARCHER && event.skill == S_PENARROW_4){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_PENARROW_4] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_PENARROW_D2);
	  }
	  if(event.skill == S_PENARROW_1 || event.skill == S_PENARROW_2 || event.skill == S_PENARROW_3 || event.skill == S_PENARROW_4){
		  if(AUTOSEQFIRE){
			  TBcc = setInterval(function(event){
				  if(finish[event.skill] == false){
					  if(lastSkill != event.skill){clearInterval(TBcc); return;}
				  setTimeout(function(){
				  var robot2 = require("robotjs");
				  robot2.keyTap(SEQFIREKEY);
				  }, 100);
				  }
				  if(finish[event.skill] != false){clearInterval(TBcc);}
				  }, 50, event);
		  }
	  }
	  if(event.skill == S_RADIANT_1 || event.skill == S_RADIANT_2 || event.skill == S_RADIANT_3 || event.skill == S_RADIANT_4){
		  if(AUTOSEQFIRE){
			  TBcc2 = setInterval(function(event){
				  if(finish[event.skill] == false){
					 if(lastSkill != event.skill){clearInterval(TBcc2); return;}
					  setTimeout(function(){
				  var robot3 = require("robotjs");
				  robot3.keyTap(SEQFIREKEY);
				  }, 100);
				  }
				  if(finish[event.skill] != false){clearInterval(TBcc2);}
				  }, 50, event);
		  }
	  }
	  if(job == JOB_ARCHER && event.skill == S_VELIK){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_VELIK] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_VELIK_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_WEB){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_WEB] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_WEB_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_POISON){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_POISON] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_POISON_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RESTRAIN){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RESTRAIN] = false;}, GLOBAL_LOCK_DELAY * 5);
		  fakeDB(event, S_RESTRAIN_D);
	  }
	  if(job == JOB_ARCHER && event.skill == S_SEQFIRE && seqFireCan){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_SEQFIRE] = false;}, GLOBAL_LOCK_DELAY);
		  fakeDB(event, S_SEQFIRE_D);
		  APState = 0;
	  }
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
  });
		  
  
  dispatch.hook('cStartSkill', 1, (event) => {
	  if(!enabled) return;
	  lastSkillDelay = 999999;
	  
	  if(disabSkill[event.skill] == 'undefined') disabSkill[event.skill] = false;
	  if(!disabSkill[event.skill] && (finish[SKILL_CHARGING] != false || event.skill == S_BACKSTEP)){
		  msgSuppress = 0;
		  if(event.skill.toString()[0] == '6' && (event.skill.toString()[6] == '9' || event.skill.toString()[6] == '6') && event.skill != S_ARROWVOLLEY && event.skill != S_RETAL){
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},25);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},50);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},75);
		  setTimeout(function(){dispatch.toServer('cStartSkill', 1, event);},200);
		  }
	  if(job == JOB_ARCHER && event.skill == S_SLOWTRAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_SLOWTRAP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_SLOWTRAP_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_ARROWVOLLEY){
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
	  if(job == JOB_ARCHER && event.skill == S_ARROWVOLLEY_2){
		 disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_ARROWVOLLEY_2] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_ARROWVOLLEY_D, 0); 
	  }
	  if(job == JOB_ARCHER && event.skill == S_STUNTRAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_STUNTRAP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_STUNTRAP_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_INCINTRAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_INCINTRAP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_INCINTRAP_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_BREAKAWAY){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_BREAKAWAY] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_BREAKAWAY_D, -100);
	  }
	  if(job == JOB_ARCHER && event.skill == S_KICK){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_KICK] = false;}, GLOBAL_LOCK_DELAY);
		  if(!RACE_CARRIED){
			fakeEnd_sorc_dist(event, S_KICK_D, 0);
		  }
		  if(RACE_CARRIED){
			fakeEnd_sorc_dist(event, (S_KICK_D / 1.0825), 0);
		  }
	  }
	  if(job == JOB_ARCHER && event.skill == S_KICK_2){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_KICK_2] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_KICK_D2, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_STUNRTRAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_STUNRTRAP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_STUNRTRAP_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_SNARE_T){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_SNARE_T] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_SNARE_T_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_INCINRTRAP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_INCINRTRAP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_INCINRTRAP_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_THUNDER){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_THUNDER] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_THUNDER_D, 0);
	  }
	  if(event.skill == S_THUNDER){
		  if(AUTOSEQFIRE && event.skill == S_THUNDER){
			  TBcc3 = setInterval(function(){
				  if(finish[S_THUNDER] == false){
				if(lastSkill != event.skill){clearInterval(TBcc3); return;}
					  setTimeout(function(){
				  var robot = require("robotjs");
				  robot.keyTap(SEQFIREKEY);
					  }, 100);
				  }
				  if(finish[S_THUNDER] != false){clearInterval(TBcc3);}
				  }, 200);
		  }
	  }
	  if(job == JOB_ARCHER && event.skill == S_FINDWEAK){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_FINDWEAK] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_FINDWEAK_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_BACKSTEP){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_BACKSTEP] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_BACKSTEP_D, -100);
	  }
	  if(job == JOB_ARCHER && event.skill == S_ARROWRAIN){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_ARROWRAIN] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_ARROWRAIN_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_RETAL){
		disabSkill[event.skill] = true;
		  var timer = setTimeout(function(){disabSkill[S_RETAL] = false;}, GLOBAL_LOCK_DELAY);
		  fakeEnd_sorc_dist(event, S_RETAL_D, 0);
	  }
	  if(job == JOB_ARCHER && event.skill == S_TENA){
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
	  lastLastSkill = lastSkill;
	  lastSkill = event.skill;
	  lastEvent = event;
	  }
  });
  
  dispatch.hook('cCancelSkill', 1, (event) => {
	  if(!enabled) return;
    if(job == JOB_ARCHER && (event.skill == S_ARROWVOLLEY || event.skill == S_ARROWVOLLEY_2) && event.type == 1){
		dispatch.toClient('sActionEnd', 1, {
				source: cid,
				x: xloc,
				y: yloc,
				z: zloc,
				w: wloc,
				model: model,
				skill: S_ARROWVOLLEY,
				type: 1,
				id: atkid[S_ARROWVOLLEY],
			});
	}
	if(job == JOB_ARCHER && event.skill == S_ARROWRAIN && !ArrowRainDisab){
		clearTimeout(timer[lastSkill]);
		dispatch.toClient('sActionEnd', 1, {
				source: cid,
				x: xloc,
				y: yloc,
				z: zloc,
				w: wloc,
				model: model,
				skill: S_ARROWRAIN,
				type: 2,
				id: atkid[S_ARROWRAIN],
			});
	}
  });

  dispatch.hook('sActionStage', 1, (event) => {
	  if(!enabled) return;
	  if(event.source.low == cid.low && event.source.high == cid.high && event.source.unsigned == cid.unsigned){
		  chargeSkillFix2 = event.skill;
	  var d = new Date();		
				lastSkillTime[1] = d.getTime();		
				lastSkillTime[3] = event.skill;
	  if(job == JOB_ARCHER && (event.skill == S_ARROW)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RADIANT_1 || event.skill == S_RADIANT_2 || event.skill == S_RADIANT_3 || event.skill == S_RADIANT_4)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_PENARROW_1 || event.skill == S_PENARROW_2 || event.skill == S_PENARROW_3 || event.skill == S_PENARROW_4)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_PENARROW || event.skill == S_RADIANT)){
		  if (DISABLE_CHARGE) {return;}
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_ARROWRAIN)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_ARROWVOLLEY || event.skill == S_ARROWVOLLEY_2)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_BACKSTEP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RAPIDFIRE || event.skill == S_RAPIDFIRE2 || event.skill == S_RAPIDFIRE3 || event.skill == S_RAPIDFIRE4 || event.skill == S_RAPIDFIRE5 || event.skill == S_RAPIDFIRE6 || event.skill == S_RAPIDFIRE7)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SLOWTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_STUNTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_INCINTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_BREAKAWAY)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_WEB)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_KICK || event.skill == S_KICK_2)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_POISON)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RESTRAIN)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SEQFIRE)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_STUNRTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SNARE_T)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_INCINRTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_THUNDER)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_FINDWEAK)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_VELIK)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RETAL)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == SKILL_CHARGING)){
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
	  if(job == JOB_ARCHER && (event.skill == S_ARROW)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RADIANT_1 || event.skill == S_RADIANT_2 || event.skill == S_RADIANT_3 || event.skill == S_RADIANT_4)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_PENARROW_1 || event.skill == S_PENARROW_2 || event.skill == S_PENARROW_3 || event.skill == S_PENARROW_4)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RADIANT)){
		  RadiantActive = 0;
		  if (DISABLE_CHARGE) {return;}
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_PENARROW)){
		  PenActive = 0;
		  if (DISABLE_CHARGE) {return;}
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_ARROWRAIN)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_ARROWVOLLEY || event.skill == S_ARROWVOLLEY_2)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_BACKSTEP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RAPIDFIRE || event.skill == S_RAPIDFIRE2 || event.skill == S_RAPIDFIRE3 || event.skill == S_RAPIDFIRE4 || event.skill == S_RAPIDFIRE5 || event.skill == S_RAPIDFIRE6 || event.skill == S_RAPIDFIRE7)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SLOWTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_STUNTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_INCINTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_BREAKAWAY)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_WEB)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_KICK || event.skill == S_KICK_2)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_POISON)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RESTRAIN)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SEQFIRE)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_STUNRTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_SNARE_T)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_INCINRTRAP)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_THUNDER)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_FINDWEAK)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_VELIK)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == S_RETAL)){
		  return false;
	  }
	  if(job == JOB_ARCHER && (event.skill == SKILL_CHARGING)){
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