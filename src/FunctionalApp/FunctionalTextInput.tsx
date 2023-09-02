import React, { FC } from "react";

interface FunctionalTextInputProps {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	list?: string;
}

export const FunctionalTextInput: FC<FunctionalTextInputProps> = ({
	label,
	placeholder,
	value,
	onChange,
	list,
}) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="input-wrap">
			<label>{label}:</label>
			<input
				type="text"
				placeholder={placeholder || ""}
				value={value}
				list={list}
				onChange={handleInputChange}
			/>
		</div>
	);
};
