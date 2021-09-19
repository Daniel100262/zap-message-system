import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard'
import ButtonAppBar from './components/header'
import Messages from './pages/messages';
import NewMessage from './pages/newMessage';


function App() {
  return (
    <Router>
      <ButtonAppBar />
      <Switch>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/messages" exact>
          <Messages />
        </Route>
        <Route path="/messages/new" exact>
          <NewMessage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
