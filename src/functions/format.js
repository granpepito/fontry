import { variants as allVariants } from '../utils/variants';

/**
 * Formats a font variant to a more readable string.
 * @param {string} variant - Variant to format.
 * @returns {string} Returns a readable variant name (e.g. "Regular", "900 Italic").
 */
export function formatVariant(variant) {
	if (Number(variant)) {
		return variant;
	}

	if (variant === 'regular') {
		return '400';
	}

	if (variant === 'italic') {
		return '400 Italic';
	}

	const startsWithNumericalWeight = variant.startsWith('00', 1);

	if (startsWithNumericalWeight) {
		return (
			variant.slice(0, 3) + ' ' + variant[3].toUpperCase() + variant.slice(4)
		);
	}
	return variant[0].toUpperCase() + variant.slice(1);
}

/**
 * Builds a string following the format of the  {@link https://developers.google.com/fonts/docs/css2 Google Fonts CSS2 API}.
 * @param {import("../utils/Font").FontFamily} font - FontFamily object containing the family and the variants.
 * @param {} variantsState - State of the VariantCheckbox components of the corresponding font.
 *
 * @returns {string} Returns a string following the Google Fonts CSS2 API
 */
export function formatHtmlUrlQuery(font, variantsState) {
	const { family, variants } = font;

	let hasItalic = false;
	const weightsToInclude = Object.entries(variantsState)
		.filter(([variant, checked]) => {
			if (variant.includes('italic') && checked) {
				hasItalic = true;
			}

			return checked;
		})
		.reduce((checkedVariants, [variant, _]) => {
			return [...checkedVariants, variant];
		}, []);

	let weights = '';

	if (weightsToInclude.length === 0) {
		return weights;
	}

	const formattedFamily = `family=${family.split(' ').join('+')}`;
	if (variants.length === 1) {
		return formattedFamily;
	}

	if (!hasItalic) {
		weights = 'wght@';
	} else {
		weights = 'ital,wght@';
	}

	let numberOfWeightsAdded = 0;
	for (let i = 0; i < allVariants.length; i++) {
		if (weightsToInclude.includes(allVariants[i])) {
			const variant = allVariants[i];
			const [weight, italic] = formatVariant(variant).split(' ');

			weights += `${hasItalic ? (italic ? '1,' : '0,') : ''}${weight}`;
			numberOfWeightsAdded++;
			if (numberOfWeightsAdded < weightsToInclude.length) {
				weights += ';';
			}
		}
	}
	return formattedFamily + ':' + weights;
}
