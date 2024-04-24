import "./Table.css";
import { Suspense, lazy, useState } from "react";
const Card = lazy(() => import("../CardPopUp/CardPop"));

function TableUsers() {
  const [showPopup, setShowPopup] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "Frontend Developer",
      status: "Active",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "UI Designer",
      status: "Inactive",
      email: "jane@example.com",
    },
  ]);

  const handleEditClick = (user) => {
    setEditedUser(user);
    setShowPopup(true);
  };

  const handleSave = (formData) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? { ...user, ...formData } : user
    );
    setUsers(updatedUsers); // Update user data in state
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="table-users">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.title}</td>
              <td>{user.status}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className="btn-edit"
                  onClick={() => handleEditClick(user)}
                >
                  edit
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleCancel}>
              &times;
            </span>
            <Suspense fallback={<div>Loading...</div>}>
              <Card onSave={handleSave} user={editedUser} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableUsers;
