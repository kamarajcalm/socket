import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketInstance, setSocketInstance] = useState(null);

    const send = () => {
        const sendData = {
            key: "User",
            Value: "Admin",
        };
        // Needs stringify
        // const stringed = JSON.stringify(sendData)
        socketInstance.send(sendData);
    };
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        console.log(socket, "sss");
        socket.addEventListener("open", (event) => {
            socket.send("Hello Server!");
        });
        socket.addEventListener("message", (event) => {
            setMessages([...messages, event.data]);
            console.log("Message from server ", event.data);
        });
        setSocketInstance(socket);

        return () => {
            socket.close();
        };
    }, []);
    return (
        <div className="App">
            <h1>Socket test</h1>
            <div>
                {/* <input
          value={message}
          placeholder="Enter your message"
          style={{ width: 500 }}
          onChange={(e) => setMessage(e.target.value)}
        /> */}
                <button style={{ marginLeft: 10 }} onClick={send}>
                    send message
                </button>
            </div>

            <div>
                <h1>Messages from socket will appear here</h1>
                {messages.map((item, index) => {
                    return <p>{item.toString()}</p>;
                })}
            </div>
        </div>
    );
}

export default App;
