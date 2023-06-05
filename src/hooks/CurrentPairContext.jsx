import { createContext } from 'react';

function getLastSavedPair() {
	const pairs = JSON.parse(localStorage.getItem('savedPairs'));

	if (pairs) {
		const latestPair = pairs[pairs.length - 1];

		return latestPair;
	}
	return null;
}

/**
 *
 * @returns {import('../utils/Pair').Pair}
 */
function getPair() {
	const latestPair = getLastSavedPair();
	if (latestPair) {
		return latestPair;
	}
	return {};
}

export const CurrentPairContext = createContext(getPair());
