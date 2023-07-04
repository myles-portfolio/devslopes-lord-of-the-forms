import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

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

	const handleFormValidationCheck = (event: React.FormEvent) => {
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
		}
	};

	const handlePhoneInputChange = (index: number, value: string) => {
		if (value === "") {
			if (index > 0) {
				phoneInputsRefs[index - 1].current?.focus();
			}
		} else if (value.length === 2 && index < phoneInputsRefs.length - 1) {
			phoneInputsRefs[index + 1].current?.focus();
		}
	};

	return (
		<form onSubmit={handleFormValidationCheck}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* First Name Input */}
			<div className="input-wrap">
				<label>{"First Name"}:</label>
				<input
					placeholder="Bilbo"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			{showFirstNameError && (
				<ErrorMessage message={firstNameErrorMessage} show={true} />
			)}

			{/* Last Name Input */}
			<div className="input-wrap">
				<label>{"Last Name"}:</label>
				<input
					placeholder="Baggins"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

			{showLastNameError && (
				<ErrorMessage message={lastNameErrorMessage} show={true} />
			)}

			{/* Email Input */}
			<div className="input-wrap">
				<label>{"Email"}:</label>
				<input
					placeholder="bilbo-baggins@adventurehobbits.net"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			{showEmailError && (
				<ErrorMessage message={emailErrorMessage} show={true} />
			)}

			{/* City Input */}
			<div className="input-wrap">
				<label>{"City"}:</label>
				<select value={city} onChange={(e) => setCity(e.target.value)}>
					<option value="">Select a city</option>
					{allCities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>

			{showCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

			{/* Phone Number */}
			<div className="input-wrap">
				<label htmlFor="phone">Phone:</label>
				<div id="phone-input-wrap">
					{phoneInputsRefs.map((ref, index) => (
						<input
							key={index}
							type="text"
							id={`phone-input-${index + 1}`}
							placeholder="0"
							maxLength={index < 3 ? 2 : 1}
							pattern="[0-9]*"
							inputMode="numeric"
							ref={ref}
							onChange={(e) => handlePhoneInputChange(index, e.target.value)}
						/>
					))}
				</div>
			</div>

			{showPhoneError && (
				<ErrorMessage message={phoneNumberErrorMessage} show={true} />
			)}

			<input type="submit" value="Submit" />
		</form>
	);
};
