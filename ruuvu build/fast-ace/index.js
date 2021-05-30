module.exports = function FastAceGG(dispatch) {
    
    let cid, inAkasha, inBaracos, inGhilli;

    dispatch.hook('S_LOGIN', 2, (event) => {cid = event.cid});

    dispatch.hook('S_LOAD_TOPO', 1, (event) => {      
        inAkasha = (event.zone === 9031);
		inBaracos = (event.zone === 9032);
		inGhilli = (event.zone === 9713);
    });

    dispatch.hook('S_SPAWN_ME', 1, (event) => {
        if(inAkasha) {
            event.x = 72416;
            event.y = 133868;
            event.z = -503;
			event.w = 15294;
            return true;
        }
		
		if(inBaracos) {
            event.x = 28194;
            event.y = 179672;
            event.z = -1675;
			event.w = -16217;
            return true;
        }
		
		if(inGhilli) {
            event.x = 52230;
            event.y = 117225;
            event.z = 4352;
	    event.w = 16135;
            return true;
        }
    })

}
//             case 9916: // координаты к ласту Даркан
//                event.x = 49503;
//                event.y = 128043;
//                event.z = 3613;