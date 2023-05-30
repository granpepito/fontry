import { useReducer, useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import getFonts from '../utils/getFonts';

import styles from '/src/assets/styles/fonts-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function FontsPanel() {
	const [currentPolice, setCurrentPolice] = useState('1');
	const [openFontCategory, setOpenFontCategory] = useState('');

	function handlePoliceSelectorChange(e) {
		setCurrentPolice(e.target.value);
	}

	function handleFontCategoryButtonClick(e) {
		const value = e.target.value;
		if (value === openFontCategory) {
			setOpenFontCategory('');
		} else {
			setOpenFontCategory(value);
		}
		console.log('value', value);
	}

	return (
		<aside>
			<FontSelector
				currentPolice={currentPolice}
				setCurrentPolice={handlePoliceSelectorChange}
			/>
			<div className={styles.fontCategorySectionsContainer}>
				<FontCategorySection
					fontCategoryName='serif'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				></FontCategorySection>
				<FontCategorySection
					fontCategoryName='sans-serif'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				></FontCategorySection>
				<FontCategorySection
					fontCategoryName='display'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				></FontCategorySection>
				<FontCategorySection
					fontCategoryName='handriwriting'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				></FontCategorySection>
				<FontCategorySection
					fontCategoryName='monospace'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				></FontCategorySection>
			</div>
		</aside>
	);
}

function FontSelector({ currentPolice, setCurrentPolice }) {
	return (
		<fieldset
			className={[
				inputStyles.radioGroupContainer,
				styles.fontSelectorContainer,
			].join(' ')}
		>
			<label
				className={[
					styles.radioContainer,
					(() => (currentPolice === '1' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 1
				<input
					className={styles.radioInput}
					type='radio'
					id='police1'
					value='1'
					checked={currentPolice === '1'}
					onChange={setCurrentPolice}
				/>
			</label>
			<label
				className={[
					styles.radioContainer,
					(() => (currentPolice === '2' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 2
				<input
					className={styles.radioInput}
					type='radio'
					id='police2'
					value='2'
					checked={currentPolice === '2'}
					onChange={setCurrentPolice}
				/>
			</label>
		</fieldset>
	);
}

function FontCategorySection({ fontCategoryName, openCategory, handleClick }) {
	const isOpen = openCategory === fontCategoryName;
	const formattedFontCategoryName =
		fontCategoryName[0].toUpperCase() + fontCategoryName.substring(1);

	const openSectionClassName = isOpen ? styles.open : '';
	return (
		<section
			className={[styles.categorySection, openSectionClassName].join(' ')}
		>
			<button
				className={[
					inputStyles.buttonIcon,
					styles.buttonOpenSection,
					openSectionClassName,
				].join(' ')}
				value={fontCategoryName}
				onClick={handleClick}
			>
				<ChevronRightIcon
					className={[iconStyles.smallIcon, styles.chevron].join(' ')}
				/>
				<span>{formattedFontCategoryName}</span>
			</button>
			<div className={styles.fontsContainer}></div>
		</section>
	);
}

function fontButton() {
	return <button></button>;
}
