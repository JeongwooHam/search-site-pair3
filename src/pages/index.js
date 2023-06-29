import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import debounce from "lodash.debounce";

const SearchBar = () => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const [searchText, setSearchText] = useState(""); // 새로운 상태 변수 추가
	const handleCloseHistory = () => {
		setIsHistoryOpen(false);
	};
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
				<div>
					<input
						placeholder="검색..."
						onClick={() => setIsHistoryOpen(true)}
						onChange={handleInputChange}
					/>
					<IoIosCloseCircle
						className="close-icon"
						onClick={handleCloseHistory}
					/>
				</div>
				<button>
					<BsFillSearchHeartFill className="search-icon" />
				</button>
			</S.Container>
			{isHistoryOpen && (
				<S.SearchHistory>
					최근검색어
					<div>
						<span>{searchText}</span>
					</div>
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
	justify-content: space-between;
	div {
		width: 600px;
		display: flex;
		justify-content: space-between;
		background-color: white;
		input {
			border: none;
			outline: none;
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
	height: 400px;
	background-color: white;
	margin: -40px auto;
	padding: 20px;
	font-weight: 100;

	span {
		background-color: yellow; // 하이라이트 효과를 위한 배경색 추가
	}
`;

const S = {
	Container,
	SearchHistory,
};
