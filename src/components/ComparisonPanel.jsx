import { useCallback, useState } from 'react';
import { AlphaNumComparisonSection } from './AlphaNumComparisonSection';
import { TextualExampleComparisonSection } from './TextualExampleComparisonSection';
// import { CodeSection } from './CodeSection';

import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
// import exportSectionIcon from '../assets/img/export-section-icon.svg';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';

export function ComparisonPanel() {
	const [currentSection, setCurrentSection] = useState('alphanum');

	const handleComparisonSectionChange = useCallback(
		function handleComparisonSectionChange(e) {
			const section = e.target.value;

			setCurrentSection(section);
		},
		[]
	);

	return (
		<>
			<div className={styles.comparisonPanel}>
				<AlphaNumComparisonSection
					isCurrentSection={currentSection === 'alphanum'}
				/>
				<TextualExampleComparisonSection
					isCurrentSection={currentSection === 'textual'}
				/>
				{/* <CodeSection isCurrentSection={currentSection === 'code'} /> */}
			</div>
			<ComparisonSectionSelector
				currentSection={currentSection}
				onChange={handleComparisonSectionChange}
			/>
		</>
	);
}

function ComparisonSectionSelector({ currentSection, onChange }) {
	const alphaNum = 'alphanum',
		textual = 'textual';
	// code = 'code';

	const active = (sectionName) =>
		sectionName === currentSection ? styles.active : '';

	return (
		<fieldset
			className={[
				inputStyles.radioGroupContainer,
				styles.comparisonSectionSelector,
			].join(' ')}
		>
			<label
				className={[styles.alphaNumRadioLabel, active(alphaNum)].join(' ')}
			>
				<img
					style={{
						height: '24px',
						width: '24px',
					}}
					alt='Alpha Numerical Section Icon'
					src={alphaNumericalSectionIcon}
				/>
				<input
					id={`${alphaNum}-select`}
					name='comparison-selector'
					type='radio'
					value={alphaNum}
					checked={currentSection === alphaNum}
					onChange={onChange}
				/>
			</label>
			<label className={[styles.textualRadioLabel, active(textual)].join(' ')}>
				<img
					style={{
						height: '16px',
						width: '25px',
					}}
					alt='Textual Section Icon'
					src={textualSectionIcon}
				/>
				<input
					id={`${textual}-select`}
					name='comparison-selector'
					type='radio'
					value={textual}
					checked={currentSection === textual}
					onChange={onChange}
				/>
			</label>
			{/* <label className={[styles.codeRadioLabel, active(code)].join(' ')}>
				<img
					style={{
						height: '24px',
						width: '24px',
					}}
					alt='Export Section Icon'
					src={exportSectionIcon}
				/>
				<input
					id={`${code}-select`}
					type='radio'
					value={code}
					checked={currentSection === code}
					onChange={onChange}
				/>
			</label> */}
		</fieldset>
	);
}
