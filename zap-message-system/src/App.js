import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard'
import ButtonAppBar from './components/header'
import Messages from './pages/messages';
import NewMessage from './pages/newMessage';
import Login from './pages/login';
import StoreProvider from './components/store/provider';
import RoutesPrivate from './components/routes/private';

function App() {
  return (
    <Router>
      <StoreProvider>
      <ButtonAppBar />
      <Switch>
        
        <Route path="/login" component={Login} exact />


        
        <RoutesPrivate path="/dashboard" component={Dashboard} exact />
        
        <RoutesPrivate path="/messages" component={Messages} exact />
        
        <RoutesPrivate path="/messages/new" component={NewMessage} exact />
        
        <RoutesPrivate path="/" />
        

      </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;
