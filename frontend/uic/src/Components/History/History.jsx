import React from 'react';
import "./History.css";

const History = () => {
  const chatHistory = [
    { 
      id: 1, 
      sender: 'User', 
      message: 'Hello, Chatbot! How are you?', 
      timestamp: '2025-02-18 10:00 AM', 
    },
    { 
      id: 2, 
      sender: 'User', 
      message: 'What is the weather today?', 
      timestamp: '2025-02-18 11:00 AM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
    { 
      id: 3, 
      sender: 'User', 
      message: 'Can you recommend me a good movie?', 
      timestamp: '2025-02-18 12:00 PM', 
    },
  ];

  return (
    <div className="sidebar">
      <h2>Chat History</h2>
      {chatHistory.map((chat) => (
        <div key={chat.id} className="sidebar-item">
          <p>{chat.message.slice(0, 50)}...</p>
          <span className="timestamp">{chat.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default History;