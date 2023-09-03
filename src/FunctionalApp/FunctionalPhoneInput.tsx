import { useEffect, useRef, useState } from "react";
import React from "react";

interface FunctionalPhoneInputProps {
	onPhoneChange: (phone: string) => void;
	value: string;
}

export const FunctionalPhoneInput = ({
	onPhoneChange,
	value,
}: FunctionalPhoneInputProps) => {
	const phoneInputsRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const [phoneParts, setPhoneParts] = useState(() => {
		const parts: string[] = value.match(/.{1,2}/g) || [];
		while (parts.length < 4) {
			parts.push("");
		}
		return parts;
	});

	// Update the phoneParts state when the value prop changes
	useEffect(() => {
		const parts: string[] = value.match(/.{1,2}/g) || [];
		while (parts.length < 4) {
			parts.push("");
		}
		setPhoneParts(parts);
	}, [value]);

	const handlePhoneInputChange = (index: number, value: string) => {
		if (!/^[0-9]*$/.test(value)) {
			return;
		}

		const updatedPhoneParts = [...phoneParts];
		updatedPhoneParts[index] = value;

		setPhoneParts(updatedPhoneParts);

		if (value === "") {
			if (index > 0) {
				phoneInputsRefs[index - 1].current?.focus();
			}
		} else if (value.length === 2 && index < phoneInputsRefs.length - 1) {
			phoneInputsRefs[index + 1].current?.focus();
		}

		const phoneStr = updatedPhoneParts.join("");

		onPhoneChange(phoneStr);
	};

	return (
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
							value={phoneParts[index]}
						/>
						{index < 3 && <span className="phone-input-dash">-</span>}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
