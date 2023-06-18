import { useReducer, useEffect } from 'react';

import getFonts from '../utils/getFonts';

export function useFontsPanel(initialState = {}) {
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
					data,
				});
			})();
		}
	}, [fontsPanelState]);

	return [fontsPanelState, dispatch];
}

/**
 *
 * @param {FontsPanelState} fontsPanelState
 * @param {FontsPanelAction} action
 * @returns
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
		case 'setFontTabNumber': {
			return {
				...fontsPanelState,
				currentFontTabNumber: action.fontTabNumber,
			};
		}
		case 'setOpenCategory': {
			const { currentFontTabNumber } = fontsPanelState;
			if (currentFontTabNumber === '1') {
				const fontNumber1State = fontsPanelState['1'];
				return {
					...fontsPanelState,
					1: {
						...fontNumber1State,
						openCategory: action.category,
					},
				};
			} else if (currentFontTabNumber === '2') {
				const fontNumber2State = fontsPanelState['2'];
				return {
					...fontsPanelState,
					2: {
						...fontNumber2State,
						openCategory: action.category,
					},
				};
			}
		}
		case 'searchFonts': {
			const { match } = action;
			const categoriesAndFonts = Object.keys(fontsPanelState.fonts);

			if (categoriesAndFonts.length > 0) {
				const { currentFontTabNumber } = fontsPanelState;
				const searchedFonts = {};

				if (match.length > 0) {
					categoriesAndFonts.forEach(([category, fonts]) => {
						const filteredFonts = fonts.filter((font) => {
							const { family } = font;

							const isMatch = family.includes(match);
							return isMatch;
						});
						searchedFonts[category] = filteredFonts;
					});
				}

				if (currentFontTabNumber === '1') {
					const fontTabNumber1State = fontsPanelState['1'];
					return {
						...fontsPanelState,
						1: {
							...fontTabNumber1State,
							fonts: searchedFonts,
							match,
						},
					};
				} else if (currentFontTabNumber === '2') {
					const fontTabNumber2State = fontsPanelState['2'];
					return {
						...fontsPanelState,
						2: {
							...fontTabNumber2State,
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
 * @property {"1"|"2"} currentFontTabNumber - Number of the current tab.
 */
export const FontPanelState = {};

/**
 * @typedef FontTabNumberState
 * @type {object}
 * @property {"serif"|"sans-serif"|"display"|"handwriting"|"monospace"} OpenCategory - The open category for the current tab.
 * @property {string} match - Name or term to find in the fonts.
 * @property {import("../utils/Font").FontsByCategory} fonts - Fonts matching the match name/term.
 */

/**
 * @typedef FontsPanelAction
 * @type {object}
 * @property {"setFonts"|"setCurrent"|"setFontTabNumber"|"setOpenCategory"|"searchFonts"} type Name of the work to do.
 * @property {import("../utils/Font").FontsByCategory|undefined} fonts Fonts to set.
 * @property {string|undefined} match Term or name to search in the fonts' family name.
 * @property {string|undefined} category Category that needs to be opened.
 * @property {string|undefined} fontTabNumber Font tab number to set.
 *
 */
