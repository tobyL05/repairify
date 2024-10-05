import { useMemo, useState } from "react"
import InputBubble from "./InputBubble"
import OutputBubble from "./OutputBubble"
import { message } from "../types"

interface props {
    msgs: message[] 
}


export default function MessageRenderer({ msgs } : props) {

    function renderMessage(msgs: message[]) {
        return msgs.map((msg : message, idx) => {
            if (msg.type === "llm") {
                return <OutputBubble key={idx} llmOut={msg.text}/>
            } else {
                return <InputBubble key={idx} userIn={msg.text}/>
            }
        })
    }

    const chats = useMemo(() => {
        return renderMessage(msgs)
    }, [msgs])

    return (
        <>
            { chats } 
        </>
    )
}