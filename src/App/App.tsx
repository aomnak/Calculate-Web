import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "../Form/Form";
import Section from "../Section/Section"; 
import Trash from "../Trash/Trash"; // ✅ Import Trash Component

function App() {
  const [results, setResults] = useState<(number | string)[]>([]); 
  const [trash, setTrash] = useState<(number | string)[]>([]); // 🗑 เก็บค่าที่ถูกลบ

  const addResult = (result: number | string) => {
    setResults([...results, result]);
  };

  const removeResult = (index: number) => {
    setTrash([...trash, results[index]]); // 📌 ย้ายค่าไป Trash ก่อนลบ
    setResults(results.filter((_, i) => i !== index));
  };

  const restoreResult = (index: number) => {
    setResults([...results, trash[index]]); // 🔄 คืนค่ากลับมา
    setTrash(trash.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript</h1>

      <Form onCalculate={addResult} />

      <h2 style={{ textAlign: "center" }}>Results:</h2>
      <Section counters={results} onRemove={removeResult} />

      <h2 style={{ textAlign: "center" }}>Trash:</h2>
      <Trash trashItems={trash} onRestore={restoreResult} />

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
