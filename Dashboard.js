import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [owners, setOwners] = useState([]);
  const [newWeight, setNewWeight] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      const response = await axios.get('http://localhost:5000/owners');
      setOwners(response.data);
    };
    fetchOwners();
  }, []);

  const handleAddWeight = async (ownerId) => {
    await axios.put(`http://localhost:5000/owners/${ownerId}/add-weight`, { weight: newWeight });
    alert('Weight added successfully');
  };

  return (
    <div className="dashboard-container">
      <h2>Showroom Owners</h2>
      <ul>
        {owners.map((owner) => (
          <li key={owner.id}>
            {owner.name} - Current Balance: {owner.balance}gms
            <input type="number" onChange={(e) => setNewWeight(e.target.value)} />
            <button onClick={() => handleAddWeight(owner.id)}>Add Weight</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
