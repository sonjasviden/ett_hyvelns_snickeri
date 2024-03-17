import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

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

            {/* <Route path="/admin-only/*" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<AdminPage />} />
            <Route path="edit-gallery" element={<EditGallery />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="create-product" element={<CreateProductPage />} />
            <Route path="products/:productId" element={<EditProduct />} />
          </Route> */}

            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
