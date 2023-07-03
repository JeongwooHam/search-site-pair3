import { createContext, useContext, useState } from "react";

const InputData = createContext();

export const useInputData = () => useContext(InputData);

const InputDataProvider = ({ children }) => {
	const [inputData, setInputData] = useState("");
	return (
		<InputData.Provider value={{ inputData, setInputData }}>
			{children}
		</InputData.Provider>
	);
};

export default InputDataProvider;
