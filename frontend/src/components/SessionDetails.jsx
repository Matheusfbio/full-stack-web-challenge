import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function SessionDetails() {
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [editingSessionId, setEditingSessionId] = useState(null); 
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sessions");
        setSessions(response.data);
        setFilteredSessions(response.data);
      } catch (error) {
        setErrorMsg("Failed to fetch sessions.");
      }
    };

    fetchSessions();
  }, []);

  const fetchSessionById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/sessions/${id}`);
      setFilteredSessions([response.data]);
    } catch (error) {
      setFilteredSessions([]);
    }
  };

  const handleSearch = () => {
    if (sessionId) {
      fetchSessionById(sessionId);
    } else {
      setFilteredSessions(sessions);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/sessions/${id}`);
      setSessions(sessions.filter((session) => session.SessionId !== id));
      setFilteredSessions(
        filteredSessions.filter((session) => session.SessionId !== id)
      );
    } catch (error) {
      setErrorMsg("Failed to delete session.");
    }
  };

  const handleEditClick = (session) => {
    setEditingSessionId(session.SessionId);
    setEditFormData({
      Hostname: session.Hostname,
      Players: session.Players,
      Map: session.Map,
      Mode: session.Mode,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/sessions/${editingSessionId}`,
        editFormData
      );
      // Atualiza a lista de sessões com os dados editados
      const updatedSessions = sessions.map((session) =>
        session.SessionId === editingSessionId
          ? { ...session, ...editFormData }
          : session
      );
      setSessions(updatedSessions);
      setFilteredSessions(updatedSessions);
      // Limpa o estado de edição
      setEditingSessionId(null);
      setEditFormData({});
    } catch (error) {
      setErrorMsg("Failed to update session.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
        Session Details
      </h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <label
          htmlFor="sessionId"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Session ID
        </label>
        <input
          type="text"
          id="sessionId"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="mt-3 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search Session
        </button>
      </div>

      {errorMsg && <p className="text-red-500 text-center mt-4">{errorMsg}</p>}

      {filteredSessions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Session ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Hostname
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Players
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Map
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300 divide-y divide-gray-700">
              {filteredSessions.map((session) => (
                <tr
                  key={session.SessionId}
                  className="hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm">{session.SessionId}</td>
                  <td className="px-6 py-4 text-sm">
                    {editingSessionId === session.SessionId ? (
                      <input
                        type="text"
                        name="Hostname"
                        value={editFormData.Hostname}
                        onChange={handleFormChange}
                        className="w-full px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
                      />
                    ) : (
                      session.Hostname
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editingSessionId === session.SessionId ? (
                      <input
                        type="text"
                        name="Players"
                        value={editFormData.Players}
                        onChange={handleFormChange}
                        className="w-full px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
                      />
                    ) : (
                      session.Players
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editingSessionId === session.SessionId ? (
                      <input
                        type="text"
                        name="Map"
                        value={editFormData.Map}
                        onChange={handleFormChange}
                        className="w-full px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
                      />
                    ) : (
                      session.Map
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editingSessionId === session.SessionId ? (
                      <input
                        type="text"
                        name="Mode"
                        value={editFormData.Mode}
                        onChange={handleFormChange}
                        className="w-full px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
                      />
                    ) : (
                      session.Mode
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-3">
                    {editingSessionId === session.SessionId ? (
                      <>
                        <button
                          onClick={handleEditSubmit}
                          className="text-green-400 hover:text-green-500 transition duration-150"
                          aria-label={`Save changes for session ${session.SessionId}`}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingSessionId(null);
                            setEditFormData({});
                          }}
                          className="text-gray-400 hover:text-gray-500 transition duration-150"
                          aria-label={`Cancel edit for session ${session.SessionId}`}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(session)}
                          className="text-blue-400 hover:text-blue-500 transition duration-150"
                          aria-label={`Edit session ${session.SessionId}`}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(session.SessionId)}
                          className="text-red-400 hover:text-red-500 transition duration-150"
                          aria-label={`Delete session ${session.SessionId}`}
                        >
                          <FaTrash size={20} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-4">No sessions available.</p>
      )}
    </div>
  );
}

export default SessionDetails;
