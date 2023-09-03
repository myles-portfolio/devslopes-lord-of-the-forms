import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { UserInformation } from "../types";

export const FunctionalApp = () => {
	const [userData, setUserData] = useState<UserInformation | null>(null);

	const handleFormSubmit = (data: UserInformation) => {
		setUserData(data);
	};

	return (
		<>
			<h2>Functional</h2>
			<ProfileInformation userData={userData} />
			<FunctionalForm onSubmit={handleFormSubmit} />
		</>
	);
};
