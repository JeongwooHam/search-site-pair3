import { createContext, useContext, useState, useEffect } from "react";

const WordList = createContext();

export const useWordList = () => useContext(WordList);

const WordListProvider = ({ children }) => {
	const [targetWords, setTargetWords] = useState(() => {
		// 초기 상태를 로컬 스토리지에서 불러오기
		const savedWords = localStorage.getItem("targetWords");
		return savedWords ? JSON.parse(savedWords) : [];
	});

	// targetWords가 바뀔 때마다 로컬 스토리지를 업데이트하기
	useEffect(() => {
		localStorage.setItem("targetWords", JSON.stringify(targetWords));
	}, [targetWords]);

	return (
		<WordList.Provider value={{ targetWords, setTargetWords }}>
			{children}
		</WordList.Provider>
	);
};

export default WordListProvider;
