import { useCallback, useEffect } from "react";

const useDebounce = (func, delayTime, dependency) => {
	// 매개변수로 받아온 콜백함수를 매개변수로 받아온 의존성 배열 요소의 값이 변할 때만 변경될 수 있도록 useCallback으로 관리
	const callbackFunc = useCallback(func, [dependency]);
	useEffect(() => {
		const timer = setTimeout(() => {
			// 의존성 배열이 바뀌어서 callback 함수가 바뀔 때마다 매개변수로 받아온 함수 실행
			callbackFunc();
		}, delayTime);

		return () => {
			clearTimeout(timer);
		};
	}, [callbackFunc, delayTime]);
};

export default useDebounce;
