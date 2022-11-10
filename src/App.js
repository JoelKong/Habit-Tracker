import "./index.css";
import { Home } from "./components/Homepage/Home";
import { Main } from "./components/Mainpage/Main";
import { useGlobalContext } from "./context";
import { Routes, Route } from "react-router-dom";

function App() {
  const { ProtectedRoute, account } = useGlobalContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute user={account}>
            <Main user={account} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;

//talk to back end get request
//import Axios from 'Axios'

//useEffect(() => {
//  Axios.get("http://localhost:3001/").then((response) => {
//    setState(response.data);
//  });
// }, []);

//post request make a form
//response dont mather cause we sending data

//const createUser = () => {
//  Axios.post('http://localhost:3001/', {name:"", age:""}).then((response) => {
//    alert('user created')

//  })
//}
