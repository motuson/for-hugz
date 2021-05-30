const Command = require('command')

module.exports = function Save(dispatch) {
	const command = Command(dispatch)
	let cid = null;
	let maxHp = 0
	let curhp = 0 
	let zona = 0 
	let templateId  = 0
	
	dispatch.hook('S_LOGIN', 1, event => ({ cid } = event));
	
command.add('cn', () => {
	CN1() 
	})
command.add('lk', () => {
	LK1() 
	})
	
	
  dispatch.hook('S_LOAD_TOPO', 2, (event) => {
	  if(event.zone==9794)
		{
command.message(`<font color="#e60000"> КУДА ЕДЕМ ШЕФ? </font>`)
command.message(`<font color="#cc6600">       Локации </font>`)
command.message(`<font color="#00cccc"> Сайрекс Нормуль - !CN </font>`)
command.message(`<font color="#00cccc"> Алтарь Лалкана - !LK </font>`)
		}
			if(event.zone==9710)
		{
command.message(`<font color="#e60000"> КУДА ЕДЕМ ШЕФ? </font>`)
command.message(`<font color="#cc6600">       Локации </font>`)
command.message(`<font color="#00cccc"> Сайрекс Нормуль - !CN </font>`)
command.message(`<font color="#00cccc"> Алтарь Лалкана - !LK </font>`)
		}
    })
		dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {
			maxHp = event.maxHp
			zona = event.huntingZoneId
			curhp = event.curHp
			templateId = event.templateId
		})
		

	//Сайрекс	
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {
		
		let hp = (curhp * 100 / maxHp)	
			if(hp <= 1 && zona == 794  && templateId==1000)
				{
			setTimeout(CN2,10000)
			command.message(`<font color="#e60000"> У ВАС 10 СЕК НА ПОДБОР ДРОПА</font>`)
				}
			if(hp <= 1 && zona == 794 && templateId == 2000 )
				{	
			setTimeout(CN3,10000)
			command.message(`<font color="#e60000"> У ВАС 10 СЕК НА ПОДБОР ДРОПА</font>`)
				}
			})		
		//Лалкан	
	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {
		
		let hp = (curhp * 100 / maxHp)	
			if(hp <= 1 && zona == 710  && templateId==1000)
				{
			setTimeout(LK2,10000)
			command.message(`<font color="#e60000"> У ВАС 10 СЕК НА ПОДБОР ДРОПА</font>`)
				}
			if(hp <= 1 && zona == 710 && templateId == 2000)
				{	
			setTimeout(LK3,10000)
			command.message(`<font color="#e60000"> У ВАС 10 СЕК НА ПОДБОР ДРОПА</font>`)
				}
			})			
				
	function CN1() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -53655.42578125,	
		y: 42325.81640625,
		z: 1463.5257568359375,
		w: 16384
		})
	}	
	function CN2() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -55835.3125,	
		y: 47346.76,
		z: 679.03,
		w: 32608
		})
	}	
	function CN3() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -54435.4609375,	
		y: 53910.8871875,
		z: -3400.188720703125,
		w: 502
		})
	}	
		function LK1() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -82880.75781,	
		y: 39686.6875,
		z: 13533.7509765,
		w: 16304
		})
	}	
	function LK2() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -85947.984375,	
		y: 42445.89453125,
		z: 14277.2011718,
		w: 20642
		})
	}	
	function LK3() 
	{
		dispatch.toClient('S_INSTANT_MOVE', 1, 
		{
		id: cid,
		x: -84578.78125,	
		y: 46272.722656,
		z: 12391.7509765,
		w: 15952
		})
	}
};