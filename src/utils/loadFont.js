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
			if (Object.keys(font).length > 0) {
				const fontVariants = formatVariants(variants);
				const text = isLimited ? fontFamily : '';
				WebFont.load({
					google: {
						families: [`${fontFamily}:${fontVariants}:latin`],
						text,
					},
					active: () => resolve('true'),
					inactive: () => reject('404'),
				});
			}
			reject('Font object is empty.');
		});
		await promise;
	} catch (err) {
		console.log('HAS ERR', err);
	}
}
