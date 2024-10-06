interface props {
    userIn: string
}

export default function InputBubble({ userIn } : props) {
    return (
        <div className="flex flex-row-reverse items-start my-2">
            <div className="flex flex-row-reverse items-start"> 
                <img className="ml-2 h-8 w-8 rounded-full" src="https://dummyimage.com/128x128/354ea1/ffffff&text=G" />
            </div>
            <div className="flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl" >
                <p className="text-start">{ userIn }</p>
            </div>
        </div>
    )
}