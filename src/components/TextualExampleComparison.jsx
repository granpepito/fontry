import styles from '/src/assets/styles/comparison-panel.module.css';

export function TextualExampleComparison() {
	return (
		<section className={styles.comparisonPanel}>
			<h2>Comparaison Textuelle</h2>
			<div className={styles.fontFamilies}>
				<p>Police 1 - </p>
				<p>Police 2 - </p>
			</div>
			<div className={styles.textualElementsContainer}></div>
		</section>
	);
}
