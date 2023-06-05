import { useReducer, useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import getFonts from '../utils/getFonts';

import styles from '/src/assets/styles/fonts-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function FontsPanel() {
	const [currentPolice, setCurrentPolice] = useState('1');
	const [openFontCategory, setOpenFontCategory] = useState('');
	const [fonts, setFonts] = useState({});

	useEffect(() => {
		if (Object.keys(fonts).length === 0) {
			(async () => {
				let data = await getFonts();

				if (data.error) {
					data = await getFonts();
				}
				const fontCategories = Object.keys(data);

				const fontsGroupedByCategories = fontCategories.reduce(
					(fontCategories, currentFontCategory) => {
						const fontsData = data[currentFontCategory];
						const fontButtons = fontsData.map((fontData, index) => (
							<FontButton key={index} {...fontData} />
						));
						fontCategories[currentFontCategory] = fontButtons;

						return fontCategories;
					},
					{}
				);
				console.log('fonts', fontsGroupedByCategories);
				setFonts(fontsGroupedByCategories);
			})();
		}
	});

	function handleFontSelectorChange(e) {
		setCurrentPolice(e.target.value);
	}

	function handleFontCategoryButtonClick(e) {
		const value = e.target.value;
		if (value === openFontCategory) {
			setOpenFontCategory('');
		} else {
			setOpenFontCategory(value);
		}
	}

	return (
		<aside id={styles.fontsPanel}>
			<FontSelector
				currentPolice={currentPolice}
				setCurrentPolice={handleFontSelectorChange}
			/>
			<div className={styles.fontCategorySectionsContainer}>
				<FontCategorySection
					fontCategoryName='serif'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				>
					{fonts.serif ?? null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='sans-serif'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				>
					{fonts['sans-serif'] ?? null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='display'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				>
					{fonts.display ?? null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='handwriting'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				>
					{fonts.handwriting ?? null}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='monospace'
					openCategory={openFontCategory}
					handleClick={handleFontCategoryButtonClick}
				>
					{fonts.monospace ?? null}
				</FontCategorySection>
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

function FontCategorySection({
	fontCategoryName,
	openCategory,
	handleClick,
	children,
}) {
	const isOpen = openCategory === fontCategoryName;
	const formattedFontCategoryName =
		fontCategoryName[0].toUpperCase() + fontCategoryName.substring(1);

	const openSectionClassName = isOpen ? styles.open : '';

	// console.log(children);
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
			<div className={[styles.fontsContainer, openSectionClassName].join(' ')}>
				{isOpen ? children : null}
			</div>
		</section>
	);
}

function FontButton({ family: fontFamily }) {
	// console.log(fontFamily);
	return <button>{fontFamily}</button>;
}
