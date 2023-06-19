import { useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePair, usePairDispatch } from '../hooks/PairContext';
import { useFontsPanel } from '../hooks/useFontsPanel';

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
	const pairDispatch = usePairDispatch();

	/**
	 * @callback handleFontTabSelector - Sets the tab of the FontsPanel component. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleFontTabSelectorChange(e) {
		dispatch({
			type: 'setFontTab',
			fontTab: e.target.value,
		});
	}

	/**
	 * @callback handleSearch - Sets the fonts that are going to be displayed based on "match" variable. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleSearch(e) {
		dispatch({
			type: 'searchFonts',
			match: e.target.value,
		});
	}

	/**
	 * @callback setMatch - Sets the match property of the current font panel tab. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function setMatch(e) {
		const match = e.target.value;
		dispatch({
			type: 'setMatch',
			match,
		});
	}

	/**
	 * @callback handleFontCategoryButtonClick - Sets the category to be opened for the current font panel tab. Changes the state of the FontsPanel component.
	 * @param {Event} e - Event
	 */
	function handleFontCategoryButtonClick(e) {
		const value = e.target.value;

		import(`../assets/styles/${value}-fonts.css`);
		dispatch({
			type: 'setCategory',
			category: value,
		});
	}

	/**
	 * @callback handleFontButtonClick - Sets the font of the pair of fonts based on the current font panel tab.
	 * @param {Event} e - Event
	 */
	function handleFontButtonClick(e) {
		const fontData = e.target.dataset.font;

		pairDispatch({
			type: 'updateFont',
			fontNumber: currentFontTab,
			font: fontData,
		});
	}

	return (
		<aside id={styles.fontsPanel}>
			<FontTabSelector
				currentFontTab={currentFontTab}
				onChange={handleFontTabSelectorChange}
			/>
			<div className={styles.fontCategorySectionsContainer}>
				<SearchBar onSearch={handleSearch} onChange={setMatch} value={match} />
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
					name='font1'
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
					name='font2'
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
	const debouncedOnChangeHandler = useMemo(() => debounce(onSearch, 300), []);

	function handleChange(e) {
		onChange(e);
		debouncedOnChangeHandler(e);
	}

	// Stop the invocation of the debounced function after unmounting
	useEffect(() => {
		return () => {
			debouncedOnChangeHandler.cancel();
		};
	}, []);

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
 * @param {import('..utils/Pair').Pair} props.pair - The current pair of fonts displayed.
 * @param {handleFontCategoryButtonClick} props.onClick - Event handler for the onclick event.
 * @param {handleFontButtonClick} props.onFontButtonClick - Event handler the FontButton component.
 * @param {import('../utils/Font').FontFamily[]} props.children - Children components.
 */
function FontCategorySection({
	fontCategoryName,
	openCategory,
	pair,
	onClick,
	onFontButtonClick,
	currentFontTab,
	children,
}) {
	const isOpen = openCategory === fontCategoryName;
	const formattedFontCategoryName =
		fontCategoryName[0].toUpperCase() + fontCategoryName.substring(1);

	const openSectionClassName = isOpen ? styles.open : '';
	const isEmptyClassName = children.length === 0 ? styles.empty : '';

	const { category: currentCategory } = pair[`font${currentFontTab}`];
	const isCurrentFontInCategory = currentCategory === fontCategoryName;

	const fontList = useMemo(() => {
		return children.map((fontData, index) => (
			<FontButton
				key={index}
				pair={pair}
				fontData={fontData}
				onClick={onFontButtonClick}
				currentFontTab={currentFontTab}
				isCategoryOpen={isOpen}
			/>
		));
	}, [children, onFontButtonClick, currentFontTab, isOpen]);

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
						(() => (isCurrentFontInCategory ? styles.hasCurrentFont : ''))(),
					].join(' ')}
				></span>
			</button>
			<div className={[styles.fontsContainer, openSectionClassName].join(' ')}>
				{fontList}
			</div>
		</section>
	);
}

/**
 * Button displaying the fonts name and containing its data.
 * @param {Object} props
 * @param {import("../utils/Font").FontFamily} props.fontData - Data of the font.
 * @param {handleFontButtonClick} props.onClick - Event handler for the onclick event.
 * @param {string} props.currentFontTab - Currently opened font panel tab.
 * @param {boolean} props.isCategoryOpen - Boolean value stating if the FontButton's category is opened.
 * @param {pair} props.pair - The current pair of fonts displayed.
 */
function FontButton({
	fontData,
	onClick,
	currentFontTab,
	isCategoryOpen,
	pair,
}) {
	const fontFamily = fontData.family;
	const { category } = fontData;
	const currentFont =
		currentFontTab === '1'
			? pair.font1.family
			: currentFontTab === '2'
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
			title={fontFamily}
			type='button'
			value={fontFamily}
			data-font={JSON.stringify(fontData)}
			onClick={onClick}
			disabled={!isCategoryOpen}
			style={{
				fontFamily: `${fontFamily}, ${category}, Lotion`,
			}}
		>
			{fontFamily}
		</button>
	);
}
