import { NextResponse } from "next/server";

import supportData from "@/constants/chats/supportData.json";

// Define the types for SubKeyword and Keyword
interface SubKeyword {
	title: string;
	answer?: string;
	link?: string | null;
	subKeywords?: SubKeyword[] | null;
}

interface Keyword {
	title: string;
	subKeywords: SubKeyword[] | null;
}

/**
 * Recursively finds a SubKeyword in the hierarchy based on the provided path.
 * @param keywords - List of Keywords to search in.
 * @param path - Array representing the hierarchical path of titles.
 * @returns SubKeyword if found, or null.
 */
function findSubKeyword(
	keywords: Keyword[],
	path: string[]
): SubKeyword | null {
	// Start by finding the root keyword matching the first element in the path
	let current: Keyword | SubKeyword | undefined = keywords.find(
		(k) => k.title === path[0]
	);

	// Traverse through the path to find the desired sub-keyword
	for (let i = 1; i < path.length; i++) {
		if (!current || !current.subKeywords) return null; // Exit if no match or no sub-keywords
		current = current.subKeywords.find((sk) => sk.title === path[i]);
	}

	// Return the found sub-keyword or null if not found
	return (current as SubKeyword) || null;
}

/**
 * Handles incoming POST requests for various actions like retrieving keywords, sub-keywords, or answers.
 * @param req - Incoming HTTP Request
 * @returns Response containing the requested data or an error message.
 */
export async function POST(req: Request) {
	try {
		const { action, path } = await req.json();

		// Handle different actions based on the request
		switch (action) {
			case "getKeywords": {
				// Wrap the block to avoid lexical declaration issues
				return NextResponse.json(
					supportData.map((item: Keyword) => item.title),
					{ status: 200 }
				);
			}

			case "getSubKeywords": {
				// Wrap the block to declare `subKeyword` safely
				const subKeyword: SubKeyword | null = findSubKeyword(
					supportData as Keyword[],
					path
				);
				if (subKeyword?.subKeywords) {
					return NextResponse.json(
						subKeyword.subKeywords.map((item: SubKeyword) => item.title),
						{ status: 200 }
					);
				}
				return NextResponse.json([], { status: 200 });
			}

			case "getAnswer": {
				// Wrap the block to declare `answer` safely
				const answer: SubKeyword | null = findSubKeyword(
					supportData as Keyword[],
					path
				);
				if (answer) {
					return NextResponse.json(answer, { status: 200 });
				}
				break;
			}

			default: {
				// Handle unsupported actions
				return NextResponse.json(
					{ error: `Unsupported action: ${action}` },
					{ status: 400 }
				);
			}
		}

		// Default response for unhandled cases
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	} catch (error) {
		// Handle any errors during processing
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing your request." },
			{ status: 500 }
		);
	}
}
