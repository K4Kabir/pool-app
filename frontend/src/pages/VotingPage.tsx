import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Activity, Users, ChevronUp } from 'lucide-react';

// Mock data - replace with your actual API data
const MOCK_POOL = {
    id: 1,
    name: "Favorite Programming Language",
    description: "Vote for your preferred programming language",
    activeUsers: 42,
    options: [
        { id: 1, text: "Python", votes: 15 },
        { id: 2, text: "JavaScript", votes: 12 },
        { id: 3, text: "Java", votes: 8 },
        { id: 4, text: "C++", votes: 7 },
    ]
};

const PoolVotingPage = () => {
    const [pool, setPool] = useState(MOCK_POOL);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVote = (optionId: any) => {
        setPool(prevPool => {
            const newOptions = prevPool.options.map(option => {
                if (option.id === optionId) {
                    // If already selected, remove vote
                    if (selectedOption === optionId) {
                        return { ...option, votes: option.votes - 1 };
                    }
                    // Add new vote
                    return { ...option, votes: option.votes + 1 };
                }
                // If there was a previous selection, remove that vote
                if (option.id === selectedOption) {
                    return { ...option, votes: option.votes - 1 };
                }
                return option;
            });

            return { ...prevPool, options: newOptions };
        });

        // Toggle selection
        setSelectedOption(selectedOption === optionId ? null : optionId);
    };

    const getTotalVotes = () => {
        return pool.options.reduce((sum, option) => sum + option.votes, 0);
    };

    const getVotePercentage = (votes: number) => {
        const total = getTotalVotes();
        return total === 0 ? 0 : Math.round((votes / total) * 100);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold">{pool.name}</CardTitle>
                            <p className="text-gray-500">{pool.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Activity className="h-4 w-4" />
                                <span>Live Voting</span>
                                <span className="mx-2">•</span>
                                <Users className="h-4 w-4" />
                                <span>{pool.activeUsers} active users</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {pool.options.map((option) => {
                            const percentage = getVotePercentage(option.votes);
                            const isSelected = selectedOption === option.id;

                            return (
                                <div key={option.id} className="relative">
                                    <Button
                                        variant="outline"
                                        className={`w-full h-auto p-4 flex items-center justify-between relative overflow-hidden ${isSelected ? 'border-blue-500 bg-blue-50' : ''
                                            }`}
                                        onClick={() => handleVote(option.id)}
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
                                                    {option.text}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    {option.votes} votes
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