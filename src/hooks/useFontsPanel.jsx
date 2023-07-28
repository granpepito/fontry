import { useCallback, useReducer, useEffect } from 'react';

import { getFonts, makePages } from '../functions/getFonts';

/**
 * Hook for the state of the FontsPanel component.
 * @param {FontsPanelState} initialState Initial State of the FontsPanel component.
 * @returns {[FontsPanelState, { setFonts: Function, setFontTab: Function, setCategory: Function, setMatch: Function, searchFonts: Function }]} Returns an array containing the current state of the FontsPanel component and a dispatch function.
 */
export function useFontsPanel(initialState) {
	const [fontsPanelState, dispatch] = useReducer(
		fontsPanelReducer,
		initialState
	);

	const setFonts = useCallback(function setFonts(fonts) {
		dispatch({
			type: 'setFonts',
			fonts,
		});
	}, []);

	const setFontTab = useCallback(function setFontTab(fontTab) {
		dispatch({
			type: 'setFontTab',
			fontTab,
		});
	}, []);

	const setCategory = useCallback(function setCategory(category) {
		dispatch({
			type: 'setCategory',
			category,
		});
	}, []);

	const setMatch = useCallback(function setMatch(match) {
		dispatch({
			type: 'setMatch',
			match,
		});
	}, []);

	const searchFonts = useCallback(function searchFonts(match) {
		dispatch({
			type: 'searchFonts',
			match,
		});
	}, []);

	useEffect(() => {
		if (!fontsPanelState.fonts) {
			(async () => {
				let data = await getFonts();

				if (data.error) {
					data = await getFonts();
				}

				setFonts(data);
			})();
		}
		// return () => {};
	}, [fontsPanelState.fonts]);

	return [fontsPanelState, { setFontTab, setCategory, setMatch, searchFonts }];
}

/**
 * Reducer function for the FontsPanel component's state.
 * @param {FontsPanelState} fontsPanelState - State object.
 * @param {FontsPanelAction} action - Action object.
 * @returns {FontsPanelState} Returns an updated state object.
 */
function fontsPanelReducer(fontsPanelState, action) {
	switch (action.type) {
		case 'setFonts': {
			const { fonts } = action;
			return {
				...fontsPanelState,
				fonts,
			};
		}
		case 'setFontTab': {
			return {
				...fontsPanelState,
				currentFontTab: action.fontTab,
			};
		}
		case 'setCategory': {
			const { currentFontTab } = fontsPanelState;
			if (currentFontTab === '1') {
				const fontTab1State = fontsPanelState['1'];
				const category =
					fontTab1State.category === action.category ? '' : action.category;

				return {
					...fontsPanelState,
					1: {
						...fontTab1State,
						category,
					},
				};
			} else if (currentFontTab === '2') {
				const fontTab2State = fontsPanelState['2'];
				const category =
					fontTab2State.category === action.category ? '' : action.category;

				return {
					...fontsPanelState,
					2: {
						...fontTab2State,
						category,
					},
				};
			}
		}
		case 'setMatch': {
			const { currentFontTab } = fontsPanelState;
			const { match } = action;

			if (currentFontTab === '1') {
				const fontTab1State = fontsPanelState['1'];
				return {
					...fontsPanelState,
					1: {
						...fontTab1State,
						match,
					},
				};
			} else if (currentFontTab === '2') {
				const fontTab2State = fontsPanelState['2'];
				return {
					...fontsPanelState,
					2: {
						...fontTab2State,
						match,
					},
				};
			}
		}
		case 'searchFonts': {
			const { match } = action;

			if (fontsPanelState.fonts) {
				const categoriesAndFonts = Object.entries(fontsPanelState.fonts);

				if (categoriesAndFonts.length > 0) {
					const { currentFontTab } = fontsPanelState;
					const searchedFonts = {};

					if (typeof match === 'string' && match.length > 0) {
						categoriesAndFonts.forEach(([category, fonts]) => {
							const filteredFonts = fonts.flat().filter((font) => {
								const { family } = font;
								const isMatch = new RegExp(
									`\S?${escapeRegExp(match)}\S?`,
									'iu'
								).test(family);

								return isMatch;
							});
							searchedFonts[category] = makePages(filteredFonts);
						});
					}

					if (currentFontTab === '1') {
						const fontTab1State = fontsPanelState['1'];
						return {
							...fontsPanelState,
							1: {
								...fontTab1State,
								fonts: searchedFonts,
								match,
							},
						};
					} else if (currentFontTab === '2') {
						const fontTab2State = fontsPanelState['2'];
						return {
							...fontsPanelState,
							2: {
								...fontTab2State,
								fonts: searchedFonts,
								match,
							},
						};
					}
				}
			}
		}
		default: {
			return {
				...fontsPanelState,
			};
		}
	}
}

/**
 * Escapes special characters for a regular expression.
 * @param {string} string - Escaped string
 */
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * @typedef FontsPanelState
 * @type {object}
 * @property {import('../utils/Font').FontsByCategory|undefined} fonts - Object containing every fonts available.
 * @property {FontTabState} 1 - State for the tab of the first font.
 * @property {FontTabState} 2 - State for the tab of the second font.
 * @property {'1'|'2'|undefined} currentFontTab - Number of the current tab.
 */
export const FontPanelState = {};

/**
 * @typedef FontTabState
 * @type {object}
 * @property {'serif'|'sans-serif'|'display'|'handwriting'|'monospace'} category - The open category for the current tab.
 * @property {string} match - Name or term to find in the fonts.
 * @property {import('../utils/Font').FontsByCategory} fonts - Fonts matching the match name/term.
 */

/**
 * @typedef FontsPanelAction
 * @type {object}
 * @property {'setFonts'|'setFontTab'|'setCategory'|'searchFonts'|'setMatch'} type Name of the work to do.
 * @property {import('../utils/Font').FontsByCategory|undefined} [fonts] Fonts to set.
 * @property {string|undefined} [match] Term or name to search in the fonts' family name.
 * @property {'serif'|'sans-serif'|'display'|'handwriting'|'monospace'|undefined} [category] Category that needs to be opened.
 * @property {'1'|'2'} [fontTab] Font tab number to set.
 *
 */
