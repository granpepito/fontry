import { AlphaNumComparison } from './AlphaNumComparison';
import { TextualExampleComparison } from './TextualExampleComparison';
import { usePair } from '../hooks/PairContext';

export function ComparisonPanel({ currentSection }) {
	const currentPair = usePair();
	const firstFont = currentPair.font1;
	const secondFont = currentPair.font2;
	switch (currentSection) {
		case 'alphanum': {
			return <AlphaNumComparison {...{ firstFont, secondFont }} />;
		}
		default:
		case 'textual': {
			return <TextualExampleComparison {...{ firstFont, secondFont }} />;
		}
	}
}
