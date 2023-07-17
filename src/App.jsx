import { Header } from './components/Header';
import { Main } from './components/Main';
import { PairProvider } from './hooks/PairContext';
import './App.css';

function App() {
	return (
		<>
			<PairProvider>
				<Header />
				<Main />
			</PairProvider>
		</>
	);
}

export default App;
