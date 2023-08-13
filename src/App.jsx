import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { PairProvider } from './hooks/PairContext';

function App() {
	return (
		<>
			<PairProvider>
				<Header />
				<Main />
				<Footer />
			</PairProvider>
		</>
	);
}

export default App;
