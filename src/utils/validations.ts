import { CITIES } from "./CITIES";

export function isEmailValid(emailAddress: string) {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return !!emailAddress.match(regex);
}

export const isPhoneValid = (phoneNumber: string): boolean => {
	if (phoneNumber.length !== 7) {
		return false;
	}

	for (let i = 0; i < phoneNumber.length; i++) {
		if (!/^[0-9]+$/.test(phoneNumber[i])) {
			return false;
		}
	}

	return true;
};

export const isCityValid = (city: string): boolean => {
	const cityLowercase = city.toLowerCase();
	return CITIES.some((cityItem) => cityItem.toLowerCase() === cityLowercase);
};

export const isNameValid = (name: string): boolean => {
	const regex = /^[a-zA-Z-' ]+$/;
	return regex.test(name) && name.length >= 2;
};
