import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyle from '/src/assets/styles/input.module.css';

export function TextualExampleComparison({ firstFont, secondFont }) {
	return (
		<section className={styles.comparisonPanel}>
			<h2>Comparaison Textuelle</h2>
			<div className={styles.fontFamilies}>
				<p>Police 1 - {firstFont.family ?? 'Lotion'}</p>
				<p>Police 2 - {secondFont.family ?? 'Lotion'}</p>
			</div>
			<div className={styles.textualElementsContainer}>
				<TextualElement type='title' fontFamily={firstFont.family} />
				<TextualElement type='lead' fontFamily={firstFont.family} />
				<TextualElement type='paragraph' fontFamily={secondFont.family} />
				<TextualElement type='actions' fontFamily={secondFont.family} />
			</div>
		</section>
	);
}

function TextualElement({ fontFamily, type }) {
	const typesettingFontNumber = (fontNumber) => (
		<p className={styles.typesettingFontNumber}>{fontNumber}</p>
	);
	switch (type) {
		case 'title': {
			return (
				<div className={[styles.textualElement, styles.titleElement].join(' ')}>
					{typesettingFontNumber('Police 1')}
					<h1 style={{ fontFamily }}>
						<span>TITRE</span>&nbsp; Article
					</h1>
				</div>
			);
		}
		case 'lead': {
			return (
				<div className={[styles.textualElement, styles.leadElement].join(' ')}>
					{typesettingFontNumber('Police 1')}
					<h3 style={{ fontFamily }}>
						<span>SOUS-TITRE</span>&nbsp; Article
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
					<p style={{ fontFamily }}>PARAGRAPHE</p>
					<p style={{ fontFamily }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
						metus aliquam eleifend mi in nulla posuere sollicitudin. Commodo
						viverra maecenas accumsan lacus vel facilisis. Natoque penatibus et
						magnis dis parturient montes nascetur ridiculus. Neque laoreet
						suspendisse interdum consectetur libero id.
					</p>
				</div>
			);
		}
		case 'actions': {
			return (
				<div
					className={[styles.textualElement, styles.actionsElement].join(' ')}
				>
					{typesettingFontNumber('Police 2')}

					<p style={{ fontFamily }}>
						<button className={inputStyle.button} style={{ fontFamily }}>
							Bouton
						</button>
						<span>
							<a href='#'>URL 1</a>
						</span>
						<span>
							<a href='#'>URL 2</a>
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
