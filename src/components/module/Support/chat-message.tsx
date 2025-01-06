import { cn } from "@/lib/utils";

interface ChatMessageProps {
	message: string;
	isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
	return (
		<div
			className={cn(
				"flex w-full mb-2",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			<div
				className={cn(
					"rounded-lg p-2 max-w-[80%] text-sm",
					isUser ? "bg-primary text-primary-foreground" : "bg-secondary"
				)}
			>
				{message}
			</div>
		</div>
	);
}
