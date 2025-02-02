import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { MoveRight } from "lucide-react"
import { Outlet } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
    return (
        <>
            <div className="flex justify-between items-center bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-800 p-3">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Pool your thoughts!
                    </h1>
                    <MoveRight className="w-5 h-5 text-blue-400" />
                </div>

                <div>
                    <SignedOut>
                        <SignInButton children={<Button>Login</Button>} />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Header
