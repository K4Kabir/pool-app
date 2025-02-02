import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useState } from "react"
import { DeleteIcon, PlusCircleIcon } from "lucide-react"

interface IQuestions {
    title: string
    vote: number
    uuid: number
}


const CreatePoolModal = function ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [questions, setQuestions] = useState<IQuestions[]>([{ title: "", vote: 0, uuid: Date.now() }])

    const handleChangeQuestions = (index: number, newQuestion: IQuestions) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = newQuestion;
            return updatedQuestions;
        });
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions.splice(index, 1);
            return updatedQuestions;
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Here you go!</DialogTitle>
                    <DialogDescription>
                        Please provide the below details to create a vote for others!
                    </DialogDescription>
                    <div className="flex flex-col gap-2">
                        <Input type="text" placeholder="Title" />
                        <Textarea placeholder="Description" />
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Validity Upto" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 mins</SelectItem>
                                <SelectItem value="10">10 mins</SelectItem>
                                <SelectItem value="15">15 mins</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <div className="flex justify-end py-3">
                                <Button className="rounded-full" onClick={() => setQuestions([...questions, { title: "", vote: 0, uuid: Date.now() }])}><PlusCircleIcon /></Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    questions?.map((question, index) => {
                                        return <div className="flex gap-2">
                                            <Input onChange={(e) => {
                                                handleChangeQuestions(index, { ...question, title: e.target.value })
                                            }} type="text" value={question.title} />
                                            <Button disabled={questions?.length < 2} onClick={() => handleDeleteQuestion(index)}><DeleteIcon /></Button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePoolModal