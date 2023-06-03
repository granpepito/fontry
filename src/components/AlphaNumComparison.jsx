import styles from '/src/assets/styles/comparison-panel.module.css';

export function AlphaNumComparison() {
	return (
		<section className={styles.comparisonPanel}>
			<h2>Comparaison Alphanumérique</h2>
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontName1}>Police 1 -</p>
			</div>
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontName2}>Police 2 -</p>
			</div>
		</section>
	);
}

function AlphaNumElement({ font, weightName }) {
	return (
		<div className={styles.alphaNumElementContainer}>
			<p className={styles.fontWeightName}>{weightName}</p>
			<p className={styles.alphaNum}>
				ABCDEFGHIJKLMNOPQRSTUVWXYZ
				<br />
				abcdefghijklmnopqrstuvwxyz
				<br />
				0123456789
				<br />
				!@#$%^&amp;*()
			</p>
		</div>
	);
}
