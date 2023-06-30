import axiosInstance from "./@core";

export const getSearchedData = async key => {
	try {
		const res = await axiosInstance.get("/search", {
			params: { key },
		});
		return res.data;
	} catch (err) {
		console.error(err);
		return ["검색 결과가 없습니다."];
	}
};
