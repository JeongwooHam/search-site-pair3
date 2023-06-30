import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWordList } from "context/targetwords";
import { getSearchedData } from "apis/search";

const SearchBar = () => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	// 검색어 창 닫힘 버튼
	const handleCloseHistory = () => {
		setIsHistoryOpen(false);
	};

	//검색결과 불러오는 함수

	const [searchedData, setSearchedData] = useState([]);
	const fetchSearchResults = async query => {
		const data = await getSearchedData(query);
		setSearchedData(data);
		console.log(data);
	};

	// change 이벤트 함수
	const [inputData, setInputData] = useState("");

	const handleInputChange = async e => {
		setInputData(e.target.value);
		if (e.target.value) {
			// 입력 값이 있다면
			// 검색 결과를 불러오기
			await fetchSearchResults(e.target.value);
			// 검색 결과를 보여주기.
			setShowSearchResults(true);
			// 최근 검색 기록을 숨기기
			setIsHistoryOpen(false);
		} else {
			// 검색 결과를 숨김
			setShowSearchResults(false);
			// 최근 검색 기록을 보여줌
			setIsHistoryOpen(true);
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("axios 요청", inputData);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [inputData]);

	// submit 이벤트 함수
	const { targetWords, setTargetWords } = useWordList();
	const [showSearchResults, setShowSearchResults] = useState(false); //검색결과 상태
	const handleTargetWords = async e => {
		e.preventDefault();
		if (inputData) {
			const newTargetWords = [...targetWords];
			newTargetWords.unshift(inputData);
			if (newTargetWords.length >= 5) {
				setTargetWords(newTargetWords.slice(0, 5));
			} else {
				setTargetWords(newTargetWords);
			}
			setInputData("");
			setText("");
		}
		// 검색 완료 후에는 검색 결과를 숨기고 최근 검색 기록을 보여줌
		setShowSearchResults(false);
		setIsHistoryOpen(true);
	};

	// 검색 기록 배열 확인용
	useEffect(() => {
		console.log(targetWords);
	}, [targetWords]);

	// input 창에 보이는 글자 설정
	const [text, setText] = useState("");

	// 최근 검색어 개별 삭제
	const handleDeleteEachWord = target => {
		const newTargetWords = [...targetWords].filter(word => word !== target);
		setTargetWords(newTargetWords);
	};

	// 최근 검색어 전체 삭제
	const handleDeleteEveryWord = () => {
		setTargetWords([]);
	};

	// 텍스트 하이라이트
	const highlightMatchedText = (text, keyword) => {
		const regex = new RegExp(`(${keyword})`, "gi");
		return text.replace(regex, "<span class='highlight'>$1</span>");
	};

	if (showSearchResults) {
		return (
			<>
				<S.Container>
					<form name="value">
						<input
							placeholder="SEARCH..."
							onClick={() => setIsHistoryOpen(true)}
							onChange={handleInputChange}
							value={inputData}
						/>
						<IoIosCloseCircle
							className="close-icon"
							onClick={() => setIsHistoryOpen(false)}
						/>
						<button onClick={handleTargetWords}>
							<BsFillSearchHeartFill className="search-icon" />
						</button>
					</form>
				</S.Container>
				<S.SearchResults>
					{searchedData &&
						searchedData.map((data, index) => (
							<OneSearched key={index}>
								<span
									dangerouslySetInnerHTML={{
										__html: highlightMatchedText(data, inputData),
									}}
								/>
							</OneSearched>
						))}
				</S.SearchResults>
			</>
		);
	} else {
		return (
			<>
				<S.Container>
					<form name="value">
						<input
							placeholder="SEARCH..."
							onClick={() => setIsHistoryOpen(true)}
							onChange={handleInputChange}
							value={inputData}
						/>
						<IoIosCloseCircle
							className="close-icon"
							onClick={() => setIsHistoryOpen(false)}
						/>
						<button onClick={handleTargetWords}>
							<BsFillSearchHeartFill className="search-icon" />
						</button>
					</form>
				</S.Container>
				{isHistoryOpen && (
					<S.SearchHistory>
						<div>
							<span>최근 검색어</span>
							<span className="deleteAll" onClick={handleDeleteEveryWord}>
								전체 삭제
							</span>
						</div>{" "}
						<hr />
						<ul>
							{targetWords.map((word, i) => (
								<S.EachWord key={i}>
									{word}
									<AiOutlineCloseCircle
										className="delete-icon"
										onClick={() => handleDeleteEachWord(word)}
									/>
								</S.EachWord>
							))}
						</ul>
					</S.SearchHistory>
				)}
			</>
		);
	}
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
		}
	}
`;

const SearchHistory = styled.div`
	width: 645px;
	height: 300px;
	background-color: white;
	margin: -40px auto;
	padding: 20px;
	font-weight: 100;
	div {
		display: flex;
		justify-content: space-between;
		.deleteAll {
			font-size: 14px;
			color: gray;
		}
	}
`;

const EachWord = styled.li`
	font-size: 24px;
	font-weight: 100;
	margin: 20px 0;
	width: 600px;
	display: flex;
	justify-content: space-between;
	.delete-icon {
		width: 15px;
		height: 15px;
		margin-top: 5px;
		color: #a252c8;
	}
`;

const SearchResults = styled.div`
	width: 645px;
	background-color: white;
	margin: -40px auto;
	padding: 20px;
	font-weight: 100;
	div {
		display: flex;
		justify-content: space-between;
		.deleteAll {
			font-size: 14px;
			color: gray;
		}
	}
`;

const OneSearched = styled.div`
	font-size: 24px;
	font-weight: 100;
	margin: 20px 0;
	width: 600px;
	display: flex;
	justify-content: space-between;
	span.highlight {
		background-color: #ecdbf4;
	}
`;

const S = {
	Container,
	SearchHistory,
	EachWord,
	SearchResults,
};
