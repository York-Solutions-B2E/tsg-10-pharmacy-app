import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = ({ navigate }) => {
	return (
		<Box sx={{ flexGrow: 1 }} data-testid="navbar-test">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5">TSG Pharmacy</Typography>

					<Box sx={{ flexGrow: 1 }} />

					<Button color="inherit" onClick={() => navigate('/prescriptions')}>
						Prescriptions
					</Button>
					<Button color="inherit" onClick={() => navigate('/inventory')}>
						Inventory
					</Button>
					<Button color="inherit" onClick={() => navigate('/orders')}>
						Orders
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
