import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Get Started | Testimo",
    description: "Create a Testimo account and start collecting video testimonials from your customers today.",
}



const page = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp />
        </div>
    )
}

export default page