import GlobalStyles from "style/global";
import "./App.css";
import MainPage from "pages";
import WordListProvider from "context/targetwords";
import InputDataProvider from "context/inputData";

function App() {
	return (
		<>
			<InputDataProvider>
				<WordListProvider>
					<GlobalStyles />
					<MainPage />
				</WordListProvider>
			</InputDataProvider>
		</>
	);
}

export default App;
