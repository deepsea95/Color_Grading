import React, { useState, useEffect } from "react";
import Values from "values.js";
import { v4 as uuidv4 } from "uuid";
import SingleColor from "./SingleColor";

function ColorGrading() {
  // Dichiarazione degli stati utilizzati nel componente
  const [selectedColor, setSelectedColor] = useState([]);
  const [isError, setIsError] = useState(false);
  const [colorInput, setColorInput] = useState({
    color: "",
    qty: 10,
  });

  // Creazione di una nuova istanza della libreria "Values" con un colore iniziale (blu)
  const color = new Values("rgb(0, 153, 255)");

  // Creazione di un array di 10 colori generati dalla libreria "Values"
  color.all(10);

  // Funzione che viene chiamata quando viene inviato il form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorInput.color && colorInput.qty) {
      // Estrazione delle proprietà "color" e "qty" dall'oggetto "colorInput"
      const { color, qty } = colorInput;

      try {
        // Generazione di un array di colori utilizzando la libreria "Values"
        setSelectedColor(
          new Values(color).all(Math.round(100 / parseInt(qty, 10)) * 2)
        );

        // Reimpostazione del valore dell'input di colore e della quantità di colori
        setColorInput({
          color: "",
          qty: 10,
        });
      } catch (error) {
        // In caso di errore nella generazione dei colori, impostiamo lo stato "isError" a true
        setIsError(true);
      }
    }
  };

  // Funzione che viene chiamata quando viene modificato il valore di un input
  const handleChange = (e) => {
    // Reimpostazione dello stato "isError" a false
    setIsError(false);
    // Estrazione del nome e del valore dell'input che è stato modificato
    const { name, value } = e.target;
    // Aggiornamento dello stato "colorInput" con il nuovo valore dell'input
    setColorInput({ ...colorInput, [name]: value });
  };

  // Effetto che viene eseguito quando il componente viene caricato per la prima volta
  useEffect(() => {
    // Inizializzazione dei valori dell'input di colore e della quantità di colori
    setColorInput({ qty: 10, color: "#3892c2" });
    // Generazione di un array di 20 colori utilizzando la libreria "Values"
    setSelectedColor(new Values("#3892c2").all(Math.round(100 / 10)) * 2);
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
          <button className="btn btn-selector" type="submit">
            Create
          </button>
        </div>
      </form>
      <section className="color-section">
        {isError ? (
          <h4>Nessun Colore Trovato !!</h4>
        ) : (
          selectedColor.length > 0 &&
          selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
        )}
      </section>
    </React.Fragment>
  );
}

export default ColorGrading;
