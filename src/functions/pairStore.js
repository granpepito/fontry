let pairs;
getPairs();
/**
 * Gets the pairs of fonts stored in the localStorage.
 * @returns {import('../utils/Pair').Pair[]}
 */
function getPairs() {
	// let pairs;

	try {
		pairs = JSON.parse(localStorage.getItem('pairStore'));

		if (!Array.isArray(pairs)) {
			throw Error('PairStore is not an array.');
		}
	} catch (error) {
		console.error(error);

		localStorage.setItem('pairStore', '[]');
		pairs = [];
	}

	// return pairs;
}

/**
 * Adds a pair of fonts to the PairStore
 * @param {import('../utils/Pair').Pair} pair
 */
function add(pair) {
	if (!includes(pair)) {
		pairs = pairs.concat([pair]);

		try {
			localStorage.setItem('pairStore', JSON.stringify(pairs));
		} catch (error) {
			console.error(error);
		}
	}
}

/**
 * Removes a pair of fonts from the PairStore.
 * @param {import('../utils/Pair').Pair} pair
 */
function remove(pair) {
	const index = includes(pair, true);

	removeById(index);
}

function removeById(index) {
	if (index > 0 && index < pairs.length) {
		pairs.splice(index, 1);
		pairs = pairs.concat([]);
		try {
			localStorage.setItem('pairStore', JSON.stringify(pairs));
		} catch (error) {
			console.error(error);
		}
	}
}

/**
 * Finds the index of the given pair if it is found inside the pairStore.
 * @param {import('../utils/Pair').Pair} pair
 * @param {boolean} returnIndex Flag to indicate if the index is wanted. Is set to false by default.
 * @returns {boolean|number} If the returnIndex is false: returns true if the pair is included, else it returns false. If the returnIndex flag is true: returns the index of the pair. If not found, returns -1.
 */
function includes(pair, returnIndex = false) {
	const index = pairs.findIndex((pairFromStore) => {
		const font1Equals = pairFromStore?.font1?.family === pair?.font1?.family;
		const font2Equals = pairFromStore?.font2?.family === pair?.font2?.family;

		return font1Equals && font2Equals;
	});

	if (returnIndex) {
		return index;
	}

	return index >= 0;
}

/**
 * Gets the most recently saved pair of fonts of the PairStore.
 * @returns {import('../utils/Pair').Pair}
 */
function getLastPair() {
	if (pairs.length > 0) {
		return pairs[pairs.length - 1];
	}

	// PairStore is empty
	return undefined;
}

/**
 * Subscribes to the 'storage' event.
 * @param {*} callback
 * @returns Returns a function that unsubscribes to the 'storage' event.
 */
function subscribe(callback) {
	window.addEventListener('storage', callback);
	return () => {
		window.removeEventListener('storage', callback);
	};
}

/**
 * Return a snapshot of the Pair Store.
 * @returns {import('../utils/Pair').Pair[]}
 */
function getSnapshot() {
	return pairs;
}

export const pairStore = {
	add,
	remove,
	removeById,
	includes,
	getLastPair,
	subscribe,
	getSnapshot,
};
