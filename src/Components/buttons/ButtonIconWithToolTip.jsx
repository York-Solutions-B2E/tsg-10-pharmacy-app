import { IconButton, Tooltip } from "@mui/material";

/**
 * @param {Object} props
 * @param {() => void} props.onClick
 * @param {"primary" | "secondary" | "error" | "inherit" | "default" | "info" | "success" | "warning"} [props.color]
 * @param {boolean} [props.disabled]
 * @param {string} [props.tooltipMessage]
 * @param {React.ReactElement} [props.icon]
 */
const ButtonIconWithToolTip = (props) => {
  const { color = "primary", onClick, disabled = false, tooltipMessage = "", icon } = props;

  const iconButtonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <IconButton color={color} disabled={disabled} sx={iconButtonStyle} onClick={onClick}>
      <Tooltip title={tooltipMessage}>{icon}</Tooltip>
    </IconButton>
  );
};

export default ButtonIconWithToolTip;
