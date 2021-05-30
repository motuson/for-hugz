module.exports = function Directional(mod) {
    let rotation = 0
    let id = 0
    let enabled = false
    
    mod.command.add('directional', () => {
    	enabled = !enabled
    	mod.command.message('Directional is now: ' + (enabled ? 'Enabled.' : 'Disabled.'))
    });
    	
    mod.hook('S_LOGIN', 14, (event) => {id = event.gameId})
    mod.hook('C_PLAYER_LOCATION', 5, (event) => {rotation = event.w})
    mod.hook('C_NOTIFY_LOCATION_IN_ACTION', 4, (event) => {rotation = event.w})
    mod.hook('C_NOTIFY_LOCATION_IN_DASH', 4, (event) => {rotation = event.w})
    
    mod.hook('S_USER_LOCATION', 5, (event) => {
    	if (event.gameId === id) rotation = event.w
    })
    
    mod.hook('S_USER_LOCATION_IN_ACTION', 2, (event) => {
    	if (event.gameId === id) rotation = event.w
    })
    
    mod.hook('C_START_TARGETED_SKILL', 7, (event) => {
    if (enabled) {
        let model = Math.floor(event.skill.id / 10000)
        //40000
    	if (model === 4) {
    			event.w = rotation
    			event.dest.x = event.loc.x + 440 * Math.cos(event.w)
    			event.dest.y = event.loc.y + 440 * Math.sin(event.w)
    			event.dest.z = event.loc.z + 100000
    			return true
    	} else rotation = event.w
    }
    })
    
    mod.hook('C_START_SKILL', 7, (event) => {
        if (enabled) {
            let model = Math.floor(event.skill.id / 10000)
            //41011
        	if (model === 4) {
        		event.w = rotation
        	} else rotation = event.w
        }
    })
}