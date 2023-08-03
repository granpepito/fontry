import { useMemo, useState } from 'react';
import { usePair } from '../hooks/PairContext';

import { ClipboardIcon } from '@heroicons/react/24/outline';

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

	const [activeVariants, setActiveVariants] = useState([firstFont, secondFont]);

	function onVariantChange(e) {}

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
					<WeightsSelector
						firstFont={firstFont}
						secondFont={secondFont}
						isDisabled={!isCurrentSection}
					/>
				</div>
				<div className={styles.htmlCode}>
					<h3>
						HTML <span style={{ fontStyle: 'italic' }}>{'<link>'}</span>
					</h3>
					<Code>
						<HtmlCode />
					</Code>
				</div>
				<div className={styles.cssCode}>
					<h3>CSS</h3>
					<Code>
						<CssCode font={firstFont} />
						<CssCode font={secondFont} />
					</Code>
				</div>
			</div>
		</section>
	);
}

/**
 * Displays the weights of the font and allows the user to select them.
 * @param {Object} props
 * @param {import("../utils/Font").FontFamily} props.firstFont - First font of the current pair.
 * @param {import("../utils/Font").FontFamily} props.secondFont - Second font of the current pair.
 */
function WeightsSelector({ firstFont, secondFont, isDisabled }) {
	const firstVariants = useMemo(() => {
		const { family, variants } = firstFont;
		return variants.map((variant, index) => {
			return <VariantCheckBock key={index} {...{ family, variant }} />;
		});
	}, [firstFont]);

	const secondVariants = useMemo(() => {
		const { family, variants } = secondFont;
		return variants.map((variant, index) => {
			return <VariantCheckBock key={index} {...{ family, variant }} />;
		});
	}, [secondFont]);

	return (
		<div className={styles.fontWeightsSelector}>
			<fieldset className={styles.firstWeightsSelector} disabled={isDisabled}>
				1. <span className={styles.fontFamily}>{firstFont?.family}</span>
				<div className={styles.variants}>{firstVariants}</div>
			</fieldset>
			<fieldset className={styles.secondWeightsSelector} disabled={isDisabled}>
				2. <span className={styles.fontFamily}>{secondFont?.family}</span>
				<div className={styles.variants}>{secondVariants}</div>
			</fieldset>
		</div>
	);
}

function VariantCheckBock({ family, variant }) {
	const [isChecked, setIsChecked] = useState(true);
	const activeClassName = isChecked ? inputStyles.active : '';

	function handleChange(e) {
		setIsChecked(!isChecked);
	}

	return (
		<label className={inputStyles.checkboxLabel}>
			{formatVariant(variant)}
			<input
				className={[inputStyles.checkbox, activeClassName].join(' ')}
				type='checkbox'
				name={family}
				value={variant}
				checked={isChecked}
				onChange={handleChange}
			></input>
		</label>
	);
}

function Code({ children, ...props }) {
	function handleClick() {
		navigator.clipboard.writeText(document.querySelector(styles.code));
	}

	return (
		<div className={styles.codeContainer}>
			<div className={styles.codeCopy}>
				<button
					className={[inputStyles.buttonIcon, styles.copyButton].join(' ')}
					onClick={handleClick}
				>
					<ClipboardIcon className={iconStyles.smallIcon} />
				</button>
			</div>
			<pre className={styles.pre}>
				<code className={styles.code}>{children}</code>
			</pre>
		</div>
	);
}

function HtmlCode({}) {
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

/**
 * Formats a font variant to a more readable string.
 * @param {string} variant - Variant to format.
 * @returns {string} Returns a readable variant name (e.g. "Regular", "900 Italic").
 */
function formatVariant(variant) {
	if (Number(variant)) {
		return variant;
	}

	if (variant === 'regular') {
		return '400';
	}

	if (variant === 'italic') {
		return '400 Italic';
	}

	const startsWithNumericalWeight = variant.startsWith('00', 1);

	if (startsWithNumericalWeight) {
		return (
			variant.slice(0, 3) + ' ' + variant[3].toUpperCase() + variant.slice(4)
		);
	}
	return variant[0].toUpperCase() + variant.slice(1);
}

function formatHtmlUrlCode(font) {
	if (!font || Object.keys(font).length === 0) {
		return '';
	}
}
