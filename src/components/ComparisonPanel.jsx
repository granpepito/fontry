import { AlphaNumComparison } from './AlphaNumComparison';
import { TextualExampleComparison } from './TextualExampleComparison';

export function ComparisonPanel({ currentSection }) {
	switch (currentSection) {
		case 'alphanum': {
		}
		default:
		case 'textual': {
			return <TextualExampleComparison />;
		}
	}
}
