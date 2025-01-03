"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PrivacyPolicy } from "./privacy-policy";
import { TermsAndConditions } from "./terms-and-conditions";

interface TermsAndPolicyModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAgree: (type: "terms" | "policy") => void;
}

export function TermsAndPolicyModal({
	open,
	onOpenChange,
	onAgree,
}: TermsAndPolicyModalProps) {
	const [activeTab, setActiveTab] = useState<"terms" | "policy">("terms");

	const handleAgree = () => {
		onAgree(activeTab);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[725px]">
				<DialogHeader>
					<DialogTitle>Terms and Conditions & Privacy Policy</DialogTitle>
					<DialogDescription>
						Please review our Terms and Conditions and Privacy Policy.
					</DialogDescription>
				</DialogHeader>
				<Tabs
					defaultValue="terms"
					className="w-full"
					onValueChange={(value) => setActiveTab(value as "terms" | "policy")}
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="terms">Terms and Conditions</TabsTrigger>
						<TabsTrigger value="policy">Privacy Policy</TabsTrigger>
					</TabsList>
					<TabsContent value="terms">
						<ScrollArea className="h-[400px] w-full rounded-md border p-4">
							<TermsAndConditions />
						</ScrollArea>
					</TabsContent>
					<TabsContent value="policy">
						<ScrollArea className="h-[400px] w-full rounded-md border p-4">
							<PrivacyPolicy />
						</ScrollArea>
					</TabsContent>
				</Tabs>
				<DialogFooter>
					<Button onClick={handleAgree}>I Agree</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
