// Fixes a bug where staying still in the water will spam duplicate location packets, causing the server to disconnect the player

module.exports = function SwimFix(dispatch) {
	let myLoc = null

	dispatch.hook('C_PLAYER_LOCATION', 1, {order: -90}, event => {
		if(myLoc &&
			myLoc.x1 === event.x1 &&
			myLoc.y1 === event.y1 &&
			myLoc.z1 === event.z1 &&
			myLoc.w === event.w &&
			myLoc.x2 === event.x2 &&
			myLoc.y2 === event.y2 &&
			myLoc.z2 === event.z2 &&
			myLoc.type === event.type
		)
			return false

		myLoc = event
	})
}