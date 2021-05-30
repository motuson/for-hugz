module.exports = function TERA_404(dispatch) {
  const command = require('command')(dispatch)
  var currZone;
  
//Broker Anywhere
	command.add('broker', () => {
    dispatch.toClient('S_NPC_MENU_SELECT', 1, {type:28})
    return false
    })
    
//NO Drink Screen
module.exports = function noBlurScreen(dispatch) {
    dispatch.hook('sAbnormalityBegin', 2, (event) => {
    //console.log('Abnormality:'+event.id+' Duration:'+event.duration+' Stacks:'+event.stacks)
    if(event.id == "70237" || event.id == "905434")
        {return false;}
      });
}

//Valkyrie Бесконечный эвейд & Mystic Бумеранг 
//    dispatch.hook('C_START_SKILL', 3, event => { 
//    if (event.skill == 67248964){event.skill=67248965;return true;}
//		if (67248964 === event.skill) { //67529864
//			event.toZ = event.z + 814.5;
//			event.toX = event.x + Math.cos(Math.PI * event.w / 32768.0) * 437;
//			event.toY = event.y + Math.sin(Math.PI * event.w / 32768.0) * 437;
//			return true;
//	}
//});
	

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
