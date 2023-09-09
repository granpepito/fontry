import { useCallback, useEffect, useState } from 'react';
import { usePair } from '../hooks/PairContext';
import { usePairStore } from '../hooks/usePairStore';
import { AlphaNumComparisonSection } from './AlphaNumComparisonSection';
import { TextualExampleComparisonSection } from './TextualExampleComparisonSection';
import { CodeSection } from './CodeSection';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/24/solid';

import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
import htmlCssSectionIcon from '../assets/img/html-css-icon.svg';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function ComparisonPanel() {
	const [currentSection, setCurrentSection] = useState('textual');

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
				<TextualExampleComparisonSection
					isCurrentSection={currentSection === 'textual'}
				/>
				<AlphaNumComparisonSection
					isCurrentSection={currentSection === 'alphanum'}
				/>
				<CodeSection isCurrentSection={currentSection === 'code'} />
			</div>
			<>
				<ComparisonSectionSelector
					currentSection={currentSection}
					onChange={handleComparisonSectionChange}
				/>
				<SavePairButton />
			</>
		</>
	);
}

// TODO: The ComparisonSectionSelector should be a nav containing anchors linking to the corresponding section.
function ComparisonSectionSelector({ currentSection, onChange }) {
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
			<label className={[styles.textualRadioLabel, active(textual)].join(' ')}>
				<img
					style={{
						height: '24px',
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
			<label className={[styles.codeRadioLabel, active(code)].join(' ')}>
				<img
					style={{
						height: '24px',
						width: '24px',
					}}
					alt='Export Section Icon'
					src={htmlCssSectionIcon}
				/>
				<input
					id={`${code}-select`}
					name='comparison-selector'
					type='radio'
					value={code}
					checked={currentSection === code}
					onChange={onChange}
				/>
			</label>
		</fieldset>
	);
}

/**
 * Renders a Save button to save the current Pair of fonts.
 */
function SavePairButton() {
	const pair = usePair();
	const { add, remove, includes } = usePairStore();
	const isPairInPairStore = includes(pair);
	const [isSaved, setIsSaved] = useState(isPairInPairStore);
	const isSavedClassName = isSaved ? styles.saved : null;

	useEffect(() => {
		setIsSaved(includes(pair));
	}, [includes, pair]);

	function handleClick() {
		if (isPairInPairStore) {
			remove(pair);
		} else {
			add(pair);
		}
		setIsSaved(!isSaved);
	}

	return (
		<button
			className={[
				inputStyles.buttonIcon,
				styles.savePairButton,
				isSavedClassName,
			].join(' ')}
			type='button'
			aria-label={isSaved ? 'Delete Pair' : 'Save Pair'}
			onClick={handleClick}
		>
			{isSaved ? (
				<SolidBookmarkIcon className={iconStyles.smallIcon} />
			) : (
				<OutlineBookmarkIcon className={iconStyles.smallIcon} />
			)}
		</button>
	);
}
