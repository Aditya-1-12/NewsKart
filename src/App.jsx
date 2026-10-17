import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import News from "./components/News.jsx";

export default function App() {
  const [category, setCategory] = useState("general");

  return (
    <>
      <Navbar category={category} setCategory={setCategory} />
      <News category={category} />
    </>
  );
}
