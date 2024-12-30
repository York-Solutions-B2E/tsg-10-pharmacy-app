import React from "react";


const MedicationsTable = ({ medications, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((medication) => (
          <tr key={medication.id}>
            <td>{medication.name}</td>
            <td>{medication.dosage}</td>
            <td>{medication.frequency}</td>
            <td>
              <button onClick={() => onRemove(medication.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicationsTable;
