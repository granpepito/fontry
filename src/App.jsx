import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { PairProvider } from './hooks/PairContext';
import { SWRConfig } from 'swr';
import { fetcher } from './utils/fetcher';

function App() {
	return (
		<>
			<PairProvider>
				<SWRConfig
					value={{
						fetcher,
					}}
				>
					<Header />
					<Main />
					<Footer />
				</SWRConfig>
			</PairProvider>
		</>
	);
}

export default App;
