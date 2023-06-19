import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePair, usePairDispatch } from '../hooks/PairContext';
import { useFontsReducer } from '../hooks/useFontsReducer';
import { useFontsPanel } from '../hooks/useFontsPanel';

import styles from '/src/assets/styles/fonts-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

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

	function handleFontTabSelectorChange(e) {
		// setCurrentFontTabNumber(e.target.value);
		dispatch({
			type: 'setFontTab',
			fontTab: e.target.value,
		});
	}

	function handleSearch(e) {
		dispatch({
			type: 'searchFonts',
			match: e.target.value,
		});
	}

	function setMatch(e) {
		const match = e.target.value;
		dispatch({
			type: 'setMatch',
			match,
		});
	}

	function handleFontCategoryButtonClick(e) {
		const value = e.target.value;

		import(`../assets/styles/${value}-fonts.css`);
		dispatch({
			type: 'setCategory',
			category: value,
		});
	}

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

function SearchBar({ onSearch, onChange, value }) {
	const debouncedOnChangeHandler = useMemo(() => debounce(onSearch, 300), []);

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
				onChange={(e) => {
					onChange(e);
					debouncedOnChangeHandler(e);
				}}
			/>
		</label>
	);
}

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
				currentFontNumber={currentFontTab}
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

function FontButton({
	fontData,
	onClick,
	currentFontNumber,
	isCategoryOpen,
	pair,
}) {
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
