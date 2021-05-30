const SAVE_TRIGGER_ITEM = 200997;
const TP_BACK_TRIGGER_ITEM = 200998;

module.exports = function SaveTp(dispatch) {
	let cid = null;
	let currLocation = null;
	let savedLocation = null;

	const chatHandler = event => {
		const message = event.message.replace(/(<([^>]+)>)/ig, '');
		switch (message) {
			case '!loc':
				dispatch.toClient('S_INSTANT_MOVE', 1, Object.assign(savedLocation, { id: cid }));
				return false;
			case '!save':
				savedLocation = currLocation;
				return false;
			default:
				break;
		}
	};

	dispatch.hook('C_WHISPER', 1, chatHandler);
	dispatch.hook('C_CHAT', 1, chatHandler);

	dispatch.hook('S_LOGIN', 1, event => ({ cid } = event));

	dispatch.hook('C_PLAYER_LOCATION', 1, event => {
		currLocation = {
			x: event.x2,
			y: event.y2,
			z: event.z2
		};
	});

	dispatch.hook('C_USE_ITEM', 1, event => {
		if (event.item === SAVE_TRIGGER_ITEM) {
			savedLocation = currLocation;
			return false;
		} else if (event.item === TP_BACK_TRIGGER_ITEM) {
			dispatch.toClient('S_INSTANT_MOVE', 1, Object.assign(savedLocation, { id: cid }));
			return false;
		}
	});
};