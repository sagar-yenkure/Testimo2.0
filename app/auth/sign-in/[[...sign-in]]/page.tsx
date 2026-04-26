import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In | Praised",
    description: "Sign in to your Praised account to manage your video testimonials.",
}



const page = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    )
}

export default page