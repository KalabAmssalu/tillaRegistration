"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SubKeyword {
	title: string;
	answer: string;
	link?: string | null;
	subKeywords?: SubKeyword[];
}

export default function SupportChat() {
	const [isOpen, setIsOpen] = useState(false);
	const [keywords, setKeywords] = useState<string[]>([]);
	const [path, setPath] = useState<string[]>([]);
	const [currentItems, setCurrentItems] = useState<string[]>([]);
	const [selectedSubKeyword, setSelectedSubKeyword] =
		useState<SubKeyword | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isOpen) {
			fetchKeywords();
		}
	}, [isOpen]);

	useEffect(() => {
		if (path.length > 0) {
			fetchSubKeywords();
		}
	}, [path]);

	const fetchKeywords = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "getKeywords" }),
			});
			if (response.ok) {
				const data = await response.json();
				setKeywords(data);
				setCurrentItems(data);
			}
		} catch (error) {
			console.error("Error fetching keywords:", error);
		}
		setIsLoading(false);
	};

	const fetchSubKeywords = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "getSubKeywords", path }),
			});
			if (response.ok) {
				const data = await response.json();
				setCurrentItems(data);
			}
		} catch (error) {
			console.error("Error fetching subkeywords:", error);
		}
		setIsLoading(false);
	};

	const fetchAnswer = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "getAnswer", path }),
			});
			if (response.ok) {
				const data = await response.json();
				setSelectedSubKeyword(data);
			}
		} catch (error) {
			console.error("Error fetching answer:", error);
		}
		setIsLoading(false);
	};

	const handleItemClick = async (item: string) => {
		const newPath = [...path, item];
		setPath(newPath);
		setSelectedSubKeyword(null);
		await fetchAnswer();
	};

	const handleBack = () => {
		if (path.length > 0) {
			const newPath = path.slice(0, -1);
			setPath(newPath);
			setSelectedSubKeyword(null);
			if (newPath.length === 0) {
				setCurrentItems(keywords);
			} else {
				fetchSubKeywords();
			}
		}
	};

	const handleReset = () => {
		setPath([]);
		setSelectedSubKeyword(null);
		setCurrentItems(keywords);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						className="rounded-full w-16 h-16 shadow-lg transition-transform hover:scale-110"
						onClick={() => {
							if (!isOpen) handleReset();
						}}
					>
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
						<div className="p-3 border-b flex items-center gap-2">
							{path.length > 0 && (
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={handleBack}
								>
									<ArrowLeft className="h-4 w-4" />
								</Button>
							)}
							<h4 className="text-sm font-semibold">
								{selectedSubKeyword
									? selectedSubKeyword.title
									: path.length > 0
										? path[path.length - 1]
										: "How can we help you?"}
							</h4>
						</div>

						{/* Content */}
						<ScrollArea className="flex-1">
							<div className="p-4">
								{isLoading ? (
									<div className="text-center py-4">Loading...</div>
								) : (
									<>
										{!selectedSubKeyword && (
											<div className="space-y-2">
												{currentItems.map((item) => (
													<Button
														key={item}
														variant="outline"
														className="w-full justify-between"
														onClick={() => handleItemClick(item)}
													>
														{item}
														<ChevronRight className="h-4 w-4" />
													</Button>
												))}
											</div>
										)}

										{selectedSubKeyword && (
											<div className="prose prose-sm max-w-none">
												<p className="whitespace-pre-line">
													{selectedSubKeyword.answer}
												</p>
												{selectedSubKeyword.link && (
													<a
														href={selectedSubKeyword.link}
														className="text-blue-500 hover:underline block mt-2"
														target="_blank"
														rel="noopener noreferrer"
													>
														Learn more
													</a>
												)}
												{selectedSubKeyword.subKeywords &&
													selectedSubKeyword.subKeywords.length > 0 && (
														<div className="mt-4">
															<h5 className="font-semibold mb-2">
																Related topics:
															</h5>
															{selectedSubKeyword.subKeywords.map((subItem) => (
																<Button
																	key={subItem.title}
																	variant="outline"
																	className="w-full justify-between mt-2"
																	onClick={() => handleItemClick(subItem.title)}
																>
																	{subItem.title}
																	<ChevronRight className="h-4 w-4" />
																</Button>
															))}
														</div>
													)}
											</div>
										)}
									</>
								)}
							</div>
						</ScrollArea>

						{/* Footer */}
						<div className="p-3 border-t">
							<p className="text-xs text-muted-foreground text-center">
								Can&apos;t find what you&apos;re looking for?{" "}
								<Button
									variant="link"
									className="h-auto p-0 text-xs"
									onClick={handleReset}
								>
									View all topics
								</Button>
							</p>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
