// <3 Pinkie Pie :3

module.exports = function QuickLoad(dispatch) {
	let zone = -1,
		quick = false,
		modified = false,
		correctLocation = null

	dispatch.hook('S_LOGIN', 'raw', () => { zone = -1 })

	dispatch.hook('S_LOAD_TOPO', 2, {order: 100}, event => {
		quick = event.quick

		if(event.zone === zone) return modified = event.quick = true

		zone = event.zone
	})

	dispatch.hook('S_SPAWN_ME', 1, {order: 100}, event => {
		if(!quick) correctLocation = event

		if(modified) {
			dispatch.toClient('S_SPAWN_ME', 1, event) // Bring our character model back from the void
			dispatch.toServer('C_PLAYER_LOCATION', 1, { // Update our position on the server
				x1: event.x,
				y1: event.y,
				z1: event.z,
				w: event.w,
				unk2: 0,
				x2: event.x,
				y2: event.y,
				z2: event.z,
				type: 7,
				speed: 0,
				unk: 0,
				time: 0
			})
			modified = false
		}
	})

	dispatch.hook('C_PLAYER_LOCATION', 1, event => {
		if(correctLocation) {
			// Did we accidentally spawn under the map? Let's fix that!
			if(event.z1 !== correctLocation.z) {
				dispatch.toClient('S_INSTANT_MOVE', 1, Object.assign(correctLocation, {id: correctLocation.target}))
				correctLocation = null
				return false
			}
			correctLocation = null
		}
	})

	// If our client doesn't send C_PLAYER_LOCATION before this packet, then it's most likely user input
	dispatch.hook('C_VISIT_NEW_SECTION', 'raw', () => { correctLocation = null })
}