import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import React from "react";
import { errorMessages } from "../utils/messages";

export const FunctionalForm = ({
	onSubmit,
}: {
	onSubmit: (data: UserInformation) => void;
}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");

	const phoneInputsRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const [showFirstNameError, setShowFirstNameError] = useState(false);
	const [showLastNameError, setShowLastNameError] = useState(false);
	const [showEmailError, setShowEmailError] = useState(false);
	const [showCityError, setShowCityError] = useState(false);
	const [showPhoneError, setShowPhoneError] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		let isValid = true;

		if (firstName.length < 2) {
			setShowFirstNameError(true);
			isValid = false;
		} else {
			setShowFirstNameError(false);
		}

		if (lastName.length < 2) {
			setShowLastNameError(true);
			isValid = false;
		} else {
			setShowLastNameError(false);
		}

		if (!isEmailValid(email)) {
			setShowEmailError(true);
			isValid = false;
		} else {
			setShowEmailError(false);
		}

		if (city.length === 0) {
			setShowCityError(true);
			isValid = false;
		} else {
			setShowCityError(false);
		}

		const phoneNumber = phoneInputsRefs
			.map((ref) => ref.current?.value)
			.join("");
		if (!isPhoneValid(phoneNumber)) {
			setShowPhoneError(true);
			isValid = false;
		} else {
			setShowPhoneError(false);
		}

		if (isValid) {
			const userData: UserInformation = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				city: city,
				phone: phoneNumber,
			};

			onSubmit(userData);
			setIsFormSubmitted(true);
		}
	};

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFirstName(value);
		if (isFormSubmitted) {
			setShowFirstNameError(value.trim().length >= 2);
		} else {
			setShowFirstNameError(value.length >= 2 ? false : showFirstNameError);
		}
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLastName(value);
		if (isFormSubmitted) {
			setShowFirstNameError(value.trim().length >= 2);
		} else {
			setShowFirstNameError(value.length >= 2 ? false : showFirstNameError);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		if (isFormSubmitted) {
			setShowEmailError(!isEmailValid(value));
		}
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCity(value);
		if (isFormSubmitted) {
			setShowCityError(value.trim().length === 0);
		}
	};

	const handlePhoneInputChange = (index: number, value: string) => {
		if (value === "") {
			if (index > 0) {
				phoneInputsRefs[index - 1].current?.focus();
			}
			setShowPhoneError(false);
		} else if (value.length === 2 && index < phoneInputsRefs.length - 1) {
			phoneInputsRefs[index + 1].current?.focus();
		}
		if (isFormSubmitted) {
			setShowPhoneError(!isPhoneValid(value));
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* First Name Input */}
			<div className="input-wrap">
				<label>{"First Name"}:</label>
				<input
					placeholder="Bilbo"
					value={firstName}
					onChange={handleFirstNameChange}
				/>
			</div>

			{showFirstNameError && (
				<ErrorMessage message={errorMessages.firstName} show={true} />
			)}

			{/* Last Name Input */}
			<div className="input-wrap">
				<label>{"Last Name"}:</label>
				<input
					placeholder="Baggins"
					value={lastName}
					onChange={handleLastNameChange}
				/>
			</div>

			{showLastNameError && (
				<ErrorMessage message={errorMessages.lastName} show={true} />
			)}

			{/* Email Input */}
			<div className="input-wrap">
				<label>{"Email"}:</label>
				<input
					placeholder="bilbo-baggins@adventurehobbits.net"
					value={email}
					onChange={handleEmailChange}
				/>
			</div>

			{showEmailError && (
				<ErrorMessage message={errorMessages.email} show={true} />
			)}

			{/* City Input */}
			<div className="input-wrap">
				<label>{"City"}:</label>
				<input
					type="text"
					list="cities"
					value={city}
					placeholder="Hobbiton"
					onChange={handleCityChange}
				/>
				<datalist id="cities">
					<option value="Hobbiton" />
					{allCities.map((city) => (
						<option key={city} value={city} />
					))}
				</datalist>
			</div>

			{showCityError && (
				<ErrorMessage message={errorMessages.city} show={true} />
			)}

			{/* Phone Number */}
			<div className="input-wrap">
				<label htmlFor="phone">Phone:</label>
				<div id="phone-input-wrap">
					{phoneInputsRefs.map((ref, index) => (
						<React.Fragment key={index}>
							<input
								type="text"
								id={`phone-input-${index + 1}`}
								placeholder="0"
								maxLength={index < 3 ? 2 : 1}
								pattern="[0-9]*"
								inputMode="numeric"
								ref={ref}
								onChange={(e) => handlePhoneInputChange(index, e.target.value)}
							/>
							{index < 3 && <span className="phone-input-dash">-</span>}
						</React.Fragment>
					))}
				</div>
			</div>

			{showPhoneError && (
				<ErrorMessage message={errorMessages.phoneNumber} show={true} />
			)}

			<input type="submit" value="Submit" />
		</form>
	);
};
