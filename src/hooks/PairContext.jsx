import { createContext, useContext, useReducer } from 'react';

function getLastSavedPair() {
	const pairs = JSON.parse(localStorage.getItem('savedPairs'));

	if (pairs) {
		const latestPair = pairs[pairs.length - 1];

		return latestPair;
	}
	return null;
}

/**
 *
 * @returns {import('../utils/Pair').Pair}
 */
function getPair() {
	const latestPair = getLastSavedPair();
	if (latestPair) {
		return latestPair;
	}
	return {
		font1: {},
		font2: {},
		theme: '',
	};
}

export const PairContext = createContext(null);
export const PairDispatchContext = createContext(null);

export function usePair() {
	return useContext(PairContext);
}

export function usePairDispatch() {
	return useContext(PairDispatchContext);
}

export function PairProvider({ children }) {
	const [pair, dispatch] = useReducer(pairReducer, getPair());

	return (
		<PairContext.Provider value={pair}>
			<PairDispatchContext.Provider value={dispatch}>
				{children}
			</PairDispatchContext.Provider>
		</PairContext.Provider>
	);
}

function pairReducer(pair, action) {
	switch (action.type) {
		case 'updateFont': {
			const fontData = JSON.parse(action.font);
			if (action.fontN === '1') {
				return {
					...pair,
					font1: fontData,
				};
			} else if (action.fontN === '2') {
				return {
					...pair,
					font2: fontData,
				};
			}
		}
		case 'updateTheme': {
			return { ...pair, theme: action.theme };
		}
		default: {
			return { ...pair };
		}
	}
}
