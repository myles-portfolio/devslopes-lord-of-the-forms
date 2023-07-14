import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
interface State {
	userData: UserInformation;
}

const defaultUser: UserInformation = {
	email: "default@default.com",
	firstName: "Default",
	lastName: "Default",
	phone: "1234567",
	city: "Hobbiton",
};

export class ClassApp extends Component<Record<string, never>, State> {
	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			userData: defaultUser,
		};
	}

	handleFormSubmit = (data: UserInformation) => {
		this.setState({ userData: data });
	};

	render() {
		const { userData } = this.state;

		return (
			<>
				<h2>Class</h2>
				<ProfileInformation userData={userData} />
				<ClassForm onSubmit={this.handleFormSubmit} />
			</>
		);
	}
}
