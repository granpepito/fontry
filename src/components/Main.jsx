import { useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import { FontsPanel } from './FontsPanel';
import { usePair, usePairDispatch } from '../hooks/PairContext';

import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
import styles from '/src/assets/styles/main.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import { CodeBracketIcon, BookmarkIcon } from '@heroicons/react/24/outline';

export function Main() {
	const [currentComparisonSection, setComparisonSection] = useState('alphanum');

	function handleChange(e) {
		setComparisonSection(e.target.value);
	}

	return (
		<main id={styles.mainContent}>
			<article className={styles.panelsAndSelectorContainer}>
				<div className={styles.panelsContainer}>
					<FontsPanel />
					<ComparisonPanel currentSection={currentComparisonSection} />
				</div>
				<ComparisonSectionSelector
					currentSection={currentComparisonSection}
					handleChange={handleChange}
				/>
				<SavePairButton />
			</article>
		</main>
	);
}

function ComparisonSectionSelector({ currentSection, handleChange }) {
	const alphaNum = 'alphanum',
		textual = 'textual',
		code = 'code';

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
					type='radio'
					value={alphaNum}
					checked={currentSection === alphaNum}
					onChange={handleChange}
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
					type='radio'
					value={textual}
					checked={currentSection === textual}
					onChange={handleChange}
				/>
			</label>
			<label className={[styles.codeRadioLabel, active(code)].join(' ')}>
				<CodeBracketIcon className={iconStyles.smallIcon} />
				<input
					type='radio'
					value={code}
					checked={currentSection === code}
					onChange={handleChange}
				/>
			</label>
		</fieldset>
	);
}

function SavePairButton({}) {
	const pair = usePair();
	const dispatch = usePairDispatch();

	function handleClick() {
		dispatch({
			type: 'savePair',
		});
	}

	return (
		<button
			className={[inputStyles.buttonIcon, styles.savePairButton].join(' ')}
			onClick={handleClick}
		>
			<BookmarkIcon className={iconStyles.smallIcon} />
		</button>
	);
}
