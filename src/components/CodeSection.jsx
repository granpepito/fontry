import { useEffect, useMemo, useRef } from 'react';
import { usePair } from '../hooks/PairContext';
import { useVariantsState } from '../hooks/useVariants';
import { formatVariant } from '../functions/format';

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
	const [firstVariantsCheckboxes, setFirstVariantsCheckboxes] =
		useVariantsState();
	const [secondVariantsCheckboxes, setSecondVariantsCheckboxes] =
		useVariantsState();
	const firstFont = pair.font1;
	const secondFont = pair.font2;
	const active = isCurrentSection ? styles.active : '';

	// const [activeVariants, setActiveVariants] = useState([firstFont, secondFont]);
	useEffect(
		() => console.log(firstVariantsCheckboxes),
		[firstVariantsCheckboxes]
	);

	/**
	 * @callback onFirstFontVariantChange Update the state of the 'firstVariantsCheckboxes'
	 * @param {Event} e - Event target
	 */
	function onFirstFontVariantChange(e) {
		const { checked, value } = e.target;

		setFirstVariantsCheckboxes({
			...firstVariantsCheckboxes,
			[value]: checked,
		});
	}

	/**
	 * @callback onSecondFontVariantChange Update the state of the 'secondVariantsCheckboxes'
	 * @param {Event} e - Event target
	 */
	function onSecondFontVariantChange(e) {
		const { checked, value } = e.target;

		setSecondVariantsCheckboxes({
			...secondVariantsCheckboxes,
			[value]: checked,
		});
	}

	return (
		<section
			className={[
				styles.comparisonPanelContent,
				styles.codeSection,
				active,
			].join(' ')}
		>
			<h2>Code</h2>

			<div className={styles.codeSectionContainers}>
				<div className={styles.fontWeights}>
					<h3>Poids des Polices</h3>
					<VariantSelector
						firstFont={firstFont}
						secondFont={secondFont}
						firstVariantsCheckboxes={firstVariantsCheckboxes}
						secondVariantsCheckboxes={secondVariantsCheckboxes}
						onFirstFontVariantChange={onFirstFontVariantChange}
						onSecondFontVariantChange={onSecondFontVariantChange}
						isDisabled={!isCurrentSection}
					/>
				</div>
				<div className={styles.htmlCode}>
					<h3>
						HTML <span style={{ fontStyle: 'italic' }}>{'<link>'}</span>
					</h3>
					<Code isDisabled={!isCurrentSection}>
						<HtmlCode />
					</Code>
				</div>
				<div className={styles.cssCode}>
					<h3>CSS</h3>
					<Code isDisabled={!isCurrentSection}>
						<CssCode font={firstFont} />
						<CssCode font={secondFont} />
					</Code>
				</div>
			</div>
		</section>
	);
}

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
 * Displays the weights of the font and allows the user to select them.
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
			<pre className={styles.pre}>
				<code ref={ref} className={styles.code}>
					{children}
				</code>
			</pre>
		</div>
	);
}

// TODO: Style the same way as Google Fonts does (word-wrap).
function HtmlCode() {
	return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">`;
}

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

// function formatHtmlUrlCode(font) {
// 	if (!font || Object.keys(font).length === 0) {
// 		return '';
// 	}
// }
