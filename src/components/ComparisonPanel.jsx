import { AlphaComparison } from './AlphaComparison';
import { TextualExampleComparison } from './TextualExampleComparison';

export function ComparisonPanel({ currentSection }) {
	switch (currentSection) {
		case 'alphanum': {
			return <AlphaComparison />;
		}
		default:
		case 'textual': {
			return <TextualExampleComparison />;
		}
	}
}
