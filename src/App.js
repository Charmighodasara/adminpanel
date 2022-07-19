import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctors from "./containers/doctors/Doctors";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/patients/Patients";
import {  useSelector } from 'react-redux';
import { conFigure } from "./redux/Store";
import { rootCounter } from "./redux/Reducer/Index";
import Counter from "./containers/counter/Counter";


function App() {

    const store = conFigure()

  return (
    <>
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route path={'/medicines'} exact component={Medicines}></Route>
          <Route path={'/patients'} exact component={Patients}></Route>
          <Route path={'/doctors'} exact component={Doctors}></Route>
          <Route path={'/counter'} exact component={Counter}></Route>
        </Switch>
      </Layout>
      </Provider>
    </>
  );
}

export default App;
