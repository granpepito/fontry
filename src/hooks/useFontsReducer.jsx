import { useReducer, useEffect } from 'react';

import getFonts from '../utils/getFonts';

export function useFontsReducer(initialState) {
	const [fontsState, dispatch] = useReducer(fontsReducer, initialState);

	useEffect(() => {
		if (!fontsState.fonts) {
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
		return () => {};
	}, [fontsState]);

	return [fontsState, dispatch];
}

export function fontsReducer(fontsState, action) {
	switch (action.type) {
		case 'setFonts': {
			const { data } = action;
			return {
				...fontsState,
				fonts: data,
				searchedFonts: data,
			};
		}
		case 'searchFonts': {
			const { toMatch } = action;
			const { fonts } = fontsState;
			const categories = Object.keys(fonts);
			if (categories.length > 0) {
				const searchedFonts = {};

				categories.forEach((category) => {
					const filteredFonts = fonts[category].filter((font) => {
						const { family } = font;
						const isMatch = new RegExp(`\S?${toMatch}\S?`, 'iu').test(family);
						return isMatch;
					});
					searchedFonts[category] = filteredFonts;
				}, {});

				return {
					...fontsState,
					searchedFonts,
				};
			}
			return {
				...fontsState,
			};
		}
		default: {
			return {
				...fontsState,
			};
		}
	}
}
