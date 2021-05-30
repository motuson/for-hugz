const eventzonebugged=7003,
	eventzonecorrect=7031

module.exports = function fixloadbug(dispatch){
	dispatch.hook('S_LOAD_TOPO',1, event => {
		if(event.zone==eventzonebugged) {
			event.zone=eventzonecorrect
			return true
		}
	})
}