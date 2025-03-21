import { Loader2 } from "lucide-react"


const loading = () => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center h-screen max-h-screen " >
            <Loader2 className=" animate-spin " />
        </div>
    )
}

export default loading
