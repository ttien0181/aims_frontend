import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Các component của bạn
function HomePage() {
  return <h1>Trang chủ</h1>;
}

function AboutPage() {
  return <h1>Giới thiệu</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;