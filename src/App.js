//import logo from './logo.svg';
import {Routes, Route} from "react-router-dom";
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { RecordPage } from "./pages/RecordPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <main>
      <Header />
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage/>} /> 
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/record/:id" element={<RecordPage/>} />
          <Route path="*" element={<NotFoundPage />} />
       </Routes>
      <Footer />
    </main>
  );
}

export default App;
