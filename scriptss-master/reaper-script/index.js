/* SCRIPT BY BERNKASTEL & shiro*/
'use strict'

//DONT TOUCH ANYTHING UNDER HERE =============================
const JOB_REAPER =8;

//Reaper skills
const S_P =10300;
const S_P_D =990;
const S_P2 =10302;
const S_P2_D =1200;
const S_P3 =10303;
const S_P3_D =880;
const S_P4 =10304;
const S_P4_D =1400;
const S_P5 =10305;
const S_P5_D =1905;

const S_DSheer = 30300; //30  Spiral barrage, shadow lash, death spiral, grim strike, whipsaw, pendulum
const S_DSheer_D =2035;

const S_Sunder = 40300; // 30 double shear, grim strike, death spiral
const S_Sunder_Reap_Chain =40360;
const S_Sunder_D1 =1170;
const S_Sunder_D2 = 1750; //fix
const S_Sunder_D3 =1020;

const S_GStrike = 50300; //30 Spiral barrage, shadow lash, death spiral, grim strike, double shear, whipsaw, pendulum
const S_GStrike_D1 =2400;
const S_GStrike_D2 = 975; //fix

const S_DSpiral =60200;
const S_DSpiral_D =1245;

const S_Whip = 80200; //30 pendulum
const S_Whip_D =2500;

const S_Smite =90100;
const S_Smite2 =93300;
const S_Smite3 =93100;
const S_Smite_D =1730;
const S_Smite_Dist =100;

const S_PStrike =100200;
const S_PStrike_D =1025;
const S_PStrike_Dist = -200;

const S_SLash =110200;
const S_SLash_Df =2150;
const S_SLash_Ds =1250;

const S_ShadowBurst =120200;
const S_ShadowBurst_D =3225;
const S_ShadowBurst_D2 =2025;

const S_Retri =150300;
const S_Retri2 =150330;
const S_Retri_D =1575;

const S_Reaping =160100;
const S_Reaping_2 =163200;
const S_Reaping_3 =163100;
const S_Reaping_D =775;

const S_Escape =180100;
const S_Escape_D =850;
const S_Escape_Dist =150;

const S_Step =400100;
const S_Step_D =700;
const S_Step_Dist =175;

const S_Cable =200100;
const S_Cable_D =1300;

const S_Soul =130100;
const S_Soul_D =600;

const S_RETAL =140300;
const S_RETAL_D =1600;

const S_ULTI_1 =230100;
const S_ULTI_2 =230131;
const S_ULTI_3 =230133;
const S_ULTI_1_D =1300;
const S_ULTI_2_D =1180;
const S_ULTI_3_D =1056;

const REVERSE_SCYTHE = 190100; //30
const REVERSE_SCYTHE_D =2100;

const USELESS_SCYTHE = 210100; //30

const BLACKLIST = [110100, 111110, 111111, 111112, 111113, 111114, 111115, 111116, 111117, 111118, 111119, 111120, 111121, 111122, 111124, 111125,
	111126, 111127, 111128, 111129, 111130, 111131, 111134, 111135, 111139, 111140, 111143, 111144, 111145, 111190, 111191, 111193,
	111194, 111195, 111197, 111199, 111202, 111203, 116001, 116002, 116003, 116004, 117002, 117003, 140100, 460100, 480100, 900001,
	111136, 111137, 111138, 111141, 111142, 111147, 111149, 111150, 111151, 111152, 111153, 111154, 111155, 111156, 111157, 111158,
	211141, 211150, 111123, 111132, 111133, 111146, 111148, 111192, 111196, 111198, 211145, 111159, 111160, 111161, 111162, 111163,
	111164, 111165, 111166, 111168, 111169, 111170, 111171, 111172, 111173, 111174, 111175, 111176, 111177, 111178, 111179, 111180,
	111204, 111205, 111206, 111207, 111208, 111209, 111210, 111211, 111212, 111214, 111215, 111216, 111217, 111218, 111219, 111220,
	111221, 111222, 111223, 111224, 111225, 111226, 111227, 111228, 111229, 111230, 111231, 111232, 111233, 111234, 111235, 111236,
	111237, 111238, 111239, 111241, 111242, 111243, 111244, 111245, 111246, 111247, 111248, 111249, 111250, 111251, 111252, 111253,
	111254, 111255, 111256, 111257, 111258, 111259, 111260, 111261, 111262, 111263, 111264, 111265, 111266, 111267, 111268, 111269,
	111270, 111271, 111272, 111273, 111274, 111275, 111276, 111277, 111278, 111279, 111280, 111281, 111282, 111283, 111284, 111285,
	111286, 111287, 111288, 111289, 111290, 111291, 111292, 111293, 111294, 111295, 111296, 111297, 111298, 111299, 111301, 111302];
