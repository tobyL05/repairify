import { useMemo } from "react"
import InputBubble from "./InputBubble"
import OutputBubble from "./OutputBubble"

interface props {
    msgs: string[]
}

function renderMessage(msgs: string[]) {
    return msgs.map((msg, idx) => {
        if (idx == 0) {
            // llm output
            return <OutputBubble key={idx} llmOut={msg}/>
        }
        else if (idx % 2 == 0) {
            // llm output
            return <OutputBubble key={idx} llmOut={msg}/>
        } else {
            return <InputBubble key={idx} userIn={msg} />

        }
    })
}

export default function MessageRenderer({ msgs } : props) {
    const chats = useMemo(() => {
        return renderMessage(msgs)
    }, [msgs])

    return (
        <>
            { chats } 
        </>
    )
}