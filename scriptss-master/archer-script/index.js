'use strict'
//DONT TOUCH ANYTHING UNDER HERE =============================
const JOB_ARCHER =5;

//Archer skills
const S_ARROW = 11200; //cStartInstanceSkill
const S_ARROW_D =385;

const S_ARROWVOLLEY = 20900; //cStartSkill
const S_ARROWVOLLEY_2 =20910;
const S_ARROWVOLLEY_D =1200;

const S_RADIANT = 31100; //cPressSkill
const S_RADIANT_D = 520; //570;
const S_RADIANT_1 =31110;
const S_RADIANT_2 =31111;
const S_RADIANT_3 =31112;
const S_RADIANT_4 = 31113; //cStartInstanceSkill
const S_RADIANT_D2 =1730;

const S_PENARROW =41200;
const S_PENARROW_D = 730; //800;
const S_PENARROW_1 =41210;
const S_PENARROW_2 =41211;
const S_PENARROW_3 =41212;
const S_PENARROW_4 = 41213; //cStartInstanceSkill / ArrowVolley Blaze Pen / Stun Trap Blaze Pen
const S_PENARROW_D2 =1300;
const RAPACANCEL = 300; //Auto Seq Fire cancel timing at base aspd.

const S_ARROWRAIN = 51000; //cStartSkill / Self Speed buff
const S_ARROWRAIN_D =3150;

const S_BACKSTEP = 60100; //cStartSkill
const S_BACKSTEP_D =650;

const S_RAPIDFIRE = 80601; //cStartComboInstantSkill
const S_RAPIDFIRE_D =425;
const S_RAPIDFIRE2 =80602;
const S_RAPIDFIRE_D2 =600;
const S_RAPIDFIRE3 =80603;
const S_RAPIDFIRE_D3 =700;
const S_RAPIDFIRE4 =80604;
const S_RAPIDFIRE_D4 =700;
const S_RAPIDFIRE5 =80605;
const S_RAPIDFIRE_D5 =700;
const S_RAPIDFIRE6 =80606;
const S_RAPIDFIRE_D6 =700;
const S_RAPIDFIRE7 =80607;
const S_RAPIDFIRE_D7 =1235;

const S_RAPIDFIRE_B =80611;
const S_RAPIDFIRE_B_D =425;
const S_RAPIDFIRE_B2 =80612;
const S_RAPIDFIRE_B2_D =520;
const S_RAPIDFIRE_B3 =80613;
const S_RAPIDFIRE_B3_D =520;
const S_RAPIDFIRE_B4 =80614;
const S_RAPIDFIRE_B4_D =800;

const S_SLOWTRAP = 90700; //cStartSkill
const S_SLOWTRAP_D =1130;

const S_STUNTRAP = 100400; //cStartSkill / ArrowVolley Blaze Trap
const S_STUNTRAP_D =1145;

const S_VELIK = 120300; //cStartInstanceSkill
const S_VELIK_D = 200; //995;

const S_INCINTRAP = 150700; //cStartSkill
const S_INCINTRAP_D =1130;

const S_BREAKAWAY = 160600; //cStartSkill
const S_BREAKAWAY_D =1310;

const S_WEB = 170300; //cStartInstanceSkill
const S_WEB_D =515;

const S_KICK = 180400; //cStartSkill
const S_KICK_D = 215; //295;
const S_KICK_2 =180401;
const S_KICK_D2 = 865; //1180;

const S_POISON = 190800; //cStartInstanceSkill
const S_POISON_D =1110;

const S_RESTRAIN = 200200; //cStartInstanceSkill
const S_RESTRAIN_D =510;

const S_SEQFIRE = 221100; //cStartInstanceSkill
const S_SEQFIRE_D =420;

const S_STUNRTRAP = 230200; //cStartSkill
const S_STUNRTRAP_D =1410;

const S_SNARE_T =240201;
const S_SNARE_T_D =1470;

const S_INCINRTRAP =251000;
const S_INCINRTRAP_D =1160;

const S_THUNDER = 290900; //cStartSkill / speed glyph
const S_THUNDER_D =3740;

const S_FINDWEAK = 320300; //cStartSkill
const S_FINDWEAK_D = 200; //1300;

const SKILL_CHARGING =330100;
const SKILL_CHARGING_DISTANCE =494;
const SKILL_CHARGING_DURATION =990;

const S_TENA =310100;
const S_TENA_D1 =500;
const S_TENA_D2 =700;

const S_RETAL =141000;
const S_RETAL_D =1570;

const FOCUS_BUFF =601450;
const SEQFIREID =600200;
const ARROWRAINLOCK = 1100; //120 aspd value
const ARROWRAINLOCK2 = 4150; //120 aspd value
const S_SNIPEREYE =210200;

const S_DEATH =70300;

const Breeze_Steriod =350100;
const Breeze_Steriod_D =200;

const TEMPEST_TRASH_ARROW =360100;
const TEMPEST_TRASH_ARROW_D =2715;
const TEMPEST_TRASH_ARROW_R =360213;
const TEMPEST_TRASH_ARROW_R_D =1400;

