export type Messages = {
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	phoneNumber: string;
};

export const errorMessages: Messages = {
	firstName: "First name must be at least 2 characters long",
	lastName: "Last name must be at least 2 characters long",
	email: "Email is Invalid",
	city: "City is Invalid",
	phoneNumber: "Invalid Phone Number",
};
