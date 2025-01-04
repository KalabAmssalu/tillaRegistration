"use server";

import {
	type ProviderType,
	TrainingOrgType,
	TrainingType,
} from "@/types/provider/ProviderType";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function setProvider(data: ProviderType) {
	try {
		console.log("data", data);
		const response = await axiosInstance.post("providers", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "New Provider is created!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function setOrgtraining(data: TrainingOrgType) {
	try {
		console.log("data", data);
		const response = await axiosInstance.post("providers", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Registr for trianing is successful!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setIndividualtraining(data: TrainingType) {
	try {
		console.log("data", data);
		const response = await axiosInstance.post("providers", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Registr for trianing is successful!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
