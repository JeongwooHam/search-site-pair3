import { createContext, useContext, useState } from "react";

const WordList = createContext();

export const useWordList = () => useContext(WordList);

const WordListProvider = ({ children }) => {
	const [targetWords, setTargetWords] = useState([]);
	return (
		<WordList.Provider value={{ targetWords, setTargetWords }}>
			{children}
		</WordList.Provider>
	);
};

export default WordListProvider;
