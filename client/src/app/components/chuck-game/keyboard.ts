// From: https://github.com/kittykatattack/learningPixi

export interface KeyboardListener {
	press: (event: any) => any;
	release: (event: any) => any;
	delete(): void;
}

export function keyboard(keyCode: any, preventDefault = false): KeyboardListener {
	const key: any = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	// The `downHandler`
	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		preventDefault && event.preventDefault();
	};

	// The `upHandler`
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		preventDefault && event.preventDefault();
	};

	// Attach event listeners
	const onDown = key.downHandler.bind(key);
	window.addEventListener('keydown', onDown, false);
	const onUp = key.upHandler.bind(key);
	window.addEventListener('keyup', onUp, false);

	key.delete = () => {
		window.removeEventListener('keydown', onDown);
		window.removeEventListener('keyup', onUp);
	}

	return key;
}
