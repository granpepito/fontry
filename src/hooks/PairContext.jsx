/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useReducer } from 'react';

import { usePairStore } from './usePairStore';
import { loadFont, loadMultipleFonts } from '../functions/loadFont';
import { SpaceGrotesk } from '../utils/SpaceGrotesk';
import { Arvo } from '../utils/Arvo';

const PairContext = createContext(null);
const PairDispatchContext = createContext(null);

/**
 * Hook to get the current value of the PairContext.
 * @returns {import('../utils/Pair').Pair} Returns the PairContext.
 */
export function usePair() {
	return useContext(PairContext);
}

/**
 * Hook to use the dispatch functions of the PairDispatchContext.
 * @returns {{updateFont, changePair}} Returns the PairDispatchContext.
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
	const { getLastPair, getPair } = usePairStore();

	// Initiate the Pair for the PairProvider hook. If the Pair Store is not empty it will use the last saved pair, else it will create one.
	let latestPair = getLastPair();

	if (latestPair && latestPair.font1 && latestPair.font2) {
		const { font1, font2 } = latestPair;
		loadMultipleFonts([font1, font2]);
	} else {
		const font1 = Arvo;
		const font2 = SpaceGrotesk;
		loadMultipleFonts([font1, font2]);
		latestPair = {
			font1,
			font2,
			theme: '',
		};
	}

	const [pair, dispatch] = useReducer(pairReducer, latestPair);

	/**
	 * @callback updateFont Changes the fontNumber font to the font provided.
	 */
	const updateFont = useCallback((font, fontNumber) => {
		dispatch({
			type: 'updateFont',
			font,
			fontNumber,
		});
	}, []);

	/**
	 * @callback changePair Changes the current pair to another one using its index in the Pair Store.
	 */
	const changePair = useCallback(
		(id) => {
			const pairToUpdate = getPair(id);

			if (pairToUpdate) {
				dispatch({
					type: 'changePair',
					pairToUpdate,
				});
			}
		},
		[getPair]
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
			break;
		}
		case 'changePair': {
			try {
				const { pairToUpdate } = action;

				if (pairToUpdate) {
					const { font1, font2 } = pairToUpdate;
					loadMultipleFonts([font1, font2]);

					return pairToUpdate;
				}
				return pair;
			} catch (error) {
				console.error(error);
				break;
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
 * @typedef PairContextAction - Action of the Reducer function
 * @type {object}
 * @property {'updateFont'|'changePair'|'updateTheme'} type - Name of the action to do.
 * @property {string} [fontNumber] - Number of the font to update.
 * @property {string} [font] - Non-parse data of the font family.
 * @property {import('../utils/Pair').Pair} [pairToUpdate] - Pair object which will be the new current pair.
 * @property {string} [theme] - Name of the new theme of the pair.
 *
 */
