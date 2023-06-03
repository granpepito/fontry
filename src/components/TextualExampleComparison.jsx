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

function TextualElement({ font, type }) {
	const typesettingFontNumber = (fontNumber) => (
		<p className={styles.typesettingFontNumber}>{fontNumber}</p>
	);
	switch (type) {
		case 'title': {
			return (
				<div className={[styles.textualElement, styles.titleElement].join(' ')}>
					{typesettingFontNumber('Police 1')}
					<h1 contentEditable='true'>
						<span>TITRE</span>&nbsp; Article
					</h1>
				</div>
			);
		}
		case 'subtitle': {
			return (
				<div
					className={[styles.textualElement, styles.subTitleElement].join(' ')}
				>
					{typesettingFontNumber('Police 1')}
					<h3 contentEditable='true'>
						<span contentEditable='false'>SOUS-TITRE</span>&nbsp; Article
					</h3>
				</div>
			);
		}
		case 'paragraph': {
			return (
				<div
					className={[styles.textualElement, styles.paragraphElement].join(' ')}
				>
					{typesettingFontNumber('Police 2')}
					<p>PARAGRAPHE</p>
					<p contentEditable='true'></p>
				</div>
			);
		}
		case 'actions': {
			return (
				<div
					className={[styles.textualElement, styles.actionsElement].join(' ')}
				>
					{typesettingFontNumber('Police 2')}

					<p>
						<button></button>
						<span>
							<a></a>
						</span>
						<span>
							<a></a>
						</span>
					</p>
				</div>
			);
		}
		default: {
			return null;
		}
	}
}
