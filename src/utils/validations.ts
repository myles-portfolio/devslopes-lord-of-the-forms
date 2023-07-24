export function isEmailValid(emailAddress: string) {
	// eslint-disable-next-line no-useless-escape
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
