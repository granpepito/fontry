import { ComparisonPanel } from './ComparisonPanel';
import { FontsPanel } from './FontsPanel';

import styles from '/src/assets/styles/main.module.css';

/**
 * Renders the main HTML tag and its content.
 */
export function Main() {
	return (
		<main id={styles.mainContent}>
			<article className={styles.pairContainer}>
				<div className={styles.panelsContainer}>
					<FontsPanel />
					<ComparisonPanel />
				</div>
			</article>
		</main>
	);
}
