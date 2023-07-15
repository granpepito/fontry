import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';
// import { usePairStore } from './PairStoreContext';
import { usePairStore } from './usePairStore';
import { loadFont } from '../functions/loadFont';
import { SpaceGrotesk } from '../utils/SpaceGrotesk';
import { Arvo } from '../utils/Arvo';

function getLastSavedPair() {
	try {
		const pairs = JSON.parse(localStorage.getItem('pairStore'));

		if (Array.isArray(pairs) && pairs.length > 0) {
			const latestPair = pairs[pairs.length - 1];

			return latestPair;
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 *
 * @returns {import('../utils/Pair').Pair}
 */
function getPair() {
	const latestPair = getLastSavedPair();
	if (latestPair) {
		const { font1, font2 } = latestPair;
		if (font1 && font1.family) {
			loadFont(font1.family, font1.variants);
		}
		if (font2 && font2.family) {
			loadFont(font2.family, font2.variants);
		}
		return latestPair;
	}
	const font1 = Arvo;
	const font2 = SpaceGrotesk;
	loadFont(font1.family, font1.variants);
	loadFont(font2.family, font2.variants);
	return {
		font1,
		font2,
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
	const { pairs: snapshot } = usePairStore();
	const pairs = useMemo(() => snapshot, [snapshot]);

	const updateFont = useCallback((font, fontNumber) => {
		dispatch({
			type: 'updateFont',
			font,
			fontNumber,
		});
	});

	const changePair = useCallback(
		(id) => {
			if (pairs.length > id) {
				const pairToUpdate = pairs[id];

				if (pairToUpdate) {
					dispatch({
						type: 'changePair',
						pairToUpdate,
					});
				}
			}
		},
		[pairs]
	);

	const dispatchContext = {
		updateFont,
		changePair,
	};

	return (
		<PairContext.Provider value={pair}>
			<PairDispatchContext.Provider value={dispatchContext}>
				{children}
			</PairDispatchContext.Provider>
		</PairContext.Provider>
	);
}

function pairReducer(pair, action) {
	switch (action.type) {
		case 'updateFont': {
			try {
				const fontData = JSON.parse(action.font);
				const { fontNumber } = action;

				if (pair[`font${fontNumber}`].family === fontData.family) {
					return pair;
				}

				loadFont(fontData.family, fontData.variants);
				if (fontNumber === '1') {
					return {
						...pair,
						font1: fontData,
					};
				} else if (fontNumber === '2') {
					return {
						...pair,
						font2: fontData,
					};
				}
			} catch (error) {
				console.error(error);
			}
		}
		case 'changePair': {
			try {
				const { pairToUpdate } = action;

				if (pairToUpdate) {
					const { font1, font2 } = pairToUpdate;
					// console.log('udpate', pairToUpdate);
					loadFont(font1.family, font1.variants);
					loadFont(font2.family, font2.variants);

					return pairToUpdate;
				}
				return pair;
			} catch (error) {
				console.error(error);
			}
		}
		case 'updateTheme': {
			return { ...pair, theme: action.theme };
		}
		default: {
			return pair;
		}
	}
}
