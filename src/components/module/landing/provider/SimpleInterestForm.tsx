"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	practiceName: z
		.string()
		.min(2, {
			message: "Practice name must be at least 2 characters.",
		})
		.optional(),
	email: z
		.string()
		.email({
			message: "Please enter a valid email address.",
		})
		.optional(),
	phone: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, {
			message: "Please enter a valid phone number.",
		})
		.optional(),
	specialization: z
		.string()
		.min(2, {
			message: "Specialization must be at least 2 characters.",
		})
		.optional(),
	message: z
		.string()
		.max(10000, {
			message: "Message must be at least 10 characters.",
		})
		.optional(),
});

export default function SimpleInterestForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			practiceName: "",
			email: "",
			phone: "",
			specialization: "",
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			toast({
				title: "Sign Up Successful",
				description: "Thank you for your interest. We will contact you soon.",
			});
			console.log("submited form", values);
		}, 2000);
	}

	return (
		<div className="flex flex-col-reverse md:flex-row container w-full gap-8 bg-primary py-10 p-6 rounded-lg">
			<div className="space-y-8 md:w-1/3 w-full">
				<Card>
					<CardHeader>
						<CardTitle className="text-primary dark:text-foreground text-xl">
							Get in Touch
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-3">
							<Mail className="h-5 w-5 " />
							<a
								href="mailto:info@tillahealth.com"
								className="text-primary dark:text-foreground hover:underline"
							>
								support@tillahealth.com
							</a>
						</div>
						<div className="flex items-center space-x-3">
							<Phone className="h-5 w-5 " />
							<a
								href="tel:+251-968658292"
								className="text-primary dark:text-foreground hover:underline"
							>
								+251-968658292
							</a>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-primary text-xl  dark:text-foreground">
							Visit Us
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-3">
							<MapPin className="h-5 w-5 text-muted-foreground" />
							<p className="text-muted-foreground">
								Tilla Health, 123 Health St, Wellness City, Healthland
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
			<Card className="md:w-2/3 w-full">
				<CardHeader>
					<CardTitle>Education Program Sign Up</CardTitle>
					<CardDescription>
						Please fill out the form below to express your interest.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="flex md:flex-row flex-col justify-between gap-4 w-full">
								<div className="w-full space-y-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder="Dr. Jane Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="practiceName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Practice Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Sunshine Medical Center"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="jane.doe@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number</FormLabel>
												<FormControl>
													<Input
														type="tel"
														placeholder="+1234567890"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-full space-y-6 ">
									<FormField
										control={form.control}
										name="specialization"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Specialization/Area of Practice</FormLabel>
												<FormControl>
													<Input placeholder="Cardiology" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Your message"
														className="min-h-[120px]"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Sign Up"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
