import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Subscribes to the 'storage' event.
 * @param {Function} callback
 * @returns Returns a function that unsubscribes to the 'storage' event.
 */
function onStorage(callback) {
	window.addEventListener('storage', callback);
	return () => {
		window.removeEventListener('storage', callback);
	};
}

export function usePairStore() {
	const subscribe = useCallback(onStorage, []);
	const stringifiedPairs = useSyncExternalStore(subscribe, () => {
		const pairStore = localStorage.getItem('pairStore');
		if (pairStore) {
			return pairStore;
		} else {
			localStorage.setItem('pairStore', '[]');
			return '[]';
		}
	});

	let pairs = useMemo(() => {
		try {
			return JSON.parse(stringifiedPairs);
		} catch (error) {
			console.error('Could not parse pairStore item in the localStorage.');
			return [];
		}
	}, [stringifiedPairs]);

	/**
	 * Finds the index of the given pair if it is found inside the pairStore.
	 * @param {import('../utils/Pair').Pair} pair
	 * @param {boolean} returnIndex Flag to indicate if the index is wanted. Is set to false by default.
	 * @returns {boolean|number} If the returnIndex is false: returns true if the pair is included, else it returns false. If the returnIndex flag is true: returns the index of the pair. If not found, returns -1.
	 */
	const includes = useCallback(
		function includes(pair, returnIndex = false) {
			const index = pairs.findIndex((pairFromStore) => {
				const font1Equals =
					pairFromStore?.font1?.family === pair?.font1?.family;
				const font2Equals =
					pairFromStore?.font2?.family === pair?.font2?.family;

				return font1Equals && font2Equals;
			});

			if (returnIndex) {
				return index;
			}

			return index >= 0;
		},
		[pairs]
	);

	/**
	 * Adds a pair of fonts to the PairStore
	 * @param {import('../utils/Pair').Pair} pair
	 */
	const add = useCallback(
		function add(pair) {
			if (!includes(pair)) {
				try {
					const id = uuidv4();
					pair.id = id;

					localStorage.setItem(
						'pairStore',
						JSON.stringify(pairs.concat([pair]))
					);
				} catch (error) {
					console.error(error);
				}
			}
		},
		[includes, pairs]
	);

	/**
	 * Get a pair from the Pair Store.
	 * @param {number} index - Index of the pair to get.
	 * @returns {import('../utils/Pair').Pair|undefined} Returns the pair if it exists or else it returns undefined.
	 */
	const getPair = useCallback(
		function get(index) {
			return pairs[index];
		},
		[pairs]
	);

	/**
	 * Removes a pair by using its index.
	 * @param {number} index - Index of the pair.
	 */
	const removeByIndex = useCallback(
		function removeByIndex(indexOfPairToRemove) {
			if (pairs[indexOfPairToRemove]) {
				try {
					const parsedIndex = parseInt(indexOfPairToRemove, 10);
					localStorage.setItem(
						'pairStore',
						JSON.stringify(
							pairs.filter((_pair, index) => index !== parsedIndex)
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		},
		[pairs]
	);

	/**
	 * Removes a pair of fonts from the PairStore.
	 * @param {import('../utils/Pair').Pair} pair
	 */
	const remove = useCallback(
		function remove(pair) {
			const index = includes(pair, true);

			removeByIndex(index);
		},
		[includes, removeByIndex]
	);

	const removePairsByIndex = useCallback(
		/**
		 * Removes multiple pairs of fonts from the PairStore by using index.
		 * @param {number[]} arrayOfIndexes
		 */
		function removePairsByIndex(arrayOfIndexes) {
			if (arrayOfIndexes.length > 0) {
				try {
					const parsedIndexes = arrayOfIndexes.map((index) =>
						parseInt(index, 10)
					);
					localStorage.setItem(
						'pairStore',
						JSON.stringify(
							pairs.filter((_pair, index) => !parsedIndexes.includes(index))
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		},
		[pairs]
	);

	const getLastPair = useCallback(
	/**
	 * Gets the most recently saved pair of fonts of the PairStore.
	 * @returns {import('../utils/Pair').Pair}
	 */
	const getLastPair = useCallback(
		function getLastPair() {
			if (pairs.length > 0) {
				return pairs[pairs.length - 1];
			}

			// PairStore is empty
			return undefined;
		},
		[pairs]
	);

	return {
		pairs,
		add,
		getPair,
		remove,
		removeByIndex,
		removePairsByIndex,
		includes,
		getLastPair,
	};
}
