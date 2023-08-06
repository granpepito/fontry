import { forwardRef, useMemo } from 'react';
import { usePair } from '../hooks/PairContext';
import { useVariants } from '../hooks/useVariants';
// import { VariantSelector } from './VariantSelector';
import { formatVariant } from '../functions/format';
// import { variants, variantsState } from '../utils/variants';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';

export function AlphaNumComparisonSection({ isCurrentSection }) {
	const pair = usePair();
	const firstFont = pair.font1;
	const secondFont = pair.font2;
	const active = isCurrentSection ? styles.active : '';
	return (
		<section
			className={[
				styles.comparisonPanelContent,
				styles.alphaNumSection,
				active,
			].join(' ')}
		>
			<div className={styles.comparisonPanelTitle}>
				<h2>Comparaison Alphanumérique</h2>
			</div>
			<div className={styles.alphaNumContainer}>
				<p className={styles.fontFamilies}>
					Police 1 - {firstFont.family ?? 'Lotion'}
				</p>
				<AlphaNumGroup
					key={firstFont.family}
					family={firstFont.family}
					variants={firstFont.variants}
					isDisabled={!isCurrentSection}
				/>
			</div>
			<div className={styles.alphaNumContainer}>
				<p className={styles.fontFamilies}>
					Police 2 - {secondFont.family ?? 'Lotion'}
				</p>

				<AlphaNumGroup
					key={secondFont.family}
					family={secondFont.family}
					variants={secondFont.variants}
					isDisabled={!isCurrentSection}
				/>
			</div>
		</section>
	);
}

/**
 * Renders an example of characters using the given font and variant.
 * @param {Object} props
 * @param {string} props.family - Font Family name.
 * @param {string} props.variant - Variant/weight of the same font.
 */
const AlphaNumElement = forwardRef(function AlphaNumElement(
	{ family, variant },
	ref
) {
	const [weight, italic] = variant.split(' ');

	// Inline styling for the Component.
	const inlineStyle = {
		fontFamily: family,
		fontWeight: weight,
		fontStyle: italic ?? 'normal',
	};

	return (
		<div ref={ref} className={styles.alphaNumElement} style={inlineStyle}>
			<p className={styles.fontWeightName}>{variant}</p>
			<p className={styles.alphaNum}>
				abcdefghijklmnopqrstuvwxyz
				<br />
				ABCDEFGHIJKLMNOPQRSTUVWXYZ
				<br />
				0123456789
				<br />
				@#$%^&amp; *
				<br />
				.,:;… ¡!¿?
				<br />
				&apos; &quot;&nbsp; &lsquo; &rsquo;&nbsp; &ldquo; &rdquo;&nbsp; &sbquo;
				&bdquo;&nbsp; &prime; &Prime;&nbsp; &lt; &gt;&nbsp; &laquo; &raquo;
				<br />( ) [ ] &#123; &#125; /|\
			</p>
		</div>
	);
});

/**
 * Button displaying the variant of a font.
 * @param {Object} props
 * @param {string} props.variant - Variant/weight of the same font.
 * @param {handleVariantButtonClick} props.onClick - Function handling the click of the component.
 * @returns
 */
function VariantButton({ variant, onClick }) {
	const formattedVariant = formatVariant(variant);

	return (
		<button
			className={[inputStyles.button, inputStyles.pillButton].join(' ')}
			type='button'
			name={variant}
			title={formatVariant}
			value={variant}
			onClick={onClick}
		>
			{formattedVariant}
		</button>
	);
}

/**
 * Renders a group of AlphaNumElement with their corresponding VariantButton.
 * @param {Object} props
 * @param {string} props.family - Font Family name.
 * @param {string[]} props.variants - Array of variants of the same font.
 * @param {boolean} props.isDisabled - State of the fieldset of the component.
 * @returns
 */
function AlphaNumGroup({ family, variants, isDisabled }) {
	const refs = useVariants();

	/**
	 * @callback handleVariantButtonClick Function to handle the click of a VariantButton component. Trigger a scroll animation to the corresponding AlphaNumElement component.
	 * @param {Event} e - Event object.
	 */
	function handleClick(e) {
		const { value } = e.target;

		const ref = refs[value];

		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}

	const alphaNumElements = useMemo(
		() =>
			variants.map((variant, index) => (
				<AlphaNumElement
					ref={refs[variant]}
					key={index}
					family={family}
					variant={formatVariant(variant)}
				/>
			)),
		[family, variants]
	);

	const variantButtons = useMemo(
		() =>
			variants.map((variant, index) => (
				<VariantButton key={index} variant={variant} onClick={handleClick} />
			)),
		[variants]
	);

	return (
		<div className={styles.alphaNumGroup}>
			<div className={styles.alphaNumElementContainer}>{alphaNumElements}</div>
			<fieldset
				className={styles.variantButtonsContainer}
				disabled={isDisabled}
			>
				{variantButtons}
			</fieldset>
		</div>
	);
}
