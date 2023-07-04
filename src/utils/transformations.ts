export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPhoneNumber = (phoneNumber: string) => {
	return `${phoneNumber.substring(0, 2)}-${phoneNumber.substring(
		2,
		4
	)}-${phoneNumber.substring(4, 6)}-${phoneNumber.substring(6)}`;
};
