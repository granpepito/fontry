import { /*useRef,*/ createRef, useState } from 'react';
import { variants } from '../utils/variants';

/**
 *
 * @returns
 */
export function useVariantsRef() {
	const refs = variants.reduce((currentState, variant) => {
		// currentState[variant] = useRef(null);
		currentState[variant] = createRef();

		return currentState;
	}, {});

	return refs;
}

/**
 *
 * @returns
 */
export function useVariantsState() {
	const [areChecked, setAreChecked] = useState(
		variants.reduce((currentState, variant) => {
			// currentState[variant] = useRef(null);
			currentState[variant] = true;

			return currentState;
		}, {})
	);

	return [areChecked, setAreChecked];
}
