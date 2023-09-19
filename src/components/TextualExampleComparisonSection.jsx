import { usePair } from '../hooks/PairContext';
import { useIsLargeScreen } from '../hooks/useIsLargeScreen';
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
				<h2>Visualisation Textuelle</h2>
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
	const isLargeScreen = useIsLargeScreen(980);
	let fontsPanelPosition = isLargeScreen ? 'À gauche' : 'En haut';

	switch (type) {
		case 'title': {
			return (
				<div className={[styles.textualElement, styles.titleElement].join(' ')}>
					<TypesettingFontNumber fontNumber={'Police 1'} />
					<div className={styles.example} style={{ fontFamily }}>
						<h2>{/*<span>TITRE</span>  */}Fontsy - Combinaisons de Polices</h2>
					</div>
				</div>
			);
		}
		case 'lead': {
			return (
				<div className={[styles.textualElement, styles.leadElement].join(' ')}>
					<TypesettingFontNumber fontNumber={'Police 1'} />
					<div className={styles.example} style={{ fontFamily }}>
						<h3>
							{/* <span>SOUS-TITRE</span>*/} Observez les combinaisons entre
							différentes polices
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
					<TypesettingFontNumber fontNumber={'Police 2'} />
					<div className={styles.example} style={{ fontFamily }}>
						<p>
							Ce site vous permet de visualiser l&apos;utilisation de deux
							polices et de comparer celles qui vous intéressent.
						</p>
						<p>
							{fontsPanelPosition}, vous pourrez sélectionner les polices
							désirées. Elles sont triées dans l&apos;ordre alphabétique et
							groupées par catégorie. Choisissez la première police puis la
							deuxième et ensuite vous pourrez les contempler !
						</p>
						<p>
							Dans la section actuelle vous pouvez lire cet exemple pour voir si
							vous aimez la manière dont les deux polices vont ensembles, ou
							voir les différentes variantes des polices sélectionnées. Vous
							trouverez ensuite les éléments pour les utiliser sur le web.
						</p>
						<p>
							La sauvegarde des combinaisons de polices est possible! Cliquez
							sur le bouton en bas à droite, et vous retrouverez ces
							combinaisons dans la barre de navigation.
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
					<TypesettingFontNumber fontNumber={'Police 2'} />

					<div className={styles.example} style={{ fontFamily }}>
						<button
							className={[inputStyles.button, styles.button].join(' ')}
							style={{ fontFamily }}
							type='button'
							disabled={isDisabled}
						>
							Un Bouton Inutile
						</button>
						<span>
							<a href='javascript:void(0)'>
								<ArrowLongRightIcon
									className={[iconStyles.smallIcon, styles.icon].join(' ')}
								/>
								Un lien inutile
							</a>
						</span>
						<span>
							<a href='javascript:void(0)'>
								<ArrowLongRightIcon
									className={[iconStyles.smallIcon, styles.icon].join(' ')}
								/>
								Un deuxième lien inutile
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

function TypesettingFontNumber({ fontNumber }) {
	return <p className={styles.typesettingFontNumber}>{fontNumber}</p>;
}
