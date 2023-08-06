import { usePair } from '../hooks/PairContext';
import styles from '/src/assets/styles/comparison-panel.module.css';
import inputStyles from '/src/assets/styles/input.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

export function TextualExampleComparisonSection({ isCurrentSection }) {
	const pair = usePair();
	const firstFont = pair.font1;
	const secondFont = pair.font2;
	const active = isCurrentSection ? styles.active : '';

	return (
		<section
			className={[
				styles.comparisonPanelContent,
				styles.textualSection,
				active,
			].join(' ')}
		>
			<div className={styles.comparisonPanelTitle}>
				<h2>Comparaison Textuelle</h2>
				<div className={styles.fontFamilies}>
					<p>
						Police 1 - <span>{firstFont.family ?? 'Lotion'}</span>
					</p>
					<p>
						Police 2 - <span>{secondFont.family ?? 'Lotion'}</span>
					</p>
				</div>
			</div>
			<div className={styles.textualElementsContainer}>
				<TextualElement type='title' fontFamily={firstFont.family} />
				<TextualElement type='lead' fontFamily={firstFont.family} />
				<TextualElement type='paragraph' fontFamily={secondFont.family} />
				<TextualElement
					type='actions'
					fontFamily={secondFont.family}
					isDisabled={!isCurrentSection}
				/>
			</div>
		</section>
	);
}

function TextualElement({ fontFamily, type, isDisabled = false }) {
	const typesettingFontNumber = (fontNumber) => (
		<p className={styles.typesettingFontNumber}>{fontNumber}</p>
	);
	switch (type) {
		case 'title': {
			return (
				<div className={[styles.textualElement, styles.titleElement].join(' ')}>
					{typesettingFontNumber('Police 1')}
					<div className={styles.example} style={{ fontFamily }}>
						<h1>
							<span>TITRE</span> Article
						</h1>
					</div>
				</div>
			);
		}
		case 'lead': {
			return (
				<div className={[styles.textualElement, styles.leadElement].join(' ')}>
					{typesettingFontNumber('Police 1')}
					<div className={styles.example} style={{ fontFamily }}>
						<h3>
							<span>SOUS-TITRE</span> Article
						</h3>
					</div>
				</div>
			);
		}
		case 'paragraph': {
			return (
				<div
					className={[styles.textualElement, styles.paragraphElement].join(' ')}
				>
					{typesettingFontNumber('Police 2')}
					<div className={styles.example} style={{ fontFamily }}>
						<p>PARAGRAPHE</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
							metus aliquam eleifend mi in nulla posuere sollicitudin. Commodo
							viverra maecenas accumsan lacus vel facilisis. Natoque penatibus
							et magnis dis parturient montes nascetur ridiculus. Neque laoreet
							suspendisse interdum consectetur libero id.
						</p>
					</div>
				</div>
			);
		}
		case 'actions': {
			return (
				<div
					className={[styles.textualElement, styles.actionsElement].join(' ')}
				>
					{typesettingFontNumber('Police 2')}

					<div className={styles.example} style={{ fontFamily }}>
						<button
							className={[inputStyles.button, styles.button].join(' ')}
							style={{ fontFamily }}
							disabled={isDisabled}
						>
							Call to Action
						</button>
						<span>
							<a>
								<ArrowLongRightIcon
									className={[iconStyles.smallIcon, styles.icon].join(' ')}
								/>
								URL 1
							</a>
						</span>
						<span>
							<a>
								<ArrowLongRightIcon
									className={[iconStyles.smallIcon, styles.icon].join(' ')}
								/>
								URL 2
							</a>
						</span>
					</div>
				</div>
			);
		}
		default: {
			return null;
		}
	}
}
