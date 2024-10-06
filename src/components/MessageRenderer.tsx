import { useEffect, useMemo, useRef } from "react"
import InputBubble from "./InputBubble"
import OutputBubble from "./OutputBubble"
import { message } from "../types"

interface props {
    msgs: message[] 
}


export default function MessageRenderer({ msgs } : props) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Ensure that we scroll to the bottom every time messages update
    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    function renderMessage(msgs: message[]) {
        return msgs.map((msg : message, idx) => {
            if (msg.type === "llm") {
                return <OutputBubble key={idx} llmOut={msg.text}/>
            } else {
                // console.log(msg.text)
                return <InputBubble key={idx} userIn={msg.text}/>
            }
        })
    }

    const chats = useMemo(() => {
        return renderMessage(msgs)
    }, [msgs])

    return (
        <div style={{ overflowY: "auto" }}> {/* Adjust height as needed */}
            {chats}
            {/* Scroll target div */}
            <div ref={messagesEndRef} className="hidden"/>
        </div>
    )
}