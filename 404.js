module.exports = function TERA_404(dispatch) {
  const command = require('command')(dispatch)
  var currZone;
  
//Broker Anywhere
  const chatHook = event => {
        if(!event.message.toLowerCase().includes('!broker')) return
        
    dispatch.toClient('S_NPC_MENU_SELECT', 1, {type:28})
    return false
    }
    
    dispatch.hook('C_CHAT', 1, chatHook)
    dispatch.hook('C_WHISPER', 1, chatHook)
    
//NO Drink Screen
module.exports = function noBlurScreen(dispatch) {
    dispatch.hook('sAbnormalityBegin', 2, (event) => {
    //console.log('Abnormality:'+event.id+' Duration:'+event.duration+' Stacks:'+event.stacks)
    if(event.id == "70237" || event.id == "905434")
        {return false;}
      });
}
//No Fall Damage
    dispatch.hook('S_LOAD_TOPO', 2, e=>{currZone = e.zone;})
    dispatch.hook('C_PLAYER_LOCATION', 1, e=>{
    return !([2, 10].includes(e.type) && (currZone < 10 || currZone > 200))      
        })

    dispatch.hook('S_LOGIN', 2, (event) => {
		pcid = event.cid;
})

//Mystic Бумеранг 
//    dispatch.hook('C_START_SKILL', 3, event => { 
    
//		if (67248964 === event.skill) { 67529864
//			event.toZ = event.z + 814.5;
//			event.toX = event.x + Math.cos(Math.PI * event.w / 32768.0) * 437;
//			event.toY = event.y + Math.sin(Math.PI * event.w / 32768.0) * 437;
//			return true;
//	}
//});
	
//SPEED HACK
dispatch.hook('S_PLAYER_STAT_UPDATE', (event) => {
event.walkSpeed = 100
event.runSpeed = 130
});
	
//Notice For All
	 dispatch.hook('C_WHISPER', 1, (event) => {
          if (event.target === 'n') {
               dispatch.toServer('C_CHAT', 1, {
                    channel: 21,
                    message: event.message
               })
               return false
          }
     });
	
}
