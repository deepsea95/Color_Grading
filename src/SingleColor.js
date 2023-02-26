import rgbToHex from "./Utils/helpers";
import React, { useState, useEffect, useMemo } from "react";

function SingleColor({ rgb, type, weight }) {
  // Stato per indicare se il messaggio "Colore copiato!" deve essere visualizzato
  const [message, setMessage] = useState("");

  // Funzione per copiare il valore esadecimale del colore nella clipboard
  const copiaColore = () => {
    navigator.clipboard
      .writeText(rgbToHex(...rgb))
      .then(() => setMessage("Colore copiato!"))
      .catch((err) => console.log(err));
  };

  // Effetto per rimuovere il messaggio dopo 2 secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 2000);

    // Pulizia dell'effetto
    return () => clearTimeout(timer);
  }, [message]);

  // Calcola il valore esadecimale del colore solo quando cambia `rgb`
  const hex = useMemo(() => rgbToHex(...rgb), [rgb]);

  return (
    <div style={{}}>
      <article
        onClick={copiaColore}
        className={`single-color ${type}`}
        style={{
          backgroundColor: rgbToHex(...rgb),
          width: "300px",
          height: "300px",
        }}
      >
        <h5>{hex}</h5>
        {message && <p>Colore copiato !</p>}
      </article>
    </div>
  );
}

export default SingleColor;
