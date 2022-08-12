import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctors from "./containers/doctors/Doctors";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/patients/Patients";
import { useSelector } from 'react-redux';
import { conFigure } from "./redux/Store";
import { rootCounter } from "./redux/Reducer/Index";
import Counter from "./containers/counter/Counter";
import { PersistGate } from 'redux-persist/integration/react'
import Promise_Example from "./containers/promiseExample/Promise_Example";


function App() {

  const { store, persistor } = conFigure()

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Switch>
              <Route path={'/medicines'} exact component={Medicines}></Route>
              <Route path={'/patients'} exact component={Patients}></Route>
              <Route path={'/doctors'} exact component={Doctors}></Route>
              <Route path={'/counter'} exact component={Counter}></Route>
              <Route path={'/Promise'} exact component={Promise_Example}></Route>
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
