import { setMaxListeners } from 'mongodb/lib/apm';
import './index.css'
import { useState, useRef } from 'react';

function App() {
  const [buttonColors, setButtonColors] = useState({
    1: "bg-[#D3C9BF]",
    2: "bg-[#D3C9BF]",
    3: "bg-[#D3C9BF]",
    4: "bg-[#D3C9BF]",
    5: "bg-[#D3C9BF]",
    6: "bg-[#D3C9BF]",
    7: "bg-[#D3C9BF]",
    8: "bg-[#D3C9BF]",
    9: "bg-[#D3C9BF]",
  });

  const Array_Winning = {
    1: [1, 5, 9],
    2: [3, 5, 7],
    3: [1, 2, 3],
    4: [4, 5, 6],
    5: [7, 8, 9],
    6: [1, 4, 7],
    7: [2, 5, 8],
    8: [3, 6, 9]
  };

  const [boardMarks, setBoardMarks] = useState({
    1: "", 2: "", 3: "",
    4: "", 5: "", 6: "",
    7: "", 8: "", 9: ""
  });

  const [flag, setFlag] = useState({
    1: false, 2: false, 3: false,
    4: false, 5: false, 6: false,
    7: false, 8: false, 9: false
  });

  const [turn, setTurn] = useState(false);
  const Player1Combo = useRef([]);
  const Player2Combo = useRef([]);
  const[whoWon,setWhoWon] = useState("")
  const[reset,setReset] = useState(false)
  const[Player1Score,setPlayer1Score] = useState(0)
  const[Player2Score,setPlayer2Score] = useState(0)
 const Reset = () => {
  setBoardMarks({
    1: "", 2: "", 3: "",
    4: "", 5: "", 6: "",
    7: "", 8: "", 9: ""
  });

  setButtonColors({
    1: "bg-[#D3C9BF]", 2: "bg-[#D3C9BF]", 3: "bg-[#D3C9BF]",
    4: "bg-[#D3C9BF]", 5: "bg-[#D3C9BF]", 6: "bg-[#D3C9BF]",
    7: "bg-[#D3C9BF]", 8: "bg-[#D3C9BF]", 9: "bg-[#D3C9BF]"
  });

  setFlag({
    1: false, 2: false, 3: false,
    4: false, 5: false, 6: false,
    7: false, 8: false, 9: false
  });

  setTurn(false);
  setWhoWon("");
  Player1Combo.current = [];
  Player2Combo.current = [];
};

  const handleColor = (e) => {
    const id = e.currentTarget.id;
    const newColor = "bg-[#eee4da]";

    setButtonColors((prev) => ({
      ...prev,
      [id]: newColor,
    }));

    setBoardMarks((prev) => ({
      ...prev,
      [id]: turn ? "O" : "X"
    }));

    const newFlag = {
      ...flag,
      [id]: true
    };
    setFlag(newFlag);

    const parsedId = parseInt(id);
    if (!turn) {
      Player1Combo.current.push(parsedId);
    } else {
      Player2Combo.current.push(parsedId);
    }

    let Player1Won = false;
    let Player2Won = false;

    for (const combo of Object.values(Array_Winning)) {
      if (combo.every(val => Player1Combo.current.includes(val))) {
        Player1Won = true;
        break;
      }
      if (combo.every(val => Player2Combo.current.includes(val))) {
        Player2Won = true;
        break;
      }
    }
    if (Player1Won) {
      console.log("Player 1 Wins!");
      setWhoWon("Player1Won")
      setPlayer1Score((prev) => prev+=1)
    
    } else if (Player2Won) {
      console.log("Player 2 Wins!");
      setWhoWon("Player2Won")
      setPlayer2Score((prev) => prev+=1)
     
    } else {
      const allDisabled = Object.values(newFlag).every(val => val === true);
      if (allDisabled) {
        console.log("It's a tie!");
      
      }
    }

    setTurn(prev => !prev);

  };

  return (
    <>
    <section className='flex flex-col gap-3'>
 <h1 className='text-3xl' disabled>Tic-Tac-Toe </h1>
 <section className='flex flex-row flex-end gap-4  self-end mb-4  '>
 <button className='rounded bg-[#bbada0] size-10 p' 
 onClick={Reset}
 >Reset</button>
 <button className='rounded bg-[#bbada0]   disabled' disabled>{whoWon}</button>
 <section className='flex flex-row gap-1'>
  <p>Player1: <button  disabled >
    {Player1Score}
  </button> </p>
  
  <p> Player2: <button disabled >
    {Player2Score}
  </button> </p>
  
 </section>
 
   
 </section>
    </section>
  
    <div className="grid grid-cols-3 grid-rows-3 bg-[#bbada0] rounded-sm gap-6 p-10">
      {Array.from({ length: 9 }, (_, i) => {
        const id = (i + 1).toString();
        return (
          <button
            key={id}
            id={id}
            onClick={handleColor}
            disabled={flag[id]}
            className={`${buttonColors[id]} p-10 rounded-md w-20 h-20 flex items-center justify-center text-2xl font-bold`}
          >
            {boardMarks[id]}
          </button>
        );
      })}
      
    </div>
    
     </>
  );
}

export default App;
