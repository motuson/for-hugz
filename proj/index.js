const {protocol} = require('tera-data-parser')
const StateTracker = require('tera-state-tracker')
const Command = require('command')

module.exports = function MYProjectile(dispatch) {
const state = StateTracker(dispatch)
const command = Command(dispatch)
    let enabled = false
	let enabled1 = false
	let enabled2 = false
	let damageE = false
	let speed = true
	let cid = null
	let packets1 = []
	let targets1 = []
	let timeout1 = null
	let fpss = true
	let dmg = []
	let crt = []
	let targetAll = false
	let loadedNpcs = []
	let projectileIds = []
    let projectileCoords = {}
    let targetIds = []
	let projectileIdx = 0
    let targetIdx = 0
	let timer = null
	let timerTick = 10
	let iterationHits = 30
	let hitCount = 0																															
	const START_ITEM = 6550
	const ALL_ITEM = 6560
	let timerTick1 = 11
	let timerIterations1 = 1
	let lastJ = 0
	let gameId = null
	let sp1 = 100
const Pot = 200999
	
	    command.add('pes', (timerTick2, iterationHits2) => {
        timerTick = timerTick2
        iterationHits = iterationHits2
		command.message(`Урон каждые ${timerTick} мс, итерация ударов ${iterationHits}`)
    }) 
		command.add('speed1', (sp11) => {
		sp1 = sp11
		command.message(` Скорость бега ${sp1}`)
    })  
	command.add('rk', () => {
	enabled1 = !enabled1
	})
	command.add('dm', () => {
	damageE = !damageE
    command.message('Режим демага '+(damageE?'выкл':'вкл')+'.')
	})
	command.add('fps', () => {
	fpss = !fpss
     command.message('Отображение ФПС '+(fpss?'вкл':'выкл')+'.')
	})
	command.add('speed', () => {
	speed = !speed
     command.message('Ускорение '+(speed?'вкл':'выкл')+'.')
	})
	dispatch.hook('S_EACH_SKILL_RESULT', (event) => {
	dmg.push(event.damage)
	crt.push(event.crit)
    })
	//банки маны и хп активируют мод соло и масс цели
	dispatch.hook('C_USE_ITEM', 1, event => {
		if (event.item === START_ITEM)
				{
			enabled = !enabled
			sumArrayD()
			sumArray() 	
			sumArrayCrit()
			return false
				}
	})			
	dispatch.hook('C_USE_ITEM', 1, event => {	
		if (event.item === ALL_ITEM)
				{
			targetAll = !targetAll
			sumArrayD()
			sumArray() 	
			sumArrayCrit()
			return false
				}
	})	
	

		dispatch.hook('S_LOGIN',9, (event) => {
		gameId = event.gameId
		})
		
	let curhp = 0
	let hp = 0
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {
		curHpp = event.curHp
		curhp = event.curHp 
		maxHp = event.maxHp
		hp = parseInt(curhp)
		})

	//массивы пересчета урона ДПС метра >${c.toFixed(1)+'%'}</font>`)
	var summ = 0
 	function sumArray() 															
	{
	   for (let a = 0; a < dmg.length; a++)
		{
		summ = summ + parseInt(dmg[a])
		}
		command.message(`<font color="#ffff99">======================================================</font>`)
		command.message(`<font color="#ffff99"> Соло таргет </font> <font color="#007fff">${enabled?'вкл':'выкл'}</font><font color="#ffff99"> Масс режим </font> <font color="#007fff">${targetAll?'вкл':'выкл'}</font><font color="#ffff99"> Ускорение </font> <font color="#007fff">${speed?'вкл':'выкл'}</font>`)						
		command.message(`<font color="#ffff99"> Задержка мс </font> <font color="#007fff">${timerTick}</font><font color="#ffff99">    Итерация мс </font> <font color="#007fff">${iterationHits}</font><font color="#ffff99">    Скорость бега </font> <font color="#ff0808">${sp}</font>`)	
		command.message(`<font color="#ffff99"> Режим ФПС </font> <font color="#007fff">${fpss?'вкл':'выкл'}</font><font color="#ffff99">  Урон Щит РК </font> <font color="#007fff">${enabled1?'вкл':'выкл'}</font>`)
		command.message(`<font color="#910000">	  БОСС ХП  </font> <font color="#ff0808">${hp.toLocaleString()}</font>`)
		command.message(`<font color="#cc6600"> Общий урон слеша за удар </font> <font color="#7e7eff">${summ.toLocaleString()}</font>`)
		command.message(`<font color="#ff6600"> Колличество ударов </font> <font color="#08ff84">${dmg.length.toLocaleString()}</font>`)		
	}
	
	var p = 0;
	var cp = 0;
	var cou = 0
	function sumArrayCrit()
		{
		for (let c = 0; c < crt.length; c++)
			{
			cou = crt.length;
			p=p+parseInt(crt[c]);
			cp=p/cou*100
			}	
		command.message(`<font color="#ffff00"> Колличество Критов </font> <font color="#00cc00">${cp.toFixed(1)+'%'}</font>`)
		command.message(`<font color="#ffff99">======================================================</font>`)
	}

				
	//функция сброса ДПС метра
	function sumArrayD() 
	{
	summ = 0
	curhp = 0
	dmg = []
	crt = []
	p = 0
	cp = 0
	}

    command.add('pe', () => {
			if(enabled = !enabled)
			{
		sumArrayD()
		sumArray() 	
		sumArrayCrit()
			}
		})

   command.add('peall', () => {
	if(targetAll = !targetAll) 
			{
		sumArrayD()		
		sumArray() 	
		sumArrayCrit()
			}
		})
	dispatch.hook('cUseItem', 1, (event) => 
		{
		if(event.item == Pot) 
		{
		resetf()
		return false
		}
	})	
	dispatch.hook('C_REQUEST_NONDB_ITEM_INFO', 1,(event) => 
	{
	if(event.item == 201005) 
		{
		resetf()
		return false
		}
		})
				//спиды
		dispatch.hook('S_USER_STATUS', (event) => {	
		if((event.status) == 1 && speed) 
				{		
			sp = 220
				}	
		if((event.status) == 0)
			{
			sp = sp1
			}	
		})
		
	let sp = 0
	dispatch.hook('S_PLAYER_STAT_UPDATE', (event) => {
        event.runSpeed = 90;
		event.runSpeedBonus = sp;
        event.attackSpeed = 120;
        return true
	})
	
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => 
	{	
			if(curhp<=0)
				{
			dispatch.toServer('S_USER_STATUS',
				{
					target:gameId,
					status:0,
					unk:0
				})
			}
	})

	

	 function TargetHit()
    {
        if (targetIdx >= targetIds.length) targetIdx = 0
       
        for (let i = targetIdx; i < targetIds.length; i++)
		{
            let cid = targetIds[i]
			let scid = cid.toString()
            targetIdx = i + 1
            return cid
        }

      targetIdx = 0
        return null
    }
	let x1=0
    function runTimer()
    {
       // if (!enabled || projectileIds.length === 0 || targetIds.length === 0) 
		//{
      //      killTimer()
       //     return
      //  }
       
        if (projectileIdx >= projectileIds.length) {
            projectileIdx = 0
        }
	   
        let hitCoords = state.server.position
        hitCoords = hitCoords.add(state.server.lookVec.mul(5))
        hitCoords.z += 20

        let packet = {
            source: projectileIds[projectileIdx],
            end: 0,
            x: hitCoords.x,
            y: hitCoords.y,
            z: hitCoords.z,
            targets: [
            ]
        }

        while (packet.targets.length < iterationHits)
		{
            let targetCid = TargetHit()
            if (targetCid === null) break
            packet.targets.push({
                target: targetCid,
                unk1: 0
						
            })
           
            hitCount++
        }
       
        if (packet.targets.length > 0) {
            let rawPacket = Buffer.from(protocol.write(dispatch.base.protocolVersion, 'C_HIT_USER_PROJECTILE', 2, packet).toString('hex'), 'hex')
            dispatch.toServer(rawPacket)
        }
       
        projectileIdx++
       
        killTimer()
        setTimer()
    }
   
   function addProjectile(projectileId, projectilePos)
   {
        if (findInArray(projectileIds, projectileId) < 0) {
            projectileIds.push(projectileId)
            projectileCoords[projectileId.toString()] = projectilePos
			}
       
        startTimer()
			}
   
    function removeProjectile(projectileId)
    {
        let i = 0
        while ((i = findInArray(projectileIds, projectileId)) >= 0) {
            projectileIds.splice(i, 1)
            delete projectileCoords[projectileId.toString()]
        }
       
        if (projectileIds.length === 0 & !damageE) {
			
			sumArray()
			sumArrayCrit()
			sumArrayD()
        }
 
        killTimer()
		resethit()
    }
   
    function findInArray(ary, item)
    {
        for (let i = 0; i < ary.length; i++) {
            if (ary[i].toString() === item.toString())
				{
                return i	
            }
        }
       
        return -1
    }

    function addTarget(targetId, projectileId)
    {
        if (findInArray(targetIds, targetId) < 0) {
            targetIds.push(targetId)
        }
       
        startTimer()
    }
	


   
    function removeTarget(targetId)
    {
        let i = 0
        while ((i = findInArray(targetIds, targetId)) >= 0) {
            targetIds.splice(i, 1)
        }
       
        killTimer()
    }
   
    function killTimer()
    {
        if (!enabled || projectileIds.length === 0 || targetIds.length === 0) {
            if (timer !== null) {
                clearTimeout(timer)
                timer = null
            }
        }
    }
   
    function startTimer()
    {
        setTimeout(() => 
		{
            if (timer === null)
				{
                runTimer()
				}
        }, 0)
    }
	
    function setTimer()
    {
        if (enabled && projectileIds.length > 0 && targetIds.length > 0)
			{
            if (timer !== null) 
			{
               clearTimeout(timer)
                timer = 0
            }
            timer = setTimeout(runTimer, timerTick)
        }
    }
	
	
	function resethit()
		{
		hitCount = 0
		}

	
	function resetf()
		{
		    loadedNpcs = []
			projectileIds = []
			projectileCoords = {}
			targetIds = []
			targetIdx = 0
			projectileIdx = 0

		}
	 

	dispatch.hook('S_SPAWN_NPC', (event) => {
	loadedNpcs.push(event.id)
	})
   
    dispatch.hook('S_DESPAWN_NPC', 1, (event) => {
        for (let i = 0; i < loadedNpcs.length; i++) 
		{
			if (loadedNpcs[i].toString() === event.target.toString()) 
			{
                loadedNpcs.splice(i, 1)
                i--;
            }
        }

    })
	
   
    dispatch.hook('S_START_USER_PROJECTILE', 2, {filter: {fake: false, silenced: null}}, (event) => {
	    if (!enabled) return
		if (!state.isMe(event.source)) return
	 addProjectile(event.id, state.server.position.add(state.server.lookVec))
			if (targetAll)
			{
            for (let npc of loadedNpcs)
				{
                addTarget(npc, event.id)
				}
			}
    })
   
    dispatch.hook('C_HIT_USER_PROJECTILE', 2, {filter: {fake: false, silenced: null}}, (event) => {
        if (!enabled) return
       
        if (!targetAll ) {
            for (let tgt of event.targets) {
                addTarget(tgt.target, event.source)
            }
        }
       
        return false
    })
   
    dispatch.hook('S_END_USER_PROJECTILE', 1, {filter: {fake: false, silenced: null}}, (event) => 
	{
    removeProjectile(event.id)
    })
   	//true/false отображение урона
	dispatch.hook('S_EACH_SKILL_RESULT', (event) => {
	if (enabled && fpss && projectileIds.length > 0 && targetIds.length > 0) return false
	})


	//функция урона по щиту рк9
	
		
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {	
			let percentToDrop = (curHpp * 100 / maxHp)
			if(percentToDrop <= 95 && enabled1)
				{
			enabled	= false
				}			
			if(percentToDrop <= 90 && enabled1)
				{	
			enabled	= true
			enabled1= false
				}
		})
		
	function runTimer1()
	{
		let i = 0
		let j = lastJ
		if (j >= packets1.length) j = 0
		
		while (i < timerIterations1) {
			dispatch.toServer('C_HIT_USER_PROJECTILE',2, packets1[j])
			i++
			j++
			if (j >= packets1.length) j = 0
		}
		lastJ = j
		
		if (timeout1 !== null) {
			timeout1 = setTimeout(() => {
				runTimer1()
			}, timerTick1)
		}
	}
	function addPacket(event)
	{
		packets1.push(event)
		if (timeout1 === null) {
			timeout1 = setTimeout(() => {
				runTimer1()
			}, timerTick1)
		}
	}
	function clearProjectile(projectileId1)
	{
		for (let i = 0; i < packets1.length; i++) {
			if (packets1[i].source.toString() === projectileId1.toString()) {
				packets1.splice(i, 1)
				i--;
			}
		}
		if (packets1.length === 0) {
			if (timeout1 !== null) {
				clearTimeout(timeout1)
				timeout1 = null
			}
		}
	}
	dispatch.hook('S_START_USER_PROJECTILE',2, (event) => {
		if (!enabled1) return
		
		if (event.source.toString()) return
		
		for (let tgt of targets1) {
			let packet = {
				source: event.id,
				end: 0,
				x: event.x1,
				y: event.y1,
				z: event.z1,
				targets1: [
					{
						target: tgt,
						unk1: 0
					}
				]
			}
			
			addPacket(packet)
		}
	})
	dispatch.hook('C_HIT_USER_PROJECTILE', 2, (event) => {
		if (event.end !== 0) 
		{
			clearProjectile(event.source)
			return
		}
		if (!enabled1) return
		addPacket(event)
		return false
	})
		dispatch.hook('S_END_USER_PROJECTILE', 1, (event) => {
		clearProjectile(event.id)
	})
	//true/false отображение урона
		dispatch.hook('S_EACH_SKILL_RESULT', (event) => {
	if (enabled1 && fpss &&  packets1.length > 0) return false
	})
	

 }