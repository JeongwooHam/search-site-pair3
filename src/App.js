import "./App.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "./apis/@core";

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
		<div className="App">
			{searchedData.map(data => (
				<div>{data}</div>
			))}
		</div>
	);
}

export default App;
