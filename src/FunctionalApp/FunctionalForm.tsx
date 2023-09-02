import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import {
	isCityValid,
	isEmailValid,
	isNameValid,
	isPhoneValid,
} from "../utils/validations";
import React from "react";
import { errorMessages } from "../utils/errorMessages";
import { CITIES } from "../utils/CITIES";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { FunctionalTextInput } from "./FunctionalTextInput";

interface FunctionalFormProps {
	onSubmit: (data: UserInformation) => void;
	phoneNumberInput: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

export const FunctionalForm = ({
	onSubmit,
	phoneNumberInput,
	setPhoneNumber,
}: FunctionalFormProps) => {
	const [firstNameInput, setFirstName] = useState("");
	const [lastNameInput, setLastName] = useState("");
	const [emailInput, setEmail] = useState("");
	const [cityInput, setCity] = useState("");

	const [isSubmitAttempted, setSubmitAttempted] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const showFirstNameError = isFormSubmitted && !isNameValid(firstNameInput);
	const showLastNameError = isFormSubmitted && !isNameValid(lastNameInput);
	const showEmailError = isFormSubmitted && !isEmailValid(emailInput);
	const showCityError = isFormSubmitted && !isCityValid(cityInput);
	const showPhoneError = isFormSubmitted && !isPhoneValid(phoneNumberInput);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const hasErrors =
			showFirstNameError ||
			showLastNameError ||
			showEmailError ||
			showCityError ||
			showPhoneError;

		if (hasErrors) {
			alert("Bad Inputs");
			setSubmitAttempted(true);
			return;
		} else {
			const userData: UserInformation = {
				firstName: firstNameInput,
				lastName: lastNameInput,
				email: emailInput,
				city: cityInput,
				phone: phoneNumberInput,
			};

			onSubmit(userData);
			setIsFormSubmitted(true);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* First Name Input */}
			<FunctionalTextInput
				label="First Name"
				placeholder="Bilbo"
				value={firstNameInput}
				onChange={setFirstName}
			/>

			{showFirstNameError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.firstName} show={true} />
			)}

			{/* Last Name Input */}
			<FunctionalTextInput
				label="Last Name"
				placeholder="Baggins"
				value={lastNameInput}
				onChange={setLastName}
			/>

			{showLastNameError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.lastName} show={true} />
			)}

			{/* Email Input */}
			<FunctionalTextInput
				label="Email"
				placeholder="bilbo-baggins@adventurehobbits.net"
				value={emailInput}
				onChange={setEmail}
			/>

			{showEmailError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.email} show={true} />
			)}

			{/* City Input */}
			<FunctionalTextInput
				label="City"
				placeholder="Hobbiton"
				value={cityInput}
				onChange={setCity}
				list="cities"
			/>
			<datalist id="cities">
				<option value="Hobbiton" />
				{CITIES.map((city) => (
					<option key={city} value={city} />
				))}
			</datalist>

			{showCityError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.city} show={true} />
			)}

			{/* Phone Number */}
			<FunctionalPhoneInput
				onPhoneChange={setPhoneNumber}
				isFormSubmitted={isFormSubmitted}
			/>

			{showPhoneError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.phoneNumber} show={true} />
			)}

			<input type="submit" value="Submit" />
		</form>
	);
};
