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
