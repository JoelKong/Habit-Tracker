import "./index.css";
import { Home } from "./components/Homepage/Home";
import { Main } from "./components/Mainpage/Main";
import { useGlobalContext } from "./context";
import { Routes, Route } from "react-router-dom";

function App() {
  const { ProtectedRoute, account } = useGlobalContext();

  const getEnd = () => {
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    return end;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute user={account}>
            <Main user={account} targetDate={getEnd()} />
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
