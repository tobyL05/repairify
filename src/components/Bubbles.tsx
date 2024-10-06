import { FormEvent, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { introduction } from "../../content.ts"
import FileUploadButton from "./FileUploadBtn.tsx";
import MessageRenderer from "./MessageRenderer.tsx";
import { message } from "../types.ts";

interface props {
    className: string | undefined
}

interface resp {
    message: string
}

// function to send request

// function to add to messages

// Handle file change event

export default function PromptContainer({ className }: props) {

    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<message[]>([introduction])
    const [loading, setLoading] = useState<boolean>(false)

    async function sendInput(e: FormEvent<HTMLFormElement>) {
        setLoading(true)
        e.preventDefault()
        setLoading(true)
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "user", text: input }
        ]);
        setInput("")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "text_prompt": input
        });
        
        const req = await fetch("https://x8gumtky6k.execute-api.us-west-2.amazonaws.com/generate", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
        const res: resp = await req.json();
        setLoading(false)
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "llm", text: res.message }
        ]);
        setLoading(false)

    }

    return (
        <>
            {/* Prompt Messages Container - Modify the height according to your need */}
            <div className={twMerge('flex h-[85vh] w-full flex-col', className)}>
                {/* Prompt Messages */}
                <div className="overflow-scroll flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7" >
                    <MessageRenderer msgs={messages}/>
                </div>

                {/* Prompt message input */}
                <form className="mt-2" onSubmit={(e) => sendInput(e)}>
                    <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
                    <div className="relative">
                        <FileUploadButton className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"/>

                        <textarea
                            id="chat-input"
                            className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-11 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600 sm:text-base overflow-hidden"
                            placeholder="Enter your prompt"
                            rows={1}
                            onChange={(e) => setInput(e.target.value)}
                            required
                        ></textarea>
                        <button
                            disabled={loading}
                            type="submit"
                            className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
                        >
                            Send <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}