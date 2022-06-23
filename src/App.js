import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Medicines from "./containers/Medicines/Medicines";


function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route to={'/medicines'} exact component={Medicines}></Route>
          <Route to={'/patients'} exact component={Medicines}></Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
