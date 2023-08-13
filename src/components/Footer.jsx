import { CodeBracketIcon } from '@heroicons/react/24/outline';

import styles from '/src/assets/styles/footer.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				<CodeBracketIcon
					className={[iconStyles.smallIcon, styles.bracket].join(' ')}
				/>
			</p>
			<p className={styles.dotDev}>
				<a href='https://alexgm.dev'>alexgm.dev</a>
			</p>
			<p>
				<a href='https://www.github.com/granpepito/fontry'>GitHub</a>
			</p>
		</footer>
	);
}
