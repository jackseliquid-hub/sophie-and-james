import { Route, Switch } from "wouter";
import Index from "./pages/index";
import GiftList from "./pages/gift-list";
import HoneymoonFund from "./pages/honeymoon-fund";
import { Provider } from "./components/provider";
import { EventStateProvider } from "./components/site/event-state";

function App() {
  return (
    <Provider>
      <EventStateProvider>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/gift-list" component={GiftList} />
          <Route path="/honeymoon-fund" component={HoneymoonFund} />
        </Switch>
      </EventStateProvider>
    </Provider>
  );
}

export default App;
