import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import MainRoute from './MainRoute';
import {Provider} from 'react-redux';
import { store, persistor } from './redux/store';
import {PersistGate} from "redux-persist/integration/react"

function App() {
  return (
    <Provider store = {store}>
       <Router>
			<Switch>
				<PersistGate persistor={persistor}>
					< MainRoute/>
				</PersistGate>
			</Switch>
		</Router> 
    </Provider>
   
  );
}

export default App;
