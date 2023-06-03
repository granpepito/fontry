import { AlphaNumComparison } from './AlphaComparison';
import { TextualExampleComparison } from './TextualExampleComparison';

export function ComparisonPanel({ currentSection }) {
	switch (currentSection) {
		case 'alphanum': {
			return <AlphaNumComparison />;
		}
		default:
		case 'textual': {
			return <TextualExampleComparison />;
		}
	}
}
