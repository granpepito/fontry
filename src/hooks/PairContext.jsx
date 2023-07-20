import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';

import { usePairStore } from './usePairStore';
import { loadFont } from '../functions/loadFont';
import { SpaceGrotesk } from '../utils/SpaceGrotesk';
import { Arvo } from '../utils/Arvo';

/**
 * Initiate the Pair for the PairProvider hook. If the Pair Store is not empty it will return the last saved pair, else it will create one.
 * @returns {import('../utils/Pair').Pair}
 */
function getPair() {
	const { getLastPair } = usePairStore();
	const latestPair = getLastPair();

	if (latestPair) {
		const { font1, font2 } = latestPair;
		loadPair({ font1, font2 });

		return latestPair;
	}
	const font1 = Arvo;
	const font2 = SpaceGrotesk;

	loadPair({ font1, font2 });

	return {
		font1,
		font2,
		theme: '',
	};
}

const PairContext = createContext(null);
const PairDispatchContext = createContext(null);

/**
 * Hook to get the current value of the PairContext.
 * @returns {} Returns the PairContext.
 */
export function usePair() {
	return useContext(PairContext);
}

/**
 * Hook to use the dispatch functions of the PairDispatchContext.
 * @returns Returns the PairDispatchContext.
 */
export function usePairDispatch() {
	return useContext(PairDispatchContext);
}

/**
 * Component containing the PairContext and the PairDispatchContext.
 * @param {{children: React.ReactNode}} props
 * @returns Renders the children of of PairProvider.
 */
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

/**
 * Reducer function for the PairProvider hook.
 * @param {import('../utils/Pair').Pair} pair - Current state of the pair.
 * @param {PairContextAction} action - Contains the action to do and the data to work with.
 * @returns {import('../utils/Pair').Pair} Returns the next state of the pair.
 */
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
					loadPair(pairToUpdate);

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

/**
 * Loads the fonts that form the given Pair.
 * @param {import('../utils/Pair').Pair} pair - Pair of fonts to load.
 * @param {import('../utils/Font').FontFamily} pair.font1 - First font to load.
 * @param {import('../utils/Font').FontFamily} pair.font2 - Second font to load.
 */
function loadPair({ font1, font2 }) {
	if (font1 && font1.family) {
		loadFont(font1.family, font1.variants);
	}
	if (font2 && font2.family) {
		loadFont(font2.family, font2.variants);
	}
}

/**
 * @typedef PairContextAction - Action of the Reducer function
 * @type {object}
 * @property {'updateFont'|'changePair'|'updateTheme'} type - Name of the action to do.
 * @property {string} [fontNumber] - Number of the font to update.
 * @property {string} [font] - Non-parse data of the font family.
 * @property {import('../utils/Pair').Pair} [pairToUpdate] - Pair object which will be the new current pair.
 * @property {string} [theme] - Name of the new theme of the pair.
 *
 */
