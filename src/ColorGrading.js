import React, { useState, useEffect } from 'react';
import Values from 'values.js';
import { v4 as uuidv4 } from 'uuid';
import SingleColor from './SingleColor';

function ColorGrading() {
	const [ selectedColor, setSelectedColor ] = useState([]);
	const [ isError, setIsError ] = useState(false);
	const [ colorInput, setColorInput ] = useState({
		color: '',
		qty: 10
	});

	const color = new Values('rgb(0, 153, 255)');
	color.all(10);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (colorInput.color && colorInput.qty) {
			const { color, qty } = colorInput;
			try {
				setSelectedColor(new Values(color).all(Math.round(100 / parseInt(qty, 10)) * 2));
				setColorInput({
					color: '',
					qty: 10
				});
			} catch (error) {
				setIsError(true);
			}
		}
	};

	const handleChange = (e) => {
		setIsError(false);
		const { name, value } = e.target;
		setColorInput({ ...colorInput, [name]: value });
	};

	useEffect(() => {
		setColorInput({ qty: 10, color: '#2b2b2b' });
		setSelectedColor(new Values('#2b2b2b').all(Math.round(100 / 10)) * 2);
	}, []);

	return (
		<React.Fragment>
			<form className="form" onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						name="color"
						id="color"
						value={colorInput.color}
						maxLength={7}
						onChange={handleChange}
					/>
					<input
						type="number"
						name="qty"
						id="qty"
						value={colorInput.qty}
						max={100}
						min={5}
						step={5}
						onChange={handleChange}
					/>
				</div>
				<button className="btn btn-selector" type="submit">
					Create
				</button>
			</form>
			<section className="color-section">
				{isError ? (
					<h4>Nessun Colore Trovato !!</h4>
				) : (
					selectedColor.length > 0 && selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
				)}
			</section>
		</React.Fragment>
	);
}

export default ColorGrading;
