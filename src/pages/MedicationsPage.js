import React, { useState } from "react";
import MedicationsTable from "../components/MedicationsTable";

const MedicationsPage = () => {
  const [medications, setMedications] = useState([]);

  const addMedication = (medication) => {
    setMedications([...medications, medication]);
  };

  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div>
      <h1>Medications</h1>
      <MedicationsTable 
        medications={medications} 
        onAddMedication={addMedication} 
        onRemoveMedication={removeMedication} 
      />
    </div>
  );
};

export default MedicationsPage;
