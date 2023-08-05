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
