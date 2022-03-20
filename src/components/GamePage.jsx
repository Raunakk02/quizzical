import { useEffect, useState } from "react";
import Question from "./Question";

function GamePage() {
	const [questions, setQuestions] = useState([]);
	const [reset, setReset] = useState(false);
	const [isCheck, setIsCheck] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
			.then((res) => res.json())
			.then((res) => {
				const fetchedQuestions = res.results.map((d) => {
					const ques = decodeURIComponent(d.question);
					const ca = decodeURIComponent(d.correct_answer);
					const ia = d.incorrect_answers.map((a) => decodeURIComponent(a));
					const ri = Math.round(Math.random() * 4);
					const options = [...ia.slice(0, ri), ca, ...ia.slice(ri)];
					return {
						ques: ques,
						ca: ca,
						options: options,
						selected: null,
					};
				});
				console.log(fetchedQuestions);
				setQuestions(fetchedQuestions);
			});
	}, [reset]);

	function selectOption(o, i) {
		// console.log("selctedddd:: ", o, i);
		setQuestions((prev) => {
			return prev.map((q, index) => {
				return index === i ? { ...q, selected: o } : q;
			});
		});
	}
	// console.log(questions);

	function checkAnswers() {
		setIsCheck(true);
		let sc = 0;
		questions.forEach((q) => {
			if (q.ca === q.selected) sc++;
		});
		setScore(sc);
	}

	function playAgain() {
		setIsCheck(false);
		setScore(0);
		setQuestions([]);
		setReset(true);
		// console.log("play again");
	}

	const questionElements = questions.map((q, i) => {
		return (
			<Question
				key={i}
				ques={q.ques}
				options={q.options}
				select={(o) => selectOption(o, i)}
				selected={q.selected}
				isCheck={isCheck}
				ca={q.ca}
			/>
		);
	});

	return (
		<div className="game-page">
			{questions.length === 0 ? (
				<h1>Loading...</h1>
			) : (
				<>
					{questionElements}
					{isCheck && <h3>You scored {score}/5 correct answers</h3>}
					<button
						className="check-button"
						onClick={isCheck ? playAgain : checkAnswers}
					>
						{isCheck ? "Play Again" : "Check Answers"}
					</button>
				</>
			)}
		</div>
	);
}

export default GamePage;
