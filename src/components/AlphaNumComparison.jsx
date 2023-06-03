import styles from '/src/assets/styles/comparison-panel.module.css';

export function AlphaNumComparison() {
	return (
		<section className={styles.comparisonPanel}>
			<h2>Comparaison Alphanumérique</h2>
		</section>
	);
}

function AlphaNumElement({ weight, style }) {
	return (
		<div>
			<p className={styles.fontWeightName}></p>
			<p className={styles.alphaNumBlock}>
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
