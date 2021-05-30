const Command = require('command')

module.exports = function blockSkill(dispatch) {
	const command = Command(dispatch)
	let enabled = true
	command.add('rskill', () => {
		enabled = !enabled
		command.message('damage spam garbo blocker '+(enabled?'enabled':'disabled')+'.')
	})
	dispatch.hook('S_EACH_SKILL_RESULT', () => {
	  if (!enabled) return
	return false
	})
}
