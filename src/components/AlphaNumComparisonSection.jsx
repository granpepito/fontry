import { usePair } from '../hooks/PairContext';
import styles from '/src/assets/styles/comparison-panel.module.css';

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
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontFamilies}>
					Police 1 - {firstFont.family ?? 'Lotion'}
				</p>
				<div>
					<AlphaNumElement weightName='Regular' fontFamily={firstFont.family} />
					<AlphaNumElement weightName='Bold' fontFamily={firstFont.family} />
				</div>
			</div>
			<div className={styles.alphaNumFontContainer}>
				<p className={styles.fontFamilies}>
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
				@#$%^&amp; *
				<br />
				.,:;… ¡!¿?
				<br />
				'" ‘’ “” ‚„′″‹› «» ()[]&#123;&#125;/|\
			</p>
		</div>
	);
}
