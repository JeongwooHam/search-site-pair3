import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWordList } from "context/targetwords";
import debounce from "lodash.debounce";

const SearchBar = () => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	// 검색어 창 닫힘 버튼
	const handleCloseHistory = () => {
		setIsHistoryOpen(false);
	};

	// change 이벤트 함수
	const [inputData, setInputData] = useState("");
	const handleInputData = e => {
		setText(e.target.value);
		setInputData(e.target.value);
	};

	// submit 이벤트 함수
	const { targetWords, setTargetWords } = useWordList();
	const handleTargetWords = e => {
		e.preventDefault();
		// 검색 값 있을 때만
		if (inputData) {
			const newTargetWords = [...targetWords];
			newTargetWords.unshift(inputData);
			// 최근 검색어 배열 관리
			if (newTargetWords.length >= 5) {
				setTargetWords(newTargetWords.slice(0, 5));
			} else {
				setTargetWords(newTargetWords);
			}
		}
		setInputData("");
		setText("");
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

	// DbBounce 기능 구현
	const [searchText, setSearchText] = useState("");
	let timer;

	const handleInputChange = debounce(e => {
		if (timer) {
			clearTimeout(timer);
		}
		setSearchText(e.target.value); // 검색 텍스트 업데이트
		timer = setTimeout(() => {
			console.log("여기에 ajax 요청", e.target.value);
		});
	}, 200);

	return (
		<>
			<S.Container>
				<form name="value">
					<input
						placeholder="SEARCH..."
						onClick={() => setIsHistoryOpen(true)}
						onChange={(handleInputChange, handleInputData)}
						value={text}
					/>
					<IoIosCloseCircle
						className="close-icon"
						onClick={handleCloseHistory}
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

const S = {
	Container,
	SearchHistory,
	EachWord,
};
