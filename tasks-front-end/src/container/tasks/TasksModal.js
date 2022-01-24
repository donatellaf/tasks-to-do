import React from "react";
import { Modal, Box, TextField, Grid, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import BaseButton from "../../components/baseButton/BaseButton";
import { useDispatch } from "react-redux";
import { tasksRequestUpdateDescription } from "../../store/slices/tasks/tasks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TasksModal = ({ openModal, setOpenModal, initialValues, onSave }) => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm();

  const handleSubmit = (e) => {
    dispatch(
      tasksRequestUpdateDescription({
        id: initialValues?.id,
        description: formValues.description,
      })
    );
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold" }}>
                Editing Task "{initialValues?.description}"
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                variant="outlined"
                onChange={handleInputChange}
                defaultValue={initialValues?.description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="flex-end" mt={1}>
            <Grid item xs={4}>
              <BaseButton fullWidth title="Save" type="submit" />
            </Grid>
            <Grid item xs={4}>
              <BaseButton
                fullWidth
                title="Cancel"
                variant="outlined"
                onClick={() => setOpenModal(false)}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Modal>
  );
};

export default TasksModal;
