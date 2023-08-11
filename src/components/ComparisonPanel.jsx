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
import htmlCssSectionIcon from '../assets/img/HTML CSS.svg';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

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
			<label className={[styles.codeRadioLabel, active(code)].join(' ')}>
				<img
					style={{
						height: '24px',
						width: '27px',
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
	const { pairs, add, remove, includes } = usePairStore();
	const isPairInPairStore = includes(pair);
	const [isSaved, setIsSaved] = useState(isPairInPairStore);

	useEffect(() => {
		setIsSaved(includes(pair));
	}, [pair, pairs]);

	function handleClick(e) {
		try {
			const pair = JSON.parse(e.target.dataset.pair);

			if (isSaved) {
				remove(pair);
				setIsSaved(includes(pair));
			} else {
				add(pair);
				setIsSaved(includes(pair));
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<button
			className={[inputStyles.buttonIcon, styles.savePairButton].join(' ')}
			data-pair={JSON.stringify(pair || '')}
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
