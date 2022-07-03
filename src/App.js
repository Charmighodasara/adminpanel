import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctors from "./containers/doctors/Doctors";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/patients/Patients";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={'/medicines'} exact component={Medicines}></Route>
          <Route path={'/patients'} exact component={Patients}></Route>
          <Route path={'/doctors'} exact component={Doctors}></Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
