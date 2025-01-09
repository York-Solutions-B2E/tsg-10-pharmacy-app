import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Modal = ({ children, open = false, close, content, action }) => {
	return (
		<Dialog open={open} sx={{ display: 'flex', justifyContent: 'center' }}>
			{content?.type === 'http error' && (
				<DialogTitle
					variant="h3"
					sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}
				>
					{content?.status}
				</DialogTitle>
			)}
			<DialogTitle>{content?.title}</DialogTitle>
			<DialogContent>
				{content?.body}
				<Divider />
				{content?.details}
			</DialogContent>
			{children}
			<DialogActions>
				<Button onClick={close}>close</Button>
				<Box sx={{ flexGrow: '1' }} /> {/*empty spacer*/}
				{action}
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
