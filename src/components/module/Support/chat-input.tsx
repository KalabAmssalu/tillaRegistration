"use client";

import { useState } from "react";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message);
			setMessage("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center space-x-2">
			<Input
				type="text"
				placeholder="Type your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="flex-grow text-sm"
			/>
			<Button type="submit" size="sm" className="px-2">
				<Send className="h-4 w-4" />
			</Button>
		</form>
	);
}
