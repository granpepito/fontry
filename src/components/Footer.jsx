import { CodeBracketIcon } from '@heroicons/react/24/outline';

import styles from '/src/assets/styles/footer.module.css';
import iconStyles from '/src/assets/styles/icon.module.css';

import githubIcon from '/src/assets/img/github.svg';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				<CodeBracketIcon
					className={[iconStyles.smallIcon, styles.pencil].join(' ')}
				/>
			</p>
			<p className={styles.dotDev}>
				<a href='https://alexgm.dev'>alexgm.dev</a>
			</p>
			<ul>
				<li>
					<a href='https://www.github.com/granpepito/fontry'>
						<img
							className={[iconStyles.icon, styles.githubIcon].join(' ')}
							src={githubIcon}
							alt='GitHub Logo'
						/>
					</a>
				</li>
				<li>
					<a href='https://www.github.com/granpepito'>granpepito</a>
				</li>
			</ul>
		</footer>
	);
}
