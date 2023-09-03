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

type FunctionalFormProps = {
	onSubmit: (data: UserInformation) => void;
};

export const FunctionalForm = ({ onSubmit }: FunctionalFormProps) => {
	const [showValidationErrors, setShowValidationErrors] = useState(false);
	const [firstNameInput, setFirstName] = useState("");
	const [lastNameInput, setLastName] = useState("");
	const [emailInput, setEmail] = useState("");
	const [cityInput, setCity] = useState("");
	const [phoneNumberInput, setPhoneNumber] = useState("");

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const hasErrors =
			!isNameValid(firstNameInput) ||
			!isNameValid(lastNameInput) ||
			!isEmailValid(emailInput) ||
			!isCityValid(cityInput) ||
			!isPhoneValid(phoneNumberInput);

		if (hasErrors) {
			setShowValidationErrors(true);
			alert("Bad Inputs");
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

			setFirstName("");
			setLastName("");
			setEmail("");
			setCity("");
			setPhoneNumber("");

			setShowValidationErrors(false);
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
				onChange={(newValue) => setFirstName(newValue)}
			/>

			{showValidationErrors && !isNameValid(firstNameInput) && (
				<ErrorMessage message={errorMessages.firstName} show={true} />
			)}

			{/* Last Name Input */}
			<FunctionalTextInput
				label="Last Name"
				placeholder="Baggins"
				value={lastNameInput}
				onChange={(newValue) => setLastName(newValue)}
			/>

			{showValidationErrors && !isNameValid(lastNameInput) && (
				<ErrorMessage message={errorMessages.lastName} show={true} />
			)}

			{/* Email Input */}
			<FunctionalTextInput
				label="Email"
				placeholder="bilbo-baggins@adventurehobbits.net"
				value={emailInput}
				onChange={(newValue) => setEmail(newValue)}
			/>

			{showValidationErrors && !isEmailValid(emailInput) && (
				<ErrorMessage message={errorMessages.email} show={true} />
			)}

			{/* City Input */}
			<FunctionalTextInput
				label="City"
				placeholder="Hobbiton"
				value={cityInput}
				onChange={(newValue) => setCity(newValue)}
				list="cities"
			/>
			<datalist id="cities">
				<option value="Hobbiton" />
				{CITIES.map((city) => (
					<option key={city} value={city} />
				))}
			</datalist>

			{showValidationErrors && !isCityValid(cityInput) && (
				<ErrorMessage message={errorMessages.city} show={true} />
			)}

			{/* Phone Number */}
			<FunctionalPhoneInput
				onPhoneChange={(newValue) => setPhoneNumber(newValue)}
				value={phoneNumberInput}
			/>

			{showValidationErrors && !isPhoneValid(phoneNumberInput) && (
				<ErrorMessage message={errorMessages.phoneNumber} show={true} />
			)}

			<input type="submit" value="Submit" />
		</form>
	);
};
