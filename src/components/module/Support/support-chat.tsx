"use client";

import { useState } from "react";

import { MessageCircle, RefreshCcw, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SupportChat() {
	const [messages, setMessages] = useState<
		{ text: string; isUser: boolean; link?: string }[]
	>([]);
	const [input, setInput] = useState("");

	const addMessage = (text: string, isUser: boolean, link?: string) => {
		setMessages((prevMessages) => [...prevMessages, { text, isUser, link }]);
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();

		if (input.trim()) {
			const userMessage = input.trim();
			addMessage(userMessage, true);
			setInput("");

			try {
				const res = await fetch("/api/support", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message: userMessage }),
				});

				const data = await res.json();

				if (res.ok) {
					addMessage(data.answer, false, data.link);
				} else {
					addMessage(
						data.answer || "Sorry, we couldn't process your request.",
						false
					);
				}
			} catch (error) {
				addMessage(
					"An error occurred while processing your request. Please try again later.",
					false
				);
			}
		}
	};

	const handleCleanChat = () => {
		setMessages([]);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<Popover>
				<PopoverTrigger asChild>
					<Button className="rounded-full w-16 h-16 border-2 border-white shadow-lg transition-transform hover:scale-110">
						<MessageCircle className="w-8 h-8" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-80 p-0"
					side="top"
					align="end"
					alignOffset={-40}
					sideOffset={20}
				>
					<div className="flex flex-col h-[400px]">
						{/* Header */}
						<div className="p-3 border-b bg-secondary justify-between rounded-md flex items-center gap-2">
							<div className="flex gap-2">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/placeholder.svg" alt="Support Agent" />
									<AvatarFallback>SA</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="text-sm font-semibold">
										Tilla Support ChatBot{" "}
									</h4>
									<p className="text-xs text-muted-foreground">Online</p>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									variant={"outline"}
									size={"icon"}
									onClick={handleCleanChat}
									className="bg-transparent hover:bg-secondary/20"
								>
									<RefreshCcw className="h-4 w-4 text-white" />
								</Button>
							</div>
						</div>

						{/* Messages */}
						<ScrollArea className="flex-1 p-4">
							{messages.length === 0 ? (
								<div className="text-center text-sm text-muted-foreground py-4">
									👋 Hi there! How can we help you today?
								</div>
							) : (
								messages.map((message, index) => (
									<div
										key={index}
										className={`flex mb-2 ${
											message.isUser ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`rounded-lg p-2 max-w-[80%] text-sm ${
												message.isUser
													? "bg-primary text-primary-foreground"
													: "bg-muted"
											}`}
										>
											{message.text}
											{message.link && (
												<Button
													variant="outline"
													onClick={() => window.open(message.link, "_blank")}
													className="mt-2 w-full text-center bg-primary text-primary-foreground hover:bg-primary/80"
												>
													Download Link
												</Button>
											)}
										</div>
									</div>
								))
							)}
						</ScrollArea>

						{/* Input */}
						<form onSubmit={handleSendMessage} className="p-3 border-t">
							<div className="flex gap-2">
								<Input
									type="text"
									placeholder="Type your message..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									className="flex-1 text-sm"
								/>
								<Button type="submit" size="icon" className="shrink-0">
									<Send className="h-4 w-4" />
								</Button>
							</div>
						</form>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
