// app.js
import React, { useEffect, useRef, useState } from 'https://cdn.skypack.dev/react';
import { createRoot } from 'https://cdn.skypack.dev/react-dom/client';

const App = () => {
  const ws = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${location.host}`);
    ws.current.onmessage = e => setMessages(prev => [...prev, e.data]);
    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      ws.current.send(input);
      setMessages(prev => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Chat</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'scroll', padding: 10 }}>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message"
        style={{ marginTop: 10, width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);
