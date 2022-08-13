import batu from "../assets/batu.png";
import gunting from "../assets/gunting.png";
import kertas from "../assets/kertas.png";
import refresh from "../assets/refresh.png";
import { useState, useEffect } from "react";
import { db } from '../utils/firebase'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/Auth";
import { Tables } from "./";

export const Handler = () => {
  const [result, setResult] = useState("");
  const { currentUser } = useAuth();
  const [leaderboards, setLeaderboards] = useState([]);

  function com() {
    const choice = ["Rock", "Paper", "Scissors"];
    const randomChoice = Math.floor(Math.random() * 3);
    return choice[randomChoice];
  }

  const gameWin = () => {
    setResult("WINS");
  };

  const gameDraw = () => {
    setResult("DRAW");
  };

  const gameLose = () => {
    setResult("LOSE");
  };

  async function playGame(userChoice) {
    const comChoice = com();
    console.log("User Result => " + userChoice);
    console.log("Com Result => " + comChoice);

    switch (userChoice + comChoice) {
      case "RockScissors":
      case "ScissorsPaper":
      case "PaperRock":
        gameWin();
        break;

      case "RockRock":
      case "ScissorsScissors":
      case "PaperPaper":
        gameDraw();
        break;

      case "ScissorsRock":
      case "PaperScissors":
      case "RockPaper":
        gameLose();
    }

    await updateLeaderboards();
    await updateTableLeaderboard();
  }

  function resetGame() {
    setResult("");
  }

  async function getLeaderBoards() {
    const ref = collection(db, "users_leaderboard");
    const q = query(ref, orderBy("score", "desc"), limit(5));
    const d = await getDocs(q);
    return d.docs.map((d) => d.data());
  }

  async function updateLeaderboards() {
    const d = doc(db, "users_leaderboard", currentUser.uid);
    const docs = await getDoc(d);
    const data = docs.data();

    const asignScore = result === "WINS" ? 2 : result === "LOSE" ? -1 : 0;
    const compare = (prms, prms2) => (prms === prms2 ? 1 : 0);

    const win = compare(result, "WINS");
    const lose = compare(result, "LOSE");
    const draw = compare(result, "DRAW");

    if (data) {
      const score = data.draw * 0 + data.lose * -1 + data.win * 2;
      await updateDoc(d, {
        name: currentUser.displayName,
        win: data.win + win,
        lose: data.lose + lose,
        draw: data.draw + draw,
        score: score + asignScore,
      });
    } else {
      await setDoc(d, {
        name: currentUser.displayName,
        win,
        lose,
        draw,
        score: asignScore,
      });
    }
  }

  async function updateTableLeaderboard() {
    const responses = await getLeaderBoards();
    setLeaderboards(responses);
  }

  useEffect(() => {
    async function fetchData() {
      await updateTableLeaderboard();
    }
    fetchData();
  }, [leaderboards]);

  return (
    <>
      <div className="row pt-5">
        <div className="col offset-2">
          <h3>PLAYER</h3>
          <br />
          <img
            src={batu}
            alt=""
            width="100"
            className="hand-animate"
            onClick={() => playGame("Rock")}
          />
          <br />
          <br />
          <br />
          <img
            src={gunting}
            alt=""
            width="100"
            className="hand-animate"
            onClick={() => playGame("Paper")}
          />
          <br />
          <br />
          <br />
          <img
            src={kertas}
            alt=""
            width="100"
            className="hand-animate"
            onClick={() => playGame("Scissors")}
          />
        </div>

        <div className="col pt-5">
          <h1 style={{ paddingTop: 130 }}>{result}</h1>
          <img
            src={refresh}
            alt=""
            width="85"
            style={{ paddingTop: 60, paddingLeft: 20 }}
            onClick={resetGame}
          />
        </div>
        <div className="col">
          <h3 className="ps-3">COM</h3>
          <br />
          <img src={batu} alt="" width="100" />
          <br />
          <br />
          <br />
          <img src={gunting} alt="" width="100" />
          <br />
          <br />
          <br />
          <img src={kertas} alt="" width="100" />
        </div>
      </div>
      <Tables leaderboards={leaderboards} />
    </>
  );
};
