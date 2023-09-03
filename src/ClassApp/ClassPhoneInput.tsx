import React, { Component } from "react";

type ClassPhoneInputProps = {
	value: string;
	onChange: (value: string) => void;
	reset: boolean;
};

export class ClassPhoneInput extends Component<ClassPhoneInputProps> {
	phoneInputsRefs = [
		React.createRef<HTMLInputElement>(),
		React.createRef<HTMLInputElement>(),
		React.createRef<HTMLInputElement>(),
		React.createRef<HTMLInputElement>(),
	];

	state = {
		phoneParts: ["", "", "", ""],
	};

	componentDidUpdate(prevProps: ClassPhoneInputProps) {
		if (prevProps.reset !== this.props.reset) {
			this.setState({ phoneParts: ["", "", "", ""] });
		}
	}

	handlePhoneInputChange = (index: number, value: string) => {
		if (!/^[0-9]*$/.test(value)) {
			return;
		}

		const updatedPhoneParts = [...this.state.phoneParts];
		updatedPhoneParts[index] = value;

		this.setState({ phoneParts: updatedPhoneParts });

		if (value === "") {
			if (index > 0) {
				this.phoneInputsRefs[index - 1].current?.focus();
			}
		} else if (value.length === 2 && index < this.phoneInputsRefs.length - 1) {
			this.phoneInputsRefs[index + 1].current?.focus();
		}

		const phoneStr = updatedPhoneParts.join("");
		this.props.onChange(phoneStr);
	};

	render() {
		return (
			<div className="input-wrap">
				<label htmlFor="phone">Phone:</label>
				<div id="phone-input-wrap">
					{this.phoneInputsRefs.map((ref, index) => (
						<React.Fragment key={index}>
							<input
								type="text"
								id={`phone-input-${index + 1}`}
								placeholder="0"
								maxLength={index < 3 ? 2 : 1}
								pattern="[0-9]*"
								inputMode="numeric"
								ref={ref}
								onChange={(e) =>
									this.handlePhoneInputChange(index, e.target.value)
								}
								value={this.state.phoneParts[index]}
							/>
							{index < 3 && <span className="phone-input-dash">-</span>}
						</React.Fragment>
					))}
				</div>
			</div>
		);
	}
}
