import { forwardRef, useCallback, useMemo } from 'react';
import { useVariantsRef } from '../hooks/useVariants';
import { formatVariant } from '../functions/format';

import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';

export const AlphaNumComparisonSection = forwardRef(
	function AlphaNumComparisonSection({ pair }, ref) {
		const firstFont = pair.font1;
		const secondFont = pair.font2;

		return (
			<section
				className={[styles.comparisonPanelContent, styles.alphaNumSection].join(
					' '
				)}
				id='alpha-num'
				ref={ref}
			>
				<div className={styles.comparisonPanelTitle}>
					<h2>Comparaison Alphanumérique</h2>
				</div>
				<div className={styles.alphaNumContainer}>
					<p className={styles.fontFamilies}>
						Police 1 - <span>{firstFont.family ?? 'Lotion'}</span>
					</p>
					<AlphaNumGroup
						key={firstFont.family}
						family={firstFont.family}
						variants={firstFont.variants}
					/>
				</div>
				<div className={styles.alphaNumContainer}>
					<p className={styles.fontFamilies}>
						Police 2 - <span>{secondFont.family ?? 'Lotion'}</span>
					</p>

					<AlphaNumGroup
						key={secondFont.family}
						family={secondFont.family}
						variants={secondFont.variants}
					/>
				</div>
			</section>
		);
	}
);

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
			className={[inputStyles.button, styles.pillButton].join(' ')}
			type='button'
			name={variant}
			title={formattedVariant}
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
 * @returns
 */
function AlphaNumGroup({ family, variants }) {
	const refs = useVariantsRef();

	/**
	 * @callback handleVariantButtonClick Function to handle the click of a VariantButton component. Trigger a scroll animation to the corresponding AlphaNumElement component.
	 * @param {Event} e - Event object.
	 */
	const handleClick = useCallback(
		function handleClick(e) {
			const { value } = e.target;

			const ref = refs[value];

			ref.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		},
		[refs]
	);

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
		[family, refs, variants]
	);

	const variantButtons = useMemo(
		() =>
			variants.map((variant, index) => (
				<VariantButton key={index} variant={variant} onClick={handleClick} />
			)),
		[handleClick, variants]
	);

	return (
		<div className={styles.alphaNumGroup}>
			<div className={styles.alphaNumElementContainer}>{alphaNumElements}</div>
			<fieldset className={styles.variantButtonsContainer}>
				{variantButtons}
			</fieldset>
		</div>
	);
}
