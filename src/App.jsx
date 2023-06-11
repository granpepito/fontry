import { Header } from './components/Header';
import { Main } from './components/Main';
import { PairProvider } from './hooks/PairContext';
import './App.css';

function App() {
	return (
		<>
			<Header />
			<PairProvider>
				<Main />
			</PairProvider>
		</>
	);
}

export default App;
