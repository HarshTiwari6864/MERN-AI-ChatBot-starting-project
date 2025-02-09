import Header from "./components/Header"
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Loginpage from "./pages/Loginpage";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useauth } from "./context/Authcontext";

function App() {
  const auth=useauth();
return (
    <main>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signup/>}/>
       {auth?.isLoggedIn && auth.user &&( <Route path="/chat" element={<Chat/>}/>)}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </main>
  )
}

export default App
