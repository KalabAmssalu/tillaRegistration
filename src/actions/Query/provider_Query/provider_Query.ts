import {
	setIndividualtraining,
	setOrgtraining,
	setProvider,
} from "@/actions/provider/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { ClearUserSlice } from "@/lib/store/redux/userSlice";
import {
	type ProviderType,
	TrainingOrgType,
	TrainingType,
} from "@/types/provider/ProviderType";

export const useAddproviderMutation = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<ProviderType>(
		"addprovider",
		setProvider,
		"Provider creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the broker data you passed in
				console.log("provider created successfully:", data.message);
				console.log("New provider Data:", variables);
				dispatch(ClearUserSlice());
				// queryClient.invalidateQueries({ queryKey: ["providers"] });
				// Example: Display a message with the provider name
			},
			onError: (error) => {
				console.error("Error creating provider:", error.response.data);
			},
		}
	);
};

export const useAddorgtrainingMutation = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<TrainingOrgType>(
		"addOrgtraining",
		setOrgtraining,
		"Request creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the broker data you passed in
				console.log("Request for training created successfully:", data.message);
				console.log("New training Data:", variables);
				dispatch(ClearUserSlice());
				// queryClient.invalidateQueries({ queryKey: ["providers"] });
				// Example: Display a message with the provider name
			},
			onError: (error) => {
				console.error("Error creating Training:", error.response.data);
			},
		}
	);
};

export const useAddindividualtrainingMutation = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<TrainingType>(
		"addIndividualtraining",
		setIndividualtraining,
		"Request creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the broker data you passed in
				console.log("Request for training created successfully:", data.message);
				console.log("New training Data:", variables);
				dispatch(ClearUserSlice());
				// queryClient.invalidateQueries({ queryKey: ["providers"] });
				// Example: Display a message with the provider name
			},
			onError: (error) => {
				console.error("Error creating Training:", error.response.data);
			},
		}
	);
};
