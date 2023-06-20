import { useReducer, useEffect } from 'react';

import getFonts from '../functions/getFonts';

/**
 * Hook for the state of the FontsPanel component.
 * @param {FontsPanelState} initialState Initial State of the FontsPanel component.
 * @returns {array} Returns an array containing the current state of the FontsPanel component and a dispatch function.
 */
export function useFontsPanel(initialState) {
	const [fontsPanelState, dispatch] = useReducer(
		fontsPanelReducer,
		initialState
	);

	useEffect(() => {
		if (!fontsPanelState.fonts) {
			(async () => {
				let data = await getFonts();

				if (data.error) {
					data = await getFonts();
				}

				dispatch({
					type: 'setFonts',
					fonts: data,
				});
			})();
		}
		// return () => {};
	}, [fontsPanelState.fonts]);

	return [fontsPanelState, dispatch];
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
			const categoriesAndFonts = Object.entries(fontsPanelState.fonts);

			if (categoriesAndFonts.length > 0) {
				const { currentFontTab } = fontsPanelState;
				const searchedFonts = {};

				if (match.length > 0) {
					function escapeRegExp(string) {
						return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
					}

					categoriesAndFonts.forEach(([category, fonts]) => {
						const filteredFonts = fonts.filter((font) => {
							const { family } = font;
							const isMatch = new RegExp(
								`\S?${escapeRegExp(match)}\S?`,
								'iu'
							).test(family);
							// const isMatch = family.includes(match);
							return isMatch;
						});
						searchedFonts[category] = filteredFonts;
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
}

/**
 * @typedef FontsPanelState
 * @type {object}
 * @property {import("../utils/Font").FontsByCategory} fonts - Object containing every fonts available.
 * @property {FontTabNumberState} "1" - State for the tab of the first font.
 * @property {FontTabNumberState} "2" - State for the tab of the second font.
 * @property {"1"|"2"} currentFontTab - Number of the current tab.
 */
export const FontPanelState = {};

/**
 * @typedef FontTabState
 * @type {object}
 * @property {"serif"|"sans-serif"|"display"|"handwriting"|"monospace"} category - The open category for the current tab.
 * @property {string} match - Name or term to find in the fonts.
 * @property {import("../utils/Font").FontsByCategory} fonts - Fonts matching the match name/term.
 */

/**
 * @typedef FontsPanelAction
 * @type {object}
 * @property {"setFonts"|"setFontTab"|"setCategory"|"searchFonts"} type Name of the work to do.
 * @property {import("../utils/Font").FontsByCategory|undefined} fonts Fonts to set.
 * @property {string|undefined} match Term or name to search in the fonts' family name.
 * @property {string|undefined} category Category that needs to be opened.
 * @property {string|undefined} fontTab Font tab number to set.
 *
 */
