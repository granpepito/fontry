import { AlphaNumComparison } from './AlphaNumComparison';
import { TextualExampleComparison } from './TextualExampleComparison';
import { usePair } from '../hooks/PairContext';

export function ComparisonPanel({ currentSection }) {
	return (
		<div className={styles.comparisonPanel}>
			<AlphaNumComparisonSection
				isCurrentSection={currentSection === 'alphanum'}
			/>
			<TextualExampleComparisonSection
				isCurrentSection={currentSection === 'textual'}
			/>
			<CodeSection isCurrentSection={currentSection === 'code'} />
		</div>
	);
}
