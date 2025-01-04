import { type IMAGES } from "@/constants/files";

import { HeroInfo } from "../HeroInfo";

const ProviderPortals = [
	{
		title: "Make provider changes",
		description: "Learn how to submit changes via Tilla PROVIDER WEB PORTAL...",
		image: "doctor2" as keyof typeof IMAGES,
		href: "/provider/info-update",
		slug: "provider-information-updates",
		linkText: "Make Changes to Providers Information →",
	},
	{
		title: "Provider Support Resources",
		description:
			"View important news, alerts, newsletters, provider manuals and more for providers.",
		image: "provider5" as keyof typeof IMAGES,
		href: "/provider/provider-resources",
		slug: "provider-resource",
		linkText: "View Providers Resources →",
	},
	{
		title: "Claims, Appeals, and Grievances",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "claimform2" as keyof typeof IMAGES,
		href: "/provider/claim-appeal-grievance",
		slug: "claims-appeals-grievances",
		linkText: "Learn More About Claims, Appeals, and Grievances →",
	},
];

export default function ProviderHero() {
	return <HeroInfo title="Additional Information" portals={ProviderPortals} />;
}
