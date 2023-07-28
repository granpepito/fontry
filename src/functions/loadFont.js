import WebFont from 'webfontloader';

/**
 * Loads the requested font family. Uses the WebFontLoader package from Typekit.
 * @param {string} fontFamily - Name of the font family.
 * @param {string[]} variants - Variants of the font family. Defaults to 400 (Regular).
 * @param {*} isLimited - Flag to indicate that only the characters of the font family's name (e.g. Inter for the Inter font family) are requested.
 */
export async function loadFont(
	fontFamily,
	variants = ['400'],
	isLimited = false
) {
	// Using a Promise to asynchroneously get the requested font.
	new Promise((resolve, reject) => {
		if (fontFamily) {
			const formattedVariants = variants.join(',');
			const text = isLimited ? fontFamily : '';

			WebFont.load({
				google: {
					families: [`${fontFamily}:${formattedVariants}`],
					text,
				},
				active: () => resolve(`Loading result of the ${fontFamily} font: 200`),
				inactive: () => reject(`Loading result of the ${fontFamily} font: 404`),
			});
		} else {
			reject('Font is not defined.');
		}
	});
}

/**
 * Loads multiple fonts at a time.
 * @param {import('../utils/Font').FontFamily[]} fonts - Fonts to download.
 * @param {boolean} isLimited - Flag to indicate that only the characters of the font family's name (e.g. Inter for the Inter font family) and only the regular variant of the font are requested.
 * @returns {Promise} Returns as simple description to know if there are any errors or if the fonts have been downloaded.
 */
export async function loadMultipleFonts(fonts, isLimited = false) {
	if (!fonts || !Array.isArray(fonts)) {
		return new Promise((_, reject) => reject('There are no fonts.'));
	}

	let families = [];
	for (let i = 0; i < fonts.length; i++) {
		const { family, variants } = fonts[i];

		let formattedFont;
		if (isLimited) {
			formattedFont = formatFont(family, reduceVariants(variants));
		}
		formattedFont = formatFont(family, variants);

		if (formattedFont) {
			families.push(formattedFont);
		}
	}

	if (families.length === 0) {
		return new Promise((_, reject) => reject('There are no fonts.'));
	}

	return new Promise((resolve, reject) => {
		WebFont.load({
			google: {
				families,
				text: isLimited
					? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
					: '',
			},
			active: () => resolve(`Loading result of multiple fonts: 200`),
			inactive: () => reject(`Loading result of multiple fonts: 404`),
		});
	});
}

/**
 * Render a string in the format used by the "webfontloader" package for its "families" property.
 * @param {string} family - Font family name.
 * @param {string[]} variants - Variants of the fonts to format.
 * @returns {string|null} Returns a string in the following format <family>:<variant,variant,...>. Returns null if the family is falsy or the variants is not an array.
 */
function formatFont(family, variants) {
	if (!family) {
		return null;
	}

	if (Array.isArray(variants)) {
		let formattedFont = `${family}:${variants.join(',')}`;

		return formattedFont;
	}
	return null;
}

/**
 * Reduces the given array if it contains the "regular" font weight variant.
 * @param {string[]} variants
 * @returns {string[]} Returns an array containing one element that is the regular (400) font weight. If the given array does not contain the "regular" variant, it returns the same array unchanged.
 */
function reduceVariants(variants) {
	if (variants.includes('regular')) {
		return ['regular'];
	}
	return variants;
}
