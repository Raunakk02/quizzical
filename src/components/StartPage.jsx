function StartPage(props) {
	return (
		<div className="start-page">
			<h1>Quizzical</h1>
			<p>A quiz taking app</p>
			<button onClick={props.start}>Start Quiz</button>
		</div>
	);
}

export default StartPage;
