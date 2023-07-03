import { createContext, useContext, useEffect, useReducer } from "react";

const WordList = createContext();

export const useWordList = () => useContext(WordList);

const reducer = (status, action) => {
	switch (action.type) {
		case "ADD_WORD":
			let NewAddList = [...status];
			// 입력받은 값이 예전에 검색된 적이 있다면 중복하여 추가하지 않고 맨 앞으로 이동시키기
			if (NewAddList.includes(action.payload)) {
				NewAddList = NewAddList.filter(word => word !== action.payload);
			}
			NewAddList.unshift(action.payload);
			if (NewAddList.length >= 5) {
				return NewAddList.slice(0, 5);
			} else {
				return NewAddList;
			}
		case "DELETE_WORD":
			const newTargetWords = [...status].filter(
				word => word !== action.payload,
			);
			return newTargetWords;
		case "CLEAR_LIST":
			return [];
		default:
			return status;
	}
};

const WordListProvider = ({ children }) => {
	const [targetWords, dispatch] = useReducer(reducer, [], () => {
		// 초기 상태를 로컬 스토리지에서 불러오기
		const savedWords = localStorage.getItem("targetWords");
		return savedWords ? JSON.parse(savedWords) : [];
	});

	// targetWords가 바뀔 때마다 로컬 스토리지를 업데이트하기
	useEffect(() => {
		localStorage.setItem("targetWords", JSON.stringify(targetWords));
	}, [targetWords]);

	return (
		<WordList.Provider value={{ targetWords, dispatch }}>
			{children}
		</WordList.Provider>
	);
};

export default WordListProvider;
