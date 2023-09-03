interface FunctionalTextInputProps {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	list?: string;
}

export const FunctionalTextInput: React.FC<FunctionalTextInputProps> = ({
	label,
	placeholder,
	value,
	onChange,
	list,
}) => {
	return (
		<div className="input-wrap">
			<label>{label}:</label>
			<input
				type="text"
				placeholder={placeholder || ""}
				value={value}
				list={list}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};
