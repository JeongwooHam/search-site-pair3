import SearchBar from "components/search-bar";
import { styled } from "styled-components";

const MainPage = () => {
	return (
		<>
			<S.Container>
				<S.Title>
					What are you <span>searching</span> for?
				</S.Title>
				<SearchBar />
			</S.Container>
		</>
	);
};

export default MainPage;

const Container = styled.div`
	margin-top: 150px;
`;

const Title = styled.div`
	font-family: "Playfair Display", serif;
	font-size: 70px;
	font-weight: bold;
	text-align: center;
	span {
		color: #a252c8;
	}
`;

const S = {
	Container,
	Title,
};
