import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateGameSession() {
  const baseUrl = "http://localhost:3000/sessions"; // Verifique a URL base correta
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostname: "",
    players: "",
    map: "",
    mode: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState("");
  const [sessionId, setSessionId] = useState("");

  const createSession = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      players: formData.players ? parseInt(formData.players, 10) : 0,
    };

    try {
      const res = await axios.post(baseUrl, formattedData);
      setSessionId(res.data.SessionId);
      setResponse("Game session created");
      setErrorMsg(""); // Clear error message on success
      // Navigate to the session details page
      navigate("/details", { state: { sessionId } });
    } catch (error) {
      console.error("Error posting data:", error);
      setErrorMsg("Error posting data");
      setResponse(""); // Clear response on error
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 text-gray-100 rounded-md">
      <form
        onSubmit={createSession}
        className="space-y-4 bg-gray-800 shadow-md rounded-md p-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-400">
          Create Game Session
        </h2>

        <div>
          <label
            htmlFor="hostname"
            className="block text-sm font-medium text-gray-300"
          >
            Hostname
          </label>
          <input
            type="text"
            id="hostname"
            value={formData.hostname}
            onChange={(e) =>
              setFormData({ ...formData, hostname: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="players"
            className="block text-sm font-medium text-gray-300"
          >
            Number of Players
          </label>
          <input
            type="number"
            id="players"
            value={formData.players}
            onChange={(e) =>
              setFormData({ ...formData, players: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="map"
            className="block text-sm font-medium text-gray-300"
          >
            Map
          </label>
          <input
            type="text"
            id="map"
            value={formData.map}
            onChange={(e) => setFormData({ ...formData, map: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="mode"
            className="block text-sm font-medium text-gray-300"
          >
            Mode
          </label>
          <input
            type="text"
            id="mode"
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 w-full justify-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Session
          </button>
        </div>
      </form>
      {response && <h3 className="text-green-500 mt-4">{response}</h3>}
      {errorMsg && <h3 className="text-red-500 mt-4">{errorMsg}</h3>}
    </div>
  );
}

export default CreateGameSession;
