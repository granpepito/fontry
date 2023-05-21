import hamburgerBars from '/src/assets/img/hamburger-bars.svg';
import styles from '/src/assets/styles/header.module.css';

function openNavBar() {
	console.log('NavBar open');
}

export default function Header() {
	return (
		<>
			<header className={styles.header}>
				<button onClick={openNavBar}>
					<img
						className={styles.hamburgerIcon}
						alt='Menu Button'
						src={hamburgerBars}
					/>
				</button>

				<h1 className={styles.websiteName}>
					<a href='#'>Fontry</a>
				</h1>
			</header>
		</>
	);
}
