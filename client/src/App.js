import { useState } from 'react';
import './App.css';
import Chatbot from './components/ChatBox';
import InputForm from './components/InputForm';

function App() {
  const [adventureSetting, setAdventureSetting] = useState("")
  const [showInputForm, setShowInputForm] = useState(true)

  const handleInputSubmit = (inputValue) => {
    setAdventureSetting(inputValue);
    setShowInputForm(false);
  };

  return (

    <div>
      {showInputForm? (
        <InputForm onInputSubmit={handleInputSubmit}/>
      ) : 
        (
          <Chatbot adventureSetting={adventureSetting}/>
        )
      }

    </div>
  );
}

export default App;
