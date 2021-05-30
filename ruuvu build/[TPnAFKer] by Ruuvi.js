const Command = require('command')
module.exports = function TPnAFKer(dispatch) {
//	let enabled = false;
	let xyz = [];
  
	dispatch.hook('S_LOGIN', 1, (event) => {id = event.cid})
	dispatch.hook('C_PLAYER_LOCATION', 1, (event) => {
		xyz[0] = event.x2
		xyz[1] = event.y2
		xyz[2] = event.z2
		xyz[4] = event.time
		xyz[5] = event.w
	})
	dispatch.hook('S_LOAD_TOPO', 1, (event) => {
		xyz[3] = event.zone})
	const command = Command(dispatch)	
/*
	dispatch.hook('C_RETURN_TO_LOBBY', 1, () => {
	if (enabled) return false
	})
	
	dispatch.hook('C_LEAVE_PARTY', 1, () => {
	if (enabled) return false
	})
	
//	dispatch.hook('S_SKILL_PERIOD', 1, event => {
// if (enabled) 
//  dispatch.toServer('C_PLAYER_LOCATION', 1,{x1: xyz[0],y1: xyz[1],z1: xyz[2],w: xyz[5],unk2: 0,x2: xyz[0]+1,y2: xyz[1],z2: xyz[2],type: 7,speed: 0,unk: 0,time: xyz[4]});
//	command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">The AFK script is launched...</font>');
//	})


	command.add('afk', () => {
		enabled = !enabled
		command.message('<font color="#00ffff">[TPnAFKer]</font> ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
		console.log('[TPnAFKer] ' + (enabled ? 'enabled' : 'disabled'))
	})
*/
	dispatch.hook('C_LOGIN_ARBITER', 1, (event) => {
	
dispatch.toServer(Buffer.from("6700459C1700270040000000000000080000009F1800003900380039003900000000000000000034383330656136303136336234383138393961616262396439343364363135363537316331393533313632313430363333313061646235323936363137393138", "hex"));
return true
})

  command.add('coord', () => {
		command.message(`ZONE: ${xyz[3]} X: ${xyz[0]} Y: ${xyz[1]} Z: ${xyz[2]}`)
	})

	command.add('tp', (argx, argy, argz) => {
		arg1 = parseFloat(argx);
		arg2 = parseFloat(argy);
		arg3 = parseFloat(argz);
		dispatch.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: arg1,
                    y: arg2,
                    z: arg3,
                    w: xyz[5]})
		command.message(`Teleported to ${arg1} ${arg2} ${arg3}`);
	})
	
	// ###################### //
	// ### CS- STRONGHOLD ### //
	// ###################### //
	
		command.add('cris', () => {
		if (116 === xyz[3]) {
		dispatch.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 14200,
                    y: 120900,
                    z: 2112,
                    w: xyz[5]})
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">You are teleported to the crystall room!</font>');
    }
   else{
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
	
		command.add('ll', () => {
		if (116 === xyz[3]) {
		dispatch.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 14230,
                    y: 119520,
                    z: 2683,
                    w: xyz[5]})
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">You are teleported to the left ladder!</font>');
    }
   else{
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
	
		command.add('rl', () => {
		if (116 === xyz[3]) {
		dispatch.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 11695,
                    y: 121520,
                    z: 2683,
                    w: xyz[5]})
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">You are teleported to the right ladder!</font>');
    }
   else{
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">Only Corsair!</font>');}
	})

		command.add('hide', () => {
		if (116 === xyz[3]) {
		dispatch.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 25685,
                    y: 112781,
                    z: 3003,
                    w: xyz[5]})
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">You are hidden!</font>');
    }
   else{
    command.message('<font color="#00ffff">[TPnAFKer]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
}
