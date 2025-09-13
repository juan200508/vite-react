import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import FileList from "./pages/FilesPage";

function App() {
  return (
    <BrowserRouter>
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/upload" style={{ marginRight: "10px" }}>Subir archivo</Link>
          <Link to="/files">Ver archivos</Link>
        </nav>

        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/files" element={<FileList />} />
        </Routes>
    </BrowserRouter>
  
  )
}

export default App
