import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'

function Bot() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const handleSendMessage = async () => {
        setLoading(true);
        if (!input.trim()) return;
        try {
            const res = await axios.post("https://chatbackend-m25s.vercel.app/api/message", {
                text: input
            })
            if (res.status === 200) {
                setMessages([
                    ...messages,
                    { text: res.data.userMessage, sender: 'user' },
                    { text: res.data.botMessage, sender: 'bot' }
                ]);
            }
        } catch (error) {
            console.log("Error sending message:", error);
        }
        setInput("");
        setLoading(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#0d0d0d",
            color: "white"
        }}>

            {/* Header */}
            <header style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                borderBottom: "1px solid #2d2d2d",
                backgroundColor: "#0d0d0d",
                zIndex: 10
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px"
                }}>
                    <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>Shopbot</h1>
                    <FaUserCircle size={30} style={{ cursor: "pointer" }} />
                </div>
            </header>

            {/* Chat Area */}
            <main style={{
                flex: 1,
                overflowY: "auto",
                paddingTop: "80px",
                paddingBottom: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "0 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>

                    {messages.length === 0 ? (
                        <div style={{
                            textAlign: "center",
                            color: "#9ca3af",
                            fontSize: "18px"
                        }}>
                            👋 Hi, I'm <span style={{ color: "#22c55e", fontWeight: 600 }}>Shopbot</span>.
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <div key={idx}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "12px",
                                        maxWidth: "75%",
                                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                        backgroundColor: msg.sender === "user" ? "#2563eb" : "#1f1f1f",
                                        color: msg.sender === "user" ? "white" : "#e5e5e5"
                                    }}>
                                    {msg.text}
                                </div>
                            ))}

                            {loading && (
                                <div style={{
                                    backgroundColor: "#3a3a3a",
                                    color: "#d1d5db",
                                    padding: "8px 16px",
                                    borderRadius: "12px",
                                    maxWidth: "60%",
                                    alignSelf: "flex-start"
                                }}>
                                    Bot is typing...
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </main>

            {/* Footer & Input */}
            <footer style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                borderTop: "1px solid #2d2d2d",
                backgroundColor: "#0d0d0d",
                zIndex: 10
            }}>
                <div style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    padding: "12px 16px"
                }}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        backgroundColor: "#111111",
                        borderRadius: "9999px",
                        padding: "8px 16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                    }}>
                        <input
                            type="text"
                            placeholder="Ask BotSpoof..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{
                                flex: 1,
                                background: "transparent",
                                outline: "none",
                                color: "white",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                border: "none"
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            style={{
                                backgroundColor: "#22c55e",
                                padding: "6px 16px",
                                borderRadius: "9999px",
                                color: "white",
                                fontWeight: 500,
                                border: "none",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#16a34a"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#22c55e"}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Bot
