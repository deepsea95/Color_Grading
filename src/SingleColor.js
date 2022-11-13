import rgbToHex from './Utils/helpers';
import React, { useState, useEffect } from 'react';

function SingleColor({ rgb, type, weight }) {
	const [ message, setMessage ] = useState(false);

	const copiaColore = () => {
		navigator.clipboard.writeText(rgbToHex(...rgb)).then(() => setMessage(true)).catch((err) => console.log(err));
	};

	useEffect(
		() => {
			const timer = setTimeout(() => {
				setMessage(false);
			}, 2000);

			return () => clearTimeout(timer);
		},
		[ message ]
	);

	return (
		<div style={{}}>
			<article
				onClick={copiaColore}
				className={`single-color ${type}`}
				style={{ backgroundColor: rgbToHex(...rgb), width: '300px', height: '300px',}}
			>
				<h5>{rgbToHex(...rgb)}</h5>
				{message && <p>Colore copiato !</p>}
			</article>
		</div>
	);
}

export default SingleColor;
