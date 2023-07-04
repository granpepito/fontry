import { Header } from './components/Header';
import { Main } from './components/Main';
import { PairProvider } from './hooks/PairContext';
import './App.css';
import { PairStoreProvider } from './hooks/PairStoreContext';

function App() {
	return (
		<>
			<PairStoreProvider>
				<PairProvider>
					<Header />
					<Main />
				</PairProvider>
			</PairStoreProvider>
		</>
	);
}

export default App;
