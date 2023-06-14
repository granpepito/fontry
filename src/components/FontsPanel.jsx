import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePair, usePairDispatch } from '../hooks/PairContext';
import { useFontsReducer } from '../hooks/fontsReducer';

import styles from '/src/assets/styles/fonts-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function FontsPanel() {
	const [currentFontNumber, setCurrentFontNumber] = useState('1');
	const [openFontCategory, setOpenFontCategory] = useState('');
	const [fontsState, dispatch] = useFontsReducer({});

	const { searchedFonts: fonts } = fontsState;
	const pair = usePair();
	const pairDispatch = usePairDispatch();

	function handleFontSelectorChange(e) {
		setCurrentFontNumber(e.target.value);
	}

	function handleFontCategoryButtonClick(e) {
		const value = e.target.value;
		if (value === openFontCategory) {
			setOpenFontCategory('');
		} else {
			import(`../assets/styles/${value}-fonts.css`, { query: '?inline' });
			setOpenFontCategory(value);
		}
	}

	function handleFontButtonClick(e) {
		const fontData = e.target.value;

		pairDispatch({
			type: 'updateFont',
			fontN: currentFontNumber,
			font: fontData,
		});
	}

	return (
		<aside id={styles.fontsPanel}>
			<FontSelector
				currentFontNumber={currentFontNumber}
				handleChange={handleFontSelectorChange}
			/>
			<div className={styles.fontCategorySectionsContainer}>
				<FontCategorySection
					fontCategoryName='serif'
					openCategory={openFontCategory}
					pair={pair}
					currentFontNumber={currentFontNumber}
					handleClick={handleFontCategoryButtonClick}
					handleFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.serif : null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='sans-serif'
					openCategory={openFontCategory}
					pair={pair}
					currentFontNumber={currentFontNumber}
					handleClick={handleFontCategoryButtonClick}
					handleFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts['sans-serif'] : null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='display'
					openCategory={openFontCategory}
					pair={pair}
					currentFontNumber={currentFontNumber}
					handleClick={handleFontCategoryButtonClick}
					handleFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.display : null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='handwriting'
					openCategory={openFontCategory}
					pair={pair}
					currentFontNumber={currentFontNumber}
					handleClick={handleFontCategoryButtonClick}
					handleFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.handwriting : null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='monospace'
					openCategory={openFontCategory}
					pair={pair}
					currentFontNumber={currentFontNumber}
					handleClick={handleFontCategoryButtonClick}
					handleFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.monospace : null}
				</FontCategorySection>
			</div>
		</aside>
	);
}

function FontSelector({ currentFontNumber, handleChange }) {
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
					(() => (currentFontNumber === '1' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 1
				<input
					className={styles.radioInput}
					type='radio'
					id='font1'
					value='1'
					name='font1'
					checked={currentFontNumber === '1'}
					onChange={handleChange}
				/>
			</label>
			<label
				className={[
					styles.radioContainer,
					(() => (currentFontNumber === '2' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 2
				<input
					className={styles.radioInput}
					type='radio'
					id='font2'
					value='2'
					name='font2'
					checked={currentFontNumber === '2'}
					onChange={handleChange}
				/>
			</label>
		</fieldset>
	);
}

function FontCategorySection({
	fontCategoryName,
	openCategory,
	pair,
	handleClick,
	handleFontButtonClick,
	currentFontNumber,
	children,
}) {
	const isOpen = openCategory === fontCategoryName;
	const formattedFontCategoryName =
		fontCategoryName[0].toUpperCase() + fontCategoryName.substring(1);

	const openSectionClassName = isOpen ? styles.open : '';
	const { category: currentCategory } = pair[`font${currentFontNumber}`];
	const isCurrentFontInCategory = currentCategory === fontCategoryName;

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
				<span
					className={[
						styles.circleIndicator,
						(() => (isCurrentFontInCategory ? styles.hasCurrentFont : ''))(),
					].join(' ')}
				></span>
			</button>
			<div className={[styles.fontsContainer, openSectionClassName].join(' ')}>
				{children
					? children.map((fontData, index) => (
							<FontButton
								key={index}
								pair={pair}
								fontData={fontData}
								handleClick={handleFontButtonClick}
								currentFontNumber={currentFontNumber}
								isCategoryOpen={isOpen}
							/>
					  ))
					: null}
			</div>
		</section>
	);
}

function FontButton({
	fontData,
	handleClick,
	currentFontNumber,
	isCategoryOpen,
	pair,
}) {
	const pair = usePair();
	const fontFamily = fontData.family;
	const { category } = fontData;
	const currentFont =
		currentFontNumber === '1'
			? pair.font1.family
			: currentFontNumber === '2'
			? pair.font2.family
			: null;

	const className = [
		inputStyles.button,
		(() => (fontFamily === currentFont ? inputStyles.active : ''))(),
	].join(' ');

	return (
		<button
			className={className}
			name={fontFamily}
			type='button'
			value={JSON.stringify(fontData)}
			onClick={handleClick}
			disabled={!isCategoryOpen}
			style={{
				fontFamily: `${fontFamily}, ${category}, Lotion`,
			}}
		>
			{fontFamily}
		</button>
	);
}
