import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import {
	isCityValid,
	isEmailValid,
	isNameValid,
	isPhoneValid,
} from "../utils/validations";
import { errorMessages } from "../utils/errorMessages";
import { CITIES } from "../utils/CITIES";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";

type ClassFormProps = {
	onSubmit: (data: UserInformation) => void;
};

type ClassFormState = {
	firstNameInput: string;
	lastNameInput: string;
	emailInput: string;
	cityInput: string;
	phoneNumberInput: string;
	resetPhoneInput: boolean;
	showValidationErrors: boolean;
};

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
	state: ClassFormState = {
		firstNameInput: "",
		lastNameInput: "",
		emailInput: "",
		cityInput: "",
		phoneNumberInput: "",
		resetPhoneInput: false,
		showValidationErrors: false,
	};

	handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const hasErrors =
			!isNameValid(this.state.firstNameInput) ||
			!isNameValid(this.state.lastNameInput) ||
			!isEmailValid(this.state.emailInput) ||
			!isCityValid(this.state.cityInput) ||
			!isPhoneValid(this.state.phoneNumberInput);

		if (hasErrors) {
			this.setState({ showValidationErrors: true });
			alert("Bad Inputs");
			return;
		} else {
			const userData: UserInformation = {
				firstName: this.state.firstNameInput,
				lastName: this.state.lastNameInput,
				email: this.state.emailInput,
				city: this.state.cityInput,
				phone: this.state.phoneNumberInput,
			};

			this.props.onSubmit(userData);
			this.setState({
				firstNameInput: "",
				lastNameInput: "",
				emailInput: "",
				cityInput: "",
				phoneNumberInput: "",
				showValidationErrors: false,
			});

			this.setState((prevState) => ({
				resetPhoneInput: !prevState.resetPhoneInput,
			}));
		}
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<u>
					<h3>User Information Form</h3>
				</u>

				{/* First Name Input */}
				<ClassTextInput
					label="First Name"
					placeholder="Bilbo"
					value={this.state.firstNameInput}
					onChange={(newValue) => this.setState({ firstNameInput: newValue })}
				/>

				{this.state.showValidationErrors &&
					!isNameValid(this.state.firstNameInput) && (
						<ErrorMessage message={errorMessages.firstName} show={true} />
					)}

				{/* Last Name Input */}
				<ClassTextInput
					label="Last Name"
					placeholder="Baggins"
					value={this.state.lastNameInput}
					onChange={(newValue) => this.setState({ lastNameInput: newValue })}
				/>

				{this.state.showValidationErrors &&
					!isNameValid(this.state.lastNameInput) && (
						<ErrorMessage message={errorMessages.lastName} show={true} />
					)}

				{/* Email Input */}
				<ClassTextInput
					label="Email"
					placeholder="bilbo-baggins@adventurehobbits.net"
					value={this.state.emailInput}
					onChange={(newValue) => this.setState({ emailInput: newValue })}
				/>

				{this.state.showValidationErrors &&
					!isEmailValid(this.state.emailInput) && (
						<ErrorMessage message={errorMessages.email} show={true} />
					)}

				{/* City Input */}
				<ClassTextInput
					label="City"
					placeholder="Hobbiton"
					value={this.state.cityInput}
					onChange={(newValue) => this.setState({ cityInput: newValue })}
					list="cities"
				/>

				<datalist id="cities">
					<option value="Hobbiton" />
					{CITIES.map((city) => (
						<option key={city} value={city} />
					))}
				</datalist>

				{this.state.showValidationErrors &&
					!isCityValid(this.state.cityInput) && (
						<ErrorMessage message={errorMessages.city} show={true} />
					)}

				{/* Phone Number */}
				<ClassPhoneInput
					onChange={(newValue) => this.setState({ phoneNumberInput: newValue })}
					value={this.state.phoneNumberInput}
					reset={this.state.resetPhoneInput}
				/>

				{this.state.showValidationErrors &&
					!isPhoneValid(this.state.phoneNumberInput) && (
						<ErrorMessage message={errorMessages.phoneNumber} show={true} />
					)}

				<input type="submit" value="Submit" />
			</form>
		);
	}
}
