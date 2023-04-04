import React, { useState, useRef } from "react";
import Fruits from "../components/Fruits";
import FruitsCounter from "../components/FruitsCounter";

function TextInput() {
    const inputRef = useRef(null);
  
    function handleClick() {
      inputRef.current.focus();
     inputRef.current.value="jyfjfjfjgjg"
    }
  
    return (
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Focus</button>
      </div>
    );
  }

function Cour() {
    const [fruits] = React.useState([
        { fruitName: "apple", id: 1 },
        { fruitName: "apple", id: 2 },
        { fruitName: "plum", id: 3 },
        { fruitName: "peach", id: 4 },
        { fruitName: "banana", id: 5}
      ]);
  return (
    <div>
      <Fruits cnt={fruits} />
      <FruitsCounter cnt={fruits} />
      <TextInput/>
    </div>
  );
}

export default Cour;
