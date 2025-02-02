import { useEffect, useState } from "react"
import CreatePoolModal from "../components/common/CreatePoolModal"
import { Button } from "../components/ui/button"
import axios from 'axios'
import { useUser } from "@clerk/clerk-react"

const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const { user } = useUser()
    const checkUser = async function () {
        await axios.post('http://localhost:3000/check-user', { clerk_id: user?.id, fullName: user?.fullName })
    }
    useEffect(() => {
        checkUser()
    }, [])

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Add Pool</Button>
            <CreatePoolModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Dashboard
