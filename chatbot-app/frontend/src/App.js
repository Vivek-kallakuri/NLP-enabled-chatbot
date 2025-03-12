import React, { useState } from 'react';
import axios from 'axios';
import ChatWidget from './ChatWidget';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  const handleGetRoot = async () => {
    try {
      const res = await axios.get('http://localhost:49151/');
      setBackendMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Chatbot App</h1>
      <button onClick={handleGetRoot}>Check Backend</button>
      <p>Backend says: {backendMessage}</p>

      {/* The floating chat widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
