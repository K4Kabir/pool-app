import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Activity, Users, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface IQuestion {
    title: string;
    vote: number;
    uuid: string;
    _id: string;
}

interface IPoll {
    _id?: string;
    title?: string;
    description?: string;
    validity?: string;
    questions?: IQuestion[];
    clerk_id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

const PoolVotingPage = () => {
    const [pool, setPool] = useState<IPoll>();
    const { user } = useUser();
    const [selectedOption, setSelectedOption] = useState(null);
    const { id } = useParams()
    const activeUsers = 0
    const viewMode = user?.id === pool?.clerk_id ? true : false

    console.log(viewMode)
    async function getPoll() {
        try {
            let response = await axios.get(`http://localhost:3000/poll/${id}`)
            setPool(response.data.poll)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getPoll()
    }, [])

    const handleVote = (optionId: any) => {
        setPool(prevPool => {
            const newOptions = prevPool?.questions?.map(option => {
                if (option._id === optionId) {
                    // If already selected, remove vote
                    if (selectedOption === optionId) {
                        return { ...option, vote: option.vote - 1 };
                    }
                    // Add new vote
                    return { ...option, vote: option.vote + 1 };
                }
                // If there was a previous selection, remove that vote
                if (option._id === selectedOption) {
                    return { ...option, vote: option.vote - 1 };
                }
                return option;
            });

            return { ...prevPool, questions: newOptions };
        });

        // Toggle selection
        setSelectedOption(selectedOption === optionId ? null : optionId);
    };

    const getTotalVotes = () => {
        return pool?.questions?.reduce((sum, option) => sum + option.vote, 0);
    };

    const getVotePercentage = (votes: number) => {
        const total = getTotalVotes();
        return total === 0 ? 0 : Math.round((votes / (total as number)) * 100);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold">{pool?.title}</CardTitle>
                            <p className="text-gray-500">{pool?.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Activity className="h-4 w-4" />
                                <span>Live Voting</span>
                                <span className="mx-2">•</span>
                                <Users className="h-4 w-4" />
                                <span>{activeUsers} active users</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {pool?.questions?.map((option) => {
                            const percentage = getVotePercentage(option.vote);
                            const isSelected = selectedOption === option._id;

                            return (
                                <div key={option._id} className="relative">
                                    <Button
                                        variant="outline"
                                        className={`w-full h-auto p-4 flex items-center justify-between relative overflow-hidden ${isSelected ? 'border-blue-500 bg-blue-50' : ''
                                            }`}
                                        onClick={() => handleVote(option._id)}
                                    >
                                        {/* Background progress bar */}
                                        <div
                                            className="absolute left-0 top-0 h-full bg-blue-100 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />

                                        {/* Content */}
                                        <div className="relative flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                {isSelected && <ChevronUp className="h-4 w-4 text-blue-500" />}
                                                <span className={isSelected ? 'text-blue-700 font-medium' : ''}>
                                                    {option.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    {option.vote} votes
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({percentage}%)
                                                </span>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            );
                        })}

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Total Votes: {getTotalVotes()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PoolVotingPage;