"use server";

export const getCurrencyExchangeRate = async (
	currency: string
): Promise<number> => {
	const API_KEY = process.env.CURRENCY_KEY;
	if (!API_KEY) {
		throw new Error("API key is missing");
	}

	const url =
		"https://v6.exchangerate-api.com/v6/e24d6fefdbff56c2db929f40/pair/USD/ETB";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Failed to fetch exchange rates");
		}

		const data = await response.json();
		// console.log("data exchange", data);
		const rate = data.conversion_rate;

		return rate;
	} catch (error) {
		console.error("Error fetching exchange rate:", error);
		throw error; // Re-throw to handle it in the calling function
	}
};
