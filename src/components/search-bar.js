import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { useWordList } from "context/targetwords";
import useDebounce from "hooks/useDebounce";
import { getSearchedData } from "apis/search";
import RecentlySearchedWordList from "./recentlySearched";
import SearchResultList from "./searchResults";
import { useInputData } from "context/inputData";

const SearchBar = () => {
	const [isContainerOpen, setIsContainerOpen] = useState(false);

	// 검색 결과
	const [searchedData, setSearchedData] = useState([]);

	// 검색 결과가 보이는지 여부
	const [showSearchResults, setShowSearchResults] = useState(false);

	// change 이벤트 함수
	const { inputData, setInputData } = useInputData("");

	const handleInputChange = async e => {
		// input 창에 값을 입력할 경우 키보드 이벤트를 통한 자동완성 끄는 조건문
		if (isRecommend) {
			// Backspace 누른 경우 input 값에 빈 문자열이 들어가고, 아닌 경우 input 창에 있는 값이 들어가도록 함
			const enteredValue =
				e.nativeEvent.inputType === "deleteContentBackward"
					? ""
					: e.nativeEvent.data;
			// 키보드로 선택된 부분의 인덱스가 0 이상일 때에만 > 입력 값은 자동완성을 통한 추천 단어 + 키보드로 입력 시작한 값
			selectedItem >= 0 && setInputData(recommendedWord + enteredValue);
			// 자동완성 기능 끔
			setIsrecommend(false);
			// 키보드 이벤트 인덱스를 초기화
			setSelectedItem(0);
			return;
		}
		// 자동완성 상태가 아닐 때 onChange 함수
		setInputData(e.target.value);
		setSelectedItem(0);
	};

	const fetchSearchResults = async () => {
		console.log("axios 요청", inputData);
		if (inputData) {
			const data = await getSearchedData(inputData);
			console.log(data);
			setSearchedData(data);
			// 검색 결과를 보여주기.
			setShowSearchResults(true);
		} else {
			// 검색 결과를 숨김
			setShowSearchResults(false);
		}
	};

	// 함수와 delay 시간, 의존성 배열 값을 넘기도록 로직 분리
	useDebounce(
		() => {
			fetchSearchResults();
		},
		200,
		inputData,
	);

	// submit 이벤트 함수
	const { dispatch } = useWordList();
	const handleTargetWords = e => {
		e.preventDefault();
		if (inputData) {
			dispatch({ type: "ADD_WORD", payload: inputData });
			setInputData("");
		}
		// 검색 완료 후에는 검색 결과를 숨기고 최근 검색 기록을 보여줌
		setShowSearchResults(false);
		// setIsHistoryOpen(true);
	};

	// 추천 검색어 스크롤 시 자동 완성 모드 상태
	const [isRecommend, setIsrecommend] = useState(false);
	// 키보드로 선택된 값
	const [selectedItem, setSelectedItem] = useState(0);
	// 자동완성 단어
	const [recommendedWord, setRecommendedWord] = useState("");

	const keyboardFunction = (bool, index) => {
		setIsrecommend(bool);
		setSelectedItem(index);
		setRecommendedWord(searchedData[index]);
	};
	const handleKey = e => {
		if (e.key === "ArrowUp") {
			if (selectedItem > 0) {
				keyboardFunction(true, selectedItem - 1);
			}
		} else if (e.key === "ArrowDown") {
			if (selectedItem < searchedData.length - 1) {
				keyboardFunction(true, selectedItem + 1);
			}
		} else if (e.key === "Enter") {
			if (searchedData[selectedItem]) {
				setInputData(searchedData[selectedItem]);

				setIsrecommend(false);
				setRecommendedWord("");
			}
		}
	};

	return (
		<>
			<S.Container>
				<form name="value" onSubmit={e => e.preventDefault()}>
					<input
						placeholder="SEARCH..."
						onClick={() => setIsContainerOpen(true)}
						onChange={handleInputChange}
						value={isRecommend ? recommendedWord : inputData}
						onKeyDown={handleKey}
					/>
					<IoIosCloseCircle
						className="close-icon"
						onClick={() => {
							setIsContainerOpen(false);
							setInputData("");
						}}
					/>
					<button onClick={handleTargetWords}>
						<BsFillSearchHeartFill className="search-icon" />
					</button>
				</form>
			</S.Container>
			{isContainerOpen &&
				(showSearchResults ? (
					<SearchResultList
						selectedItem={selectedItem}
						searchedData={searchedData}
						setSelectedItem={setSelectedItem}
						setShowSearchResults={setShowSearchResults}
					/>
				) : (
					<RecentlySearchedWordList />
				))}
		</>
	);
};

export default SearchBar;

const Container = styled.div`
	border: 1px solid black;
	width: 650px;
	height: 60px;
	margin: 40px auto;
	display: flex;
	form {
		width: 650px;
		display: flex;
		justify-content: space-between;
		background-color: white;
		input {
			display: inline-block;
			border: none;
			outline: none;
			width: 550px;
			font-size: 20px;
			padding-left: 20px;
			font-family: "Rajdhani", sans-serif;
			font-weight: 100;
			letter-spacing: 5px;
		}
		.close-icon {
			width: 30px;
			height: 30px;
			margin-top: 15px;
			color: lightgray;
		}
	}

	button {
		background-color: white;
		border: none;
		width: 60px;
		.search-icon {
			width: 30px;
			height: 30px;
			color: #a252c8;
			:hover {
				opacity: 1;
				-webkit-animation: flash 1.5s;
				animation: flash 1.5s;
			}
			@-webkit-keyframes flash {
				0% {
					opacity: 0.4;
				}
				100% {
					opacity: 1;
				}
			}
			@keyframes flash {
				0% {
					opacity: 0.4;
				}
				100% {
					opacity: 1;
				}
			}
		}
	}
`;

const S = {
	Container,
};
