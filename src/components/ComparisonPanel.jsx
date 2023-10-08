import { useEffect, useState } from 'react';
import { usePair } from '../hooks/PairContext';
import { usePairStore } from '../hooks/usePairStore';
import { AlphaNumComparisonSection } from './AlphaNumComparisonSection';
import { TextualExampleComparisonSection } from './TextualExampleComparisonSection';
import { CodeSection } from './CodeSection';
import { InView } from 'react-intersection-observer';

import { BookmarkIcon } from '@heroicons/react/24/outline';
import alphaNumericalSectionIcon from '../assets/img/alpha-numerical-section-icon.svg';
import textualSectionIcon from '../assets/img/textual-section-icon.svg';
import htmlCssSectionIcon from '../assets/img/html-css-icon.svg';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function ComparisonPanel() {
	const pair = usePair();
	const [currentSection, setCurrentSection] = useState('textual-example');

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
					{({ ref: textualSectionRef }) => (
						<TextualExampleComparisonSection
							ref={textualSectionRef}
							pair={pair}
						/>
					)}
				</InView>
				<InView threshold={0.5} onChange={handleInViewChange}>
					{({ ref: alphaNumSectionRef }) => (
						<AlphaNumComparisonSection ref={alphaNumSectionRef} pair={pair} />
					)}
				</InView>
				<InView threshold={0.5} onChange={handleInViewChange}>
					{({ ref: codeSectionRef }) => (
						<CodeSection ref={codeSectionRef} pair={pair} />
					)}
				</InView>
			</div>
			<>
				<ComparisonSectionSelector currentSection={currentSection} />
				<SavePairButton pair={pair} />
			</>
		</>
	);
}

function ComparisonSectionSelector({ currentSection }) {
	const active = (sectionName) =>
		sectionName === currentSection ? styles.active : '';

	function handleClick(e) {
		e.preventDefault();
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
		</nav>
	);
}

/**
 * Renders a Save button to save the current Pair of fonts.
 */
function SavePairButton({ pair }) {
	const { add, remove, includes } = usePairStore();
	const isPairInPairStore = includes(pair);
	const [isSaved, setIsSaved] = useState(isPairInPairStore);

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
			className={[inputStyles.buttonIcon, styles.savePairButton].join(' ')}
			type='button'
			aria-label={isSaved ? 'Delete Pair' : 'Save Pair'}
			onClick={handleClick}
		>
			<BookmarkIcon
				className={iconStyles.smallIcon}
				stroke='#3a303b'
				fill={isSaved ? '#3a303b' : '#f8f7f8'}
			/>
		</button>
	);
}
