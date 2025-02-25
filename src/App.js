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
import { ProfilePage } from "./pages/MyProfilePage";
import { ForgotPassPage } from "./pages/ForgotPassPage";
import {NewsPage} from "./pages/NewsPage"
import { SingleNewPage } from "./pages/SingleNewPage";
import { NewPostPage } from "./pages/NewPostPage";
import { NewRecordPage } from "./pages/newRecordPage";
import { LaddersPage } from "./pages/LaddersPage";
import { StatsPage } from "./pages/StatsPage";


function App() {
  return (
    <main>
      <Header />
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage/>} /> 
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/record/:id" element={<RecordPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/forpass" element={<ForgotPassPage/>} />
          <Route path="/news" element={<NewsPage/>} />
          <Route path="/news/:id" element={<SingleNewPage/>} />
          <Route path="/news/create" element={<NewPostPage/>} />
          <Route path="/newrecord" element={<NewRecordPage/>} />
          <Route path="/ladders" element={<LaddersPage/>} />
          <Route path="/stats" element={<StatsPage/>} />

          <Route path="*" element={<NotFoundPage />} />
       </Routes>
      <Footer />
    </main>
  );
}

export default App;
