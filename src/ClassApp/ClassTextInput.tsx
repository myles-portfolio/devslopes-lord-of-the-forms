import React, { Component } from "react";

interface TextInputProps {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	list?: string;
}

export class ClassTextInput extends Component<TextInputProps> {
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.value);
	};

	render() {
		const { label, placeholder, value, list } = this.props;
		return (
			<div className="input-wrap">
				<label>{label}:</label>
				<input
					type="text"
					placeholder={placeholder || ""}
					value={value}
					list={list}
					onChange={this.handleInputChange}
				/>
			</div>
		);
	}
}