module.exports = function reaper(dispatch) {
	let config = {};
	let settingTimeout = null;
	let settingLock = false;

	const path = require('path');
	const fs = require('fs');

	try { config = require('./config.json'); }
	catch (e) {
		config = {};
		settingUpdate();
	}

	function settingUpdate() {
		clearTimeout(settingTimeout);
		settingTimeout = setTimeout(settingSave,1000);
	}

	function settingSave() {
		if (settingLock) {
			settingUpdate();
			return;
		}

		settingLock = false;
		fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config, undefined, '\t'), err => {
			settingLock = false;
		});
	}

	let GLOBAL_LATENCY =0;
	if (("GLOBAL_LATENCY" in config)) {
		GLOBAL_LATENCY = config.GLOBAL_LATENCY;
	}
	if (!("GLOBAL_LATENCY" in config)) {
		config.GLOBAL_LATENCY =0;
		config.GLOBAL_LATENCY_DESCRIPTION = "change GLOBAL_LATENCY to your lowest usual ping";
		settingUpdate();
	}

	let UNSPOOF_CABLE_STEP = false;
	if (("UNSPOOF_CABLE_STEP" in config)) {
		UNSPOOF_CABLE_STEP = config.UNSPOOF_CABLE_STEP;
	}
	if (!("UNSPOOF_CABLE_STEP" in config)) {
		config.UNSPOOF_CABLE_STEP = false;
		config.UNSPOOF_CABLE_STEP_DESCRIPTION = "removes cable step emulation";
		config.UNSPOOF_CABLE_STEP_DESCRIPTION_2 = "this can be toggled on and off by typing cablesteptoggle in chat";
		settingUpdate();
	}

	let SLOW_GRIM = false;
	if (("SLOW_GRIM" in config)) {
		SLOW_GRIM = config.SLOW_GRIM;
	}
	if (!("SLOW_GRIM" in config)) {
		config.SLOW_GRIM = false;
		config.SLOW_GRIM_DESCRIPTION = "Slows GrimStrike if used after another GrimStrike, can be used to stop accidental second hit cancels. Toggle with slowgrim1 command.";
		settingUpdate();
	}

	let SLOW_GRIM_AMOUNT =1000;
	if (("SLOW_GRIM_AMOUNT" in config)) {
		SLOW_GRIM_AMOUNT = config.SLOW_GRIM_AMOUNT;
	}
	if (!("SLOW_GRIM_AMOUNT" in config)) {
		config.SLOW_GRIM_AMOUNT =1000;
		config.SLOW_GRIM_AMOUNT_DESCRIPTION = "How many seconds to slow GrimStrike by if SLOW_GRIM is enabled. This scales with ASPD.";
		settingUpdate();
	}

	let CABLE_FIX = false;
	if (("CABLE_FIX" in config)) {
		CABLE_FIX = config.CABLE_FIX;
	}
	if (!("CABLE_FIX" in config)) {
		config.CABLE_FIX = false;
		config.CABLE_FIX_DESCRIPTION = "Some bosses appear to not function correctly with cable position emulation. This turns the feature off.";
		settingUpdate();
	}
	
	let RECALL_GRIM = false;
	if (("RECALL_GRIM" in config)) {
		RECALL_GRIM = config.RECALL_GRIM;
	}
	if (!("RECALL_GRIM" in config)) {
		config.RECALL_GRIM = false;
		config.RECALL_GRIM_DESCRIPTION = "Auto grim once after recall scythe.";
		settingUpdate();
	}
	
	let NO_RECALL_GRIM_IN_REAPING = false;
	if (("NO_RECALL_GRIM_IN_REAPING" in config)) {
		NO_RECALL_GRIM_IN_REAPING = config.NO_RECALL_GRIM_IN_REAPING;
	}
	if (!("NO_RECALL_GRIM_IN_REAPING" in config)) {
		config.NO_RECALL_GRIM_IN_REAPING = false;
		config.NO_RECALL_GRIM_IN_REAPING_DESCRIPTION = "If recall grim is enabled and this option is enabled, it won't activate in shadow reaping.";
		settingUpdate();
	}
	
	let GRIM_KEY = "4";
	if (("GRIM_KEY" in config)) {
		GRIM_KEY = config.GRIM_KEY;
	}
	if (!("GRIM_KEY" in config)) {
		config.GRIM_KEY = "4";
		config.GRIM_KEY_DESCRIPTION = "Key for grimstrike, find keyboard syntax list here http://robotjs.io/docs/syntax.";
		settingUpdate();
	}
	
	let GRIM_DELAY =0;
	if (("GRIM_DELAY" in config)) {
		GRIM_DELAY = config.GRIM_DELAY;
	}
	if (!("GRIM_DELAY" in config)) {
		config.GRIM_DELAY =0;
		config.GRIM_DELAY_DESCRIPTION = "Delay for how long in milliseconds before RECALL_GRIM macro goes off.";
		settingUpdate();
	}
	
	let TRUE_GRIM_DELAY = false;
	if (("TRUE_GRIM_DELAY" in config)) {
		TRUE_GRIM_DELAY = config.TRUE_GRIM_DELAY;
	}
	if (!("TRUE_GRIM_DELAY" in config)) {
		config.TRUE_GRIM_DELAY = false;
		config.TRUE_GRIM_DELAY_DESCRIPTION = "Turn this option on if grim macro skips recall scythe even with GRIM_DELAY increased.";
		settingUpdate();
	}
	
	let REAPING_X = false;
	if (("REAPING_X" in config)) {
		REAPING_X = config.REAPING_X;
	}
	if (!("REAPING_X" in config)) {
		config.REAPING_X = false;
		config.REAPING_X_DESCRIPTION = "Auto use X_KEY when Shadow Reaping is used. X_KEY must be set. This macro does not work without ROBOTJS.";
		settingUpdate();
	}
	
	let X_KEY = "3";
	if (("X_KEY" in config)) {
		X_KEY = config.X_KEY;
	}
	if (!("X_KEY" in config)) {
		config.X_KEY = "3";
		config.X_KEY_DESCRIPTION = "X Key. Find keyboard syntax list here http://robotjs.io/docs/syntax";
		settingUpdate();
	}
	
	let Y_KEY = X_KEY;
	if (("Y_KEY" in config)) {
		Y_KEY = config.Y_KEY;
	}
	if (!("Y_KEY" in config)) {
		config.Y_KEY = X_KEY;
		config.Y_KEY_DESCRIPTION = "Y Key (keep the same as X_KEY if you don't want a second skill to activate). Find keyboard syntax list here http://robotjs.io/docs/syntax";
		settingUpdate();
	}
	
	let Z_KEY = X_KEY;
	if (("Z_KEY" in config)) {
		Z_KEY = config.Z_KEY;
	}
	if (!("Z_KEY" in config)) {
		config.Z_KEY = X_KEY;
		config.Z_KEY_DESCRIPTION = "Z Key (keep the same as X_KEY if you don't want a second skill to activate). Find keyboard syntax list here http://robotjs.io/docs/syntax";
		settingUpdate();
	}
	
	let GRIM_HARVEST = false;
	if (("GRIM_HARVEST" in config)) {
		GRIM_HARVEST = config.GRIM_HARVEST;
	}
	if (!("GRIM_HARVEST" in config)) {
		config.GRIM_HARVEST = false;
		config.GRIM_HARVEST_DESCRIPTION = "Auto grim strike into dark harvest.";
		settingUpdate();
	}
	
	let HARVEST_KEY = "4";
	if (("HARVEST_KEY" in config)) {
		HARVEST_KEY = config.HARVEST_KEY;
	}
	if (!("HARVEST_KEY" in config)) {
		config.HARVEST_KEY = "4";
		config.HARVEST_KEY_DESCRIPTION = "Key for Dark Harvest, find keyboard syntax list here http://robotjs.io/docs/syntax.";
		settingUpdate();
	}
	
	let SUNDER_RECALL = false;
	if (("SUNDER_RECALL" in config)) {
		SUNDER_RECALL = config.SUNDER_RECALL;
	}
	if (!("SUNDER_RECALL" in config)) {
		config.SUNDER_RECALL = false;
		config.SUNDER_RECALL_DESCRIPTION = "Auto sunder strike into recall scythe.";
		settingUpdate();
	}
	
	let SUNDER_RECALL_DELAY =1000;
	if (("SUNDER_RECALL_DELAY" in config)) {
		SUNDER_RECALL_DELAY = config.SUNDER_RECALL_DELAY;
	}
	if (!("SUNDER_RECALL_DELAY" in config)) {
		config.SUNDER_RECALL_DELAY =1000;
		config.SUNDER_RECALL_DELAY_DESCRIPTION = "Delay before using recall scythe.";
		settingUpdate();
	}
	
	let RECALL_KEY = "4";
	if (("RECALL_KEY" in config)) {
		RECALL_KEY = config.RECALL_KEY;
	}
	if (!("RECALL_KEY" in config)) {
		config.RECALL_KEY = "4";
		config.RECALL_KEY_DESCRIPTION = "Key for recall scythe, find keyboard syntax list here http://robotjs.io/docs/syntax.";
		settingUpdate();
	}


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
	let delayfinish = [];
	let backstabActive = false;

	let msgSuppress;

	let punchCounter =0;
	let clearPunchCounter;

	let soulr1 = false;
	let soulr2;
	let soulr2lock = false;

	let lashCounter =0;
	let clearLashCounter;

	let a1;
	let a2;
	let a3;
	let a4;
	let a5;
	let a6;
	let a7;

	let Ignore1 = false;
	let Ignore2;

	let glyphState = [];

	let curS;
	let curS2;

	let timer2;

	let lastSkillTime = [];
	let lastSkillDelay;
	let lastLastSkill;
	let lastLastSkillDelay;
	let lastSkillStart;
	let lastSkillEvent;
	let RecheckTimer;

	let dashX = false;
	let dashY = false;
	let dashZ = false;

	let sheerBlaze = false;
	let sheerBlaze2;

	let soulend = false;

	let amMoving =0;
	
	let locking = false;
	let locking2;
	let lockz = false;
	let lockz2;

	let time1;
	let time2;
	let time3;
	let time4;

	let xloc;
	let yloc;
	let zloc;
	let wloc;
	let timeloc;

	let grimm;
	let sheerr;
	let spirall;

	let cablestepoff = UNSPOOF_CABLE_STEP;
	let reaping = false;

	let stepX;
	let stepY;

	let telex = false;
	let teley = false;
	let telez = false;
	let telew = false;

	let shadowx;
	let shadowy;
	let shadowz;
	let shadoww;

	let redattack = false;
	let trueredattack = false;
	let spiral2 = false;

	let seed1;
	let seed2;

	let enablered = false;
	let enablered2;

	let roflcheck;

	let isSecondStep = false;
	let isSecondStepTwo;
	let secondStepCounter =0;

	let lastSkill =0;
	let lastEvent = { skill: undefined };
	let lastEventTime;
	let GLOBAL_LOCK_DELAY =250;
	let failsafe =0;

	var atkArr;

	let shadowspeed =1;
	let talentState = [];
	dispatch.hook('S_LOAD_EP_INFO', dispatch.majorPatchVersion >= 96 ? 3 : 1, (event) => {
		if (!enabled) { return };
		talentState = [];
		event.perks.forEach(function (element) {
			talentState[element.id] = element.level;
		});
	});

	dispatch.hook('S_LEARN_EP_PERK', 1, (event) => {
		if (!enabled) { return };
		talentState = [];
		event.perks.forEach(function (element) {
			talentState[element.id] = element.level;
		});
	});
	
	dispatch.hook('TTB_S_LOAD_EP_PAGE', 1, (event) => {
		if (!enabled) { return };
		talentState = [];
		event.perks.forEach(function (element) {
			talentState[element.id] = element.level;
		});
	});

	dispatch.hook('S_LOAD_TOPO', 3, (event) => {
		if (event.zone ==118) {
			enabled = false;
		}
		else {
			enabled = [JOB_REAPER].includes(job);
		}
	});

	dispatch.hook('S_LOGIN', dispatch.majorPatchVersion >= 86 ? 14 : 13, (event) => {
		cid = event.gameId;
		model = event.templateId;

		job = (model -10101) %100;
		enabled = [JOB_REAPER].includes(job);
	});

	dispatch.hook('C_CHAT', 1, (event) => {
		if (event.message.includes("disable8")) {
			enabled = false;
			console.log("Reaper script disabled");
			return false;
		}
		if (event.message.includes("enable8")) {
			enabled = [JOB_REAPER].includes(job);
			console.log("Reaper script enabled if you are currently logged into reaper");
			return false;
		}
		if (event.message.includes("slowgrim1")) {
			SLOW_GRIM = !SLOW_GRIM;
			console.log("Slow Grim is now: "+SLOW_GRIM);
			return false;
		}
	});

	dispatch.hook('C_CHAT', 1, (event) => {
		if (event.message.includes("cablesteptoggle")) {
			cablestepoff = !cablestepoff;
			console.log("Cable step disable is " + cablestepoff);
			return false;
		}
	});

	function abnormalityx(idx, durx) {
		dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
			target: cid,
			source: cid,
			id: idx,
			duration: durx,
			unk: 0,
			stacks: 1,
			unk2: 0,
			unk3: 0,
		});
	}

	function fakeEnd_bs(event, duration) {
		if (timer[lastSkill]) {
			clearTimeout(timer[lastSkill]);
		}
		var d = new Date();
		lastSkillStart = d.getTime();
		lastLastSkillDelay = lastSkillDelay;
		if (finish[lastSkill] == false) {
			force_end(lastEvent,4);
		}
		telex = false;
		teley = false;
		telez = false;
		telew = false;

		if (event.dest.x == 0 || !event.dest.x) {
			event.dest.x = false;
			event.dest.y = false;
			event.dest.z = false;
			stepX = false;
		}
		if (event.dest.x) {
			stepX = event.dest.x;
			stepY = event.dest.y;
		}
		if (event.dest.x && dispatch.majorPatchVersion >= 75 && !CABLE_FIX) {
			setTimeout(function (event, xx, yy, zz, skillx) {
				dispatch.toClient('S_START_INVERSE_CAPTURE', 4, {
					source: cid,
					target: event.targets[0].id,
					unk: 0,
					skill: skillx,
					loc: { x: xx, y: yy, z: zz, },
					success: true,
				});
			}, 450 / aspd, event, event.dest.x, event.dest.y, event.dest.z, event.skill.id);
		}
		clearTimeout(finishcheck[event.skill.id]);
		finish[event.skill.id] = false;
		atkid[event.skill.id] = atkid_base;
		atkid_base--;
		dispatch.toClient('S_ACTION_STAGE', 9, {
			gameId: cid,
			loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
			w: event.w,
			templateId: model,
			skill: event.skill.id,
			stage: 0,
			speed: aspd,
			projectileSpeed: aspd,
			id: atkid[event.skill.id],
			effectScale: 1.0, moving: false, dest: { x: 0, y: 0, z: 0 }, target: 0n, animSeq: [],
		});
		finishcheck[event.skill.id] = setTimeout(function (event) { finish[event.skill.id] = true; }, (duration / aspd), event);
		lastSkillDelay = duration / aspd;
		setTimeout(function (event) {
			lastSkillEvent = {
				gameId: cid,
				loc: {
					x: event.dest.x || event.loc.x,
					y: event.dest.y || event.loc.y,
					z: event.dest.z || event.loc.z
				},
				w: event.w,
				templateId: model,
				skill: event.skill.id,
				type: 0,
				id: atkid[event.skill.id],
			};
		}, duration / aspd, event);
		timer[event.skill.id] = setTimeout(
			function (event) {
				if (lastSkill ==1) { return; }
				if (lastSkill == (S_Soul +30)) { return; }
				dispatch.toClient('S_ACTION_END', 5, {
					gameId: cid,
					loc: {
						x: event.dest.x || event.loc.x,
						y: event.dest.y || event.loc.y,
						z: event.dest.z || event.loc.z
					},
					w: event.w,
					templateId: model,
					skill: event.skill.id,
					type: 0,
					id: atkid[event.skill.id],
				});
			}, duration / aspd, event);
	}

	dispatch.hook('S_START_INVERSE_CAPTURE', 4, (event) => {
		if (!enabled) return;
		if (event.target !== cid) {
			return;
		}
		if (!cablestepoff && !CABLE_FIX) {
			return false;
		}
	});

	function force_end(event, unkz) {
		dispatch.toClient('S_ACTION_END', 5, {
			gameId: cid,
			loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
			w: event.w,
			templateId: model,
			skill: event.skill.id,
			type: unkz, //0x02
			id: atkid[event.skill.id],
		});
	}

	function force_endchain(event, unkz) {
		var skillC = event.skill.id +30;
		dispatch.toClient('S_ACTION_END', 5, {
			gameId: cid,
			loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
			w: event.w,
			templateId: model,
			skill: skillC,
			type: unkz, //0x02
			id: atkid[skillC],
		});
	}

	function stageCheck(event, stagex, movementx, yyy, zzz) {
		dispatch.toClient('S_ACTION_STAGE', 9, {
			gameId: cid,
			loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
			w: event.w,
			templateId: model,
			skill: event.skill.id + zzz,
			stage: stagex,
			speed: aspd * yyy,
			projectileSpeed: aspd * yyy,
			id: atkid[event.skill.id + zzz],
			effectScale: 1.0, moving: false, dest: { x: 0, y: 0, z: 0 }, target: 0n, animSeq: movementx,
		});
	}


	function fakeEnd_sorc_dist(event, duration, dist) {
		//if(dist == undefined) dist =0;
		if (timer[lastSkill]) {
			clearTimeout(timer[lastSkill]);
		}
		clearTimeout(curS);
		clearTimeout(curS2);
		xloc = false;
		var yyy =1;
		if (event.skill.id == S_DSheer && sheerBlaze) {
			yyy = 1.25;
		}
		if ((event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1)) && glyphState[29026] ==1) {
			yyy = 1.25;
		}
		var zzz =0;
		if (event.skill.id == REVERSE_SCYTHE) {
			zzz =30;
		}
		if ((event.skill.id == S_DSheer) && (lastSkill == S_Retri || lastSkill == S_P || lastSkill == S_P2 || lastSkill == S_P3 || lastSkill == S_P4 || lastSkill == S_P5 || lastSkill == S_SLash || lastSkill == (S_SLash +1) || lastSkill == (S_SLash +2) || lastSkill == (S_SLash +3) || lastSkill == S_DSpiral || lastSkill == S_GStrike || lastSkill == S_Whip || lastSkill == S_PStrike) && finish[lastSkill] == false) {
			var zzz =30;
			force_endchain(lastEvent,4);
			finish[lastSkill] = true;
		}
		if ((event.skill.id == S_Sunder) && (lastSkill == S_GStrike || lastSkill == S_DSheer || lastSkill == S_DSpiral) && finish[lastSkill] == false && !redattack) {
			var zzz =30;
			force_endchain(lastEvent,4);
			finish[lastSkill] = true;
			setTimeout(function (event) {
				dispatch.toServer('C_START_SKILL', 7, {
					skill: (event.skill.id +30),
					w: event.w,
					loc: {
						x: event.loc.x,
						y: event.loc.y,
						z: event.loc.z
					},
					dest: {
						x: event.dest.x,
						y: event.dest.y,
						z: event.dest.z
					},
					unk: event.unk,
					moving: event.moving,
					continue: event.continue,
					target: event.target,
					unk2: event.unk2,
				});
			}, 16, event);
			setTimeout(function (event) {
				dispatch.toServer('C_START_SKILL', 7, {
					skill: event.skill.id,
					w: event.w,
					loc: {
						x: event.loc.x,
						y: event.loc.y,
						z: event.loc.z
					},
					dest: {
						x: event.dest.x,
						y: event.dest.y,
						z: event.dest.z
					},
					unk: event.unk,
					moving: event.moving,
					continue: event.continue,
					target: event.target,
					unk2: event.unk2,
				});
			}, 50, event);
			setTimeout(function (event) {
				dispatch.toServer('C_START_SKILL', 7, {
					skill: (event.skill.id +30),
					w: event.w,
					loc: {
						x: event.loc.x,
						y: event.loc.y,
						z: event.loc.z
					},
					dest: {
						x: event.dest.x,
						y: event.dest.y,
						z: event.dest.z
					},
					unk: event.unk,
					moving: event.moving,
					continue: event.continue,
					target: event.target,
					unk2: event.unk2,
				});
			}, 66, event);
			setTimeout(function (event) {
				dispatch.toServer('C_START_SKILL', 7, {
					skill: event.skill.id,
					w: event.w,
					loc: {
						x: event.loc.x,
						y: event.loc.y,
						z: event.loc.z
					},
					dest: {
						x: event.dest.x,
						y: event.dest.y,
						z: event.dest.z
					},
					unk: event.unk,
					moving: event.moving,
					continue: event.continue,
					target: event.target,
					unk2: event.unk2,
				});
			}, 100, event);
			setTimeout(function (event) {
				dispatch.toServer('C_START_SKILL', 7, {
					skill: (event.skill.id +30),
					w: event.w,
					loc: {
						x: event.loc.x,
						y: event.loc.y,
						z: event.loc.z
					},
					dest: {
						x: event.dest.x,
						y: event.dest.y,
						z: event.dest.z
					},
					unk: event.unk,
					moving: event.moving,
					continue: event.continue,
					target: event.target,
					unk2: event.unk2,
				});
			}, 116, event);
		}
		if ((event.skill.id == S_GStrike) && (lastSkill == S_Retri || lastSkill == USELESS_SCYTHE || lastSkill == (USELESS_SCYTHE +30) || lastSkill == REVERSE_SCYTHE || lastSkill == S_Smite || lastSkill == S_Smite2 || lastSkill == S_Smite3 || lastSkill == S_P || lastSkill == S_P2 || lastSkill == S_P3 || lastSkill == S_P4 || lastSkill == S_P5 || lastSkill == S_SLash || lastSkill == (S_SLash +1) || lastSkill == (S_SLash +2) || lastSkill == (S_SLash +3) || lastSkill == S_DSpiral || lastSkill == S_GStrike || lastSkill == S_DSheer || lastSkill == S_Whip || lastSkill == S_PStrike) && finish[lastSkill] == false) {
			var zzz =30;
			force_endchain(lastEvent,4);
			finish[lastSkill] = true;
		}
		if ((event.skill.id == S_GStrike) && (lastSkill == S_Escape) && disabSkill[5656]) {
			var zzz =30;
			force_endchain(lastEvent,4);
			finish[lastSkill] = true;
		}
		if ((event.skill.id == S_Whip) && (lastSkill == S_PStrike) && finish[lastSkill] == false) {
			var zzz =30;
			force_endchain(lastEvent,4);
			finish[lastSkill] = true;
		}
		if (finish[lastSkill] == false && zzz ==0) {
			force_end(lastEvent,4);
			if (lastSkill == S_Sunder || lastSkill == S_GStrike) {
				force_endchain(lastEvent,4);
			}
			finish[lastSkill] = true;
		}
		if (event.skill.id == S_ULTI_2 || event.skill.id == S_Retri || event.skill.id == S_Retri2 || event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3) {
			yyy = 1 / aspd;
		}
		if (event.skill.id == S_Sunder && talentState[900410]) {
			yyy = yyy + (talentState[900410] * (10 /700) + 25 /700);
		}
		if (event.skill.id == S_Whip && talentState[900810]) {
			yyy = yyy + (talentState[900810] * (10 /700) + 25 /700);
		}
		if (event.skill.id == S_SLash && talentState[901110]) {
			yyy = yyy + (talentState[901110] * (10 /700) + 25 /700);
		}
		if ((event.skill.id == S_Smite || event.skill.id == S_Smite2 || event.skill.id == S_Smite3) && talentState[900920]) {
			yyy = yyy + (talentState[900920] * (0.01) + 0.05);
		}
		if ((event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1)) && talentState[901210]) {
			yyy = yyy + (talentState[901210] * (10 /700) + 25 /700);
		}
		if (event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1)) {
			yyy = yyy + shadowspeed -1;
		}
		if ((event.skill.id == S_ShadowBurst || event.skill.id == S_Sunder) && redattack) {
			zzz =31;
			if (event.skill.id == S_ShadowBurst) {
				duration =2350; //KEY=79488765238698
			}
			if (event.skill.id == S_Sunder && reaping) {
				zzz =61;
			}
		}
		if (event.skill.id == S_DSheer && reaping) {
			if (zzz !=30) { zzz = 40; }
			if (zzz ==30) { zzz = 41; }
		}

		if (event.skill.id == S_Sunder && reaping) {
			if (zzz ==0) { zzz = 40; }
			if (zzz ==30) { zzz = 60; }
		}

		if (event.skill.id == S_GStrike && reaping) {
			if (zzz ==0) { zzz = 31; }
			if (zzz ==30) { zzz = 32; }
		}

		if (event.skill.id == S_DSpiral && reaping) {
			if (zzz ==0) { zzz = 40; }
			if (zzz ==30) { zzz = 41; }
		}

		if (event.skill.id == S_Whip && reaping) {
			if (zzz ==0) { zzz = 40; }
			if (zzz ==30) { zzz = 41; }
		}

		if (event.skill.id == S_PStrike && reaping) {
			if (zzz ==0) { zzz = 40; }
			if (zzz ==30) { zzz = 41; }
		}
		clearTimeout(finishcheck[event.skill.id]);
		finish[event.skill.id] = false;
		var d = new Date();
		lastSkillStart = d.getTime();
		lastLastSkillDelay = lastSkillDelay;
		atkid[event.skill.id + zzz] = atkid_base;
		atkid_base--;
		var vvv =0;
		var movementtick = [];
		if (event.skill.id == REVERSE_SCYTHE && amMoving == false) {
			movementtick = [
				{
					duration: 2122,
					xyRate: 1,
					zRate: 1,
					distance: 0
				}
			];
		}
		if (event.skill.id == S_GStrike) {
			if (amMoving == false && zzz != 30 && zzz !=32) {
				duration =3375;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_GStrike) {
						var currentmovement = [{
							duration: 1065,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 2400 / (aspd * yyy), event, yyy, zzz);
				movementtick = [
					{
						duration: 2416,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}
				];
			}
			if (amMoving == true && zzz != 30 && zzz !=32) {
				duration =3375;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_GStrike) {
						var currentmovement = [];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 2400 / (aspd * yyy), event, yyy, zzz);
			}
			if (amMoving == false && (zzz == 30 || zzz ==32)) {
				duration =2425;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_GStrike) {
						var currentmovement = [{
							duration: 1065,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1450 / (aspd * yyy), event, yyy, zzz);
				movementtick = [
					{
						duration: 1450,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}
				];
			}
			if (amMoving == true && (zzz == 30 || zzz ==32)) {
				duration =2425;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_GStrike) {
						var currentmovement = [];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1450 / (aspd * yyy), event, yyy, zzz);
			}
		}
		if (event.skill.id == S_Sunder) {
			if (amMoving == false && zzz != 30 && zzz != 31 && zzz != 41 && zzz != 60 && zzz !=61) {
				duration =3950;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1175 / (aspd * yyy), event, yyy, zzz);
				curS2 = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [];
						stageCheck(event, 2, currentmovement, yyy, zzz);
					}
				}, 2925 / (aspd * yyy), event, yyy, zzz);
			}
			if (amMoving == true && zzz != 30 && zzz != 31 && zzz != 41 && zzz != 60 && zzz !=61) {
				duration =3950;
				curS2 = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1175 / (aspd * yyy), event, yyy, zzz);
				curS2 = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [];
						stageCheck(event, 2, currentmovement, yyy, zzz);
					}
				}, 2925 / (aspd * yyy), event, yyy, zzz);
			}
			if (amMoving == false && (zzz == 30 || zzz == 31 || zzz == 41 || zzz == 60 || zzz ==61)) {
				duration =2780;
				movementtick = [{
					duration: 1757,
					xyRate: 1,
					zRate: 1,
					distance: 0
				}];
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1750 / (aspd * yyy), event, yyy, zzz);
			}
			if (amMoving == true && (zzz == 30 || zzz == 31 || zzz == 41 || zzz == 60 || zzz ==61)) {
				duration =2780;
				curS = setTimeout(function (event, yyy, zzz) {
					if (lastSkill == S_Sunder) {
						var currentmovement = [];
						stageCheck(event, 1, currentmovement, yyy, zzz);
					}
				}, 1750 / (aspd * yyy), event, yyy, zzz);
			}
		}
		if ((event.skill.id == S_P || event.skill.id == (S_P +1)) && amMoving == false) {
			movementtick = [{
				duration: 766,
				xyRate: 1,
				zRate: 1,
				distance: 0
			},
			{
				duration: 346,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if (event.skill.id == S_P2 && amMoving == false) {
			movementtick = [{
				duration: 950,
				xyRate: 1,
				zRate: 1,
				distance: 0
			},
			{
				duration: 346,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if (event.skill.id == S_P3 && amMoving == false) {
			movementtick = [{
				duration: 616,
				xyRate: 1,
				zRate: 1,
				distance: 0
			},
			{
				duration: 346,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if (event.skill.id == S_P4 && amMoving == false) {
			movementtick = [{
				duration: 1150,
				xyRate: 1,
				zRate: 1,
				distance: 0
			},
			{
				duration: 346,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if (event.skill.id == S_P5 && amMoving == false) {
			movementtick = [{
				duration: 2016,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if ((event.skill.id == S_Smite || event.skill.id == S_Smite2 || event.skill.id == S_Smite3) && amMoving == false) {
			movementtick = [{
				duration: 1832,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		if (event.skill.id == S_DSheer && amMoving == false) {
			movementtick = [{
				duration: 2140,
				xyRate: 1,
				zRate: 1,
				distance: 0
			}];
		}
		dispatch.toClient('S_ACTION_STAGE', 9, {
			gameId: cid,
			loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
			w: event.w,
			templateId: model,
			skill: event.skill.id + zzz,
			stage: 0,
			speed: aspd * yyy,
			projectileSpeed: aspd * yyy,
			id: atkid[event.skill.id + zzz],
			effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, animSeq: movementtick,
		});

		var newX;
		var newY;
		var angle = parseFloat(event.w);
		
		if (event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3) {
			yyy =1;
		}


		newX = Math.cos(angle) * dist;
		newY = Math.sin(angle) * dist;
		lastSkillDelay = duration / aspd;
		setTimeout(function () {
			lastSkillEvent = {
				gameId: cid,
				loc: {
					x: event.loc.x + newX,
					y: event.loc.y + newY,
					z: event.loc.z + 2
				},
				w: event.w,
				templateId: model,
				skill: event.skill.id + zzz,
				type: 0,
				id: atkid[event.skill.id + zzz],
			};
		}, duration / (aspd * yyy), event);
		finishcheck[event.skill.id] = setTimeout(function (event) { finish[event.skill.id] = true; }, (duration / aspd), event);
		delayfinish[event.skill.id] = false;
		setTimeout(function (event) { delayfinish[event.skill.id] = true; }, ((duration / aspd) +250), event);
		timer[event.skill.id] = setTimeout(
			function (event) {
				if (lastSkill ==1) { return; }
				if (lastSkill == (S_Soul +30) && event.skill.id != S_Soul) { return; }
				if(lastSkill == S_Cable){ return; }
				if(event.skill.id == S_RETAL && lastSkill != S_RETAL){
					return;
				}
				dispatch.toClient('S_ACTION_END', 5, {
					gameId: cid,
					loc: {
						x: event.loc.x + newX,
						y: event.loc.y + newY,
						z: event.loc.z + 2
					},
					w: event.w,
					templateId: model,
					skill: event.skill.id + zzz,
					type: 0,
					id: atkid[event.skill.id + zzz],
				});
			}, duration / (aspd * yyy), event);
	}


	dispatch.hook('S_CREST_INFO', 2, (event) => {
		if (!enabled) { return };
		event.crests.forEach(function (element) {
			glyphState[element.id] = element.enable;
		});
	});

	dispatch.hook('S_SYSTEM_MESSAGE', 1, (event) => {
		if (!enabled) { return };
		if ((event.message == '@2059' || event.message == '@36') && msgSuppress == event.message) {
			return false;
		}
		msgSuppress = event.message;
	});

	dispatch.hook('S_CREST_APPLY', 2, (event) => {
		if (!enabled) { return };
		glyphState[event.id] = event.enable;
	});

	dispatch.hook('C_START_TARGETED_SKILL', 7, (event) => {
		if (!enabled) return;

		if (event.skill.id == S_Cable && (/*lastSkill == S_Sunder || */lastSkill == S_Step) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_ULTI_1 && event.skill.id != S_Cable && event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_DSpiral && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_Escape && event.skill.id != S_PStrike && event.skill.id != S_Soul && event.skill.id != S_Step && event.skill.id != REVERSE_SCYTHE && lastSkill == S_Sunder && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Sunder && event.skill.id != S_ShadowBurst && event.skill.id != S_Cable && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_GStrike  && event.skill.id != S_PStrike && event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_Escape && lastSkill == REVERSE_SCYTHE && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_P && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_DSpiral && event.skill.id != S_PStrike && !(event.skill.id == S_ShadowBurst && redattack) && !(event.skill.id == S_Sunder && redattack) && (lastSkill == S_P || lastSkill == S_P2) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_P && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_DSpiral && event.skill.id != S_PStrike && !(event.skill.id == S_ShadowBurst && redattack) && !(event.skill.id == S_Sunder && redattack) && event.skill.id != S_DSheer && event.skill.id != S_GStrike && (lastSkill == S_P3 || lastSkill == S_P4 || lastSkill == S_P5) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_ULTI_1 +30) {
			event.skill.id = S_ULTI_1;
		}

		if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
		if (!disabSkill[event.skill.id]) {
			//amMoving = event.unk2;
			lastSkillDelay =999999;
			setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },25);
			setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },50);
			setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },75);
			setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },100);
			if (job == JOB_REAPER && event.skill.id != S_P) {
				punchCounter =0;
			}
			//if(job == JOB_REAPER && event.skill.id != S_SLash){
			//  lashCounter =0;
			//}

			if (job == JOB_REAPER && event.skill.id == S_ULTI_1) {
				disabSkill[event.skill.id] = true;
				setTimeout(function () { disabSkill[S_ULTI_1] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_ULTI_1_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_ULTI_3) {
				disabSkill[event.skill.id] = true;
				setTimeout(function () { disabSkill[S_ULTI_3] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_ULTI_3_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_Cable && !cablestepoff) {
				if (cablestepoff) {
					finish[S_Cable] = false;
					finishcheck[S_Cable] = setTimeout(function () { finish[S_Cable] = true; }, (S_Cable_D / aspd));
				}
				if (!cablestepoff) {
					disabSkill[event.skill.id] = true;
					var timer = setTimeout(function () { disabSkill[S_Cable] = false; }, GLOBAL_LOCK_DELAY *2);
					fakeEnd_bs(event, S_Cable_D);
					if (glyphState[29036] == 1 && event.dest.x !=0) {
						//aspd = aspd + 0.5;
					}
				}
			}
			if (job == JOB_REAPER && event.skill.id == S_Cable && cablestepoff) {
				finish[S_Cable] = false;
				//finishcheck[S_Cable] = setTimeout(function () { finish[S_Cable] = true; }, (S_Cable_D / aspd));
				try {
					if (timer[lastSkill]) {
						clearTimeout(timer[lastSkill]);
					}
				}
				catch (e) { }
			}
			clearTimeout(finishcheck[lastSkill]);
			finish[lastSkill] = true;
			lastLastSkill = lastSkill;
			lastSkill = event.skill.id;
			lastEvent = event;
		}
	});

	dispatch.hook('S_EACH_SKILL_RESULT', dispatch.majorPatchVersion >= 86 ? 14 : 13, (event) => {
		if(event.target === cid) {
			if (event.reaction.enable == true) {
				lastSkill =1;
			}
		}
	});

	dispatch.hook('C_START_COMBO_INSTANT_SKILL', 6, (event) => {
		if (!enabled) return;

		if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
		if (!disabSkill[event.skill.id]) {
			//amMoving = event.unk2;
			lastSkillDelay =999999;
			setTimeout(function () { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); },25);
			setTimeout(function () { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); },50);
			setTimeout(function () { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); },75);
			setTimeout(function () { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); },100);
			if (job == JOB_REAPER && event.skill.id != S_P) {
				punchCounter =0;
			}
			if (job == JOB_REAPER && event.skill.id != S_SLash) {
				lashCounter =0;
			}
			lastLastSkill = lastSkill;
			lastSkill = event.skill.id;
			lastEvent = event;
		}

	});

	dispatch.hook('S_INSTANT_MOVE', 3, (event) => {
		if (!enabled) { return };
		if(event.gameId === cid) {
			telex = event.loc.x;
			teley = event.loc.y;
			telez = event.loc.z;
			telew = event.w;
		}
	});

	dispatch.hook('C_START_INSTANCE_SKILL', 7, (event) => {
		if (!enabled) return;

		if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
		if (!disabSkill[event.skill.id]) {
			//amMoving = event.unk2;
			lastSkillDelay =999999;
			setTimeout(function () { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); },25);
			setTimeout(function () { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); },50);
			setTimeout(function () { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); },75);
			setTimeout(function () { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); },100);
			if (job == JOB_REAPER && event.skill.id != S_P) {
				punchCounter =0;
			}
			if (job == JOB_REAPER && event.skill.id != S_SLash) {
				lashCounter =0;
			}
			lastLastSkill = lastSkill;
			lastSkill = event.skill.id;
			lastEvent = event;
		}
	});

	function repeater(key, trigger) {
		if (lastSkill == trigger && failsafe <40) {
			failsafe++;
			var robot17 = require("robotjs");
			robot17.keyTap(key);
			setTimeout(function (key, trigger) { repeater(key, trigger); }, 50, key, trigger);
		}
	}

	dispatch.hook('S_ABNORMALITY_BEGIN', 4, (event) => {
		if (!enabled) return;
		if (event.target !== cid) {
			return;
		}
		if (event.id == 10151020 || event.id == 10151021 || event.id == 10151022 || event.id ==10151023) {
			return false;
		}
		if (event.id ==10151250) {
			redattack = true;
			trueredattack = true;
		}
		if (event.id ==10151010) {
			reaping = true;
		}
		if (event.id ==10151131) {
			spiral2 = true;
		}
		if (event.id > 89020200 && event.id <89020211) {
			shadowspeed = (event.id -89020201) * 0.05 + 1.2;
		}
	});

	dispatch.hook('S_ABNORMALITY_END', 1, (event) => {
		if (!enabled) return;
		if (event.target !== cid) {
			return;
		}
		if (event.id ==10151250) {
			redattack = false;
			trueredattack = false;
		}
		if (event.id ==10151010) {
			reaping = false;
		}
		if (event.id ==10151131) {
			spiral2 = false;
		}
		if (event.id > 89020200 && event.id <89020211) {
			shadowspeed =1;
		}
	});

	dispatch.hook('S_CREST_MESSAGE', 2, { order: -99999 }, (event) => {
		if (!enabled) { return };
		if (event.type ==6) {
			disabSkill[S_GStrike] = false;
		}
	});


	dispatch.hook('C_START_SKILL', 7, (event) => {
		if (!enabled) return;
		lastSkillDelay =999999;

		if (event.skill.id == (S_P +1)) {
			event.skill.id = S_P;
		}

		if (event.skill.id == S_PStrike && lastSkill == S_PStrike && finish[lastSkill] == false) {
			return false;
		}
		
		if((event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3) && lockz){
			return false;
		}
		
		if((event.skill.id == S_Smite2 || event.skill.id == S_Smite3) && locking){
			return false;
		}

		if (event.skill.id == S_Sunder_Reap_Chain) {
			event.skill.id = S_Sunder;
		}

		if (event.skill.id == (S_Sunder +30)) {
			return false;
		}

		if (event.skill.id == S_Soul && soulr1 == true) {
			lastSkill = (S_Soul +30);
			return;
		}

		if (lastSkill == S_GStrike && event.skill.id == S_GStrike && SLOW_GRIM && seed1) {
			return false;
		}

		if (soulend && event.skill.id != REVERSE_SCYTHE && event.skill.id != S_PStrike && event.skill.id != S_DSpiral && event.skill.id != S_Escape && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_Step) {
			return false;
		}

		if (soulr2lock && (event.skill.id == S_Smite || event.skill.id == S_Smite2 || event.skill.id == S_Smite3 || event.skill.id == S_SLash || event.skill.id == (S_SLash +1) || event.skill.id == (S_SLash +2) || event.skill.id == (S_SLash +3) || event.skill.id == S_DSheer || event.skill.id == S_Whip || event.skill.id == S_GStrike || event.skill.id == S_P || event.skill.id == (S_P +1) || event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1))) {
			return false;
		}

		if (event.skill.id == S_Whip && (lastSkill == S_Sunder || lastSkill == S_DSpiral || lastSkill == S_GStrike || lastSkill == S_Smite2 || lastSkill == S_Smite3 || lastSkill == S_Smite) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_Sunder && !redattack && lastSkill != S_DSpiral && lastSkill != S_DSheer && lastSkill != S_GStrike && finish[lastSkill] == false) {
			return false;
		}

		if ((event.skill.id == S_Smite2 || event.skill.id == S_Smite3 || event.skill.id == S_Smite) && (lastSkill == S_Cable || lastSkill == S_SLash || lastSkill == (S_SLash +1) || lastSkill == (S_SLash +2) || lastSkill == (S_SLash +3) || lastSkill == S_ShadowBurst || lastSkill == (S_ShadowBurst +1) || lastSkill == S_Sunder || lastSkill == S_DSpiral || lastSkill == S_DSheer || lastSkill == S_GStrike || lastSkill == S_Whip || lastSkill == S_PStrike) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_DSheer && (lastSkill == S_ShadowBurst || lastSkill == (S_ShadowBurst +1) || lastSkill == S_Cable) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_GStrike && (lastSkill == S_ShadowBurst || lastSkill == (S_ShadowBurst +1) || lastSkill == S_Cable) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_P && lastSkill != S_P && lastSkill != S_P2 && lastSkill != S_P3 && lastSkill != S_P4 && lastSkill != S_P5 && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_ShadowBurst && !redattack && (lastSkill == S_SLash || lastSkill == S_Cable || lastSkill == S_Smite2 || lastSkill == S_Smite3 || lastSkill == S_Smite || lastSkill == S_Sunder || lastSkill == S_DSpiral || lastSkill == S_Whip || lastSkill == S_GStrike || lastSkill == S_DSheer || lastSkill == S_PStrike) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == REVERSE_SCYTHE && !(lastSkill == S_Sunder /*&& redattack*/) && lastSkill != S_GStrike && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_SLash && (lastSkill == S_Whip || (lastSkill == S_GStrike && lashCounter ==0) || (lastSkill == S_DSheer && lashCounter ==0) || lastSkill == S_PStrike || (lastSkill == S_DSpiral && lashCounter ==0) || lastSkill == S_ShadowBurst) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Cable && !(event.skill.id == S_ShadowBurst && redattack) && event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_DSpiral && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_Escape && event.skill.id != S_PStrike && event.skill.id != S_Soul && event.skill.id != S_Step && event.skill.id != REVERSE_SCYTHE && event.skill.id != USELESS_SCYTHE && lastSkill == S_Sunder && finish[lastSkill] == false) {
			return false;
		}

		if ((event.skill.id != S_DSpiral || !spiral2) && event.skill.id != S_Sunder && event.skill.id != S_ShadowBurst && event.skill.id != S_Cable && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_GStrike && event.skill.id != S_PStrike && event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_Escape && lastSkill == REVERSE_SCYTHE && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_P && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_DSpiral && event.skill.id != S_PStrike && !(event.skill.id == S_ShadowBurst && redattack) && !(event.skill.id == S_Sunder && redattack) && (lastSkill == S_P || lastSkill == S_P2) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id != S_Reaping && event.skill.id != S_Reaping_2 && event.skill.id != S_Reaping_3 && event.skill.id != S_P && event.skill.id != S_Step && event.skill.id != S_Retri && event.skill.id != S_Retri2 && event.skill.id != S_DSpiral && event.skill.id != S_PStrike && !(event.skill.id == S_ShadowBurst && redattack) && !(event.skill.id == S_Sunder && redattack) && event.skill.id != S_DSheer && event.skill.id != S_GStrike && (lastSkill == S_P3 || lastSkill == S_P4 || lastSkill == S_P5) && finish[lastSkill] == false) {
			return false;
		}

		if (event.skill.id == S_Soul && finish[lastSkill] == false) {
			return false;
		}
		
		if(event.skill.id == S_PStrike && (lastSkill == S_ULTI_1 || lastSkill == S_ULTI_2 || lastSkill == S_ULTI_3) && finish[lastSkill] == false){
			return false;
		}

		if (event.skill.id == S_Step && (lastSkill == S_Smite2 || lastSkill == S_Smite3 || lastSkill == S_Smite) && finish[lastSkill] == false) {
			//return;
		}

		if (finish[S_Cable] == false && cablestepoff/* && event.skill.id == S_Step*/) {
			finish[S_Cable] = true;
			lastEvent.skill.id = S_Cable;
			lastEvent.loc.x = event.loc.x;
			lastEvent.loc.y = event.loc.y;
			lastEvent.loc.z = event.loc.z;
			force_end(lastEvent,4);
		}

		if (lastSkill == S_ShadowBurst && finish[lastSkill] == false && event.skill.id == S_ShadowBurst) {
			event.skill.id = (S_ShadowBurst +1);
		}

		if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
		if (!disabSkill[event.skill.id]) {
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151020,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151021,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151022,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151023,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151040,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151041,
			});
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: 10151042,
			});
			amMoving = event.moving;
			msgSuppress =0;
			var xzzy = event.skill.type === 1 && event.skill.id <= 999999 && BLACKLIST.indexOf(event.skill.id) === -1;
			if (xzzy && event.skill.id != S_RETAL && event.skill.id != S_P && event.skill.id != (S_P +1) && event.skill.id != S_Sunder && event.skill.id != S_DSpiral) {
				clearTimeout(a1);
				clearTimeout(a2);
				clearTimeout(a3);
				clearTimeout(a4);
				clearTimeout(a5);
				clearTimeout(a6);
				clearTimeout(a7);
				a1 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },25);
				a2 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },50);
				a3 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },75);
				if(event.skill.id != S_Soul){
					a4 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },100);
					a5 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },125);
					a6 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },150);
					a7 = setTimeout(function () { dispatch.toServer('C_START_SKILL', 7, event); },170);
				}
			}
			if (job == JOB_REAPER && event.skill.id != S_P && event.skill.id != (S_P +1)) {
				punchCounter =0;
			}
			if (job == JOB_REAPER && (event.skill.id == S_P || event.skill.id == (S_P +1))) {
				if (punchCounter ==0) {
					event.skill.id = S_P;
				}
				if (punchCounter ==1) {
					event.skill.id = S_P2;
				}
				if (punchCounter ==2) {
					event.skill.id = S_P3;
				}
				if (punchCounter ==3) {
					event.skill.id = S_P4;
				}
				if (punchCounter ==4) {
					event.skill.id = S_P5;
				}
			}

			if (job == JOB_REAPER && event.skill.id == S_P) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_P] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_P_D);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151020,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearPunchCounter);
				punchCounter =1;
				clearPunchCounter = setTimeout(function () { punchCounter = 0; }, S_P_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_P2) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_P2] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_P2_D);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151021,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearPunchCounter);
				punchCounter =2;
				clearPunchCounter = setTimeout(function () { punchCounter = 0; }, S_P2_D);
			}
			if (job == JOB_REAPER && event.skill.id == S_P3) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_P3] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_P3_D);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151022,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearPunchCounter);
				punchCounter =3;
				clearPunchCounter = setTimeout(function () { punchCounter = 0; }, S_P3_D);
			}
			if (job == JOB_REAPER && event.skill.id == S_P4) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_P4] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_P4_D);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151023,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearPunchCounter);
				punchCounter =4;
				clearPunchCounter = setTimeout(function () { punchCounter = 0; }, S_P4_D);
			}
			if (job == JOB_REAPER && event.skill.id == S_P5) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_P5] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_P5_D);
				clearTimeout(clearPunchCounter);
				punchCounter =0;
				clearPunchCounter = setTimeout(function () { punchCounter = 0; }, S_P5_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_DSheer) {
				disabSkill[event.skill.id] = true;
				sheerr = setTimeout(function () { disabSkill[S_DSheer] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_DSheer_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_Sunder) {
				if(finish[S_Sunder] == false && (lastSkill == USELESS_SCYTHE || lastSkill == (USELESS_SCYTHE +30))){
					clearTimeout(curS);
					clearTimeout(curS2);
					if (timer[S_Sunder]) {
						clearTimeout(timer[S_Sunder]);
					}
					finish[S_Sunder] = true;
				}
				abnormalityx(10151221,1795);
				clearTimeout(enablered2);
				enablered = true;
				enablered2 = setTimeout(function () { enablered = false; },3000);
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Sunder] = false; }, GLOBAL_LOCK_DELAY *4);
				fakeEnd_sorc_dist(event,10000);
			}

			if (job == JOB_REAPER && event.skill.id == REVERSE_SCYTHE && enablered) {
				abnormalityx(10151250,3000);
				redattack = true;
				setTimeout(function () {
					if (trueredattack == false && redattack == true) {
						redattack = false;
						dispatch.toClient('S_ABNORMALITY_END', 1, {
							target: cid,
							id: 10151250,
						});
					}
				},500);
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[REVERSE_SCYTHE] = false; }, GLOBAL_LOCK_DELAY *2);
				fakeEnd_sorc_dist(event, REVERSE_SCYTHE_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_ULTI_2) {
				disabSkill[event.skill.id] = true;
				setTimeout(function () { disabSkill[S_ULTI_2] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_ULTI_2_D);
			}

			if (job == JOB_REAPER && (event.skill.id == USELESS_SCYTHE || event.skill.id == (USELESS_SCYTHE +30))) {
				//finish[USELESS_SCYTHE] = false;
				/*if (timer[lastSkill]) {
					clearTimeout(timer[lastSkill]);
				}
				clearTimeout(curS);
				clearTimeout(curS2);
				xloc = false;*/
				if (RECALL_GRIM && !TRUE_GRIM_DELAY && (!reaping || !NO_RECALL_GRIM_IN_REAPING)) {
					setTimeout(function(event){
					failsafe =0;
					lastSkill = event.skill.id;
					repeater(GRIM_KEY, USELESS_SCYTHE);
					repeater(GRIM_KEY, (USELESS_SCYTHE +30));
					}, GRIM_DELAY, event);
				}
			}

			if (job == JOB_REAPER && event.skill.id == S_GStrike) {
				if(finish[S_GStrike] == false && (lastSkill == USELESS_SCYTHE || lastSkill == (USELESS_SCYTHE +30))){
					if (timer[S_GStrike]) {
						clearTimeout(timer[S_GStrike]);
					}
					finish[S_GStrike] = true;
				}
				abnormalityx(10151221,1795);
				clearTimeout(enablered2);
				enablered = true;
				enablered2 = setTimeout(function () { enablered = false; },3000);
				if (!SLOW_GRIM) {
					disabSkill[event.skill.id] = true;
				}
				clearTimeout(grimm);
				grimm = setTimeout(function () { disabSkill[S_GStrike] = false; }, (GLOBAL_LOCK_DELAY * 3 / aspd));
				fakeEnd_sorc_dist(event,10000);
				if (glyphState[29010] ==1) {
					clearTimeout(sheerBlaze2);
					sheerBlaze = true;
					sheerBlaze2 = setTimeout(function () { sheerBlaze = false; },5000);
				}
				seed1 = true;
				clearTimeout(seed2);
				seed2 = setTimeout(function () { seed1 = false; }, SLOW_GRIM_AMOUNT / aspd);
			}

			if (job == JOB_REAPER && event.skill.id == S_DSpiral) {
				disabSkill[event.skill.id] = true;
				spirall = setTimeout(function () { disabSkill[S_DSpiral] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_DSpiral_D);
				spiral2 = !spiral2;
			}

			if (job == JOB_REAPER && event.skill.id == S_Whip) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Whip] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Whip_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_Smite) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Smite] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_Smite_D, S_Smite_Dist);
			}
			if (job == JOB_REAPER && event.skill.id == S_Smite2) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Smite2] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_Smite_D, S_Smite_Dist);
			}
			
			if (job == JOB_REAPER && event.skill.id == S_Smite3) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Smite3] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_Smite_D, S_Smite_Dist);
			}

			if (job == JOB_REAPER && event.skill.id == S_PStrike) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_PStrike] = false; }, GLOBAL_LOCK_DELAY *3);
				fakeEnd_sorc_dist(event, S_PStrike_D, S_PStrike_Dist);
			}

			if (job == JOB_REAPER && event.skill.id == S_SLash) {
				if (lashCounter ==0) {
					event.skill.id = S_SLash;
					if ((lastSkill == S_Smite2 || lastSkill == S_Smite3 || lastSkill == S_Smite) && finish[lastSkill] == false) {
						return false;
					}
				}
				if (lashCounter ==1) {
					event.skill.id = (S_SLash +1);
				}
				if (lashCounter ==2) {
					event.skill.id = (S_SLash +2);
				}
				if (lashCounter ==3) {
					event.skill.id = (S_SLash +3);
				}
			}
			if (job == JOB_REAPER && event.skill.id == S_SLash) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_SLash] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_SLash_Df);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151040,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearLashCounter);
				lashCounter =1;
				//clearLashCounter = setTimeout(function(){lashCounter = 0;}, S_SLash_Df);
			}

			if (job == JOB_REAPER && event.skill.id == (S_SLash +1)) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[(S_SLash +1)] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_SLash_Ds);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151041,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearLashCounter);
				lashCounter =2;
				//clearLashCounter = setTimeout(function(){lashCounter = 0;}, S_SLash_Ds);
			}

			if (job == JOB_REAPER && event.skill.id == (S_SLash +2)) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[(S_SLash +2)] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_SLash_Ds);
				dispatch.toClient('S_ABNORMALITY_BEGIN', 4, {
					target: cid,
					source: cid,
					id: 10151042,
					duration: 2000,
					unk: 0,
					stacks: 1,
					unk2: 0,
					unk3: 0,
				});
				clearTimeout(clearLashCounter);
				lashCounter =3;
				//clearLashCounter = setTimeout(function(){lashCounter = 0;}, S_SLash_Ds);
			}

			if (job == JOB_REAPER && event.skill.id == (S_SLash +3)) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[(S_SLash +3)] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_SLash_Ds);
				clearTimeout(clearLashCounter);
				lashCounter =0;
				//clearLashCounter = setTimeout(function(){lashCounter = 0;}, S_SLash_Ds);
			}

			if (job == JOB_REAPER && event.skill.id == S_ShadowBurst) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_ShadowBurst] = false; }, GLOBAL_LOCK_DELAY *3);
				shadowx = event.loc.x;
				shadowy = event.loc.y;
				shadowz = event.loc.z;
				shadoww = event.w;
				fakeEnd_sorc_dist(event, S_ShadowBurst_D);
			}

			if (job == JOB_REAPER && event.skill.id == (S_ShadowBurst +1)) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[(S_ShadowBurst +1)] = false; }, GLOBAL_LOCK_DELAY *2);
				fakeEnd_sorc_dist(event, S_ShadowBurst_D2);
			}

			if (job == JOB_REAPER && (event.skill.id == S_Retri || event.skill.id == S_Retri2)) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function (event) { disabSkill[event.skill.id] = false; }, GLOBAL_LOCK_DELAY, event);
				fakeEnd_sorc_dist(event, S_Retri_D);
			}

			if (job == JOB_REAPER && event.skill.id == S_Reaping) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Reaping] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Reaping_D);
				if (REAPING_X) {
					var robot19 = require("robotjs");
					robot19.keyTap(X_KEY);
					robot19.keyTap(Y_KEY);
					robot19.keyTap(Z_KEY);
				}
			}
			
			if (job == JOB_REAPER && event.skill.id == S_Reaping_2) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Reaping_2] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Reaping_D);
				if (REAPING_X) {
					var robot19 = require("robotjs");
					robot19.keyTap(X_KEY);
					robot19.keyTap(Y_KEY);
					robot19.keyTap(Z_KEY);
				}
			}
			
			if (job == JOB_REAPER && event.skill.id == S_Reaping_3) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Reaping_3] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Reaping_D);
				if (REAPING_X) {
					var robot19 = require("robotjs");
					robot19.keyTap(X_KEY);
					robot19.keyTap(Y_KEY);
					robot19.keyTap(Z_KEY);
				}
			}

			if (job == JOB_REAPER && event.skill.id == S_Escape) {
				disabSkill[5656] = true;
				setTimeout(function(){ disabSkill[5656] = false;},8000);
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Escape] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Escape_D, S_Escape_Dist);
			}

			if (!isSecondStep) {
				secondStepCounter =0;
			}

			if (job == JOB_REAPER && event.skill.id == S_Step && secondStepCounter <1) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Step] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Step_D, S_Step_Dist);
				if (isSecondStep) {
					secondStepCounter++;
				}
				if (!isSecondStep) {
					clearTimeout(isSecondStepTwo);
					isSecondStep = true;
					isSecondStepTwo = setTimeout(function () { isSecondStep = false; },4000);
				}
			}

			if (job == JOB_REAPER && event.skill.id == S_Soul) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_Soul] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_Soul_D);
				soulr1 = true;
			}

			if (job == JOB_REAPER && event.skill.id == S_RETAL) {
				disabSkill[event.skill.id] = true;
				var timer2 = setTimeout(function () { disabSkill[S_RETAL] = false; }, GLOBAL_LOCK_DELAY);
				fakeEnd_sorc_dist(event, S_RETAL_D,0);
			}
			if (event.skill.id != S_GStrike) {
				clearTimeout(grimm);
				disabSkill[S_GStrike] = false;
			}
			if (event.skill.id != S_DSheer) {
				clearTimeout(sheerr);
				disabSkill[S_DSheer] = false;
			}
			if (event.skill.id != S_DSpiral) {
				clearTimeout(spirall);
				disabSkill[S_DSpiral] = false;
			}
			if(lastSkill != event.skill.id){
				lastLastSkill = lastSkill;
			}
			lastSkill = event.skill.id;
			lastEvent = event;
			if (GRIM_HARVEST && event.skill.id == S_GStrike) {
					setTimeout(function(event){
					failsafe =0;
					repeater(HARVEST_KEY, S_GStrike);
					}, 0, event);
				}
			if (SUNDER_RECALL && event.skill.id == S_Sunder) {
					setTimeout(function(event){
					failsafe =0;
					repeater(RECALL_KEY, S_Sunder);
					}, SUNDER_RECALL_DELAY / aspd, event);
				}
		}
	});
	
		dispatch.hook('C_NOTIMELINE_SKILL', 3, (event) => {
			if (!enabled) return;
			if (job == JOB_REAPER && event.skill.id == S_Escape) {
				disabSkill[5656] = true;
				setTimeout(function(){ disabSkill[5656] = false;},8000);
				lastSkill = event.skill.id;
			}
	});

	dispatch.hook('S_ACTION_STAGE', 9, (event) => {
	  //console.log("test: " + event.skill == 67119608);
		if (!enabled) return;
		if(event.gameId === cid) {
			var d = new Date();
			lastSkillTime[1] = d.getTime();
			lastSkillTime[3] = event.skill.id;
			var xzzy = event.skill.type ===1;
			if (!xzzy) {
				lastSkill =1;
			}
			if (job == JOB_REAPER && (event.skill.id == S_P || event.skill.id == S_P2 || event.skill.id == S_P3 || event.skill.id == S_P4 || event.skill.id == S_P5)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_1 || event.skill.id == (S_ULTI_1 +30))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_2)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_3)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_DSheer || event.skill.id == (S_DSheer +30) || event.skill.id == (S_DSheer +40) || event.skill.id == (S_DSheer +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Sunder || event.skill.id == (S_Sunder +30) || event.skill.id == (S_Sunder +31) || event.skill.id == (S_Sunder +40) || event.skill.id == (S_Sunder +41) || event.skill.id == (S_Sunder +60) || event.skill.id == (S_Sunder +61))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_GStrike || event.skill.id == (S_GStrike +30) || event.skill.id == (S_GStrike +31) || event.skill.id == (S_GStrike +32))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_DSpiral || event.skill.id == (S_DSpiral +30) || event.skill.id == (S_DSpiral +31) || event.skill.id == (S_DSpiral +40) || event.skill.id == (S_DSpiral +41) || event.skill.id == (S_DSpiral +42))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Whip || event.skill.id == (S_Whip +30) || event.skill.id == (S_Whip +40) || event.skill.id == (S_Whip +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Smite2 || event.skill.id == S_Smite3 || event.skill.id == S_Smite)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == REVERSE_SCYTHE || event.skill.id == (REVERSE_SCYTHE +30))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_PStrike || event.skill.id == (S_PStrike +30) || event.skill.id == (S_PStrike +40) || event.skill.id == (S_PStrike +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_SLash || event.skill.id == (S_SLash +1) || event.skill.id == (S_SLash +2) || event.skill.id == (S_SLash +3))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1) || event.skill.id == (S_ShadowBurst +30) || event.skill.id == (S_ShadowBurst +31))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Retri || event.skill.id == S_Retri2)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Escape)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Step || event.skill.id == (S_Step +30)) && lastSkill == S_Step) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Step || event.skill.id == (S_Step +30)) && lastSkill != S_Step) {
				if (timer[lastSkill]) {
					clearTimeout(timer[lastSkill]);
				}
				clearTimeout(finishcheck[lastSkill]);
				finish[lastSkill] = true;
				lastSkill = S_Step;
				roflcheck = true;
				timer[S_Step] = setTimeout(
					function (event) {
						var angle = parseFloat(event.w);
						var newX;
						var newY;

						newX = Math.cos(angle) * S_Step_Dist;
						newY = Math.sin(angle) * S_Step_Dist;
						if (lastSkill ==1) { return; }
						dispatch.toClient('S_ACTION_END', 5, {
							gameId: cid,
							loc: {
								x: event.loc.x + newX,
								y: event.loc.y + newY,
								z: event.loc.z + 2
							},
							w: event.w,
							templateId: model,
							skill: event.skill.id,
							type: 0,
							id: event.id,
						});
					}, S_Step_D / aspd, event);
			}
			if (job == JOB_REAPER && (event.skill.id == S_Cable) && !cablestepoff) {
				return false;
			}
			if (event.skill.id == S_Cable) {
				lastSkill = S_Cable;
				atkid[S_Cable] = event.id;
			}
			if (job == JOB_REAPER && (event.skill.id == S_RETAL)) {
				if (Ignore1) {
					fakeEnd_sorc_dist(event, S_RETAL_D,0);
					lastSkill = S_RETAL;
				}
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Soul)) {
				return false;
			}
			if (job == JOB_REAPER && event.skill.id == (S_Soul +30)) {
				soulend = true;
				setTimeout(function () { soulend = false },3000);
				soulr2lock = true;
			}
			if (event.skill.id ==130140) {
				soulend = true;
				setTimeout(function () { soulend = false },3000);
			}
			if (event.skill.id == USELESS_SCYTHE || event.skill.id == (USELESS_SCYTHE +30)) {
				if (RECALL_GRIM && TRUE_GRIM_DELAY && (!reaping || !NO_RECALL_GRIM_IN_REAPING)) {
					setTimeout(function(event){
					failsafe =0;
					lastSkill = event.skill.id;
					repeater(GRIM_KEY, USELESS_SCYTHE);
					repeater(GRIM_KEY, (USELESS_SCYTHE +30));
					}, 0, event);
				}
				finish[USELESS_SCYTHE] = false;
				if(lastSkill == USELESS_SCYTHE || lastSkill == (USELESS_SCYTHE +30)){
					if (timer[lastSkill]) {
						clearTimeout(timer[lastSkill]);
					}
					clearTimeout(curS);
					clearTimeout(curS2);
					xloc = false;
				}
				if (lastSkill != USELESS_SCYTHE && lastSkill != (USELESS_SCYTHE +30)) {
					return false;
				}
			}
		}
	});

	dispatch.hook('S_ACTION_END', 5, (event) => {
	  if(event.skill == 67108232) console.log("error");
		if (!enabled) return;
		if(event.gameId === cid) {
			var d = new Date();
			lastSkillTime[2] = d.getTime();
			if (((lastSkillTime[2] - lastSkillTime[1]) > lastLastSkillDelay) && (event.skill.id == lastLastSkill || event.skill.id == lastLastSkill +30) && (lastLastSkill == lastSkillTime[3] || lastLastSkill == (lastSkillTime[3] -30))) {
				if (lastSkill != S_OP && lastSkill != S_Roll && lastLastSkill != S_OP) {
					clearTimeout(timer[lastSkill]);
				}
				RecheckTimer = setTimeout(function () {
					if (lastSkill == S_OP || lastLastSkill == S_OP || lastSkill == S_Roll) { return; }
					/*dispatch.toClient('S_ACTION_END', 5, lastSkillEvent);*/
				}, (lastSkillDelay + lastSkillStart - lastSkillTime[1] - lastLastSkillDelay));
			}
			if (job == JOB_REAPER && (event.skill.id == S_P || event.skill.id == S_P2 || event.skill.id == S_P3 || event.skill.id == S_P4 || event.skill.id == S_P5)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_1 || event.skill.id == (S_ULTI_1 +30))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_2)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ULTI_3)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_DSheer || event.skill.id == (S_DSheer +30) || event.skill.id == (S_DSheer +40) || event.skill.id == (S_DSheer +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Sunder || event.skill.id == (S_Sunder +30) || event.skill.id == (S_Sunder +31) || event.skill.id == (S_Sunder +40) || event.skill.id == (S_Sunder +41) || event.skill.id == (S_Sunder +60) || event.skill.id == (S_Sunder +61))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_GStrike || event.skill.id == (S_GStrike +30) || event.skill.id == (S_GStrike +31) || event.skill.id == (S_GStrike +32))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_DSpiral || event.skill.id == (S_DSpiral +30) || event.skill.id == (S_DSpiral +31) || event.skill.id == (S_DSpiral +40) || event.skill.id == (S_DSpiral +41) || event.skill.id == (S_DSpiral +42))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Whip || event.skill.id == (S_Whip +30) || event.skill.id == (S_Whip +40) || event.skill.id == (S_Whip +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Smite2 || event.skill.id == S_Smite3 || event.skill.id == S_Smite)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == REVERSE_SCYTHE || event.skill.id == (REVERSE_SCYTHE +30))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_PStrike || event.skill.id == (S_PStrike +30) || event.skill.id == (S_PStrike +40) || event.skill.id == (S_PStrike +41))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_SLash || event.skill.id == (S_SLash +1) || event.skill.id == (S_SLash +2) || event.skill.id == (S_SLash +3))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_ShadowBurst || event.skill.id == (S_ShadowBurst +1) || event.skill.id == (S_ShadowBurst +30) || event.skill.id == (S_ShadowBurst +31))) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Retri || event.skill.id == S_Retri2)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Escape)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Step || event.skill.id == (S_Step +30))) {
				return false;
			}
			//if(job == JOB_REAPER && (event.skill.id == S_Step || event.skill.id == (S_Step +30)) && roflcheck){
			//  roflcheck = false;
			// }
			if(job == JOB_REAPER && event.skill.id == S_Cable){
				finish[S_Cable] = true;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Cable) && !cablestepoff) {
				if (stepX) {
					if (((event.loc.x - stepX) >50) || ((stepX - event.loc.x) >50)) {
						dispatch.toClient('S_INSTANT_MOVE', 3, {
							gameId: cid,
							loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
							w: event.w,
						});
					}
					if (((event.loc.y - stepY) >50) || ((stepY - event.loc.y) >50)) {
						dispatch.toClient('S_INSTANT_MOVE', 3, {
							gameId: cid,
							loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
							w: event.w,
						});
					}
				}
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Cable) && cablestepoff && lastSkill != S_Cable) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_RETAL)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == S_Soul)) {
				return false;
			}
			if (job == JOB_REAPER && (event.skill.id == (S_Soul +30))) {
				soulend = false;
				soulr2lock = false;
			}
			if (event.skill.id ==130140) {
				soulend = false;
			}
			if (event.skill.id == USELESS_SCYTHE || event.skill.id == (USELESS_SCYTHE +30)) {
				finish[USELESS_SCYTHE] = true;
				if (lastSkill != USELESS_SCYTHE && lastSkill != (USELESS_SCYTHE +30)) {
					return false;
				}
			}
		}
	});

	dispatch.hook('S_START_COOLTIME_SKILL', 3, (event) => {
		if (!enabled) return;
		event.cooldown -= GLOBAL_LATENCY;
		if (event.skill.id == S_Soul) {
			soulr1 = false;
		}
		if (event.skill.id == S_Step) {
			clearTimeout(isSecondStepTwo);
			isSecondStep = false;
		}
		if (event.skill.id == S_SLash) {
			lashCounter =0;
		}
		if(event.skill.id == S_Reaping || event.skill.id == S_Reaping_2 || event.skill.id == S_Reaping_3){
			clearTimeout(lockz2);
			lockz = true;
			lockz2 = setTimeout(function(){lockz = false;}, event.cooldown);
		}
		if(event.skill.id == S_Smite2 || event.skill.id == S_Smite3){
			clearTimeout(locking2);
			locking = true;
			locking2 = setTimeout(function(){locking = false;}, event.cooldown);
		}
		return true;
	});


	dispatch.hook('S_PLAYER_STAT_UPDATE', dispatch.majorPatchVersion >= 93 ? 15 : 13, (event) => {
		if (!enabled) return;
		aspd = (event.attackSpeed + event.attackSpeedBonus) /100;
	});

	dispatch.hook('C_CANCEL_SKILL', 3, (event) => {
		if (!enabled) return;
		if (event.skill.id == (S_ShadowBurst +1)) {
			return false;
		}
		if (event.skill.id == S_ShadowBurst) {
			clearTimeout(finishcheck[event.skill.id]);
			finish[S_ShadowBurst] = true;
			clearTimeout(timer[S_ShadowBurst]);
			clearTimeout(a1);
			clearTimeout(a2);
			clearTimeout(a3);
			clearTimeout(a4);
			clearTimeout(a5);
			clearTimeout(a6);
			clearTimeout(a7);
			dispatch.toClient('S_ACTION_END', 5, {
				gameId: cid,
				loc: {
					x: shadowx,
					y: shadowy,
					z: shadowz
				},
				w: shadoww,
				templateId: model,
				skill: S_ShadowBurst,
				type: 2,
				id: atkid[S_ShadowBurst],
			});
		}
	});

	dispatch.hook('C_PLAYER_LOCATION', 5, (event) => {
		if (!enabled) return;
		xloc = event.dest.x;
		yloc = event.dest.y;
		zloc = event.dest.z;
		wloc = event.w;
		telex = event.dest.x;
		teley = event.dest.y;
		telez = event.dest.z;
		telew = event.w;
		timeloc = event.time +1;
	});

	dispatch.hook('C_NOTIFY_LOCATION_IN_ACTION', 4, (event) => {
		if (!enabled) return;
		setTimeout(function (event) {
			dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
				skill: event.skill.id,
				stage: event.stage,
				loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
				w: event.w,
			});
		}, 20, event);
		return false;
	});
	dispatch.hook('C_NOTIFY_LOCATION_IN_DASH', 4, (event) => {
		if (!enabled) return;
		dashX = event.loc.x;
		dashY = event.loc.y;
		dashZ = event.loc.z;
		setTimeout(function (event) {
			dispatch.toServer('C_NOTIFY_LOCATION_IN_DASH', 4, {
				skill: event.skill.id,
				stage: event.stage,
				loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
				w: event.w,
			});
		}, 50, event);
		return false;
	});

	dispatch.hook('S_ACTION_STAGE', 9, (event) => {
	  //console.log("test: " + event.skill == 67119608);
		if (!enabled) return;
		if (event.gameId !== cid) {
			return;
		}
		if (event.skill.id ==1080101) {
			disabSkill[S_RETAL] = true;
			Ignore1 = true;
		}
	});
	dispatch.hook('S_ACTION_END', 5, (event) => {
	  if(event.skill == 67108232) console.log("error");
		if (!enabled) return;
		if (event.gameId !== cid) {
			return;
		}
		if (event.skill.id ==1080101) {
			disabSkill[S_RETAL] = false;
			clearTimeout(Ignore2);
			Ignore2 = setTimeout(function () { Ignore1 = false; },400);
		}
	});
};