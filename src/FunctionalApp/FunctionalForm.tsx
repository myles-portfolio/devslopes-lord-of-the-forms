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
	/* Input States */
	const [firstNameInput, setFirstName] = useState("");
	const [lastNameInput, setLastName] = useState("");
	const [emailInput, setEmail] = useState("");
	const [cityInput, setCity] = useState("");

	/* Form States */
	const [isSubmitAttempted, setSubmitAttempted] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	/* Error States */
	const [showFirstNameError, setShowFirstNameError] = useState(false);
	const [showLastNameError, setShowLastNameError] = useState(false);
	const [showEmailError, setShowEmailError] = useState(false);
	const [showCityError, setShowCityError] = useState(false);
	const [showPhoneError, setShowPhoneError] = useState(false);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setSubmitAttempted(true);

		setShowFirstNameError(!isNameValid(firstNameInput));
		setShowLastNameError(!isNameValid(lastNameInput));
		setShowEmailError(!isEmailValid(emailInput));
		setShowCityError(!isCityValid(cityInput));
		setShowPhoneError(!isPhoneValid(phoneNumberInput));

		const hasErrors =
			!isNameValid(firstNameInput) ||
			!isNameValid(lastNameInput) ||
			!isEmailValid(emailInput) ||
			!isCityValid(cityInput) ||
			!isPhoneValid(phoneNumberInput);

		if (hasErrors) {
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
			setIsFormSubmitted(true);
		}
	};

	const handleFirstNameChange = (name: string) => {
		setFirstName(name);
		if (isSubmitAttempted) {
			setShowFirstNameError(!isNameValid(name));
		}
	};

	const handleLastNameChange = (name: string) => {
		setLastName(name);
		if (isSubmitAttempted) {
			setShowLastNameError(!isNameValid(name));
		}
	};

	const handleEmailChange = (email: string) => {
		setEmail(email);
		if (isSubmitAttempted) {
			setShowEmailError(!isEmailValid(email));
		}
	};

	const handleCityChange = (city: string) => {
		setCity(city);
		if (isSubmitAttempted) {
			setShowCityError(!isCityValid(city));
		}
	};

	const handlePhoneChange = (phone: string) => {
		setPhoneNumber(phone);
		if (isSubmitAttempted) {
			setShowPhoneError(!isPhoneValid(phone));
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
				onChange={handleFirstNameChange}
			/>

			{showFirstNameError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.firstName} show={true} />
			)}

			{/* Last Name Input */}
			<FunctionalTextInput
				label="Last Name"
				placeholder="Baggins"
				value={lastNameInput}
				onChange={handleLastNameChange}
			/>

			{showLastNameError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.lastName} show={true} />
			)}

			{/* Email Input */}
			<FunctionalTextInput
				label="Email"
				placeholder="bilbo-baggins@adventurehobbits.net"
				value={emailInput}
				onChange={handleEmailChange}
			/>

			{showEmailError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.email} show={true} />
			)}

			{/* City Input */}
			<FunctionalTextInput
				label="City"
				placeholder="Hobbiton"
				value={cityInput}
				onChange={handleCityChange}
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
				onPhoneChange={handlePhoneChange}
				isFormSubmitted={isFormSubmitted}
			/>

			{showPhoneError && isSubmitAttempted && (
				<ErrorMessage message={errorMessages.phoneNumber} show={true} />
			)}

			<input type="submit" value="Submit" />
		</form>
	);
};
