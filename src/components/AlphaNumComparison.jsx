import styles from '/src/assets/styles/comparison-panel.module.css';

export function AlphaNumComparison({ firstFont, secondFont }) {
	return (
		<section className={styles.comparisonPanel}>
			<h2>Comparaison Alphanumérique</h2>
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontName1}>
					Police 1 - {firstFont.family ?? 'Lotion'}
				</p>
				<div>
					<AlphaNumElement weightName='Regular' fontFamily={firstFont.family} />
					<AlphaNumElement weightName='Bold' fontFamily={firstFont.family} />
				</div>
			</div>
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontName2}>
					Police 2 - {secondFont.family ?? 'Lotion'}
				</p>
				<div>
					<AlphaNumElement
						weightName='Regular'
						fontFamily={secondFont.family}
					/>
					<AlphaNumElement weightName='Bold' fontFamily={secondFont.family} />
				</div>
			</div>
		</section>
	);
}

function AlphaNumElement({ fontFamily, weightName }) {
	return (
		<div className={styles.alphaNumElementContainer} style={{ fontFamily }}>
			<p className={styles.fontWeightName}>{weightName}</p>
			<p className={styles.alphaNum}>
				abcdefghijklmnopqrstuvwxyz
				<br />
				ABCDEFGHIJKLMNOPQRSTUVWXYZ
				<br />
				0123456789
				<br />
				'" ‘’ “” ‚„′″‹› «» ()[]&#123;&#125;/|\
				<br />
				.,:;… ¡!¿?
				<br />
				@#$%^&amp; *
			</p>
		</div>
	);
}
