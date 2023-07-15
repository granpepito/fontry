import { AlphaNumComparisonSection } from './AlphaNumComparisonSection';
import { TextualExampleComparisonSection } from './TextualExampleComparisonSection';
import { CodeSection } from './CodeSection';

import styles from '/src/assets/styles/comparison-panel.module.css';

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
