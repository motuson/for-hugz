const Command = require('command')
const { protocol } = require('tera-data-parser')
const StateTracker = require('tera-state-tracker')

module.exports = function ProjectileExploit(dispatch) {
	const command = Command(dispatch)
    const state = StateTracker(dispatch)
	
	let enabled = false
	let targetAllNpcs = false
    let targetAllUsers = false

	let loadedNpcs = []
    let loadedUsers = []
    let teleslashTargets = []
	
	let projectileIds = []
    let projectileCoords = {}
	let targetIds = []
    
    let targetEnqueuedHits = {}
    let lastDequeueTime = 0
	
	let projectileIdx = 0
	let targetIdx = 0
	
	let timer = null
	let timerTick = 5
	let iterationHits = 200
    let maxHitsQueued = 30000
    let hitDequeueInterval = 5

    let hitCount = 0
    
    command.add('pes', (timerTick2, iterationHits2, maxHitsQueued2, hitDequeueInterval2) => {
        timerTick = timerTick2
        iterationHits = iterationHits2
        maxHitsQueued = maxHitsQueued2
        hitDequeueInterval = hitDequeueInterval2
    })        
	
	command.add('pe', (arg) => {
        if (arg === undefined) arg = ''
		arg = ''+arg
		
		if (['true', 'yes', 'y', '1'].includes(arg.toLowerCase())) {
            enabled = true
			targetAllNpcs = false
            targetAllUsers = false
		} else if (['false', 'no', 'n', '0'].includes(arg.toLowerCase())) {
			enabled = false
			targetAllNpcs = false
            targetAllUsers = false
		} else if (['all', 'a', '2'].includes(arg.toLowerCase())) {
			enabled = true
			targetAllNpcs = true
            targetAllUsers = true
        } else if (['npcs', '3'].includes(arg.toLowerCase())) {
			enabled = true
			targetAllNpcs = true
            targetAllUsers = false
        } else if (['users', '4'].includes(arg.toLowerCase())) {
			enabled = true
			targetAllNpcs = false
            targetAllUsers = true
        } else {
			enabled = !enabled
			targetAllNpcs = false
            targetAllUsers = false
		}
		
		command.message(`Projectile exploit is now ${enabled ? 'enabled' : 'disabled'}${targetAllNpcs ? ' (all npcs)' : ''}${targetAllUsers ? ' (all users)' : ''}.`)
	})
    
    command.add('ts', (name) => {
        if (name === undefined) {
            return
        }
        if (name === 'clear') {
            teleslashTargets = []
            return
        }
        if (name === 'scan') {
            let l1 = teleslashTargets.length
            for (let x of loadedUsers) {
                if (findInArray(teleslashTargets, x) < 0) {
                    teleslashTargets.push(x)
                }
            }
            let l2 = teleslashTargets.length
            command.message(`Added ${l2-l1} users to teleslash list.`)
            return
        }
        // Teleslashing
        findUserCidAsync(name, (cid) => {
            if (cid === null) {
                command.message(`User lookup timed out.`)
                return
            }
            let i;
            if ((i = findInArray(teleslashTargets, cid)) < 0) {
                teleslashTargets.push(cid)
                command.message(`Added user ${name} to teleslash list.`)
            } else {
                teleslashTargets.splice(i, 1)
                command.message(`User ${name} removed from teleslash list.`)
            }
            
        })
    })
	
	function findUserCidAsync(name, fn) {
        let ary = []
        
        let hook = dispatch.hookOnce('S_NPCGUILD_LIST', 1, (ev) => {
            if (ary.length === 0) {
                ary.push(1)
                fn(Object.assign({}, ev.cid))
            }
        })
        
        setTimeout(() => {
            if (ary.length === 0) {
                ary.push(1)
                fn(null)
            }
        }, 2000)
        
        dispatch.toServer('C_NPCGUILD_LIST', 1, {
            'name': name
        })
	}
    
    function dequeueTargetHits()
    {
        let time = Date.now() - lastDequeueTime
        
        for (let i = 0; i < targetIds.length; i++) {
            let cid = targetIds[i]
            let scid = cid.toString()
            let curHits = targetEnqueuedHits[scid]
            if (curHits === undefined) continue
            
            let hitsToDequeue = parseFloat(time) / parseFloat(hitDequeueInterval)
            
            curHits -= hitsToDequeue
            if (curHits < 0) curHits = 0
            
            targetEnqueuedHits[scid] = curHits
        }
        
        lastDequeueTime = Date.now()
    }
    
    function enqueueTargetHit()
    {
        if (targetIdx >= targetIds.length) targetIdx = 0
        
        for (let i = targetIdx; i < targetIds.length; i++) {
            let cid = targetIds[i]
            let scid = cid.toString()
            let curHits = targetEnqueuedHits[scid]
            if (curHits === undefined) curHits = 0
            
            if (Math.ceil(curHits) >= maxHitsQueued) {
                //console.log(`Skipping ${scid}, queue full.`)
                continue
            }
            
            curHits += 1
            
            //console.log(`Queued hit on ${scid}, now ${curHits} hits.`)
            targetEnqueuedHits[scid] = curHits
            
            targetIdx = i + 1
            return cid
        }
        
        targetIdx = 0
        return null
    }
		
	function runTimer()
	{
		if (!enabled || projectileIds.length === 0 || targetIds.length === 0) {
			killTimerIfAppropiate()
			return
		}
		
        if (projectileIdx >= projectileIds.length) {
            projectileIdx = 0
        }
        
        let hitCoords = state.server.position
        hitCoords = hitCoords.add(state.server.lookVec.mul(5))
        hitCoords.z += 40
        
        let packet = {
            source: projectileIds[projectileIdx],
            end: 0,
            x: hitCoords.x,
            y: hitCoords.y,
            z: hitCoords.z,
            targets: [
            ]
        }
        
        dequeueTargetHits()
        while (packet.targets.length < iterationHits) {
            let targetCid = enqueueTargetHit()
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
		
		killTimerIfAppropiate()
		setTimerIfAppropiate()
	}
	
	function addProjectile(projectileId, projectilePos)
	{
		if (findInArray(projectileIds, projectileId) < 0) {
			projectileIds.push(projectileId)
            projectileCoords[projectileId.toString()] = projectilePos
		}
        
		startTimerIfAppropiate()
	}
	
	function removeProjectile(projectileId)
	{
		let i = 0
		while ((i = findInArray(projectileIds, projectileId)) >= 0) {
			projectileIds.splice(i, 1)
            delete projectileCoords[projectileId.toString()]
		}
		
		if (projectileIds.length === 0) {
            resetFull()
		}

		killTimerIfAppropiate()
	}
	
	function findInArray(ary, item)
	{
		for (let i = 0; i < ary.length; i++) {
			if (ary[i].toString() === item.toString()) {
				return i
			}
		}
		
		return -1
	}
	
	function addTarget(targetId, projectileId)
	{
		if (findInArray(targetIds, targetId) < 0) {
           // console.log('add target id', targetId)
			targetIds.push(targetId)
		}
		
		startTimerIfAppropiate()
	}
	
	function removeTarget(targetId)
	{
		let i = 0
		while ((i = findInArray(targetIds, targetId)) >= 0) {
			targetIds.splice(i, 1)
		}
		
		killTimerIfAppropiate()
	}
	
	function killTimerIfAppropiate()
	{
		if (!enabled || projectileIds.length === 0 || targetIds.length === 0) {
			if (timer !== null) {
				clearTimeout(timer)
				timer = null
			}
		}
	}
	
	function startTimerIfAppropiate()
	{
		setTimeout(() => {
            if (timer === null) {
                runTimer()
            }
		}, 0)
	}
	
	function setTimerIfAppropiate()
	{
		if (enabled && projectileIds.length > 0 && targetIds.length > 0) {
			if (timer !== null) {
				clearTimeout(timer)
				timer = null
			}
			
			timer = setTimeout(runTimer, timerTick)
		}
	}
    
    function resetFull()
    {
       /* console.log(`Reset, hit count: ${hitCount}`)
        hitCount = 0
        loadedNpcs = []
		projectileIds = []
		targetIds = []
        targetEnqueuedHits = {} */
    }
	
	dispatch.hook('S_LOGIN', 2, (event) => {
		resetFull()
	})
	
	dispatch.hook('S_LOAD_TOPO', (event) => {
		resetFull()
	})
	
    dispatch.hook('S_SPAWN_NPC', (event) => {
		loadedNpcs.push(event.id)
	})
	
	dispatch.hook('S_DESPAWN_NPC', (event) => {
		for (let i = 0; i < loadedNpcs.length; i++) {
			if (loadedNpcs[i].toString() === event.target.toString()) {
				loadedNpcs.splice(i, 1)
				i--;
			}
		}
	})
    
    dispatch.hook('S_SPAWN_USER', (event) => {
		loadedUsers.push(event.cid)
	})
	
	dispatch.hook('S_DESPAWN_USER', (event) => {
		for (let i = 0; i < loadedUsers.length; i++) {
			if (loadedUsers[i].toString() === event.target.toString()) {
				loadedUsers.splice(i, 1)
				i--;
			}
		}
	})
	
	dispatch.hook('S_START_USER_PROJECTILE', {filter: {fake: false, silenced: null}}, (event) => {
		if (!enabled) return
		if (!state.isMe(event.source)) return
		
		addProjectile(event.id, state.server.position.add(state.server.lookVec))
		
        if (targetAllNpcs) {
            for (let npc of loadedNpcs) {
                addTarget(npc, event.id)
            }
        }
        if (targetAllUsers) {
            for (let user of loadedUsers) {
                addTarget(user, event.id)
            }
        }
        for (let user of teleslashTargets) {
            addTarget(user, event.id)
        }
	})
	
	dispatch.hook('C_HIT_USER_PROJECTILE', {filter: {fake: false, silenced: null}}, (event) => {
		if (!enabled) return
        
        if (!targetAllNpcs && !targetAllUsers && teleslashTargets.length === 0) {
            for (let tgt of event.targets) { 
                addTarget(tgt.target, event.source)
            }
        }
		
		return false
	})
	
	dispatch.hook('S_END_USER_PROJECTILE', {filter: {fake: false, silenced: null}}, (event) => {
		removeProjectile(event.id)
	})
	
	dispatch.hook('S_EACH_SKILL_RESULT', (event) => {
		if (enabled && projectileIds.length > 0 && targetIds.length > 0) return false
		
	
    
	})
	
	command.add('resetfull', () => {
		command.message(`Teleslash has been fully reset`)
    loadedNpcs = []
    loadedUsers = []
    teleslashTargets = []
    
    projectileIds = []
    projectileCoords = {}
    targetIds = []
    targetEnqueuedHits = {}
    lastDequeueTime = 0
    
    projectileIdx = 0
    targetIdx = 0
 })
	
	
}

