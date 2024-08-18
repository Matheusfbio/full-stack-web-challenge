import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateGameSession from "./components/Createitem";
import SessionDetails from "./components/SessionDetails"; // Crie este componente para exibir os dados da sessão

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="bg-gray-800 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Game Session Dashboard</h1>
        </header>
        <nav className="my-4 flex justify-center space-x-4">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Game Session
            </button>
          </Link>
          <Link to="/details">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Session Details
            </button>
          </Link>
        </nav>
        <main className="mt-6">
          <Routes>
            <Route path="/" element={<CreateGameSession />} />
            <Route path="/details" element={<SessionDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
