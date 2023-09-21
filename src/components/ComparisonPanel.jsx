import { useCallback, useEffect, useState } from 'react';
import { usePair } from '../hooks/PairContext';
import { usePairStore } from '../hooks/usePairStore';
import { AlphaNumComparisonSection } from './AlphaNumComparisonSection';
import { TextualExampleComparisonSection } from './TextualExampleComparisonSection';
import { CodeSection } from './CodeSection';
import { InView } from 'react-intersection-observer';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/24/solid';

import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
import htmlCssSectionIcon from '../assets/img/html-css-icon.svg';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function ComparisonPanel() {
	const [currentSection, setCurrentSection] = useState('textual-example');

	const handleComparisonSectionChange = useCallback(
		function handleComparisonSectionChange(e) {
			const section = e.target.value;

			setCurrentSection(section);
		},
		[]
	);

	function handleInViewChange(inView, entry) {
		if (inView) {
			const sectionId = entry.target.id;

			setCurrentSection(sectionId);
		}
	}

	return (
		<>
			<div className={styles.comparisonPanel}>
				<InView threshold={0.5} onChange={handleInViewChange}>
					{({ inView, ref: textualSectionRef }) => (
						<TextualExampleComparisonSection
							isCurrentSection={inView}
							ref={textualSectionRef}
						/>
					)}
				</InView>
				<InView threshold={0.5} onChange={handleInViewChange}>
					{({ inView, ref: alphaNumSectionRef }) => (
						<AlphaNumComparisonSection
							isCurrentSection={inView}
							ref={alphaNumSectionRef}
						/>
					)}
				</InView>
				<InView threshold={0.5} onChange={handleInViewChange}>
					{({ inView, ref: codeSectionRef }) => (
						<CodeSection isCurrentSection={inView} ref={codeSectionRef} />
					)}
				</InView>
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

function ComparisonSectionSelector({ currentSection }) {
	const active = (sectionName) =>
		sectionName === currentSection ? styles.active : '';

	function handleClick(e) {
		e.preventDefault();
		console.log(e);
		const { sectionId } = e.target.parentElement.dataset;

		if (history && sectionId) {
			history.pushState(sectionId, '', `#${sectionId}`);
		}

		const section = document.getElementById(sectionId);
		section.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest',
		});
	}

	return (
		<nav
			className={[
				inputStyles.radioGroupContainer,
				styles.comparisonSectionSelector,
			].join(' ')}
		>
			<ul>
				<li>
					<a
						id='textual-example-selector'
						className={[styles.textualSelector, active('textual-example')].join(
							' '
						)}
						href='#textual-example'
						onClick={handleClick}
						data-section-id={'textual-example'}
					>
						<img
							style={{
								height: '24px',
								width: '25px',
							}}
							alt='Textual Section Icon'
							src={textualSectionIcon}
						/>
					</a>
				</li>
				<li>
					<a
						id='alpha-num-selector'
						className={[styles.alphaNumSelector, active('alpha-num')].join(' ')}
						href='#alpha-num'
						onClick={handleClick}
						data-section-id={'alpha-num'}
					>
						<img
							style={{
								height: '24px',
								width: '24px',
							}}
							alt='Alpha Numerical Section Icon'
							src={alphaNumericalSectionIcon}
						/>
					</a>
				</li>
				<li>
					<a
						id='code-selector'
						className={[styles.codeSelector, active('code')].join(' ')}
						href='#code'
						onClick={handleClick}
						data-section-id={'code'}
					>
						<img
							style={{
								height: '24px',
								width: '24px',
							}}
							alt='Export Section Icon'
							src={htmlCssSectionIcon}
						/>
					</a>
				</li>
			</ul>
		</nav>
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
				<SolidBookmarkIcon className={iconStyles.smallIcon} color='#3a303b' />
			) : (
				<OutlineBookmarkIcon className={iconStyles.smallIcon} color='#3a303b' />
			)}
		</button>
	);
}
