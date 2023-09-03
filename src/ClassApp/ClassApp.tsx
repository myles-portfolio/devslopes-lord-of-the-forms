import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
interface State {
	userData: UserInformation | null;
	phoneNumberInput: string;
}
export class ClassApp extends Component<Record<string, never>, State> {
	state: State = {
		userData: null,
		phoneNumberInput: "",
	};

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
