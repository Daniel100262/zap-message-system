import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard'
import ButtonAppBar from './components/header'
import Messages from './pages/messages';

function App() {
  return (
    <Router>
      <ButtonAppBar />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
