const FONTS_PER_PAGES = 75;

/**
 * Returns an Object of the fonts grouped by category.
 * @param {Object[]} fontsList
 * @returns {Object}
 */
export function groupFontsByCategory(fontsList) {
	const groupedFontsList = fontsList.reduce((groupedFonts, currentFont) => {
		const { category } = currentFont;
		groupedFonts[category] = groupedFonts[category] ?? [];
		groupedFonts[category].push(currentFont);

		return groupedFonts;
	}, {});

	for (const [category, fonts] of Object.entries(groupedFontsList)) {
		groupedFontsList[category] = makePages(fonts);
	}

	return groupedFontsList;
}

/**
 * Get the data from the fonts with the "latin extended" subset available in the Google Fonts library.
 * @returns {Object} Returns a JSON object
 */
async function fetchLatinExtendedGoogleFonts() {
	const { VITE_GOOGLE_FONTS_API_KEY } = import.meta.env;

	const response = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&subset=latin&key=${VITE_GOOGLE_FONTS_API_KEY}`
	);

	if (!response.ok) {
		return { error: true, status: response.status, fonts: {} };
	}
	return await response.json();
}

/**
 * Stores in localStorage the list of fonts as well as the date it is stored in.
 * @param {Object[]} fontsList List of fonts to store.
 */
function storeFonts(fontsList) {
	const fontsListToString = JSON.stringify(fontsList);
	const currentDate = Date.now();

	localStorage.setItem('fontsList', fontsListToString);
	localStorage.setItem('fontsListDate', currentDate);
}

/**
 * Get every fonts available
 * @returns
 */
export async function getFonts() {
	// Get the list of fonts from localStorage
	let fontsList = localStorage.getItem('fontsList');
	// If Fonts were indeed stored.
	if (fontsList) {
		const fontsListStorageDate = new Date(
			localStorage.getItem('fontsListDate')
		);
		const differenceBetweenDates = Math.floor(
			(Date - fontsListStorageDate) / 1000
		);

		// If the data is less than 10 hours long.
		if (differenceBetweenDates < 36000) {
			return JSON.parse(fontsList);
		}
		// Remove the items from localStorage if the data is too old
		localStorage.removeItem('fontsList');
		localStorage.removeItem('fontsListDate');
	}

	// Fetch the fonts
	const data = await fetchLatinExtendedGoogleFonts();

	// If data fetching is successful
	if (data && data.items) {
		fontsList = groupFontsByCategory(data.items);
		storeFonts(fontsList);

		return fontsList;
	}
	// If error
	return data;
}

/**
 *
 * @param {import("../utils/Font").FontFamily} fonts
 * @param {number} FONTS_PER_PAGES
 * @returns {import("../utils/Font").FontFamily[][]}
 */
export function makePages(fonts) {
	const pages = [];
	const numberOfPages = Math.ceil(fonts.length / FONTS_PER_PAGES);

	for (let i = 0; i < numberOfPages; i++) {
		const baseIndex = i * FONTS_PER_PAGES;
		const fontsInCurrentPage = fonts.slice(
			baseIndex,
			baseIndex + FONTS_PER_PAGES
		);

		pages.push(fontsInCurrentPage);
	}
	return pages;
}
