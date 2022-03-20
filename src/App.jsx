import { useState } from "react";
import GamePage from "./components/GamePage";
import StartPage from "./components/StartPage";
import "./styles.css";

function App() {
	const [isStarted, setIsStarted] = useState(false);

	function startGame() {
		setIsStarted(true);
	}

	return <>{!isStarted ? <StartPage start={startGame} /> : <GamePage />}</>;
}

export default App;
