import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "./store/actions";
import Loader from "react-loader-spinner";
import "./App.css";

function App() {
	const { catImageUrl, quoteText } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [fontColor, setFontColor] = useState("#000");
	const spinner = ["Audio", "BallTriangle", "Bars", "Circles", "Grid", "Hearts", "Oval", "Puff", "Rings", "TailSpin", "ThreeDots"];
	const getRandomColor = () => {
		let letters = "0123456789ABCDEF";
		let fontColor = "#";
		for (let i = 0; i < 6; i++) {
			fontColor += letters.split("")[Math.floor(Math.random() * 16)];
		}
		setFontColor(fontColor);
	};

	useEffect(() => {
		dispatch(apiRequest());
	}, [dispatch]);

	useEffect(() => {
		getRandomColor();
	}, [catImageUrl, quoteText]);

	const { content, author } = quoteText;
	const handleClick = () => {
		dispatch(apiRequest());
	};
	return (
		<div className="container">
			{catImageUrl && quoteText ? (
				<>
					<h2 style={{ color: fontColor }}>Random Quotes App</h2>
					<img src={catImageUrl} alt="" className="cat-image" />
					<p className="quote-text" style={{ color: fontColor }}>
						{`"${content}"`}
					</p>
					<p className="quote-text" style={{ color: fontColor }}>
						{`-${author}`}
					</p>
					<button className="btn" onClick={handleClick}>
						Get Quotes
					</button>
				</>
			) : (
				<Loader
					type={spinner[Math.floor(Math.random() * 16) - 11]}
					color={fontColor}
					height={100}
					width={100}
					timeout={3000} //3 secs
				/>
			)}
		</div>
	);
}

export default App;
