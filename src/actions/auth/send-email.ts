"use server";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { z } from "zod";

// Load environment variables
dotenv.config();
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	message: z.string().min(10, {
		message: "Message must be at least 10 characters.",
	}),
});

export async function sendEmail(formData: FormData) {
	const validatedFields = formSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		message: formData.get("message"),
	});

	if (!validatedFields.success) {
		return { error: "Invalid form data. Please check your inputs." };
	}

	const { name, email, message } = validatedFields.data;

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || "587"),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.CONTACT_EMAIL,
			to: process.env.CONTACT_EMAIL,
			subject: `New contact form submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
		});

		return { success: true };
	} catch (error) {
		console.error("Failed to send email:", error);
		return { error: "Failed to send email. Please try again later." };
	}
}
