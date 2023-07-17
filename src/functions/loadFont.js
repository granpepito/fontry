import WebFont from 'webfontloader';

export async function loadFont(fontFamily, variants, isLimited) {
	try {
		function formatVariants(variants) {
			// undefined, null or empty string
			if (!variants) {
				return '400';
			}
			// Is an array of multiple variants
			if (Array.isArray(variants)) {
				return variants.join(',');
			}
			// Is a single variant
			return variants;
		}

		const promise = new Promise((resolve, reject) => {
			if (fontFamily) {
				// console.log(fontFamily);
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
		return promise;
	} catch (err) {
		console.log('HAS ERR', err);
	}
}
