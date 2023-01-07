import './App.css';
import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";


function App() {

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  const [textFromOpenAI, setTextFromOpenAI] = useState("...");
  const [input, setInput] = useState("");


  const callOpenAI = (() => {
    setTextFromOpenAI("...");
    // declare the data fetching function
    const fetchData = async () => {
      const response = await openai.createCompletion({
        model: "text-curie-001",
        prompt: "Create sentence : " + input,
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        best_of: 1
      });
      return response;
    }

    fetchData().then(function (response) { 
      setTextFromOpenAI(response.data.choices[0].text); 
    
    }).catch(function (error) { console.log(error); });;

  });

  return (
    <div className="App">
      <header className="App-header">
      <p>
          {"Build your AI miniapp"}
        </p>
        <p>
          Add text
        </p>
        <input size={50} type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={() => callOpenAI()}>Call Open AI</button>
       
        <p>
          {textFromOpenAI}
        </p>
        
        
      </header>
    </div>
  );
}

export default App;
