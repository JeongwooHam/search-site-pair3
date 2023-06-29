import GlobalStyles from "style/global";
import "./App.css";
import MainPage from "pages";
import { useEffect, useState } from "react";
import { axiosInstance } from "apis/@core";

function App() {
	const [searchedData, setSearchedData] = useState([]);
	const getData = async key => {
		try {
			const res = await axiosInstance.get("/search", { params: { key } });
			setSearchedData(res.data); // 여기서 result에 접근 가능
		} catch (err) {
			console.error(err);
		}
	};

	console.log(searchedData);
	useEffect(() => {
		getData("ㄴ");
	}, []);

	return (
		<>
			<GlobalStyles />
			<MainPage />
		</>
	);
}

export default App;
