"use client";

import { useRouter } from "next/navigation";

import { FileDown, Globe, MapPin } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/lib/utils/fileDownload";

const ProviderOptions = [
	{ label: "Based in Ethiopia", icon: <MapPin size={16} />, value: "local" },
	{
		label: "Based outside of Ethiopia",
		icon: <Globe size={16} />,
		value: "inter",
	},
];

export default function ProviderSelection() {
	const router = useRouter();

	const handleSelection = (option: { label: string; value: string }) => {
		const query = `workplace=${option.value.toLowerCase()}`;
		router.push(`/provider/register?${query}` as `/${string}`);
	};

	// const handleDownload = () => {
	// 	downloadFile(
	// 		`${window.location.origin}/docs/Tilla_Health_Provider_Guide.pdf`,
	// 		"Tilla_Health_Provider_Guide.pdf"
	// 	);
	// };

	return (
		<>
			<BreadcrumbNav
				items={[
					{ label: "Provider Registration", href: "/provider" },
					{ label: "Choose Your Place of Work" },
				]}
			/>

			<ReusableHero
				title="Where is your company based?"
				description="Please select whether you are a Local or an International provider to continue with your registration."
				options={ProviderOptions.map((option) => ({
					...option,
					onClick: () => handleSelection(option),
				}))}
				footerText="Need assistance?"
				footerLink={{ label: "Contact Support", href: "/support" }}
				// additionalComponent={
				// 	<div className="flex items-center justify-center flex-col gap-2">
				// 		<div className="text-lg text-white text-center">
				// 			CLick Here to download a Document to Join the Tilla Health
				// 			Provider Network
				// 		</div>

				// 		<Button
				// 			onClick={handleDownload}
				// 			className="px-6 py-2 flex gap-2 border-2 animate-pulse hover:bg-primary hover:animate-none bg-blue-700 border-white"
				// 		>
				// 			Download
				// 			<FileDown size={24} />
				// 		</Button>
				// 	</div>
				// }
			/>
		</>
	);
}
