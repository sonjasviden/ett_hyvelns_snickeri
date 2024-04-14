import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/galleri" element={<GalleryPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/om-oss" element={<AboutPage />} />

            <Route path="/logga-in" element={<Login />} />

            <Route path="/admin/*" element={<ProtectedRoute />}>
              <Route path="admin-galleri" element={<AdminGalleryPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
