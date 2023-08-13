import { useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useInView } from 'react-intersection-observer';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePair, usePairDispatch } from '../hooks/PairContext';
import { useFontsPanel } from '../hooks/useFontsPanel';
import { loadMultipleFonts } from '../functions/loadFont';

import styles from '/src/assets/styles/fonts-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

/**
 * Component where the user can find fonts and choose them.
 */
export function FontsPanel() {
	const [fontsPanelState, dispatch] = useFontsPanel({
		1: {
			category: '',
			match: '',
			fonts: {},
		},
		2: {
			category: '',
			match: '',
			fonts: {},
		},
		currentFontTab: '1',
	});

	const { currentFontTab } = fontsPanelState;
	const { category, match } = fontsPanelState[currentFontTab];
	const fonts =
		Object.keys(fontsPanelState[currentFontTab].fonts).length > 0
			? fontsPanelState[currentFontTab].fonts
			: fontsPanelState.fonts;
	const pair = usePair();
	const { updateFont } = usePairDispatch();

	/**
	 * @callback handleFontTabSelectorChange - Sets the tab of the FontsPanel component. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleFontTabSelectorChange(e) {
		dispatch.setFontTab(e.target.value);
	}

	/**
	 * @callback handleSearch - Sets the fonts that are going to be displayed based on "match" variable. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleSearch(e) {
		dispatch.searchFonts(e.target.value);
	}

	/**
	 * @callback setMatch - Sets the match property of the current font panel tab. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function setMatch(e) {
		dispatch.setMatch(e.target.value);
	}

	/**
	 * @callback handleFontCategoryButtonClick - Sets the category to be opened for the current font panel tab. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleFontCategoryButtonClick(e) {
		const category = e.target.value;

		dispatch.setCategory(category);
	}

	/**
	 * @callback handleFontButtonClick - Sets the font of the pair of fonts based on the current font panel tab.
	 * @param {Event} e - Event
	 */
	function handleFontButtonClick(e) {
		const fontData = e.target.dataset.font;

		updateFont(fontData, currentFontTab);
	}

	const debouncedOnChangeHandler = useMemo(
		() => debounce(handleSearch, 400),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	// Stop the invocation of the debounced function after unmounting
	useEffect(() => {
		return () => {
			debouncedOnChangeHandler.cancel();
		};
	}, [debouncedOnChangeHandler]);

	return (
		<aside id={styles.fontsPanel}>
			<FontTabSelector
				currentFontTab={currentFontTab}
				onChange={handleFontTabSelectorChange}
			/>
			<div className={styles.fontCategorySectionsContainer}>
				<SearchBar
					onSearch={debouncedOnChangeHandler}
					onChange={setMatch}
					value={match}
				/>
				<FontCategorySection
					fontCategoryName='serif'
					openCategory={category}
					pair={pair}
					currentFontTab={currentFontTab}
					onClick={handleFontCategoryButtonClick}
					onFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.serif : []}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='sans-serif'
					openCategory={category}
					pair={pair}
					currentFontTab={currentFontTab}
					onClick={handleFontCategoryButtonClick}
					onFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts['sans-serif'] : []}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='display'
					openCategory={category}
					pair={pair}
					currentFontTab={currentFontTab}
					onClick={handleFontCategoryButtonClick}
					onFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.display : []}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='handwriting'
					openCategory={category}
					pair={pair}
					currentFontTab={currentFontTab}
					onClick={handleFontCategoryButtonClick}
					onFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.handwriting : []}
				</FontCategorySection>
				<FontCategorySection
					fontCategoryName='monospace'
					openCategory={category}
					pair={pair}
					currentFontTab={currentFontTab}
					onClick={handleFontCategoryButtonClick}
					onFontButtonClick={handleFontButtonClick}
				>
					{fonts ? fonts.monospace : []}
				</FontCategorySection>
			</div>
		</aside>
	);
}

/**
 * Allows to change the selector font panel tab. It uses radio buttons.
 * @param {Object} props
 * @param {string} props.currentFontTab - Current opened tab.
 * @param {handleFontTabSelectorChange} props.onChange - onchange event handler.
 */
