"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Check, X } from "lucide-react";

import {
	useCheckoutChapa,
	useCheckoutStrip,
} from "@/actions/Query/payment_Query/payement_Query";
import { getCurrencyExchangeRate } from "@/actions/pricing/currency";
import InfoPopover from "@/components/shared/Popover/InfoPopover";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTiers } from "@/constants/data/PricingPlanData";
import { useAppSelector } from "@/hooks/storehooks";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currencyUtils";
import { type PricingTier } from "@/types/pricing/PricingType";

import { CheckoutDialog } from "./CheckoutDialog";
import { PricingDisplay } from "./PricingDisplay";

export default function PlanSelection({ userType }: { userType: string }) {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const memberData = useAppSelector((state) => state.member.memberSlice);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
	const [deductable, setDeductable] = useState<
		"with_deductible" | "non_deductible"
	>("with_deductible");

	const router = useRouter();
	const isDiaspora = userType === "diaspora" || userType === "international";
	const currency = isDiaspora ? "USD" : "ETB";
	const handleBillingCycleChange = (checked: boolean) => {
		setBillingCycle(checked ? "yearly" : "monthly");
	};

	const handlePlanSelection = (
		plan: PricingTier,
		deductible: "with_deductible" | "non_deductible"
	) => {
		setDeductable(deductible);
		setSelectedPlan(plan);
		setIsDialogOpen(true);
	};

	const fullName = memberData.is_representative
		? `${memberData.representative_first_name} ${
				memberData.representative_last_name
			}`
		: `${memberData.first_name} ${memberData.last_name}`;

	// const planPrice =
	// 	selectedPlan?.[deductable].price[
	// 		billingCycle as keyof typeof selectedPlan.with_deductible.price
	// 	] || 0;

	const memberCount = 1;
	// const [planPrice, setPlanPrice] = useState<number>(0);
	// const [totalPrice, setTotalPrice] = useState<number>(0);

	// useEffect(() => {
	// 	const convertPrice = async () => {
	// 		const basePrice = getPlanPrice(selectedPlan);
	// 		if (currency === "ETB") {
	// 			const exchangeRate = await getCurrencyExchangeRate("ETB"); // Assuming getCurrencyExchangeRate is defined elsewhere
	// 			setPlanPrice(basePrice * exchangeRate);
	// 			setTotalPrice(basePrice * exchangeRate * memberCount);
	// 		} else {
	// 			setPlanPrice(basePrice);
	// 			setTotalPrice(basePrice * memberCount);
	// 		}
	// 	};

	// 	convertPrice();
	// }, [selectedPlan, currency, memberCount]);
	const [planPrice, setPlanPrice] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [discount, setDiscount] = useState<number>(0);
	const [discountAmount, setDiscountAmount] = useState<string>("");
	const [numberOfFamilyMembers, setNumberOfFamilyMembers] =
		useState<string>("");

	const getPlanPrice = (plan: PricingTier | null) => {
		if (!plan) return 0;
		return (
			plan?.[deductable].price[
				billingCycle as keyof typeof plan.with_deductible.price
			] || 0
		);
	};
	useEffect(() => {
		const convertPrice = async () => {
			const basePrice = getPlanPrice(selectedPlan);
			if (currency === "ETB") {
				const exchangeRate = await getCurrencyExchangeRate("ETB"); // Assuming getCurrencyExchangeRate is defined elsewhere
				setPlanPrice(basePrice * exchangeRate);
				if (memberCount >= 2 && memberCount < 4) {
					setDiscount(15);
					const totalPrice = basePrice * exchangeRate * memberCount;
					const discountAmount = totalPrice * 0.15;
					setDiscountAmount(formatCurrency(discountAmount, "ETB"));
					setTotalPrice(totalPrice - discountAmount);
					setNumberOfFamilyMembers("for 2 to 3");
				} else if (memberCount >= 4) {
					setDiscount(20);
					const totalPrice = basePrice * exchangeRate * memberCount;
					const discountAmount = totalPrice * 0.2;
					setDiscountAmount(formatCurrency(discountAmount, "ETB"));
					setTotalPrice(totalPrice - discountAmount);
					setNumberOfFamilyMembers("for morethan 4");
				} else {
					setDiscount(0);
					const totalPrice = basePrice * exchangeRate * memberCount;
					setDiscountAmount("0");
					setTotalPrice(totalPrice);
					setNumberOfFamilyMembers("0");
				}
				// setTotalPrice(basePrice * exchangeRate * familyMembers);
			} else {
				setPlanPrice(basePrice);
				setTotalPrice(basePrice * memberCount);
			}
		};

		convertPrice();
	}, [selectedPlan, currency, memberCount]);
	// const totalPrice = planPrice * memberCount;

	const { mutate: checkoutStripMutation } = useCheckoutStrip();
	const { mutate: checkoutChapaMutation } = useCheckoutChapa();

	const handleSubmit = (paymentMethod: "stripe" | "chapa") => {
		console.log("paymentMethod", paymentMethod);
		if (paymentMethod === "stripe") {
			if (selectedPlan) {
				checkoutStripMutation({
					email: memberData.is_representative
						? memberData.representative_email_address
						: memberData.email_address,
					member_id: [memberData.id],
					// member_id: JSON.stringify([memberData.id]),
					plan_cycle: billingCycle === "yearly" ? "annual" : "monthly",
					member_plan: selectedPlan.title.toLowerCase().split(" ")[0],
					// members_count: memberCount,
					amount: Math.round(totalPrice * 100 * 100) / 100,
					deductible_type: deductable,
					// cancel_url: `${process.env.NEXT_STRIP_CANCEL_URL}/${userType}`,
				});
			}
		} else {
			if (selectedPlan) {
				checkoutChapaMutation({
					email: memberData.is_representative
						? memberData.representative_email_address
						: memberData.email_address,
					member_id: [memberData.id],
					plan_cycle: billingCycle === "yearly" ? "annual" : "monthly",
					member_plan: selectedPlan.title.toLowerCase().split(" ")[0],
					// members_count: memberCount,
					amount: Math.round(totalPrice * 100) / 100,
					deductible_type: deductable,
					first_name: memberData.is_representative
						? memberData.first_name
						: memberData.first_name,
					last_name: memberData.is_representative
						? memberData.last_name
						: memberData.last_name,
					phone_number: memberData.is_representative
						? memberData.phone_number
						: memberData.phone_number,
				});
			}
		}
		setIsDialogOpen(false);
	};
	return (
		<>
			<div className="container mx-auto pb-12 px-4">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold  ">
						{" "}
						Dear, {fullName} , Choose Your Plan <InfoPopover />
					</h2>
				</div>
				<div className="flex items-center justify-center mb-8">
					<Label htmlFor="billing-cycle" className="mr-2">
						Monthly
					</Label>
					<Switch
						id="billing-cycle"
						checked={billingCycle === "yearly"}
						onCheckedChange={handleBillingCycleChange}
					/>
					<Label htmlFor="billing-cycle" className="ml-2">
						Yearly
					</Label>
				</div>
				<div className="text-center mt-4 mb-8 flex flex-col">
					<span className="text-sm font-normal text-muted-foreground">
						* If you select the yearly plan, you will get a discount of 10% off
						the total amount.
					</span>
					<span className="text-sm font-normal text-muted-foreground">
						* Please note that the total amount will be calculated based on the
						number of family members you have.
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{pricingTiers.map((tier, index) => (
						<Card key={index} className="flex flex-col">
							<CardTitle className="p-2 px-4 text-2xl text-center font-bold">
								{tier.title}
							</CardTitle>
							<Tabs defaultValue="with_deductible">
								<TabsList className="w-full">
									<TabsTrigger value="with_deductible">
										With Deductible
									</TabsTrigger>
									<TabsTrigger value="non_deductible">
										Non-Deductible
									</TabsTrigger>
								</TabsList>
								<TabsContent value="with_deductible">
									<CardHeader className="text-center p-0">
										<CardDescription className="text-2xl">
											<PricingDisplay
												key={index}
												tier={tier}
												billingCycle={billingCycle}
												isNonDeductible={false}
											/>
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-grow p-4 h-[400px]">
										<div className="flex items-center justify-center">
											<span className="text-sm font-normal text-muted-foreground">
												Co-Insurance{" "}
											</span>
											<span className="text-sm font-normal pl-1 text-muted-foreground">
												{tier.with_deductible.coInsurance}%
											</span>
										</div>

										<ul className="space-y-2 mt-4 max-h-[350px] overflow-y-auto">
											{tier.with_deductible.features.map(
												(feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center">
														{feature.covered ? (
															<Check className="text-primary mr-2" size={15} />
														) : (
															<X
																className="text-muted-foreground mr-2"
																size={15}
															/>
														)}
														<span
															className={cn(
																feature.covered ? "" : "text-muted-foreground",
																"text-xs w-[90%]"
															)}
														>
															{feature.name}
														</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										<Button
											className="w-full mt-4 bg-secondary text-white"
											onClick={() =>
												handlePlanSelection(tier, "with_deductible")
											}
										>
											Select {tier.title}
										</Button>
									</CardFooter>
								</TabsContent>

								<TabsContent value="non_deductible">
									<CardHeader className="text-center p-0">
										<CardDescription className="text-2xl">
											{/* {currency} {tier.non_deductible.price[billingCycle]}
											<span className="font-normal text-muted-foreground">
												/{billingCycle === "monthly" ? "mo" : "yr"}
											</span> */}
											<PricingDisplay
												key={index}
												tier={tier}
												billingCycle={billingCycle}
												isNonDeductible={true}
											/>
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-grow p-4 h-[400px]">
										<div className="flex items-center justify-center">
											<span className="text-sm font-normal text-muted-foreground">
												Co-Insurance{" "}
											</span>
											<span className="text-sm font-normal pl-1 text-muted-foreground">
												{tier.with_deductible.coInsurance}%
											</span>
										</div>

										<ul className="space-y-2 mt-4 max-h-[350px] overflow-y-auto">
											{tier.non_deductible.features.map(
												(feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center">
														{feature.covered ? (
															<Check className="text-primary mr-2" size={15} />
														) : (
															<X
																className="text-muted-foreground mr-2"
																size={15}
															/>
														)}
														<span
															className={cn(
																feature.covered ? "" : "text-muted-foreground",
																"text-xs w-[90%]"
															)}
														>
															{feature.name}
														</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										<Button
											className="w-full mt-4 bg-secondary text-white"
											onClick={() =>
												handlePlanSelection(tier, "non_deductible")
											}
										>
											Select {tier.title}
										</Button>
									</CardFooter>
								</TabsContent>
							</Tabs>
						</Card>
					))}
				</div>
			</div>

			<CheckoutDialog
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				selectedPlan={selectedPlan}
				planPrice={planPrice}
				totalPrice={totalPrice}
				familyMembers={memberCount}
				billingCycle={billingCycle}
				deductable={deductable}
				name={fullName}
				currency={currency}
				onSubmit={handleSubmit}
			/>
		</>
	);
}
