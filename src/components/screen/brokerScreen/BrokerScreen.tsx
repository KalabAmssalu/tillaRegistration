"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import { HeroHighlightDemo } from "@/components/module/landing/HeroHighLight";
import { PartnerSlider } from "@/components/module/landing/PartnerSlider";
import BrokerHero from "@/components/module/landing/broker/HeroBroker";
import { IMAGES } from "@/constants/files";

gsap.registerPlugin(ScrollTrigger);

export default function BrokerScreen() {
	const mainRef = useRef(null);
	const t = useTranslations();
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".animate-fade-in", {
				opacity: 0,
				y: 50,
				duration: 1,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".animate-fade-in",
					start: "top 80%",
				},
			});
		}, mainRef);

		return () => ctx.revert();
	}, []);

	const partner = [
		{ name: "blacklionlogo", logo: IMAGES.blackLion },
		{ name: "who", logo: IMAGES.whoLogo },
		{ name: "moh", logo: IMAGES.mohLogo },
		{ name: "paulos", logo: IMAGES.paulosLog },
		{ name: "redcrosslogo", logo: IMAGES.redCrossLog },
		{ name: "pauloslogo", logo: IMAGES.paulosLog },
		{ name: "mohlogo", logo: IMAGES.mohLogo },
		{ name: "blacklion", logo: IMAGES.blackLion },
	];
	return (
		<div className="flex flex-col min-h-screen">
			<main ref={mainRef} className="min-h-screen bg-background">
				<HeroHighlightDemo
					text="Your Health, Our Priority."
					link="/broker/broker_or_agent"
					btnText="Register as a Broker"
				/>

				{/* <DiscoverPlans /> */}
				{/* <Features /> */}
				<BrokerHero />
				<PartnerSlider partners={partner} />
				{/* <Testimonials /> */}

				<CTA
					text="Grow Your Business with Tilla Health"
					link="/broker"
					description={[
						// "Our Provider Portal is a secure, all-in-one platform to manage your interactions with Tilla Health.",
						// "Joining the Provider Portal is easy.",
						"New brokers can [Register Here] to submit their information and complete the onboarding process.",
					]}
					btnText="Launch the Portal"
					registerLink="/broker"
					slug="broker-portal"
				/>
			</main>
		</div>
	);
}
