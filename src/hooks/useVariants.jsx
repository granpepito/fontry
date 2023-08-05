import { useRef } from 'react';
import { variants } from '../utils/variants';

export function useVariants() {
	const refs = variants.reduce((currentState, variant) => {
		currentState[variant] = useRef(null);

		return currentState;
	}, {});

	return refs;
}
