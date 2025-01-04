import React, { useEffect, useState } from "react";

import { getCurrencyExchangeRate } from "@/actions/pricing/currency";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils/currencyUtils";
import { type PricingTier } from "@/types/pricing/PricingType";

interface PricingDisplayProps {
	tier: PricingTier;
	billingCycle: "monthly" | "yearly";
	isNonDeductible?: boolean;
}

export const PricingDisplay: React.FC<PricingDisplayProps> = ({
	tier,
	billingCycle,
	isNonDeductible = false,
}) => {
	const [etbPrice, setEtbPrice] = useState<number | null>(null);
	const [etbDeductible, setEtbDeductible] = useState<number | null>(null);

	useEffect(() => {
		const convertPrices = async () => {
			const exchangeRate = await getCurrencyExchangeRate("ETB");
			if (isNonDeductible) {
				const usdPrice = tier.non_deductible.price[billingCycle];
				setEtbPrice(usdPrice * exchangeRate);
				setEtbDeductible(tier.with_deductible.deductible_amount * exchangeRate);
			} else {
				const usdPrice = tier.with_deductible.price[billingCycle];
				setEtbPrice(usdPrice * exchangeRate);
				setEtbDeductible(tier.with_deductible.deductible_amount * exchangeRate);
			}
		};

		convertPrices();
	}, [tier, billingCycle, isNonDeductible]);

	return (
		<div className="flex flex-col space-y-4">
			{etbPrice ? (
				<div className="flex items-center justify-center gap-2">
					<div>
						<p className="text-primary">
							{!isNonDeductible
								? formatCurrency(
										tier.with_deductible.price[billingCycle],
										"USD"
									)
								: formatCurrency(
										tier.non_deductible.price[billingCycle],
										"USD"
									)}
						</p>
						<div className="text-sm font-normal text-muted-foreground">
							{etbPrice && ` ${formatCurrency(etbPrice, "ETB")}`}
						</div>
					</div>
					<span className="font-normal text-muted-foreground">
						/{billingCycle === "monthly" ? "mo" : "yr"}
					</span>
				</div>
			) : (
				<Skeleton className="h-14 bg-muted w-full" />
			)}
			{!isNonDeductible && (
				<div className="flex items-center justify-center">
					<span className="text-sm font-normal text-muted-foreground">
						Deductable{" "}
					</span>
					<span className="text-sm font-normal pl-1 text-muted-foreground">
						{formatCurrency(tier.with_deductible.deductible_amount, "USD")}
						{etbDeductible && ` /  ${formatCurrency(etbDeductible, "ETB")}`}
					</span>
				</div>
			)}
		</div>
	);
};
