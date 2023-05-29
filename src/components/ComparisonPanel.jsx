export function ComparisonPanel({ currentSection }) {
	switch (currentSection) {
		case 'alphanum': {
			return <AlphaComparison />;
		}
		default:
		case 'textual': {
			return <TextualExampleComparison />;
		}
	}
}

function AlphaComparison() {
	return (
		<section>
			<h2>Comparaison Alphanumérique</h2>
		</section>
	);
}

function TextualExampleComparison() {
	return (
		<section>
			<h2>Comparaison Textuelle</h2>
		</section>
	);
}
