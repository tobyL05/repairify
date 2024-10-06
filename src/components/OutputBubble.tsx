import Markdown from "react-markdown"

interface props {
    llmOut: string
}

export default function OutputBubble({ llmOut } : props) {
    return (
        <div className="flex flex-row items-start my-4">
            <img className="mr-2 h-8 w-8 rounded-full" src="https://dummyimage.com/128x128/363536/ffffff&text=J" />
            <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl" >
                <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl break-words">
                    <Markdown className="text-start">{llmOut}</Markdown>
                </div>
            </div>
        </div>
    )
}