const GALE1 =340100;
const GALE2 =340110;
const GALE3 =340120;
const GALE4 =340130;
const GALE5 =340140;
const GALE6 =340150;
const GALE7 =340160;
const GALE8 =340170;
const GALE9 =340180;
const GALE_D =660;

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
module.exports = function archer(dispatch) {

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


    //change GLOBAL_LATENCY to your lowest usual ping
    let GLOBAL_LATENCY =0;
    if (("GLOBAL_LATENCY" in config)) {
        GLOBAL_LATENCY = config.GLOBAL_LATENCY;
    }
    if (!("GLOBAL_LATENCY" in config)) {
        config.GLOBAL_LATENCY =0;
        config.GLOBAL_LATENCY_DESCRIPTION = "change GLOBAL_LATENCY to your lowest usual ping";
        settingUpdate();
    }

    let RACE_CARRIED = false;
    if (("RACE_CARRIED" in config)) {
        RACE_CARRIED = config.RACE_CARRIED;
    }
    if (!("RACE_CARRIED" in config)) {
        config.RACE_CARRIED = false;
        config.RACE_CARRIED_DESCRIPTION = "Kick 1 is faster on Aman Male, Baraka, Castanic F, Human F, Popo. Set to true if you are those races.";
        settingUpdate();
    }
    let AUTOSEQFIRE = false;
    if (("AUTOSEQFIRE" in config)) {
        AUTOSEQFIRE = config.AUTOSEQFIRE;
    }
    if (!("AUTOSEQFIRE" in config)) {
        config.AUTOSEQFIRE = false;
        config.AUTOSEQFIRE_DESCRIPTION = "Auto Seq fire after Radiant/Penetrating/TB- REQUIRES ROBOTJS";
        settingUpdate();
    }
	let AUTOSEQFIRE_GUST = false;
    if (("AUTOSEQFIRE_GUST" in config)) {
        AUTOSEQFIRE_GUST = config.AUTOSEQFIRE_GUST;
    }
    if (!("AUTOSEQFIRE_GUST" in config)) {
        config.AUTOSEQFIRE_GUST = false;
        config.AUTOSEQFIRE_GUST_DESCRIPTION = "Auto Seq fire after Gust arrow - REQUIRES ROBOTJS";
        settingUpdate();
    }
    let SEQFIREKEY = "4";
    if (("SEQFIREKEY" in config)) {
        SEQFIREKEY = config.SEQFIREKEY;
    }
    if (!("SEQFIREKEY" in config)) {
        config.SEQFIREKEY = "4";
        config.SEQFIREKEY_DESCRIPTION = "Key for Sequential Fire, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
	
	let AUTORF_WW = false;
    if (("AUTORF_WW" in config)) {
        AUTORF_WW = config.AUTORF_WW;
    }
    if (!("AUTORF_WW" in config)) {
        config.AUTORF_WW = false;
        config.AUTORF_WW_DESCRIPTION = "Auto Windwalk after Rapidfire last hit - REQUIRES ROBOTJS";
        settingUpdate();
    }
    let WWKEY = "9";
    if (("WWKEY" in config)) {
        WWKEY = config.WWKEY;
    }
    if (!("WWKEY" in config)) {
        config.WWKEY = "9";
        config.WWKEY_DESCRIPTION = "Key for WindWalk, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
	
	let AUTORF_WW_DELAY = "400";
    if (("AUTORF_WW_DELAY" in config)) {
        AUTORF_WW_DELAY = config.AUTORF_WW_DELAY;
    }
    if (!("AUTORF_WW_DELAY" in config)) {
        config.AUTORF_WW_DELAY = "400";
        config.AUTORF_WW_DELAY_DESCRIPTION = "Auto Windwalk after Rapidfire last hit delay in milliseconds. Scales with ASPD.";
        settingUpdate();
    }
	
    let VELIKALERT = false;
    if(("VELIKALERT" in config)){
    VELIKALERT = config.VELIKALERT;
    }
    if(!("VELIKALERT" in config)){
    config.VELIKALERT = false;
    config.VELIKALERT_DESCRIPTION = "Alerts you if Velik's Mark drops from boss";
    settingUpdate();
    }
    let VELIKPREALERT =0;
    if(("VELIKPREALERT" in config)){
    VELIKPREALERT = config.VELIKPREALERT;
    }
    if(!("VELIKPREALERT" in config)){
    config.VELIKPREALERT =35;
    config.VELIKPREALERT_DESCRIPTION = "Alert after X seconds after Velik had been casted. Set to 0 to disable.";
    settingUpdate();
    }
    let SNIPERALERT = false;
    if(("SNIPERALERT" in config)){
    SNIPERALERT = config.SNIPERALERT;
    }
    if(!("SNIPERALERT" in config)){
    config.SNIPERALERT = true;
    config.SNIPERALERT_DESCRIPTION = "Alerts you if sniper eye is off";
    settingUpdate();
    }
    let INCIN_RESTRAIN = false;
    if (("INCIN_RESTRAIN" in config)) {
        INCIN_RESTRAIN = config.INCIN_RESTRAIN;
    }
    if (!("INCIN_RESTRAIN" in config)) {
        config.INCIN_RESTRAIN = false;
        config.INCIN_RESTRAIN_DESCRIPTION = "Auto Restraining after ranged Incindary Arrow. - REQUIRES ROBOTJS";
        settingUpdate();
    }
    let RESTRAINKEY = "5";
    if (("RESTRAINKEY" in config)) {
        RESTRAINKEY = config.RESTRAINKEY;
    }
    if (!("RESTRAINKEY" in config)) {
        config.RESTRAINKEY = "5";
        config.RESTRAINKEY_DESCRIPTION = "Key for Restraining Arrow, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
    let AUTOVOLLEY = false;
    if (("AUTOVOLLEY" in config)) {
        AUTOVOLLEY = config.AUTOVOLLEY;
    }
    if (!("AUTOVOLLEY" in config)) {
        config.AUTOVOLLEY = false;
        config.AUTOVOLLEY_DESCRIPTION = "Instantly volley when locked on - REQUIRES ROBOTJS";
        settingUpdate();
    }
    let VOLLEYKEY = "6";
    if (("VOLLEYKEY" in config)) {
        VOLLEYKEY = config.VOLLEYKEY;
    }
    if (!("VOLLEYKEY" in config)) {
        config.VOLLEYKEY = "6";
        config.VOLLEYKEY_DESCRIPTION = "Key for Arrow Volley, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
    let DISABLE_CHARGE = false;
    if (("DISABLE_CHARGE" in config)) {
        DISABLE_CHARGE = config.DISABLE_CHARGE;
    }
    if (!("DISABLE_CHARGE" in config)) {
        config.DISABLE_CHARGE = false;
        config.DISABLE_CHARGE_DESCRIPTION = "this will disable charge bar emulation, useful for people who have unstable net and prone to get stuck or server lagging badly";
        config.DISABLE_CHARGE_DESCRIPTION_2 = "disabling charge actually does not significantly impact ping tax, because charge skills are actually not ping taxed if you simply release the skill early";
        settingUpdate();
    }
    let SPOOF_GRANT = true;
    if (("SPOOF_GRANT" in config)) {
        SPOOF_GRANT = config.SPOOF_GRANT;
    }
    if (!("SPOOF_GRANT" in config)) {
        config.SPOOF_GRANT = true;
        config.SPOOF_GRANT_DESCRIPTION = "greatly speeds up charging skills, however may cause asynchronization with high jitter";
        settingUpdate();
    }

    let RF_RESET_STOP = false;
    if (("RF_RESET_STOP" in config)) {
        RF_RESET_STOP = config.RF_RESET_STOP;
    }
    if (!("RF_RESET_STOP" in config)) {
        config.RF_RESET_STOP = false;
        config.RF_RESET_STOP_DESCRIPTION = "stops RF from casting if it resets when you just hold down the key.";
        settingUpdate();
    }

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
    let penArrowCan =1;
    let penArrowCan2 =1;
    let penArrowCan3 =1;
    let radiantArrowCan =1; //
    let RadiantActive =0;
    let PenActive =0;
    let TrashActive =0;
    let APState =0;
    let APStateZ =0;
    let APStateZZ =0;

    let myRE;
	
	let sDeath = false;

    let chargeSkillFix = [];
    let chargeSkillFix2;
    let chargeSkillIDx =0;

    let velikTimer;
	let lastspoof;
	let yosu;

    let noct1 = false;
    let noct2 = false;
    let noct3 = false;
    let noct4 = false;
    let noct5 = false;
    let noct6 = false;
    let noct7 = false;
    let noct8 = false;
    let ArrowRainDisab = false;
    let TBcc;
    let TBcc2;
    let TBcc3;

    let flameN =0;

    let rain1;
    let rain2;
    let rain3;
    let rain4;
    let raining;

    let sniperState = false;

    let Ignore1 = false;
    let Ignore2;

    let melody = false;

    let msgSuppress;
    let blockGrant = false;
    let blockGrant2;

    let punchCounter =0;
    let clearPunchCounter;

    let glyphState = [];

    let timer2;
    let stallSorc =0;

    let lastSkillTime = [];
    let lastSkillDelay;
    let lastLastSkill;
    let lastLastSkillDelay;
    let lastSkillStart;
    let lastSkillEvent;
    let RecheckTimer;
	
	let thunderdis;

    let wwre;
    let truere;

    let xloc;
    let yloc;
    let zloc;
    let wloc;
    let timeloc;
	
	let failsafe =0;

    let lastSkill =0;
    let lastEvent = { skill: undefined };
    let lastEventTime;
    let GLOBAL_LOCK_DELAY =250;

    var atkArr;

    let powerfulradiant = false;
    let kickspeed =1;
    let talentState = [];
    dispatch.hook('S_LOAD_EP_INFO', 1, (event) => {
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

    dispatch.hook('S_LOAD_TOPO', 3, (event) => {
        if (event.zone ==118) {
            enabled = false;
        }
        else {
            enabled = [JOB_ARCHER].includes(job);
        }
    });

    dispatch.hook('S_LOGIN', 14, (event) => {
        cid = event.gameId;
        model = event.templateId;
        player = event.name;
        job = (model -10101) %100;
        enabled = [JOB_ARCHER].includes(job);
    });
	
	function repeater(key, trigger) {
    if (lastSkill == trigger && failsafe <40) {
      failsafe++;
      var robot17 = require("robotjs");
      robot17.keyTap(key);
      setTimeout(function (key, trigger) { repeater(key, trigger); }, 50, key, trigger);
    }
  }

    dispatch.hook('C_CHAT', 1, (event) => {
        if (event.message.includes("disable5")) {
            enabled = false;
            console.log("Archer script disabled");
            return false;
        }
        if (event.message.includes("enable5")) {
            enabled = [JOB_ARCHER].includes(job);
            console.log("Archer script enabled if you are currently logged into archer");
            return false;
        }
    });

    function fakeDB(event, duration) {
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        if (finish[lastSkill] == false) {
            force_end(lastEvent,4);
        }
        let zzz =1;
        if ((event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4) && melody) {
            zzz = 1.3;
        }
        if ((event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4) && melody) {
            zzz = 1.3;
        }
        finish[SKILL_CHARGING] = true;
        clearTimeout(finishcheck[event.skill.id]);
        finish[event.skill.id] = false;
        var d = new Date();
        lastSkillStart = d.getTime();
        lastLastSkillDelay = lastSkillDelay;
        atkid[event.skill.id] = atkid_base;
        atkid_base--;


        if (event.skill.id != GALE1) {
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: aspd * zzz,
                projectileSpeed: aspd * zzz,
                id: atkid[event.skill.id],
                effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n,
                movement: [],
            });
        }
        if (event.skill.id == GALE1) {
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: aspd * zzz,
                projectileSpeed: aspd * zzz,
                id: atkid[event.skill.id],
                effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n,
                movement: [{ duration: 766, speed: 2, unk: 1, distance: 0.01 }],
            });
        }
        lastSkillDelay = duration / aspd;
        setTimeout(function () {
            lastSkillEvent = {
                gameId: cid,
                loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                type: 0,
                id: atkid[event.skill.id],
            };
        }, duration / aspd, event);
        finishcheck[event.skill.id] = setTimeout(function (event) { finish[event.skill.id] = true; }, (duration / (aspd * zzz)), event);
        timer[event.skill.id] = setTimeout(
            function (event) {
                if (lastSkill ==1) { return; }
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    type: 0,
                    id: atkid[event.skill.id],
                });
            }, duration / (aspd * zzz), event);
    }

    function charge(event) {
        finish[SKILL_CHARGING] = true;
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        clearTimeout(finishcheck[event.skill.id]);
        finish[event.skill.id] = false;
        var d = new Date();
        lastSkillStart = d.getTime();
        lastLastSkillDelay = lastSkillDelay;
        atkid[event.skill.id] = atkid_base;
        atkid_base--;
        setTimeout(function () {
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: 1,
                projectileSpeed: 1,
                id: atkid[event.skill.id],
                effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
            });
            dispatch.toClient('S_INSTANT_DASH', 3, {
                gameId: cid,
                target: 0n,
                unk: 0,
                loc: {
                    x: event.dest.x,
                    y: event.dest.y,
                    z: event.dest.z
                },
                w: event.w,
            });
        },0);
        var zzzz = Math.pow((Math.pow((event.loc.x - event.dest.x),2) + Math.pow((event.loc.y - event.dest.y),2)), 0.5) / SKILL_CHARGING_DISTANCE * SKILL_CHARGING_DURATION +100;
        lastSkillDelay = zzzz;
        setTimeout(function () {
            lastSkillEvent = {
                gameId: cid,
                loc: {
                    x: event.dest.x,
                    y: event.dest.y,
                    z: event.dest.z
                },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                type: 39,
                id: atkid[event.skill.id],
            };
        }, zzzz, event);
        timer[event.skill.id] = setTimeout(function (event) {
            if (lastSkill == SKILL_CHARGING) {
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: {
                        x: event.dest.x,
                        y: event.dest.y,
                        z: event.dest.z
                    },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    type: 39,
                    id: atkid[event.skill.id],
                });
                finish[event.skill.id] = true;
            }
        }, zzzz, event);
    }

    function fakeEnd_AP(event, stage, xy, yy, zy) {
        atkid[event.skill.id] = atkid_base;
        atkid_base--;
        dispatch.toClient('S_ACTION_STAGE', 9, {
            gameId: cid,
            loc: {
                x: xy,
                y: yy,
                z: zy
            },
            w: event.w,
            templateId: model,
            skill: event.skill.id,
            stage: stage,
            speed: aspd,
            projectileSpeed: aspd * 1.1,
            id: atkid[event.skill.id],
            effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n,
            movement: [],
        });
    }

    function fakeEnd_AP2(event, skillx, duration) {
        atkid[skillx] = atkid_base;
        atkid_base--;
        dispatch.toClient('S_ACTION_STAGE', 9, {
            gameId: cid,
            loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
            w: event.w,
            templateId: model,
            skill: skillx,
            stage: 0,
            speed: aspd / 1.1,
            projectileSpeed: aspd / 1.1,
            id: atkid[skillx],
            effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
        });

        const timer = setTimeout(function (event) {
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                w: event.w,
                templateId: model,
                skill: skillx,
                type: 0,
                id: atkid[skillx],
            });
        }, duration / aspd, event);
    }

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

    dispatch.hook('S_EACH_SKILL_RESULT', 14, (event) => {
        if (event.target === cid) {
            if (event.reaction.enable == true) {
                lastSkill =1;
				APState =0;
				APStateZ =0;
				APStateZZ =0;
            }
        }
    });

    dispatch.hook('S_PLAYER_CHANGE_STAMINA', 1, (event) => {
        if (!enabled) return;
        myRE = event.current;
        truere = event.current;
    });


    function fakeEnd_sorc_dist(event, duration, dist) {
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        xloc = event.loc.x;
        yloc = event.loc.y;
        zloc = event.loc.z;
        var yyy =1;
        var zzz =0;
        if (event.skill.id == S_ARROWRAIN && glyphState[26077] ==1) {
            yyy = 1.4;
        }
        if (event.skill.id == S_THUNDER && glyphState[26102] ==1) {
            yyy = 1.3;
        }
        if (event.skill.id == S_THUNDER && melody) {
            yyy = yyy * 1.3;
        }
        if (event.skill.id == S_STUNRTRAP && stunTrapCan) {
            yyy = yyy * 1.5;
        }
        if (event.skill.id == S_ARROWRAIN && (noct1 || noct2 || noct3)) {
            yyy = yyy * 1.225;
        }
        if (event.skill.id == S_ARROWRAIN && (noct4 || noct5 || noct6 || noct7 || noct8)) {
            yyy = yyy * 1.15;
        }
        if (finish[lastSkill] == false && zzz ==0) {
            force_end(lastEvent,4);
            finish[lastSkill] = true;
        }
        if (event.skill.id == S_TENA || event.skill.id == S_FINDWEAK) {
            yyy = 1 / aspd;
        }

        if (event.skill.id == S_SLOWTRAP || event.skill.id == S_STUNTRAP || event.skill.id == S_INCINTRAP) {
            yyy = yyy + kickspeed -1;
        }
        if (event.skill.id == S_ARROWRAIN && talentState[860540]) {
            yyy = yyy + (talentState[860540] * 0.00714 + 0.043);
        }

        finish[SKILL_CHARGING] = true;
        clearTimeout(finishcheck[event.skill.id]);
        finish[event.skill.id] = false;
        var d = new Date();
        lastSkillStart = d.getTime();
        lastLastSkillDelay = lastSkillDelay;
        var vvv =0;
        atkid[event.skill.id + zzz] = atkid_base;
        atkid_base--;

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
            effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
        });

        clearTimeout(rain1);
        clearTimeout(rain2);
        clearTimeout(rain3);
        clearTimeout(rain4);

        rain1 = setTimeout(function () { ArrowRainDisab = true; },0);
        rain2 = setTimeout(function () { ArrowRainDisab = false; },200);

        rain3 = setTimeout(function () { ArrowRainDisab = true; }, ARROWRAINLOCK / (aspd * yyy));
        rain4 = setTimeout(function () { ArrowRainDisab = false; }, ARROWRAINLOCK2 / (aspd * yyy));

        var newX;
        var newY;
        var angle = parseFloat(event.w);

        newX = Math.cos(angle) * dist;
        newY = Math.sin(angle) * dist;
        lastSkillDelay = duration / aspd;
        setTimeout(function () {
            if ((event.skill.id == S_TENA || event.skill.id == S_FINDWEAK) && xloc != false) {
                event.loc.x = xloc;
                event.loc.y = yloc;
                event.loc.z = zloc;
                event.w = wloc;
            }
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
        timer[event.skill.id] = setTimeout(
            function (event) {
                if (event.skill.id == S_INCINRTRAP && lastSkill == S_INCINRTRAP && INCIN_RESTRAIN) {
                    setTimeout(function () {
                        var robot9 = require("robotjs");
                        robot9.keyTap(RESTRAINKEY);
                    },50);
                    setTimeout(function () {
                        var robot10 = require("robotjs");
                        robot10.keyTap(RESTRAINKEY);
                    },100);
                    setTimeout(function () {
                        var robot11 = require("robotjs");
                        robot11.keyTap(RESTRAINKEY);
                    },150);
                    setTimeout(function () {
                        var robot12 = require("robotjs");
                        robot12.keyTap(RESTRAINKEY);
                    },200);
                }
                if ((event.skill.id == S_TENA || event.skill.id == S_FINDWEAK) && xloc != false) {
                    event.loc.x = xloc;
                    event.loc.y = yloc;
                    event.loc.z = zloc;
                    event.w = wloc;
                }
                if (event.skill.id == S_BACKSTEP || event.skill.id == S_BREAKAWAY) {
                    xloc = event.loc.x + newX *2;
                    yloc = event.loc.y + newY *2;
                    zloc = event.loc.z +2;
                }
                if (event.skill.id != lastSkill && event.skill.id != S_THUNDER && lastSkill != S_SEQFIRE) { return false; }
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

    dispatch.hook('C_CAN_LOCKON_TARGET', 3, function (event) {
        dispatch.toClient('S_CAN_LOCKON_TARGET', 3, Object.assign({ success: true }, event));
        /*if(AUTOVOLLEY && lastSkill == S_ARROWVOLLEY){
        setTimeout(function(){
        var robot33 = require("robotjs");
        robot33.keyTap(VOLLEYKEY);
        },20);
        setTimeout(function(){
        var robot34 = require("robotjs");
        robot34.keyTap(VOLLEYKEY);
        },60);
        setTimeout(function(){
        var robot35 = require("robotjs");
        robot35.keyTap(VOLLEYKEY);
        },100);
        }*/
    });

    dispatch.hook('S_CAN_LOCKON_TARGET', 3, { order: 99999, filter: { fake: true } }, (event) => {
        if (!enabled) { return };
        if (AUTOVOLLEY && lastSkill == S_ARROWVOLLEY) {
            flameN++;
            setTimeout(function () { flameN = 0; },500);
            setTimeout(function () {
                var robot33 = require("robotjs");
                robot33.keyTap(VOLLEYKEY);
            },20);
            setTimeout(function () {
                var robot34 = require("robotjs");
                robot34.keyTap(VOLLEYKEY);
            },60);
            setTimeout(function () {
                var robot35 = require("robotjs");
                robot35.keyTap(VOLLEYKEY);
            },100);
        }
    });

    dispatch.hook('S_SYSTEM_MESSAGE', 1, (event) => {
        if (!enabled) { return };
        if ((event.message == '@2059' || event.message == '@36' || event.message == '@1677') && (msgSuppress == event.message || lastSkill == S_SEQFIRE || lastSkill == GALE1 || lastSkill == GALE2 || lastSkill == GALE3 || lastSkill == GALE4 || lastSkill == GALE5 || lastSkill == GALE6 || lastSkill == GALE7 || lastSkill == GALE8 || lastSkill == GALE9)) {
            return false;
        }
        msgSuppress = event.message;
    });

    dispatch.hook('S_CREST_APPLY', 2, (event) => {
        if (!enabled) { return };
        glyphState[event.id] = event.enable;
    });

    dispatch.hook('S_CREST_MESSAGE', 2, { order: -99999 }, (event) => {
        if (!enabled) { return };
        if (RF_RESET_STOP && lastSkill != Breeze_Steriod && event.skill.id == (S_RAPIDFIRE)) {
            dispatch.toClient('S_START_COOLTIME_SKILL', 3, {
                skill: S_RAPIDFIRE,
                cooldown: (20 + 2340 / aspd),
            });
        }
        if (RF_RESET_STOP && lastSkill != Breeze_Steriod && event.skill.id == (S_RAPIDFIRE_B)) {
            dispatch.toClient('S_START_COOLTIME_SKILL', 3, {
                skill: S_RAPIDFIRE_B,
                cooldown: (20 + 2340 / aspd),
            });
        }
    });

    dispatch.hook('C_START_TARGETED_SKILL', 7, (event) => {
        if (!enabled) return;
        if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
        if (!disabSkill[event.skill.id]) {
            lastSkillDelay =999999;
            setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },25);
            setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },50);
            setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },75);
            setTimeout(function () { dispatch.toServer('C_START_TARGETED_SKILL', 7, event); },100);
            if (job == JOB_ARCHER && event.skill.id == SKILL_CHARGING) {
                charge(event);
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[SKILL_CHARGING] = false; }, GLOBAL_LOCK_DELAY);
            }
            lastLastSkill = lastSkill;
            lastSkill = event.skill.id;
            lastEvent = event;
        }
    });

    function grantskill(xskill) {
        if (!SPOOF_GRANT) {
            return;
        }
        clearTimeout(blockGrant2);
        blockGrant = true;
        blockGrant2 = setTimeout(function () { blockGrant = false; },500);
        dispatch.toClient('S_GRANT_SKILL', 3, {
            skill: xskill,
        });
		lastspoof = xskill;
    }

    dispatch.hook('S_GRANT_SKILL', 3, (event) => {
        if (!enabled) { return };
        if (blockGrant && lastspoof == event.skill.id) {
            return false;
        }
    });


    dispatch.hook('C_PRESS_SKILL', 4, (event) => {
        if (!enabled) return;
        if (job == JOB_ARCHER && event.press == true) {
            setTimeout(function (event) { if ((lastSkill == TEMPEST_TRASH_ARROW && TrashActive ==0) || lastSkill != event.skill.id) { return; } dispatch.toServer('C_PRESS_SKILL', 4, event); }, 50, event);
            setTimeout(function (event) { if ((lastSkill == TEMPEST_TRASH_ARROW && TrashActive ==0) || lastSkill != event.skill.id) { return; } dispatch.toServer('C_PRESS_SKILL', 4, event); }, 100, event);
            setTimeout(function (event) { if ((lastSkill == TEMPEST_TRASH_ARROW && TrashActive ==0) || lastSkill != event.skill.id) { return; } dispatch.toServer('C_PRESS_SKILL', 4, event); }, 150, event);
            setTimeout(function (event) { if ((lastSkill == TEMPEST_TRASH_ARROW && TrashActive ==0) || lastSkill != event.skill.id) { return; } dispatch.toServer('C_PRESS_SKILL', 4, event); }, 200, event);
            chargeSkillFix[chargeSkillIDx] = setInterval(function (event, nnn) {
                if ((event.skill.id == S_PENARROW || event.skill.id == S_RADIANT) && lastSkill == event.skill.id && event.press == true && chargeSkillFix2 != lastSkill) {
                    dispatch.toServer('C_PRESS_SKILL', 4, event);
                }
                if (chargeSkillFix2 == lastSkill) {
                    clearInterval(chargeSkillFix[nnn]);
                }
                if (event.skill.id == S_PENARROW && PenActive ==0) {
                    clearInterval(chargeSkillFix[nnn]);
                }
                if (event.skill.id == S_RADIANT && RadiantActive ==0) {
                    clearInterval(chargeSkillFix[nnn]);
                }
            }, 100, event, chargeSkillIDx);
        }
        chargeSkillIDx++;
        if (job == JOB_ARCHER && event.skill.id == S_RADIANT) {
            RadiantActive = event.press;
        }
        if (job == JOB_ARCHER && event.skill.id == S_PENARROW) {
            PenActive = event.press;
        }
        if (job == JOB_ARCHER && event.skill.id == TEMPEST_TRASH_ARROW) {
            TrashActive = event.press;
        }
        if (job == JOB_ARCHER && (event.skill.id == S_RADIANT || event.skill.id == S_PENARROW || event.skill.id == TEMPEST_TRASH_ARROW) && event.press == false) {
            if (event.skill.id == S_RADIANT && lastSkill == S_RADIANT) {
                grantskill((event.skill.id + 9 + APState));
            }
            if (event.skill.id == S_PENARROW && lastSkill == S_PENARROW) {
                grantskill((event.skill.id + 9 + APStateZ));
            }
            if (event.skill.id == TEMPEST_TRASH_ARROW && lastSkill == TEMPEST_TRASH_ARROW && APStateZZ ==2) {
                grantskill((TEMPEST_TRASH_ARROW_R + APStateZZ -2));
            }
            if (event.skill.id == TEMPEST_TRASH_ARROW && lastSkill == TEMPEST_TRASH_ARROW && APStateZZ ==1) {
				clearTimeout(yosu);
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    type: 0,
                    id: atkid[event.skill.id],
                });
            }
            if (stallSorc >10) {
                console.log('attempt unstuck');
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    type: 0,
                    id: atkid[event.skill.id],
                });
            }
            stallSorc = stallSorc +1;
        }
        if (focusUp) {
            var rAs = 0.5 + radiantArrowCan;
            var pAs = 0.5 + penArrowCan * penArrowCan2 * penArrowCan3;
        }
        if (!focusUp) {
            var rAs = radiantArrowCan;
            var pAs = penArrowCan * penArrowCan2 * penArrowCan3;
        }
        if (powerfulradiant && talentState[860310]) {
            if (talentState[860310] >10) {
                talentState[860310] =10;
            }
            rAs = rAs + (talentState[860310] * 0.02 + 0.08);
        }
        if (job == JOB_ARCHER && event.skill.id == S_RADIANT && RadiantActive ==1) {
            if (DISABLE_CHARGE) { lastSkill = S_RADIANT; return; }
            fakeEnd_AP(event, 0, event.loc.x, event.loc.y, event.loc.z);
            stallSorc =0;
            APState =1;
            setTimeout(function () {
                if (job == JOB_ARCHER && event.skill.id == S_RADIANT && RadiantActive == 1 && APState ==1) {
                    fakeEnd_AP(event, 1, xloc, yloc, zloc);
                    APState =2;
                    setTimeout(function () {
                        if (job == JOB_ARCHER && event.skill.id == S_RADIANT && RadiantActive == 1 && APState ==2) {
                            fakeEnd_AP(event, 2, xloc, yloc, zloc);
                            APState =3;
                            setTimeout(function () {
                                if (job == JOB_ARCHER && event.skill.id == S_RADIANT && RadiantActive == 1 && APState ==3) {
                                    fakeEnd_AP(event, 3, xloc, yloc, zloc);
                                    APState =4;
                                }
                            }, S_RADIANT_D / (aspd * rAs));
                        }
                    }, S_RADIANT_D / (aspd * rAs));
                }
            }, S_RADIANT_D / (aspd * rAs));
        }
        if (job == JOB_ARCHER && event.skill.id == S_PENARROW && PenActive ==1) {
            if (DISABLE_CHARGE) { lastSkill = S_PENARROW; return; }
            fakeEnd_AP(event, 0, event.loc.x, event.loc.y, event.loc.z);
            stallSorc =0;
            APStateZ =1;
            setTimeout(function () {
                if (job == JOB_ARCHER && event.skill.id == S_PENARROW && PenActive == 1 && APStateZ ==1) {
                    fakeEnd_AP(event, 1, xloc, yloc, zloc);
                    APStateZ =2;
                    setTimeout(function () {
                        if (job == JOB_ARCHER && event.skill.id == S_PENARROW && PenActive == 1 && APStateZ ==2) {
                            fakeEnd_AP(event, 2, xloc, yloc, zloc);
                            APStateZ =3;
                            setTimeout(function () {
                                if (job == JOB_ARCHER && event.skill.id == S_PENARROW && PenActive == 1 && APStateZ ==3) {
                                    fakeEnd_AP(event, 3, xloc, yloc, zloc);
                                    APStateZ =4;
                                }
                            }, S_PENARROW_D / (aspd * pAs));
                        }
                    }, S_PENARROW_D / (aspd * pAs));
                }
            }, S_PENARROW_D / (aspd * pAs));
        }
        if (job == JOB_ARCHER && event.skill.id == TEMPEST_TRASH_ARROW && TrashActive ==1) {
            if (DISABLE_CHARGE) { lastSkill = TEMPEST_TRASH_ARROW; return; }
            fakeEnd_AP(event, 0, event.loc.x, event.loc.y, event.loc.z);
            stallSorc =0;
            APStateZZ =1;
            yosu = setTimeout(function () {
                if (job == JOB_ARCHER && event.skill.id == TEMPEST_TRASH_ARROW && TrashActive == 1 && APStateZZ ==1) {
                    fakeEnd_AP(event, 1, xloc, yloc, zloc);
                    APStateZZ =2;
                }
            }, TEMPEST_TRASH_ARROW_D / aspd);
        }
        if (event.press == true) {
            lastSkill = event.skill.id;
            clearTimeout(blockGrant2);
            blockGrant = false;
        }
    });

    dispatch.hook('S_ABNORMALITY_BEGIN', 3, (event) => {
        if (!enabled) return;
        if (event.target !== cid) {
            return;
        }
        if (job == JOB_ARCHER && event.id == SEQFIREID) {
            seqFireCan = true;
        }
        if (job == JOB_ARCHER && event.id ==601101) {
            sniperState = true;
        }
        if (job == JOB_ARCHER && event.id == FOCUS_BUFF) {
            focusUp = true;
            focusUp2 = true;
        }
        if (job == JOB_ARCHER && event.id ==26170) {
            stunTrapCan = true;
        }
        if (job == JOB_ARCHER && event.id ==26171) {
            penArrowCan = 1.4; // 40%
            focusUp2 = false;
            penArrowCan2 =1;
            penArrowCan3 =1;
        }
        if (job == JOB_ARCHER && event.id ==26160) {
            penArrowCan2 = 1.3; // 30%
            focusUp2 = false;
            penArrowCan =1;
            penArrowCan3 =1;
        }
        if (job == JOB_ARCHER && event.id ==26180) {
            radiantArrowCan = 1.3; // 30%
            focusUp2 = false;
        }
        if (job == JOB_ARCHER && event.id ==26190) {
            penArrowCan3 = 1.3; // 30%
            focusUp2 = false;
            penArrowCan =1;
            penArrowCan2 =1;
        }
        if (event.id ==602108) {
            melody = true;
            setTimeout(function () { melody = false; }, event.duration);
        }
        if (event.id ==920) {
            noct1 = true;
        }
        if (event.id ==921) {
            noct2 = true;
        }
        if (event.id ==922) {
            noct3 = true;
        }
        if (event.id ==916) {
            noct4 = true;
        }
        if (event.id ==902) {
            noct5 = true;
        }
        if (event.id ==912) {
            noct6 = true;
        }
        if (event.id ==911) {
            noct7 = true;
        }
        if (event.id ==913) {
            noct8 = true;
        }
        if (event.id > 88614200 && event.id <88614216) {
            kickspeed = (event.id -88614201) * 0.05 + 1.3;
        }
        if (event.id ==88603100) {
            powerfulradiant = true;
        }
    });

    dispatch.hook('S_ABNORMALITY_END', 1, (event) => {
        if (!enabled) return;
        if (event.target !== cid) {
            return;
        }
        if (job == JOB_ARCHER && event.id == SEQFIREID) {
            seqFireCan = false;
        }
        if (job == JOB_ARCHER && event.id ==601101) {
            sniperState = false;
        }
        if (job == JOB_ARCHER && event.id == FOCUS_BUFF) {
            focusUp = false;
        }
        if (job == JOB_ARCHER && event.id ==26111) {
            stunTrapCan = false;
        }
        if (job == JOB_ARCHER && event.id ==26171) {
            penArrowCan =1;
            focusUp2 = true;
        }
        if (job == JOB_ARCHER && event.id ==26160) {
            penArrowCan2 =1;
            focusUp2 = true;
        }
        if (job == JOB_ARCHER && event.id ==26180) {
            radiantArrowCan =1;
            focusUp2 = true;
        }
        if (job == JOB_ARCHER && event.id ==26190) {
            penArrowCan3 =1;
            focusUp2 = true;
        }
        if (event.id ==602108) {
            melody = false;
        }
        if (event.id ==920) {
            noct1 = false;
        }
        if (event.id ==921) {
            noct2 = false;
        }
        if (event.id ==922) {
            noct3 = false;
        }
        if (event.id ==916) {
            noct4 = false;
        }
        if (event.id ==902) {
            noct5 = false;
        }
        if (event.id ==912) {
            noct6 = false;
        }
        if (event.id ==911) {
            noct7 = false;
        }
        if (event.id ==913) {
            noct8 = false;
        }
        if (event.id > 88614200 && event.id <88614216) {
            kickspeed =1;
        }
        if (event.id ==88603100) {
            powerfulradiant = false;
        }
    });

    dispatch.hook('S_INSTANT_DASH', 3, (event) => {
        if (!enabled) return;
        if (event.gameId === cid) {
            return false;
        }
    });

    dispatch.hook('C_START_COMBO_INSTANT_SKILL', 6, (event) => {
        if (!enabled) return;
		if(disabSkill["yolo"]){return false;}
        if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
        if (!disabSkill[event.skill.id]) {
            lastSkillDelay =999999;
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 25, event);
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 50, event);
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 75, event);
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 100, event);
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 150, event);
            setTimeout(function (event) { dispatch.toServer('C_START_COMBO_INSTANT_SKILL', 6, event); }, 200, event);
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE2] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE3) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE3] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D3);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE4) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE4] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D4);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE5) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE5] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D5);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE6) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE6] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D6);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE7) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE7] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_D7);
				if(AUTORF_WW){
					setTimeout(function(){
						if(lastSkill == S_RAPIDFIRE7){
							var robot200 = require("robotjs");
                                robot200.keyTap(WWKEY);
						}
					}, AUTORF_WW_DELAY / aspd);
				}
            }

            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE_B) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE_B] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_B_D);
            }

            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE_B2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE_B2] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_B2_D);
            }

            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE_B3) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE_B3] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_B3_D);
            }

            if (job == JOB_ARCHER && event.skill.id == S_RAPIDFIRE_B4) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RAPIDFIRE_B4] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_RAPIDFIRE_B4_D);
				if(AUTORF_WW){
					setTimeout(function(){
						if(lastSkill == S_RAPIDFIRE_B4){
							var robot201 = require("robotjs");
                                robot201.keyTap(WWKEY);
						}
					}, AUTORF_WW_DELAY / aspd);
				}
            }

            lastLastSkill = lastSkill;
            lastSkill = event.skill.id;
            lastEvent = event;
        }

    });

    dispatch.hook('C_START_INSTANCE_SKILL', 7, (event) => {
        if (!enabled) return;

        if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
        if (!disabSkill[event.skill.id]) {
            lastSkillDelay =999999;
            if ((event.skill.id == GALE1 || event.skill.id == GALE2 || event.skill.id == GALE3 || event.skill.id == GALE4 || event.skill.id == GALE5 || event.skill.id == GALE6 || event.skill.id == GALE7 || event.skill.id == GALE8 || event.skill.id == GALE9) && ((myRE < 150 && !melody) || myRE < 120 || disabSkill[event.skill.id])) {
                return false;
            }
            if (!(event.skill.id == GALE1 || event.skill.id == GALE2 || event.skill.id == GALE3 || event.skill.id == GALE4 || event.skill.id == GALE5 || event.skill.id == GALE6 || event.skill.id == GALE7 || event.skill.id == GALE8 || event.skill.id == GALE9)) {
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); } }, 25, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); } }, 50, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); } }, 75, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_INSTANCE_SKILL', 7, event); } }, 100, event);
            }
            if (job == JOB_ARCHER && event.skill.id == S_ARROW) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_ARROW] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_ARROW_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RADIANT_1) {
                disabSkill[S_RADIANT_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_RADIANT_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_RADIANT_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_RADIANT_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_RADIANT_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_RADIANT_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RADIANT_2) {
                disabSkill[S_RADIANT_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_RADIANT_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_RADIANT_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_RADIANT_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_RADIANT_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_RADIANT_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RADIANT_3) {
                disabSkill[S_RADIANT_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_RADIANT_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_RADIANT_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_RADIANT_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_RADIANT_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_RADIANT_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RADIANT_4) {
                disabSkill[S_RADIANT_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_RADIANT_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_RADIANT_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_RADIANT_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_RADIANT_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_RADIANT_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_RADIANT_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_PENARROW_1) {
                disabSkill[S_PENARROW_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_PENARROW_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_PENARROW_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_PENARROW_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_PENARROW_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_PENARROW_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_PENARROW_2) {
                disabSkill[S_PENARROW_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_PENARROW_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_PENARROW_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_PENARROW_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_PENARROW_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_PENARROW_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_PENARROW_3) {
                disabSkill[S_PENARROW_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_PENARROW_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_PENARROW_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_PENARROW_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_PENARROW_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_PENARROW_D2);
            }
            if (job == JOB_ARCHER && event.skill.id == S_PENARROW_4) {
                disabSkill[S_PENARROW_1] = true;
                var timer2 = setTimeout(function () { disabSkill[S_PENARROW_1] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_2] = true;
                var timer3 = setTimeout(function () { disabSkill[S_PENARROW_2] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_3] = true;
                var timer4 = setTimeout(function () { disabSkill[S_PENARROW_3] = false; }, GLOBAL_LOCK_DELAY);
				disabSkill[S_PENARROW_4] = true;
                var timer5 = setTimeout(function () { disabSkill[S_PENARROW_4] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_PENARROW_D2);
            }
            if (event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4) {
                seqFireCan = true;
				clearInterval(TBcc);
                if (AUTOSEQFIRE) {
                    setTimeout(function () {
                        var robot2 = require("robotjs");
                        robot2.keyTap(SEQFIREKEY);
                    },0);
                    TBcc = setInterval(function (event) {
                        if (finish[event.skill.id] == false) {
                            if (lastSkill != event.skill.id) { clearInterval(TBcc); return; }
                            setTimeout(function () {
                                var robot2 = require("robotjs");
                                robot2.keyTap(SEQFIREKEY);
                            },0);
                        }
                        if (finish[event.skill.id] != false) { clearInterval(TBcc); }
                    }, 50, event);
                }
            }
            if (event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4) {
                seqFireCan = true;
				clearInterval(TBcc2);
                if (AUTOSEQFIRE) {
                    setTimeout(function () {
                        var robot3 = require("robotjs");
                        robot3.keyTap(SEQFIREKEY);
                    },0);
                    TBcc2 = setInterval(function (event) {
                        if (finish[event.skill.id] == false) {
                            if (lastSkill != event.skill.id) { clearInterval(TBcc2); return; }
                            setTimeout(function () {
                                var robot3 = require("robotjs");
                                robot3.keyTap(SEQFIREKEY);
                            },0);
                        }
                        if (finish[event.skill.id] != false) { clearInterval(TBcc2); }
                    }, 50, event);
                }
            }
            if (job == JOB_ARCHER && event.skill.id == S_VELIK) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_VELIK] = false; }, GLOBAL_LOCK_DELAY);
                fakeDB(event, S_VELIK_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_WEB) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_WEB] = false; }, GLOBAL_LOCK_DELAY *3);
                fakeDB(event, S_WEB_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_POISON) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_POISON] = false; }, GLOBAL_LOCK_DELAY *2);
                fakeDB(event, S_POISON_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RESTRAIN) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RESTRAIN] = false; }, GLOBAL_LOCK_DELAY *5);
                fakeDB(event, S_RESTRAIN_D);
            }
            if (job == JOB_ARCHER && (event.skill.id == GALE1 || event.skill.id == GALE2 || event.skill.id == GALE3 || event.skill.id == GALE4 || event.skill.id == GALE5 || event.skill.id == GALE6 || event.skill.id == GALE7 || event.skill.id == GALE8 || event.skill.id == GALE9)) {
                disabSkill[GALE1] = true;
                setTimeout(function (event) { disabSkill[GALE1] = false; }, 800, event);
                disabSkill[GALE2] = true;
                setTimeout(function (event) { disabSkill[GALE2] = false; }, 800, event);
                disabSkill[GALE3] = true;
                setTimeout(function (event) { disabSkill[GALE3] = false; }, 800, event);
                disabSkill[GALE4] = true;
                setTimeout(function (event) { disabSkill[GALE4] = false; }, 800, event);
                disabSkill[GALE5] = true;
                setTimeout(function (event) { disabSkill[GALE5] = false; }, 800, event);
                disabSkill[GALE6] = true;
                setTimeout(function (event) { disabSkill[GALE6] = false; }, 800, event);
                disabSkill[GALE7] = true;
                setTimeout(function (event) { disabSkill[GALE7] = false; }, 800, event);
                disabSkill[GALE8] = true;
                setTimeout(function (event) { disabSkill[GALE8] = false; }, 800, event);
                disabSkill[GALE9] = true;
                setTimeout(function (event) { disabSkill[GALE9] = false; }, 800, event);
				disabSkill["yolo"] = true;
				setTimeout(function(){disabSkill["yolo"] = false;}, GALE_D / aspd);
                if (melody) {
                    clearTimeout(wwre);
                    myRE = myRE -120;
                    wwre = setTimeout(function () { myRE = truere; },500);
                }
                if (!melody) {
                    clearTimeout(wwre);
                    myRE = myRE -150;
                    wwre = setTimeout(function () { myRE = truere; },500);
                }
                fakeDB(event, GALE_D);
            }
            if (job == JOB_ARCHER && event.skill.id == S_SEQFIRE && seqFireCan) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_SEQFIRE] = false; }, GLOBAL_LOCK_DELAY *3);
                fakeDB(event, S_SEQFIRE_D);
                APState =0;
                APStateZ =0;
            }
            lastLastSkill = lastSkill;
            lastSkill = event.skill.id;
            lastEvent = event;
        }
    });


    dispatch.hook('C_START_SKILL', 7, (event) => {
        if (!enabled) return;
        lastSkillDelay =999999;
        if (job == JOB_ARCHER && event.skill.id == S_BACKSTEP && (myRE < 120 || (myRE < 150 && glyphState[26056] != 1 && glyphState[26018] !=1))) {
            return false;
        }
        //if(job == JOB_ARCHER && event.skill.id == Breeze_Steriod && finish[lastSkill] == false){
        //	return false;
        //}
        if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
        if (!disabSkill[event.skill.id] && (finish[SKILL_CHARGING] != false || event.skill.id == S_BACKSTEP)) {
            msgSuppress =0;
            var xzzy = event.skill.type === 1 && event.skill.id <= 999999 && BLACKLIST.indexOf(event.skill.id) === -1;
            if (xzzy && event.skill.id != S_ARROWVOLLEY && event.skill.id != S_RETAL) {
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 25, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 50, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 75, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 100, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 150, event);
                setTimeout(function (event) { if (lastSkill == event.skill.id) { dispatch.toServer('C_START_SKILL', 7, event); } }, 200, event);
            }

            if (job == JOB_ARCHER && event.skill.id == S_SLOWTRAP) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_SLOWTRAP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_SLOWTRAP_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_ARROWVOLLEY) {
                atkid[event.skill.id] = atkid_base;
                atkid_base--;
                dispatch.toClient('S_ACTION_STAGE', 9, {
                    gameId: cid,
                    loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    stage: 0,
                    speed: 1,
                    projectileSpeed: 1,
                    id: atkid[event.skill.id],
                    effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
                });
            }
			if (job == JOB_ARCHER && event.skill.id == S_DEATH) {
				sDeath = true;
                atkid[event.skill.id] = atkid_base;
                atkid_base--;
                dispatch.toClient('S_ACTION_STAGE', 9, {
                    gameId: cid,
                    loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    stage: 0,
                    speed: 1,
                    projectileSpeed: 1,
                    id: atkid[event.skill.id],
                    effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
                });
            }
            if (job == JOB_ARCHER && event.skill.id == S_ARROWVOLLEY_2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_ARROWVOLLEY_2] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_ARROWVOLLEY_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_STUNTRAP) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_STUNTRAP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_STUNTRAP_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_INCINTRAP) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_INCINTRAP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_INCINTRAP_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_BREAKAWAY) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_BREAKAWAY] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_BREAKAWAY_D, -100);
            }
            if (job == JOB_ARCHER && event.skill.id == Breeze_Steriod) {
				clearTimeout(thunderdis);
				disabSkill[S_THUNDER] = false;
                dispatch.toClient('S_ABNORMALITY_BEGIN', dispatch.majorPatchVersion >= 75 ? 3 : 2, {
                    target: cid,
                    source: cid,
                    id: 602108,
                    duration: 2300,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 75 ? { unk3: 0 } : 0n),
                });
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[Breeze_Steriod] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, Breeze_Steriod_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == (TEMPEST_TRASH_ARROW_R -1)) {
				seqFireCan = true;
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[(TEMPEST_TRASH_ARROW_R -1)] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, TEMPEST_TRASH_ARROW_R_D,0);
				clearInterval(TBcc3);
                if (AUTOSEQFIRE_GUST && event.skill.id == (TEMPEST_TRASH_ARROW_R -1)) {
					lastSkill = (TEMPEST_TRASH_ARROW_R -1);
                    failsafe =0;
                    setTimeout(function(){
                    repeater(SEQFIREKEY, (TEMPEST_TRASH_ARROW_R -1));
					}, 100 / aspd);
                }
            }
            if (job == JOB_ARCHER && event.skill.id == TEMPEST_TRASH_ARROW_R) {
				seqFireCan = true;
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[TEMPEST_TRASH_ARROW_R] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, TEMPEST_TRASH_ARROW_R_D,0);
				clearInterval(TBcc3);
                if (AUTOSEQFIRE_GUST && event.skill.id == TEMPEST_TRASH_ARROW_R) {
					lastSkill = TEMPEST_TRASH_ARROW_R;
                    failsafe =0;
					setTimeout(function(){
                    repeater(SEQFIREKEY, TEMPEST_TRASH_ARROW_R);
					}, 100 / aspd);
                }
            }
            if (job == JOB_ARCHER && event.skill.id == S_KICK) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_KICK] = false; }, GLOBAL_LOCK_DELAY);
                if (!RACE_CARRIED) {
                    fakeEnd_sorc_dist(event, S_KICK_D,0);
                }
                if (RACE_CARRIED) {
                    fakeEnd_sorc_dist(event, (S_KICK_D / 1.0825),0);
                }
            }
            if (job == JOB_ARCHER && event.skill.id == S_KICK_2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_KICK_2] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_KICK_D2,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_STUNRTRAP) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_STUNRTRAP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_STUNRTRAP_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_SNARE_T) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_SNARE_T] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_SNARE_T_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_INCINRTRAP) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_INCINRTRAP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_INCINRTRAP_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_THUNDER) {
				clearTimeout(thunderdis);
                disabSkill[event.skill.id] = true;
                thunderdis = setTimeout(function () { disabSkill[S_THUNDER] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_THUNDER_D,0);
            }
            if (event.skill.id == S_THUNDER) {
                seqFireCan = true;
				clearInterval(TBcc3);
                if (AUTOSEQFIRE && event.skill.id == S_THUNDER) {
                    setTimeout(function () {
                        var robot = require("robotjs");
                        robot.keyTap(SEQFIREKEY);
                    },0);
                    TBcc3 = setInterval(function () {
                        if (finish[S_THUNDER] == false) {
                            if (lastSkill != event.skill.id) { clearInterval(TBcc3); return; }
                            setTimeout(function () {
                                var robot = require("robotjs");
                                robot.keyTap(SEQFIREKEY);
                            },0);
                        }
                        if (finish[S_THUNDER] != false) { clearInterval(TBcc3); }
                    },50);
                }
            }
            if (job == JOB_ARCHER && event.skill.id == S_FINDWEAK) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_FINDWEAK] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_FINDWEAK_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_BACKSTEP) {
                RadiantActive =0;
                PenActive =0;
                clearInterval(TBcc);
                clearInterval(TBcc2);
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_BACKSTEP] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_BACKSTEP_D, -100);
            }
            if (job == JOB_ARCHER && event.skill.id == S_ARROWRAIN) {
                clearTimeout(raining);
                disabSkill[event.skill.id] = true;
                raining = setTimeout(function () { disabSkill[S_ARROWRAIN] = false; }, GLOBAL_LOCK_DELAY *10);
                fakeEnd_sorc_dist(event, S_ARROWRAIN_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_RETAL) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_RETAL] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, S_RETAL_D,0);
            }
            if (job == JOB_ARCHER && event.skill.id == S_TENA) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function () { disabSkill[S_TENA] = false; }, GLOBAL_LOCK_DELAY);
                fakeEnd_sorc_dist(event, (S_TENA_D1 + S_TENA_D2),0);
                setTimeout(function (event) {
                    if (lastSkill == S_TENA) {
                        dispatch.toClient('S_ACTION_STAGE', 9, {
                            gameId: cid,
                            loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                            w: event.w,
                            templateId: model,
                            skill: event.skill.id,
                            stage: 1,
                            speed: aspd,
                            projectileSpeed: aspd,
                            id: atkid[event.skill.id],
                            effectScale: 1.0, moving: false, dest: { x: 0, y: 0, Z: 0 }, target: 0n, movement: [],
                        });
                    }
                }, S_TENA_D1 / aspd, event);
            }
            lastLastSkill = lastSkill;
            lastSkill = event.skill.id;
            lastEvent = event;
        }
    });

    dispatch.hook('C_CANCEL_SKILL', 3, (event) => {
        if (!enabled) return;
        if (job == JOB_ARCHER && (event.skill.id == S_ARROWVOLLEY || event.skill.id == S_ARROWVOLLEY_2) && event.type ==1) {
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: xloc,
                    y: yloc,
                    z: zloc
                },
                w: wloc,
                templateId: model,
                skill: S_ARROWVOLLEY,
                type: 1,
                id: atkid[S_ARROWVOLLEY],
            });
        }
		 if (job == JOB_ARCHER && event.skill.id == S_DEATH) {
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: xloc,
                    y: yloc,
                    z: zloc
                },
                w: wloc,
                templateId: model,
                skill: S_DEATH,
                type: 1,
                id: atkid[S_DEATH],
            });
			sDeath = false;
        }
        if (job == JOB_ARCHER && event.skill.id == S_ARROWRAIN && !ArrowRainDisab) {
            clearTimeout(raining);
            disabSkill[S_ARROWRAIN] = false;
            clearTimeout(timer[lastSkill]);
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: xloc,
                    y: yloc,
                    z: zloc
                },
                w: wloc,
                templateId: model,
                skill: S_ARROWRAIN,
                type: 2,
                id: atkid[S_ARROWRAIN],
            });
        }
        if (job == JOB_ARCHER && event.skill.id == S_ARROWRAIN && ArrowRainDisab) {
            return false;
        }
    });

    dispatch.hook('S_ACTION_STAGE', 9, (event) => {
	  //console.log("test: " + event.skill == 67113692);
        if (!enabled) return;
            chargeSkillFix2 = event.skill.id;
            var d = new Date();
            lastSkillTime[1] = d.getTime();
            lastSkillTime[3] = event.skill.id;
            var xzzy = event.skill.type ===1;
            if (!xzzy) {
                lastSkill =1;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_ARROW)) {
                return false;
            }
			if (job == JOB_ARCHER && (event.skill.id == S_DEATH) && event.stage ==0) {
                return false;
            }
			if (job == JOB_ARCHER && (event.skill.id == S_DEATH) && !sDeath) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == (TEMPEST_TRASH_ARROW_R -1) || event.skill.id == TEMPEST_TRASH_ARROW_R)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_PENARROW || event.skill.id == S_RADIANT || event.skill.id == TEMPEST_TRASH_ARROW)) {
                if (DISABLE_CHARGE) { return; }
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_ARROWRAIN)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_ARROWVOLLEY || event.skill.id == S_ARROWVOLLEY_2)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_BACKSTEP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RAPIDFIRE || event.skill.id == S_RAPIDFIRE2 || event.skill.id == S_RAPIDFIRE3 || event.skill.id == S_RAPIDFIRE4 || event.skill.id == S_RAPIDFIRE5 || event.skill.id == S_RAPIDFIRE6 || event.skill.id == S_RAPIDFIRE7)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RAPIDFIRE_B || event.skill.id == S_RAPIDFIRE_B2 || event.skill.id == S_RAPIDFIRE_B3 || event.skill.id == S_RAPIDFIRE_B4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == GALE1 || event.skill.id == GALE2 || event.skill.id == GALE3 || event.skill.id == GALE4 || event.skill.id == GALE5 || event.skill.id == GALE6 || event.skill.id == GALE7 || event.skill.id == GALE8 || event.skill.id == GALE9)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SLOWTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_STUNTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_INCINTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_BREAKAWAY)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == Breeze_Steriod)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_WEB)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_KICK || event.skill.id == S_KICK_2)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_POISON)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RESTRAIN)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SEQFIRE)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_STUNRTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SNARE_T)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_INCINRTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_THUNDER)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_FINDWEAK)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_VELIK)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RETAL)) {
                if (Ignore1) {
                    fakeEnd_sorc_dist(event, S_RETAL_D,0);
                    lastSkill = S_RETAL;
                }
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == SKILL_CHARGING)) {
                return false;
            }
        }
    });

    dispatch.hook('S_ACTION_END', 5, (event) => {
	  if(event.skill == 67108580) console.log("error");
        if (!enabled) return;
        if (event.gameId === cid) {
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
            if (job == JOB_ARCHER && (event.skill.id == S_ARROW)) {
                return false;
            }
			if (job == JOB_ARCHER && (event.skill.id == S_DEATH) && !sDeath) {
				sDeath = false;
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == (TEMPEST_TRASH_ARROW_R -1) || event.skill.id == TEMPEST_TRASH_ARROW_R)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RADIANT)) {
                RadiantActive =0;
                if (DISABLE_CHARGE) { return; }
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_PENARROW)) {
                PenActive =0;
                if (DISABLE_CHARGE) { return; }
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == TEMPEST_TRASH_ARROW)) {
                TrashActive =0;
                if (DISABLE_CHARGE) { return; }
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_ARROWRAIN)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_ARROWVOLLEY || event.skill.id == S_ARROWVOLLEY_2)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_BACKSTEP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RAPIDFIRE || event.skill.id == S_RAPIDFIRE2 || event.skill.id == S_RAPIDFIRE3 || event.skill.id == S_RAPIDFIRE4 || event.skill.id == S_RAPIDFIRE5 || event.skill.id == S_RAPIDFIRE6 || event.skill.id == S_RAPIDFIRE7)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RAPIDFIRE_B || event.skill.id == S_RAPIDFIRE_B2 || event.skill.id == S_RAPIDFIRE_B3 || event.skill.id == S_RAPIDFIRE_B4)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == GALE1 || event.skill.id == GALE2 || event.skill.id == GALE3 || event.skill.id == GALE4 || event.skill.id == GALE5 || event.skill.id == GALE6 || event.skill.id == GALE7 || event.skill.id == GALE8 || event.skill.id == GALE9)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SLOWTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_STUNTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_INCINTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_BREAKAWAY)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == Breeze_Steriod)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_WEB)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_KICK || event.skill.id == S_KICK_2)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_POISON)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RESTRAIN)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SEQFIRE)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_STUNRTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_SNARE_T)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_INCINRTRAP)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_THUNDER)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_FINDWEAK)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_VELIK)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == S_RETAL)) {
                return false;
            }
            if (job == JOB_ARCHER && (event.skill.id == SKILL_CHARGING)) {
                if (finish[SKILL_CHARGING] == false) {
                    dispatch.toClient('S_ACTION_END', 5, {
                        gameId: cid,
                        loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z },
                        w: event.w,
                        templateId: model,
                        skill: event.skill.id,
                        type: event.unk,
                        id: atkid[event.skill.id],
                    });
                    finish[event.skill.id] = true;
                }
                return false;
            }
        }
    });

    dispatch.hook('S_START_COOLTIME_SKILL', 3, (event) => {
        if (!enabled) return;
        event.cooldown -= GLOBAL_LATENCY;
        return true;
    });


    dispatch.hook('S_PLAYER_STAT_UPDATE', 13, (event) => {
        if (!enabled) return;
        aspd = (event.attackSpeedBonus + event.attackSpeed) / event.attackSpeed;
    });

    dispatch.hook('C_PLAYER_LOCATION', 5, (event) => {
        if (!enabled) return;
        xloc = event.dest.x;
        yloc = event.dest.y;
        zloc = event.dest.z;
        wloc = event.w;
        timeloc = event.time +1;
    });

    dispatch.hook('S_ACTION_STAGE', 9, (event) => {
	  //console.log("test: " + event.skill == 67113692);
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
	  if(event.skill == 67108580) console.log("error");
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
}
