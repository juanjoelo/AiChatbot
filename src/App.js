import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    console.log("Prompt:", prompt);

    try {
      const res = await axios.post("http://localhost:3001/api/chat", {
        prompt,
      });
      setResponse(res.data.generated_text);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 503) {
        setResponse(
          "El modelo se está cargando. Por favor, inténtalo de nuevo en unos momentos."
        );
      } else {
        setResponse("Error al comunicarse con la IA");
      }
    }
  };

  return (
    <div className="App">
      <h1>Chat con ChatGPT</h1>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={handleSubmit}>Enviar</button>
      <div>
        <h2>Respuesta:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
