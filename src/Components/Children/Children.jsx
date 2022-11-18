import React, { useEffect, useState } from "react";

const Children = () => {
  const [state, setState] = useState(0);
  const [state1, setState1] = useState(5);
  //   setInterval(() => {
  //     setState((prev) => prev + 1);
  //   }, 1000);
  //   console.log(state);

  function func(name) {
    console.log(name);
  }

  //   func(prompt("Введите ваше имя:"));
  useEffect(() => {
    alert("Привествуем вас на нашем сайте");
  }, [state, state1]);

  return (
    <div>
      Timer: {state} <br />
      <button onClick={() => setState((prev) => prev + 1)}>Push</button> <br />
      Timer: {state1} <br />
      <button onClick={() => setState1((prev) => prev + 1)}>Push</button>
    </div>
  );
};

export default Children;
