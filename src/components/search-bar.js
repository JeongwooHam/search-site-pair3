import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWordList } from "context/targetwords";
import { getSearchedData } from "apis/search";

const SearchBar = () => {
	const [isContainerOpen, setIsContainerOpen] = useState(false);

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
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("axios 요청", inputData);
			if (inputData) {
				// 입력 값이 있다면
				// 검색 결과를 불러오기
				fetchSearchResults(inputData);
				// 검색 결과를 보여주기.
				setShowSearchResults(true);
				// 최근 검색 기록을 숨기기
				// setIsHistoryOpen(false);
			} else {
				// 검색 결과를 숨김
				setShowSearchResults(false);
				// 최근 검색 기록을 보여줌
				// setIsHistoryOpen(true);
			}
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
			let newTargetWords = [...targetWords];
			// 입력받은 값이 예전에 검색된 적이 있다면 중복하여 추가하지 않고 맨 앞으로 이동시키기
			if (newTargetWords.includes(inputData)) {
				newTargetWords = newTargetWords.filter(word => word !== inputData);
			}
			newTargetWords.unshift(inputData);
			if (newTargetWords.length >= 5) {
				setTargetWords(newTargetWords.slice(0, 5));
			} else {
				setTargetWords(newTargetWords);
			}
			setInputData("");
		}
		// 검색 완료 후에는 검색 결과를 숨기고 최근 검색 기록을 보여줌
		setShowSearchResults(false);
		// setIsHistoryOpen(true);
	};

	// 검색 기록 배열 확인용
	useEffect(() => {
		console.log(targetWords);
	}, [targetWords]);

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

	// 완전히 일치하는 단어가 있으면 보여주기
	const perfectMatch = searchedData.find(word => word === inputData);

	const handleMouseOver = index => {
		setSelectedItem(index);
	};

	const [selectedItem, setSelectedItem] = useState(0);
	const handleKey = e => {
		if (e.key === "ArrowUp") {
			if (selectedItem > 0) {
				setSelectedItem(selectedItem - 1);
				setInputData(searchedData[selectedItem - 1]);
			}
		} else if (e.key === "ArrowDown") {
			if (selectedItem < searchedData.length - 1) {
				setSelectedItem(selectedItem + 1);
				setInputData(searchedData[selectedItem + 1]);
			}
		}
	};

	const handleItemClick = data => {
		handleTargetWords({
			preventDefault: () => {},
			target: { value: data },
		});
	};

	if (showSearchResults) {
		return (
			<>
				<S.Container>
					<form name="value">
						<input
							placeholder="SEARCH..."
							onClick={() => setIsContainerOpen(true)}
							onChange={handleInputChange}
							value={inputData}
						/>
						<IoIosCloseCircle
							className="close-icon"
							onClick={() => setIsContainerOpen(false)}
						/>
						<button onClick={handleTargetWords}>
							<BsFillSearchHeartFill className="search-icon" />
						</button>
					</form>
				</S.Container>
				{isContainerOpen && (
					<S.SearchResults>
						{perfectMatch && (
							<S.OneSearched>
								<span className="highlight">{perfectMatch}</span>
							</S.OneSearched>
						)}
						<div>
							<span>추천 검색어</span>
						</div>
						<hr />
						{searchedData &&
							searchedData.map((data, index) => (
								<S.OneSearched
									key={index}
									selected={index === selectedItem}
									onMouseOver={() => handleMouseOver(index)}
									onClick={() => handleItemClick(data)}
								>
									<span
										dangerouslySetInnerHTML={{
											__html: highlightMatchedText(data, inputData),
										}}
									/>
								</S.OneSearched>
							))}
					</S.SearchResults>
				)}
			</>
		);
	} else {
		return (
			<>
				<S.Container>
					<form name="value">
						<input
							placeholder="SEARCH..."
							onClick={() => setIsContainerOpen(true)}
							onChange={handleInputChange}
							value={inputData}
						/>
						<IoIosCloseCircle
							className="close-icon"
							onClick={() => setIsContainerOpen(false)}
						/>
						<button onClick={handleTargetWords}>
							<BsFillSearchHeartFill className="search-icon" />
						</button>
					</form>
				</S.Container>

				{isContainerOpen && (
					<S.SearchHistory>
						<div>
							<span>최근 검색어</span>
							<span className="deleteAll" onClick={handleDeleteEveryWord}>
								전체 삭제
							</span>
						</div>
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
			&:hover {
				color: #a252c8;
				font-weight: bold;
			}
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
	padding: 10px;
	width: 600px;
	display: flex;
	justify-content: space-between;
	background-color: ${props => (props.selected ? "#FFD873F1" : "white")};
	span.highlight {
		background-color: #ecdbf4;
	}
`;

const S = {
	Container,
	SearchHistory,
	EachWord,
	SearchResults,
	OneSearched,
};
