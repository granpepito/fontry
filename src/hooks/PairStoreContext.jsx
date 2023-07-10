import { createContext, useContext, useReducer, useCallback } from 'react';

const PairStoreContext = createContext(null);
const PairStoreDispatchContext = createContext(null);

/**
 * Initialises the PairStore. If a PairStore exist in the localStorage, it will be returned. Otherwise a new array will be returned.
 * @returns {import("../utils/Pair").Pair[]}
 */
function initPairStore() {
	try {
		const pairs = JSON.parse(localStorage.getItem('pairStore'));

		if (Array.isArray(pairs)) {
			return pairs;
		}

		localStorage.setItem('pairStore', '[]');
		return [];
	} catch (error) {
		console.error(error);

		localStorage.setItem('pairStore', '[]');
		return [];
	}
}

/**
 * PairStore Context Provider.
 * @param {{ children }} props
 * @returns Returns a Context Provider Component for both the value and the dispatch function.
 */
export function PairStoreProvider({ children }) {
	const [pairStore, dispatch] = useReducer(pairStoreReducer, initPairStore());

	const addToPairStore = useCallback(
		(newPair) => {
			dispatch({ type: 'add', newPair });
		},
		[dispatch]
	);

	const deleteFromPairStore = useCallback(
		(id) => {
			dispatch({ type: 'delete', id });
		},
		[dispatch]
	);

	const pairStoreIncludes = useCallback(
		(pair) => {
			// console.log(pairStore)
			if (Array.isArray(pairStore)) {
				const pairFound = pairStore.find((pairFromStore) => {
					const font1Equals =
						pairFromStore?.font1?.family === pair?.font1?.family;
					const font2Equals =
						pairFromStore?.font2?.family === pair?.font2?.family;

					return font1Equals && font2Equals;
				});

				return !!pairFound;
			}
			return false;
		},
		[pairStore]
	);

	const dispatchContext = {
		addToPairStore,
		deleteFromPairStore,
		pairStoreIncludes,
	};

	return (
		<PairStoreContext.Provider value={pairStore}>
			<PairStoreDispatchContext.Provider value={dispatchContext}>
				{children}
			</PairStoreDispatchContext.Provider>
		</PairStoreContext.Provider>
	);
}

export function usePairStore() {
	return useContext(PairStoreContext);
}

export function usePairStoreDispatch() {
	return useContext(PairStoreDispatchContext);
}

function pairStoreReducer(pairStore, action) {
	switch (action.type) {
		case 'add': {
			const { newPair } = action;

			if (Array.isArray(pairStore) && newPair) {
				try {
					const updatedPairStore = pairStore.concat([newPair]);

					localStorage.setItem('pairStore', JSON.stringify(updatedPairStore));
					return updatedPairStore;
				} catch (error) {
					console.error(error);
				}
			}
			return [...pairStore];
		}
		case 'delete': {
			const { pair } = action;

			if (Array.isArray(pairStore) && pair) {
				const index = pairStore.findIndex((pairFromStore) => {
					const font1Equals =
						pairFromStore?.font1?.family === pair?.font1?.family;
					const font2Equals =
						pairFromStore?.font2?.family === pair?.font2?.family;

					return font1Equals && font2Equals;
				});

				if (index < 0) {
					return [...pairStore];
				}

				const updatedPairStore = pairStore.splice(index, 1);
				try {
					localStorage.setItem('pairStore', JSON.stringify(updatedPairStore));
				} catch (error) {
					console.error(error);
				}
				return updatedPairStore;
			}
			return [...pairStore];
		}
	}
}
