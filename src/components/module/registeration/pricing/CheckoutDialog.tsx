"use client";

import { useEffect, useState } from "react";

import {
	Calendar,
	CheckCircle,
	CreditCard,
	TicketPercent,
	Users,
	Wallet,
} from "lucide-react";

import { getCurrencyExchangeRate } from "@/actions/pricing/currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currencyUtils";
import { type PricingTier } from "@/types/pricing/PricingType";

import { TermsAndPolicyModal } from "./terms-and-policy-modal";

interface CheckoutDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedPlan: PricingTier | null;
	familyMembers: number;
	billingCycle: string;
	planPrice: number;
	totalPrice: number;
	currency: string;
	deductable?: "with_deductible" | "non_deductible";
	name: string;
	onSubmit: (paymentMethod: "stripe" | "chapa") => void;
	discount?: string;
	discountText?: string;
}

export function CheckoutDialog({
	isOpen,
	onOpenChange,
	selectedPlan,
	familyMembers,
	planPrice,
	totalPrice,
	billingCycle,
	deductable = "with_deductible",
	name,
	currency,
	onSubmit,
	discount,
	discountText,
}: CheckoutDialogProps) {
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [policyAgreed, setPolicyAgreed] = useState(false);
	const [termsModalOpen, setTermsModalOpen] = useState(false);

	const handleSubmit = (paymentMethod: "stripe" | "chapa") => {
		if (termsAgreed && policyAgreed) {
			onSubmit(paymentMethod);
		}
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[550px]">
					<DialogHeader>
						<DialogTitle>Checkout: {selectedPlan?.title}</DialogTitle>
						<DialogDescription>
							Review your plan details and complete your purchase.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<Users className="h-5 w-5 text-gray-500" />
											<span className="text-sm font-medium">
												Family Members
											</span>
										</div>
										<span className="font-semibold">{familyMembers}</span>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<CreditCard className="h-5 w-5 text-gray-500" />
											<span className="text-sm font-medium">
												Plan Price (per person)
											</span>
										</div>
										<span className="font-semibold">
											{planPrice ? (
												formatCurrency(planPrice, currency)
											) : (
												<span className="animate-ping">...</span>
											)}
										</span>
									</div>
									{discount && discount !== "0" && (
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<TicketPercent className="h-5 w-5 text-gray-500" />
												<span className="text-sm font-medium">
													{discountText}
												</span>
											</div>
											<span className="font-semibold">{discount}</span>
										</div>
									)}
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<Calendar className="h-5 w-5 text-gray-500" />
											<span className="text-sm font-medium">Billing Cycle</span>
										</div>
										<span className="font-semibold">{billingCycle}</span>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<CheckCircle className="h-5 w-5 text-gray-500" />
											<span className="text-sm font-medium">
												Payment Checked By
											</span>
										</div>
										<span className="font-semibold">{name}</span>
									</div>
								</div>
							</CardContent>
							<Separator className="my-4" />
							<CardFooter className="justify-between">
								<span className="text-lg font-bold">Total</span>
								<span className="text-lg font-bold text-green-600">
									{totalPrice ? (
										formatCurrency(totalPrice, currency)
									) : (
										<span className="animate-ping">...</span>
									)}
								</span>
							</CardFooter>
						</Card>
						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="terms"
									checked={termsAgreed}
									onCheckedChange={(checked) =>
										setTermsAgreed(checked as boolean)
									}
								/>
								<label
									htmlFor="terms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I agree to the{" "}
									<Button
										variant="link"
										className="h-auto p-0 text-sm font-medium underline"
										onClick={() => setTermsModalOpen(true)}
									>
										Terms and Conditions
									</Button>
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox
									id="policy"
									checked={policyAgreed}
									onCheckedChange={(checked) =>
										setPolicyAgreed(checked as boolean)
									}
								/>
								<label
									htmlFor="policy"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I agree to the{" "}
									<Button
										variant="link"
										className="h-auto p-0 text-sm font-medium underline"
										onClick={() => setTermsModalOpen(true)}
									>
										Privacy Policy
									</Button>
								</label>
							</div>
						</div>
						<div className="space-y-2">
							{currency === "USD" ? (
								<Button
									className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
									onClick={() => handleSubmit("stripe")}
									disabled={!termsAgreed || !policyAgreed}
								>
									<CreditCard className="mr-2 h-4 w-4" /> Pay with Stripe
								</Button>
							) : (
								<Button
									variant="outline"
									className="w-full border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
									onClick={() => handleSubmit("chapa")}
									disabled={!termsAgreed || !policyAgreed}
								>
									<Wallet className="mr-2 h-4 w-4" /> Pay with Chapa
								</Button>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<TermsAndPolicyModal
				open={termsModalOpen}
				onOpenChange={setTermsModalOpen}
				onAgree={(type) => {
					if (type === "terms") setTermsAgreed(true);
					if (type === "policy") setPolicyAgreed(true);
				}}
			/>
		</>
	);
}
