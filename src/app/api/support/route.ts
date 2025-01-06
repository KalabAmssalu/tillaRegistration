import { NextResponse } from "next/server";

import supportData from "@/constants/chats/supportData.json";

// Handle POST requests
export async function POST(req: Request) {
	try {
		const { message } = await req.json();

		if (!message) {
			return NextResponse.json(
				{ error: "Message is required" },
				{ status: 400 }
			);
		}

		const lowerCaseMessage = message.toLowerCase();

		// Find the best matching answer
		const response = supportData.find((item) =>
			item.keywords.some((keyword) => lowerCaseMessage.includes(keyword))
		);

		if (response) {
			return NextResponse.json(
				{
					answer: response.answer,
					link: response.link || null, // Include link if present
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ answer: "Sorry, I couldn't find an answer to your question." },
				{ status: 404 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while processing your request." },
			{ status: 500 }
		);
	}
}

// Handle other HTTP methods
export function GET() {
	return NextResponse.json(
		{ error: "Method not allowed. Use POST instead." },
		{ status: 405 }
	);
}
