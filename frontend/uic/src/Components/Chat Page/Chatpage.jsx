import React, { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import './Chatpage.css';

const Chatpage = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [language, setLanguage] = useState("English");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleInputChange = (e) => setUserInput(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
        if (e.key === 'Escape') {
            setUserInput('');
        }
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        const userMessage = { sender: 'User', message: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsTyping(true);

        try {
           const response = await fetch("https://chatbot-backend.onrender.com/get_response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput, language }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw new Error("Invalid JSON from server");
            }

            const botMessage = {
                sender: 'Chatbot',
                message: data.response || "⚠️ AI returned an empty message."
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error:", error.message);
            setMessages(prev => [
                ...prev,
                { sender: 'Chatbot', message: "⚠️ Error: AI is not responding or sent bad data." }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-area">
                <h2>Hey, Nice to Meet You!</h2>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'User' ? 'user-message' : 'chatbot-message'}`}>
                        <div className="message-info">
                            <div className="message-icon">
                                {msg.sender === 'User'
                                    ? <FaUser size={20} color="black" />
                                    : <RiRobot2Fill size={20} color="black" />}
                            </div>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="chatbot-message">
                        <div className="message-info">
                            <RiRobot2Fill size={20} color="black" />
                            <p>🤖 Typing...</p>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="input-area">
                <button
                    className="lang-toggle"
                    onClick={() => setLanguage(language === "English" ? "Tamil" : "English")}
                    title="Switch Language"
                >
                    <GrLanguage />
                </button>

                <input
                    id="user-input"
                    type="text"
                    placeholder={`Type your message... (${language})`}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />

                <button
                    className="send-button"
                    onClick={sendMessage}
                    disabled={userInput.trim() === ''}
                    title="Send"
                >
                    <BsFillSendFill />
                </button>
            </div>
        </div>
    );
};

export default Chatpage;
