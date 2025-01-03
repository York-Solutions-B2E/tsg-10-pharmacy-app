import { IconButton, Tooltip } from '@mui/material';

/**
 * @param {Object} props
 * @param {() => void} props.onClick
 * @param {"primary" | "secondary" | "error" | "inherit" | "default" | "info" | "success" | "warning"} [props.color]
 * @param {boolean} [props.disabled]
 * @param {string} [props.toolTipMessage]
 * @param {React.ReactElement} [props.icon]
 */
const ButtonIconWithToolTip = (props) => {
  const {
    color = 'primary',
    onClick,
    disabled = false,
    toolTipMessage,
    icon,
  } = props;

  const iconButtonStyle = {
    padding: '6px 6px',
    minWidth: '24px',
  };

  return (
    <Tooltip title={toolTipMessage}>
      <span>
        <IconButton
          color={color}
          disabled={disabled}
          sx={iconButtonStyle}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ButtonIconWithToolTip;