function FontTabSelector({ currentFontTab, onChange }) {
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
					(() => (currentFontTab === '1' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 1
				<input
					className={styles.radioInput}
					type='radio'
					id='font1'
					value='1'
					name='font-tab'
					checked={currentFontTab === '1'}
					onChange={onChange}
				/>
			</label>
			<label
				className={[
					styles.radioContainer,
					(() => (currentFontTab === '2' ? styles.active : ''))(),
				].join(' ')}
			>
				Police 2
				<input
					className={styles.radioInput}
					type='radio'
					id='font2'
					value='2'
					name='font-tab'
					checked={currentFontTab === '2'}
					onChange={onChange}
				/>
			</label>
		</fieldset>
	);
}

/**
 * Allows to search for a font. It is an input of type=search.
 * @param {Object} props
 * @param {handleSearch} props.onSearch - Search function for the onchange event handler.
 * @param {setMatch} props.onChange - Function to update the value of the input for the onchange event handler.
 * @param {string} value - Value of the input
 */
function SearchBar({ onSearch, onChange, value }) {
	function handleChange(e) {
		onChange(e);
		onSearch(e);
	}

	return (
		<label className={inputStyles.searchBarLabel}>
			<input
				type='search'
				className={inputStyles.searchBar}
				name='search'
				placeholder='Rechercher une police'
				maxLength='50'
				autoCorrect='off'
				spellCheck='false'
				aria-label='Rechercher une police'
				autoComplete='off'
				value={value}
				onChange={handleChange}
			/>
		</label>
	);
}

/**
 * Displays a button with the name of the category and if open the available fonts.
 * @param {Object} props
 * @param {string} props.fontCategoryName - Name of the current category.
 * @param {string} props.openCategory - Name of the currently open category.
 * @param {handleFontCategoryButtonClick} props.onClick - Event handler for the onclick event.
 * @param {handleFontButtonClick} props.onFontButtonClick - Event handler the FontButton component.
 * @param {import('../utils/Font').FontFamily[]} props.children - Children components.
 */
function FontCategorySection({
	fontCategoryName,
	openCategory,
	onClick,
	onFontButtonClick,
	currentFontTab,
	children: fonts,
}) {
	const pair = usePair();
	const isOpen = openCategory === fontCategoryName;
	const formattedFontCategoryName =
		fontCategoryName[0].toUpperCase() + fontCategoryName.slice(1);

	const openSectionClassName = isOpen ? styles.open : '';
	const isEmptyClassName = fonts.length === 0 ? styles.empty : '';

	const { category: categoryOfCurrentPair } = pair[`font${currentFontTab}`];
	const isCurrentFontInCategoryStyle =
		categoryOfCurrentPair === fontCategoryName ? styles.hasCurrentFont : '';

	const pages = fonts.map((pageOfFonts, index) => {
		return (
			<FontButtonPage
				key={index}
				onFontButtonClick={onFontButtonClick}
				currentFontTab={currentFontTab}
			>
				{pageOfFonts}
			</FontButtonPage>
		);
	});

	return (
		<section
			className={[
				styles.categorySection,
				openSectionClassName,
				isEmptyClassName,
			].join(' ')}
		>
			<button
				className={[
					inputStyles.buttonIcon,
					styles.buttonOpenSection,
					openSectionClassName,
				].join(' ')}
				value={fontCategoryName}
				onClick={onClick}
			>
				<ChevronRightIcon
					className={[iconStyles.smallIcon, styles.chevron].join(' ')}
				/>
				<span>{formattedFontCategoryName}</span>
				<span
					className={[
						styles.circleIndicator,
						isCurrentFontInCategoryStyle,
					].join(' ')}
				></span>
			</button>
			<div className={[styles.fontsContainer].join(' ')}>
				<fieldset
					className={[styles.fieldset, openSectionClassName].join(' ')}
					disabled={!isOpen}
				>
					{pages ?? null}
				</fieldset>
			</div>
		</section>
	);
}

/**
 * Renders a group of FontButton components. Is used as a pagination to download the fonts.
 * @param {object} props
 * @param {string} props.currentFontTab - Current font tab of the FontsPanel component.
 * @param {handleFontButtonClick} props.onFontButtonClick - Event handler for the onclick event of the FontButton component.
 * @param {import('../utils/Font').FontFamily[]} props.children - Array of FontFamily objects passed as children to the component.
 */
function FontButtonPage({
	currentFontTab,
	onFontButtonClick,
	children: fonts,
}) {
	const { ref, inView } = useInView({
		root: document.querySelector(`${styles.fontCategorySectionsContainer}`),
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			loadMultipleFonts(fonts, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	const fontButtons = fonts.map((font, index) => {
		return (
			<FontButton
				key={index}
				fontData={font}
				onClick={onFontButtonClick}
				currentFontTab={currentFontTab}
			/>
		);
	});

	return (
		<div ref={ref} className={styles.fontButtonGroup}>
			{fontButtons}
		</div>
	);
}

/**
 * Button displaying the fonts name and containing its data.
 * @param {Object} props
 * @param {import("../utils/Font").FontFamily} props.fontData - Data of the font.
 * @param {handleFontButtonClick} props.onClick - Event handler for the onclick event.
 * @param {string} props.currentFontTab - Currently opened font panel tab.
 */
function FontButton({ fontData, onClick, currentFontTab }) {
	const pair = usePair();

	const { category, family } = fontData;
	const currentFont = pair[`font${currentFontTab}`].family ?? null;
	const isCurrentFontStyle = family === currentFont ? inputStyles.active : '';

	const className = [
		inputStyles.button,
		styles.fontButton,
		isCurrentFontStyle,
	].join(' ');

	return (
		<button
			className={className}
			name={family}
			title={family}
			type='button'
			value={family}
			data-font={JSON.stringify(fontData)}
			onClick={onClick}
			style={{
				fontFamily: `${family}, ${
					(category === 'display') | (category === 'handwriting')
						? 'cursive'
						: category
				}, Lotion`,
			}}
		>
			{family}
		</button>
	);
}
