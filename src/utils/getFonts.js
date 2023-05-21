/**
 * Returns an Object of the fonts grouped by category.
 * @param {Object[]} fontsList
 * @returns {Object}
 */
function groupFontsByCategory(fontsList) {
	const groupedFontsList = fontsList.reduce((groupedFonts, currentFont) => {
		const { category } = currentFont;
		groupedFonts[category] = groupedFonts[category] ?? [];
		groupedFonts[category].push(currentFont);

		return groupedFonts;
	}, {});

	return groupedFontsList;
}

/**
 * Get the data from the fonts with the "latin extended" subset available in the Google Fonts library.
 * @returns {Object} Returns a JSON object
 */
async function fetchLatinExtendedGoogleFonts() {
	const { VITE_GOOGLE_FONTS_API_KEY } = import.meta.env;

	const response = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&subset=latin-ext&key=${VITE_GOOGLE_FONTS_API_KEY}`
	);

	if (!response.ok) {
		return { error: true, status: response.status };
	}
	return await response.json();
}

/**
 * Get every fonts available
 * @returns
 */
export default async function getFonts() {
	// Fetch the fonts
	const data = await fetchLatinExtendedGoogleFonts();

	// If data fetching is successful
	if (data && data.items) {
		fontsList = groupFontsByCategory(data.items);

		return fontsList;
	}
	// If error
	return data;
}
