import "./App.css";
import { createObservable, useObservable } from "./useObservable";

const globalState = createObservable({
  count: 0,
});

function Counter() {
  const counter = useObservable(globalState);

  return (
    <div>
      <div>Count = {counter.count}</div>
      <button onClick={() => counter.count++}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
