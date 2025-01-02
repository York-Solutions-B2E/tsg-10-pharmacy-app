import { Chip } from '@mui/material';

const StatusChip = ({ status, color = 'primary' }) => {
  let chipText = '';

  switch (status) {
    case 'NEW':
      color = 'success';
      chipText = 'New';
      break;
    case 'OUT_OF_STOCK':
      color = 'error';
      chipText = 'Out of Stock';
      break;
    case 'AWAITING_SHIPMENT':
      color = 'warning';
      chipText = 'Awaiting Shipment';
      break;
    case 'STOCK_RECEIVED':
      color = 'success';
      chipText = 'Stock Received';
      break;
    case 'FILLED':
      color = 'primary';
      chipText = 'Filled';
      break;
    case 'PICKED_UP':
      color = 'primary';
      chipText = 'Picked Up';
      break;
    case 'CANCELLED':
      color = 'error';
      chipText = 'Cancelled';
      break;
    // ? Added for Inventory & order statuses (TBD if needed)
    case 'INSUFFICIENT_STOCK':
      color = 'error';
      chipText = 'Insufficient Stock';
    case 'ORDERED':
      color = 'warning';
      chipText = 'Ordered';
      break;
    case 'RECEIVED':
      color = 'primary';
      chipText = 'Received';
      break;
    default:
      color = color;
      chipText = status;
  }

  return <Chip size="small" label={chipText} color={color} variant="filled" />;
};

export default StatusChip;
