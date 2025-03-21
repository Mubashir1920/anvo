"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { submitFeedback } from "@/lib/submitFeedback";
import { useActionState } from "react";

const initialState = {
    message: "",
};

const FeedbackForm = () => {
    const [state, formAction, pending] = useActionState(async (prevState, formData) => {
        const feedback = formData.get("feedback");

        return await submitFeedback(feedback);
    }, initialState);


    return (
        <form action={formAction}>
            <ul className="grid w-[400px] p-4">
                <Label className="mb-2">Write Your Feedback/Ideas Here .</Label>
                <Textarea  name="feedback" required />
                <Button className="mt-2 disabled:opacity-65 " type="submit"   aria-disabled={pending}>
                    Send Feedback
                </Button>
                <p>
                </p>
                {
                    state.message &&
                    <p className="my-2 text-gray-500 text-sm capitalize dark:text-gray-300"  >
                        {state.message}
                    </p>
                }
            </ul>
        </form>
    );
};

export default FeedbackForm;
