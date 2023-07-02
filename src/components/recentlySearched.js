import { styled } from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useWordList } from "context/targetwords";

const RecentlySearchedWordList = () => {
	const { targetWords, dispatch } = useWordList();
	// 최근 검색어 개별 삭제
	const handleDeleteEachWord = target => {
		dispatch({ type: "DELETE_WORD", payload: target });
	};

	// 최근 검색어 전체 삭제
	const handleDeleteEveryWord = () => {
		dispatch({ type: "CLEAR_LIST" });
	};

	return (
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
	);
};

export default RecentlySearchedWordList;

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
const S = {
	SearchHistory,
	EachWord,
};
