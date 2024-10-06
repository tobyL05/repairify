import { FaScrewdriverWrench } from "react-icons/fa6"

export default function Navbar() {

    return (
        <div className="w-full h-10 my-5">
            <div className="w-full flex justify-between align-baseline">
                <div className="inline-flex align-baseline"><h1 className="text-2xl">repairify</h1> <FaScrewdriverWrench/></div>
                <h1>reducing e-waste one device at a time</h1>
            </div>
        </div>
    )

}