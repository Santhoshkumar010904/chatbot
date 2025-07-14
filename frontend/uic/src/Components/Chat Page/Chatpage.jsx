import React, { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { v4 as uuidv4 } from 'uuid';
import './Chatpage.css'; // ✅ Corrected CSS import

const Chatpage = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [language, setLanguage] = useState("English");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleInputChange = (e) => setUserInput(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        } else if (e.key === 'Escape') {
            setUserInput('');
        }
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        const userMessage = { id: uuidv4(), sender: 'User', message: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsTyping(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get_response`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput, language }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (jsonErr) {
                throw new Error("Invalid JSON from server");
            }

            const botMessage = {
                id: uuidv4(),
                sender: 'Chatbot',
                message: data.response || "⚠️ No response from AI."
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("❌ Fetch error:", error.message);
            setMessages(prev => [
                ...prev,
                { id: uuidv4(), sender: 'Chatbot', message: "⚠️ AI failed to respond." }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-area">
                <h2>Hey, Nice to Meet You!</h2>
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender === 'User' ? 'user-message' : 'chatbot-message'}`}>
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
                    placeholder={`Type your message (${language})...`}
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
