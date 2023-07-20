import WebFont from 'webfontloader';

/**
 * Loads the requested font family. Uses the WebFontLoader package from Typekit.
 * @param {string} fontFamily - Name of the font family.
 * @param {string[]} variants - Variants of the font family. Defaults to 400 (Regular).
 * @param {*} isLimited - Flag to indicate that only the characters of the font family's name (e.g. Inter for the Inter font family) is requested.
 */
export async function loadFont(
	fontFamily,
	variants = ['400'],
	isLimited = false
) {
	try {
		/**
		 * Takes an array of font weights and returns a string with every weight. If variants is a string, the same string is returned.
		 * @param {string[]} variants - Requested weights for the font.
		 * @returns Returns a formatted string of font weights.
		 */
		function formatVariants(variants) {
			// Is an array of multiple variants
			if (Array.isArray(variants)) {
				return variants.join(',');
			}
		}

		// Using a Promise to asynchroneously get the requested font.
		new Promise((resolve, reject) => {
			if (fontFamily) {
				const fontVariants = formatVariants(variants);
				const text = isLimited ? fontFamily : '';

				WebFont.load({
					google: {
						families: [`${fontFamily}:${fontVariants}:latin`],
						text,
					},
					active: () => resolve('200'),
					inactive: () => reject('404'),
				});
			} else {
				reject('Font is not defined.');
			}
		});
	} catch (err) {
		console.log('HAS ERR', err);
	}
}
