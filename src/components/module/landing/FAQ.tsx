"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "How long does the training take?",
		answer:
			"Most programs are completed within one to two days, with flexible scheduling.",
	},
	{
		question: "Is there a cost to participate?",
		answer:
			"Some programs are free, while others may have minimal fees based on the training type.",
	},
	{
		question: "What support is available after training?",
		answer:
			"Tilla Health offers ongoing support, including access to resources and a dedicated help desk.",
	},
];

export default function FAQSection() {
	return (
		<Accordion type="single" collapsible className="w-full">
			{faqs.map((faq, index) => (
				<AccordionItem key={index} value={`item-${index}`}>
					<AccordionTrigger className="text-left">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent>{faq.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
