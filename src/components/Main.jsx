import { useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import { FontsPanel } from './FontsPanel';

import bodyTextIcon from '/src/assets/img/body-text.svg';
import mainStyles from '/src/assets/styles/main.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export function Main() {
	const [currentComparisonSection, setComparisonSection] = useState('alphanum');

	function handleChange(e) {
		setComparisonSection(e.target.value);
	}

	return (
		<main id={mainStyles.mainContent}>
			<article className={mainStyles.panelsContainer}>
				<FontsPanel />
				<ComparisonPanel currentSection={currentComparisonSection} />
			</article>
			<ComparisonSectionButtonGroup
				currentSection={currentComparisonSection}
				handleChange={handleChange}
			/>
		</main>
	);
}

function ComparisonSectionButtonGroup({ currentSection, handleChange }) {
	const alphaNum = 'alphanum',
		textual = 'textual';

	return (
		<fieldset className={inputStyles.radioGroupContainer}>
			<label>
				<span className={mainStyles.topRow}>ABC</span>
				<span className={mainStyles.bottomRow}>123</span>
				<input
					type='radio'
					value={alphaNum}
					checked={currentSection === alphaNum}
					onChange={handleChange}
				/>
			</label>
			<label>
				A<img alt='Body Text Icon' src={bodyTextIcon} />
				<input
					type='radio'
					value={textual}
					checked={currentSection === textual}
					onChange={handleChange}
				/>
			</label>
		</fieldset>
	);
}
