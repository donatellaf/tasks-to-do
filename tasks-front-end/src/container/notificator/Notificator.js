import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { hideNotificator } from "../../store/slices/shared/shared";
import CloseIcon from "@mui/icons-material/Close";

const Notificator = () => {
  const notificatorItem = useSelector(
    (state) => state.sharedReducer.notificator
  );
  const dispatch = useDispatch();

  const handleClose = (event) => {
    dispatch(hideNotificator());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={notificatorItem.open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            size="small"
            key="1"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>,
        ]}
      >
        <Alert
          onClose={handleClose}
          severity={notificatorItem.severity}
          elevation={6}
          variant="filled"
        >
          {notificatorItem.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notificator;
