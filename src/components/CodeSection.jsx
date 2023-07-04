import { usePair } from '../hooks/PairContext';
import styles from '/src/assets/styles/comparison-panel.module.css';

export function CodeSection({ isCurrentSection }) {
	const pair = usePair();
	const firstFont = pair.font1;
	const secondFont = pair.font2;
	const active = isCurrentSection ? styles.active : '';

	return (
		<section
			className={[
				styles.comparisonPanelContent,
				styles.codeSection,
				active,
			].join(' ')}
		>
			<div>
				<h2>Code</h2>
				<div className={styles.fontFamilies}>
					<p>Police 1 - {firstFont.family ?? 'Lotion'}</p>
					<p>Police 2 - {secondFont.family ?? 'Lotion'}</p>
				</div>
			</div>
		</section>
	);
}
