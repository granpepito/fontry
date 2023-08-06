import { /*useRef,*/ createRef } from 'react';
import { variants } from '../utils/variants';

export function useVariants() {
	const refs = variants.reduce((currentState, variant) => {
		// currentState[variant] = useRef(null);
		currentState[variant] = createRef();

		return currentState;
	}, {});

	return refs;
}