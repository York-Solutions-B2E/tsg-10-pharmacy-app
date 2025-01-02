import { Box } from "@mui/material";
import PrescriptionsDataGrid from "../Components/data-display/PrescriptionsDataGrid";

const PrescriptionsPage = () => {
  const appointmentPageStyling = {
    padding: "30px 30px",
  };

  return (
    <Box sx={appointmentPageStyling}>
      <h1>PrescriptionsPage</h1>
      <PrescriptionsDataGrid />
    </Box>
  );
};

export default PrescriptionsPage;
