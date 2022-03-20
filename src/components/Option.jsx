function Option(props) {
	let cname = "";
	if (props.isCheck) {
		if (props.isCorrect) {
			cname = "correct";
		} else if (props.selected && !props.isCorrect) {
			cname = "incorrect";
		} else {
			cname = "";
		}
	}

	return (
		<button
			className={`option ${props.selected ? "selected" : ""} ${cname}`}
			onClick={props.select}
		>
			{props.option}
		</button>
	);
}

export default Option;
