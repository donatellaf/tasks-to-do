import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { tasksRequestCreate } from "../../store/slices/tasks/tasks";

const TasksCreate = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm();

  const handleSubmit = () => {
    const task = {
      title: formValues?.task,
      description: formValues?.task,
    };
    dispatch(tasksRequestCreate(task));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TextField name="task" fullWidth onChange={handleInputChange} />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ height: "95%" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TasksCreate;
