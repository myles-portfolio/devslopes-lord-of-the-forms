import React, { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import { allCities } from "../utils/all-cities";
import { errorMessages, isEmailValid } from "../utils/validations";

export class ClassForm extends Component<{
	onSubmit: (data: UserInformation) => void;
}> {
	firstNameRef = createRef<HTMLInputElement>();
	lastNameRef = createRef<HTMLInputElement>();
	emailRef = createRef<HTMLInputElement>();
	cityRef = createRef<HTMLSelectElement>();
	phoneInputsRefs = [
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
		createRef<HTMLInputElement>(),
	];

	state = {
		firstName: "",
		lastName: "",
		email: "",
		city: "",
		showFirstNameError: false,
		showLastNameError: false,
		showEmailError: false,
		showCityError: false,
		showPhoneError: false,
	};

	handleFormValidationCheck = (event: React.FormEvent) => {
		event.preventDefault();

		const { firstName, lastName, email, city } = this.state;

		const errors = {
			firstName: firstName.length < 2,
			lastName: lastName.length < 2,
			email: !isEmailValid(email),
			city: city.length === 0,
		};

		this.setState({
			showFirstNameError: errors.firstName,
			showLastNameError: errors.lastName,
			showEmailError: errors.email,
			showCityError: errors.city,
		});

		const isValid = !Object.values(errors).some((error) => error);

		if (isValid) {
			const phoneNumber = this.phoneInputsRefs
				.map((ref) => ref.current?.value)
				.join("");

			const userData: UserInformation = {
				firstName,
				lastName,
				email,
				city,
				phone: phoneNumber,
			};

			this.props.onSubmit(userData);
		}
	};

	handlePhoneInputChange = (index: number, value: string) => {
		if (value === "") {
			if (index > 0) {
				this.phoneInputsRefs[index - 1].current?.focus();
			}
		} else if (value.length === 2 && index < this.phoneInputsRefs.length - 1) {
			this.phoneInputsRefs[index + 1].current?.focus();
		}
	};

	render() {
		const {
			firstName,
			lastName,
			email,
			city,
			showFirstNameError,
			showLastNameError,
			showEmailError,
			showCityError,
			showPhoneError,
		} = this.state;

		return (
			<form onSubmit={this.handleFormValidationCheck}>
				<u>
					<h3>User Information Form</h3>
				</u>

				{/* First Name Input */}
				<div className="input-wrap">
					<label>{"First Name"}:</label>
					<input
						placeholder="Bilbo"
						value={firstName}
						onChange={(e) => this.setState({ firstName: e.target.value })}
						ref={this.firstNameRef}
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
						onChange={(e) => this.setState({ lastName: e.target.value })}
						ref={this.lastNameRef}
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
						onChange={(e) => this.setState({ email: e.target.value })}
						ref={this.emailRef}
					/>
				</div>

				{showEmailError && (
					<ErrorMessage message={errorMessages.email} show={true} />
				)}

				{/* City Input */}
				<div className="input-wrap">
					<label>{"City"}:</label>
					<select
						value={city}
						onChange={(e) => this.setState({ city: e.target.value })}
						style={{ width: "100%", maxWidth: "310px" }}
						ref={this.cityRef}
					>
						<option value="">Select a city</option>
						{allCities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>

				{showCityError && (
					<ErrorMessage message={errorMessages.city} show={true} />
				)}

				{/* Phone Number */}
				<div className="input-wrap">
					<label htmlFor="phone">Phone:</label>
					<div id="phone-input-wrap">
						{this.phoneInputsRefs.map((ref, index) => (
							<React.Fragment key={index}>
								<input
									type="text"
									id={`phone-input-${index + 1}`}
									placeholder="0"
									maxLength={index < 3 ? 2 : 1}
									pattern="[0-9]*"
									inputMode="numeric"
									ref={ref}
									onChange={(e) =>
										this.handlePhoneInputChange(index, e.target.value)
									}
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
	}
}
