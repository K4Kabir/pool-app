import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import CreatePoolModal from "../components/common/CreatePoolModal";
import { useUser } from '@clerk/clerk-react';

interface IQuestions {
    title: string
    uuid: string
    vote: number
    _id: string
}
interface IPools {
    clerk_id: string
    description: string
    questions: IQuestions[]
    title: string
    validity: string
    _id: string
    createdAt: string
}

const Dashboard = () => {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [pools, setPools] = useState<IPools[]>([]);
    const [error, setError] = useState<any>(null);

    const getPools = async function () {
        try {
            let res = await axios.get(`http://localhost:3000/pools/${user?.id}`);
            setPools(res.data);
        } catch (error: any) {
            setError(error);
        }
    }

    useEffect(() => {
        getPools();
    }, []);

    const handleDelete = (poolId: string) => {
        console.log(poolId);
    };

    const isPoolInactive = (createdAt: string, validity: number) => {
        const expiryDate = moment(createdAt).add(validity, 'minutes');
        return moment().isAfter(expiryDate);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Pool Dashboard</h1>
                        <p className="text-gray-500">Manage your swimming pools and schedules</p>
                    </div>
                    <Button onClick={() => setOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Pool
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pools?.map((pool: IPools) => (
                        <Card key={pool._id} className="overflow-hidden transition-all hover:shadow-lg">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-semibold">
                                            {pool.title}
                                        </CardTitle>
                                        {isPoolInactive(pool.createdAt, parseInt(pool.validity)) ? (
                                            <span className="text-red-500">Inactive</span>
                                        ) : <span className="text-green-500">Active</span>}
                                        <div className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(pool._id)}
                                        className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <p className="text-gray-600">{pool.description}</p>
                                <p className="text-gray-600 text-sm font-bold">{moment(pool.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <CreatePoolModal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Dashboard;