// Removes potentially malicious injected HTML content from other users' chat messages ~Pinkie Pie

module.exports = function ChatSanitizer(dispatch) {
	dispatch.hook('S_CHAT', 1, {order: 10}, sanitize)
	dispatch.hook('S_WHISPER', 1, {order: 10}, sanitize)
	dispatch.hook('S_PRIVATE_CHAT', 1, {order: 10}, sanitize)
}

function sanitize(event) {
	let sanitized = event.message.replace(/<(.+?)>/g, (str, tag) =>
			tag === 'FONT' || tag === '/FONT' || tag === '/ChatLinkAction' ||
			/^FONT FACE="\$ChatFont" SIZE="18" COLOR="#[0-9A-F]{6}" KERNING="0"$/.test(tag) ||
			/^ChatLinkAction param=".+"$/.test(tag)
		? str : '')

	return event.message !== (event.message = sanitized) || undefined
}