import { useEffect, useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import { FontsPanel } from './FontsPanel';
import { usePair } from '../hooks/PairContext';

import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
import exportSectionIcon from '../assets/img/export-section-icon.svg';
import styles from '/src/assets/styles/main.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/24/solid';
// import { usePairStoreDispatch } from '../hooks/PairStoreContext';
import { usePairStore } from '../hooks/usePairStore';

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
				<img
					style={{
						height: '24px',
						width: '24px',
					}}
					alt='Export Section Icon'
					src={exportSectionIcon}
				/>
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
	const { pairs, add, remove, includes } = usePairStore();
	const [isSaved, setIsSaved] = useState(!!includes(pair));

	useEffect(() => {
		setIsSaved(!!includes(pair));
	}, [pair]);

	function handleClick(e) {
		try {
			const pair = JSON.parse(e.target.dataset.pair);

			if (isSaved) {
				remove(pair);
				setIsSaved(!!includes(pair));
			} else {
				add(pair);
				setIsSaved(!!includes(pair));
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
