import { Bars3Icon } from '@heroicons/react/24/outline';
import styles from '/src/assets/styles/header.module.css';

function openNavBar() {
	console.log('NavBar open');
}

export default function Header() {
	return (
		<>
			<header className={styles.header}>
				<button onClick={openNavBar}>
					<Bars3Icon className={styles.hamburgerIcon} />
				</button>

				<h1 className={styles.websiteName}>
					<a href='#'>Fontry</a>
				</h1>
			</header>
		</>
	);
}
