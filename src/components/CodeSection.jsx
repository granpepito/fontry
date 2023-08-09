import { useMemo, useRef } from 'react';
import { usePair } from '../hooks/PairContext';
import { useVariantsState } from '../hooks/useVariants';
import { formatVariant } from '../functions/format';
import { variants as allVariants } from '../utils/variants';

import { ClipboardIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

import styles from '/src/assets/styles/comparison-panel.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import inputStyles from '/src/assets/styles/input.module.css';

/**
 * Code section of the Comparison Panel.
 * @param {object} props
 * @param {boolean} props.isCurrentSection - Boolean value to tell if the CodeSection is the current section displayed.
 */
export function CodeSection({ isCurrentSection }) {
	const pair = usePair();
	const firstFont = pair.font1;
	const secondFont = pair.font2;

	const active = isCurrentSection ? styles.active : '';

	return (
		<section
			className={[
				styles.comparisonPanelContent,
				styles.codeSection,
				active,
			].join(' ')}
		>
			<h2>Exportation pour HTML et CSS</h2>

			<div className={styles.codeSectionContainers}>
				<CodeSectionStateHolder
					key={`${firstFont.family}-${secondFont.family}`}
					firstFont={firstFont}
					secondFont={secondFont}
					isDisabled={!isCurrentSection}
				/>
			</div>
		</section>
	);
}

function CodeSectionStateHolder({ firstFont, secondFont, isDisabled }) {
	const [firstVariantsCheckboxes, setFirstVariantsCheckboxes] =
		useVariantsState(firstFont.variants);
	const [secondVariantsCheckboxes, setSecondVariantsCheckboxes] =
		useVariantsState(secondFont.variants);

	/**
	 * @callback onFirstFontVariantChange Update the state of the 'firstVariantsCheckboxes'
	 * @param {Event} e - Event target
	 */
	function onFirstFontVariantChange(e) {
		setVariantCheckboxes(
			e.target,
			firstVariantsCheckboxes,
			setFirstVariantsCheckboxes
		);
	}

	/**
	 * @callback onSecondFontVariantChange Update the state of the 'secondVariantsCheckboxes'
	 * @param {Event} e - Event target
	 */
	function onSecondFontVariantChange(e) {
		setVariantCheckboxes(
			e.target,
			secondVariantsCheckboxes,
			setSecondVariantsCheckboxes
		);
	}

	/**
	 *
	 * @param {EventTarget} target - Reference to the element on which the event was disptached.
	 * @param {Object} checkboxesState - State of the given VariantCheckbox componenents.
	 * @param {Function} setCheckboxesState - Function to update the state.
	 */
	function setVariantCheckboxes(
		{ checked, value },
		checkboxesState,
		setCheckboxesState
	) {
		if (
			!checked &&
			Object.entries(checkboxesState).filter(([_, checked]) => checked)
				.length === 1
		) {
			return;
		}

		setCheckboxesState({
			...checkboxesState,
			[value]: checked,
		});
	}

	const firstFontQuery = useMemo(
		() => formatHtmlUrlQuery(firstFont, firstVariantsCheckboxes),
		[firstFont, firstVariantsCheckboxes]
	);

	const secondFontQuery = useMemo(
		() => formatHtmlUrlQuery(secondFont, secondVariantsCheckboxes),
		[secondFont, secondVariantsCheckboxes]
	);

	return (
		<>
			<div className={styles.fontWeights}>
				<h3>Poids des Polices</h3>
				<VariantSelector
					firstFont={firstFont}
					secondFont={secondFont}
					firstVariantsCheckboxes={firstVariantsCheckboxes}
					secondVariantsCheckboxes={secondVariantsCheckboxes}
					onFirstFontVariantChange={onFirstFontVariantChange}
					onSecondFontVariantChange={onSecondFontVariantChange}
					isDisabled={isDisabled}
				/>
			</div>
			<div className={styles.htmlCode}>
				<h3>
					HTML <span style={{ fontStyle: 'italic' }}>{'<link>'}</span>
				</h3>
				<Code isDisabled={isDisabled}>
					{`<link rel="preconnect" href="https://fonts.googleapis.com">`}
					<br />
					{`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`}
					<br />
					{`<link href="https://fonts.googleapis.com/css2?`}
					<span className={styles.fontQuery}>{firstFontQuery}</span>&
					<span className={styles.fontQuery}>{secondFontQuery}</span>
					{`&display=swap" rel="stylesheet">`}
				</Code>
			</div>
			<div className={styles.cssCode}>
				<h3>CSS</h3>
				<Code isDisabled={isDisabled}>
					<CssCode font={firstFont} />
					<CssCode font={secondFont} />
				</Code>
			</div>
		</>
	);
}

/**
 * Renders a pilled shape checkbox for a variant a font.
 * @param {Object} props
 * @param {Object} props.family - Family of the font.
 * @param {Object} props.variant - Given variant of the font.
 * @param {Object} props.checked - Status of the checkbox.
 * @param {Object} props.onChange - Event handler for the onchange event.
 * @returns
 */
function VariantCheckbox({ family, variant, checked, onChange }) {
	const checkboxName = `${family.split(' ').join('-').toLowerCase()}`;
	const checkboxId = `${checkboxName}-${variant}`;

	return (
		<div className={inputStyles.variant}>
			<input
				id={checkboxId}
				className={[inputStyles.checkbox].join(' ')}
				type='checkbox'
				name={family}
				value={variant}
				checked={checked}
				onChange={onChange}
			></input>
			<label className={inputStyles.checkboxLabel} htmlFor={checkboxId}>
				{/* Add a "plus" icon when not checked, and a "minus" icon when checked. */}
				{checked ? (
					<MinusIcon className={iconStyles.xSmallIcon} />
				) : (
					<PlusIcon className={iconStyles.xSmallIcon} />
				)}
				&nbsp;
				{formatVariant(variant)}&nbsp;
			</label>
		</div>
	);
}

/**
 * Renders the weights of the font and allows the user to select them.
 * @param {Object} props
 * @param {import("../utils/Font").FontFamily} props.firstFont - First font of the current pair.
 * @param {import("../utils/Font").FontFamily} props.secondFont - Second font of the current pair.
 * @param {} props.firstVariantsCheckboxes - State of the checkboxes of the first font.
 * @param {} props.secondVariantsCheckboxes - State of the cehckboxes of the second font.
 * @param {Function} props.onFirstFontVariantChange -
 * @param {Function} props.onSecondFontVariantChange - Update the state of the 'secondCheckedVariants'
 * @param {boolean} props.isDisabled - Disables the fieldsets.
 */
function VariantSelector({
	firstFont,
	secondFont,
	firstVariantsCheckboxes,
	secondVariantsCheckboxes,
	onFirstFontVariantChange,
	onSecondFontVariantChange,
	isDisabled,
}) {
	const firstVariants = useMemo(() => {
		const { family, variants } = firstFont;
		return variants.map((variant, index) => {
			return (
				<VariantCheckbox
					key={index}
					checked={firstVariantsCheckboxes[variant]}
					onChange={onFirstFontVariantChange}
					{...{ family, variant }}
				/>
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firstFont, firstVariantsCheckboxes]);

	const secondVariants = useMemo(() => {
		const { family, variants } = secondFont;
		return variants.map((variant, index) => {
			return (
				<VariantCheckbox
					key={index}
					checked={secondVariantsCheckboxes[variant]}
					onChange={onSecondFontVariantChange}
					{...{ family, variant }}
				/>
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondFont, secondVariantsCheckboxes]);

	return (
		<div className={styles.variantSelectorContainer}>
			<span>
				Police 1 -{' '}
				<span className={styles.fontFamily}>{firstFont?.family}</span>
			</span>
			<fieldset className={inputStyles.variantSelector} disabled={isDisabled}>
				<div className={inputStyles.variants}>{firstVariants}</div>
			</fieldset>
			<span>
				Police 2 -{' '}
				<span className={styles.fontFamily}>{secondFont?.family}</span>
			</span>
			<fieldset className={inputStyles.variantSelector} disabled={isDisabled}>
				<div className={inputStyles.variants}>{secondVariants}</div>
			</fieldset>
		</div>
	);
}

/**
 * Renders a box where its content is written is a monospace font to represent code and with a button to copy its content.
 * @param {Object} props - Props of the component.
 * @param {React.ReactNode} props.children - Content of the component.
 * @param {boolean} props.isDisabled - Disables the button inside the component.
 */
function Code({ children, isDisabled }) {
	const ref = useRef(null);

	function handleClick() {
		navigator.clipboard.writeText(ref.current?.innerText);
	}

	return (
		<div className={styles.codeContainer}>
			<div className={styles.codeCopy}>
				<button
					className={[inputStyles.buttonIcon, styles.copyButton].join(' ')}
					onClick={handleClick}
					disabled={isDisabled}
				>
					<ClipboardIcon className={iconStyles.smallIcon} />
				</button>
			</div>
			<div className={styles.pre}>
				<div ref={ref} className={styles.code}>
					{children}
				</div>
			</div>
		</div>
	);
}

/**
 * Renders a font-family property and it's value using the provided FontFamily object with a fallback. The fallback is either the category of the font or "cursive" if the category of the font is "display" or "handwriting". Adds a break line tag (<br/>) at the end.
 * @param {Object} props - Props object.
 * @param {import("../utils/Font").FontFamily} props.font - FontFamily object.
 */
function CssCode({ font }) {
	const { family, category } = font;

	return (
		<>
			{`font-family: "${family}", ${
				(category === 'display') | (category === 'handwriting')
					? 'cursive'
					: category
			};`}
			<br />
		</>
	);
}

/**
 * Builds a string following the format of the  {@link https://developers.google.com/fonts/docs/css2 Google Fonts CSS2 API}.
 * @param {import("../utils/Font").FontFamily} font - FontFamily object containing the family and the variants.
 * @param {} variantsState - State of the VariantCheckbox components of the corresponding font.
 *
 * @returns {string} Returns a string following the Google Fonts CSS2 API
 */
function formatHtmlUrlQuery(font, variantsState) {
	const { family, variants } = font;

	let hasItalic = false;
	const weightsToInclude = Object.entries(variantsState)
		.filter(([variant, checked]) => {
			if (variant.includes('italic') && checked) {
				hasItalic = true;
			}

			return checked;
		})
		.reduce((checkedVariants, [variant, _]) => {
			return [...checkedVariants, variant];
		}, []);

	let weights = '';

	if (weightsToInclude.length === 0) {
		return weights;
	}

	const formattedFamily = `family=${family.split(' ').join('+')}`;
	if (variants.length === 1) {
		return formattedFamily;
	}

	if (!hasItalic) {
		weights = 'wght@';
	} else {
		weights = 'ital,wght@';
	}

	let numberOfWeightsAdded = 0;
	for (let i = 0; i < allVariants.length; i++) {
		if (weightsToInclude.includes(allVariants[i])) {
			const variant = allVariants[i];
			const [weight, italic] = formatVariant(variant).split(' ');

			weights += `${hasItalic ? (italic ? '1,' : '0,') : ''}${weight}`;
			numberOfWeightsAdded++;
			if (numberOfWeightsAdded < weightsToInclude.length) {
				weights += ';';
			}
		}
	}
	return formattedFamily + ':' + weights;
}
