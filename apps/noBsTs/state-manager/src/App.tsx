import "./App.css";
import { createStateHook } from "./simpleStateManager";

const useCounter = createStateHook(0);

const Counter = () => {
  const [count, setCount] = useCounter();
  return (
    <div>
      <div onClick={() => setCount(count + 1)}>Add One</div>
      <div>Count = {count}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
