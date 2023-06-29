import GlobalStyles from "style/global";
import "./App.css";
import MainPage from "pages";
import WordListProvider from "context/targetwords";

function App() {
	return (
		<>
			<WordListProvider>
				<GlobalStyles />
				<MainPage />
			</WordListProvider>
		</>
	);
}

export default App;
