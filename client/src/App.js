import "./App.css";
import { Create as CreateGateway } from "./features/Gateway/Create";
import { List as GatewayList } from "./features/Gateway/List";

function App() {
  return (
    <div className="App">
      <header>header</header>
      <main>
        <CreateGateway />
        <GatewayList />
      </main>
    </div>
  );
}

export default App;
