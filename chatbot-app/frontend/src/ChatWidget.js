import React, { useState } from 'react';
import axios from 'axios';
import './ChatWidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const suggestions = [
    'What is ERP?',
    'Modules available in CRM',
    'What are included in ERP Suite?',
    'Is the product pre-built?',
    'Can I customize the product?'
  ];

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    // Add user message to chat history
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:49151/chat', null, {
        params: { message }
      });
      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', text: response.data.response }
      ]);
    } catch (error) {
      console.error("Error calling chat endpoint", error);
    }
    setMessage('');
  };

  const handleSuggestionClick = (text) => {
    setMessage(text);
  };

  return (
    <div className="chat-container">
      {/* The floating button to open the chat */}
      {!isOpen && (
        <button className="chat-button" onClick={handleToggleChat}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5135/5135979.png"
            alt="Chat Icon"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      )}

      {isOpen && (
        <div className={`chat-box ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header">
            <span>Virtual Assistant</span>
            <div className="header-icons">
              <button onClick={handleMinimize} className="icon-btn">_</button>
              <button onClick={handleClose} className="icon-btn">x</button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-body">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="suggestions">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    className="suggestion-btn"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Write your message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
