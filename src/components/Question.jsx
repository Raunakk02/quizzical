import Option from "./Option";

function Question(props) {
	return (
		<div className="question">
			<h4>{props.ques}</h4>
			{props.options.map((o, i) => (
				<Option
					key={i}
					option={o}
					select={() => props.select(o)}
					isCheck={props.isCheck}
					isCorrect={o === props.ca}
					selected={
						props.selected !== null && o === props.selected ? true : false
					}
				/>
			))}
			<hr />
		</div>
	);
}

export default Question;
