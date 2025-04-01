"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { submitFeedback } from "@/lib/submitFeedback";
import { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";

const initialState = {
    message: "",
    number: 0,
};

const randomNumberGenerator = () => {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const FeedbackForm = () => {
    const [mounted, setMounted] = useState(false);
    const [randomNumber, setRandomNumber] = useState(randomNumberGenerator());
    const [verificationNumber, setVerificationNumber] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Check if the entered verification number matches the random number
        setIsVerified(verificationNumber === randomNumber.toString());
    }, [verificationNumber, randomNumber]);

    const [state, formAction, pending] = useActionState(async (prevState, formData) => {
        const feedback = formData.get("feedback");
        const verification = formData.get("verification");
        const isValid = verification === randomNumber.toString();
        if (!isValid) {
            return {
                ...prevState,
                message: "Verification number is not correct",
            };
        }
        setVerificationNumber('');
        setIsVerified(false);
        setRandomNumber(randomNumberGenerator()); // Generate a new random number after successful submission
        const response = await submitFeedback(feedback);
        if (response.error) {
            return {
                ...prevState,
                message: response.error,
            };
        }
        if (response.success) {
            return {
                ...prevState,
                message: "Feedback submitted successfully",
            };
        }
        return {
            ...prevState,
            message: "Something went wrong",
        };
    }, initialState);

    return (
        mounted &&
        <form action={formAction}>
            <ul className="grid md:w-[400px] md:p-4">
                <Label className="mb-2">Write Your Feedback/Ideas Here.</Label>
                <Textarea name="feedback" required />
                <p className="text-sm p-1 my-1 bg-gray-100 dark:bg-black font-semibold">
                    {randomNumber}
                </p>
                <Input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    name="verification"
                    placeholder="Enter the number above"
                    value={verificationNumber}
                    onChange={(e) => setVerificationNumber(e.target.value)}
                    required
                />
                <Button
                    className="mt-2 disabled:opacity-65"
                    type="submit"
                    disabled={pending || !isVerified}
                    aria-disabled={pending || !isVerified}
                >
                    Send Feedback
                </Button>
                {state.message && (
                    <p className="my-2 text-gray-500 text-sm capitalize dark:text-gray-300">
                        {state.message}
                    </p>
                )}
            </ul>
        </form>
    );
};

export default FeedbackForm;
