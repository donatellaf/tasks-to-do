import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tasksRequestDelete,
  tasksRequestUpdateStatus,
} from "../../store/slices/tasks/tasks";
import { TASK_STATUS } from "../../utils/constants";
import { getStatus } from "../../utils/utils";

const TasksList = ({ handleUpdateTask }) => {
  const dispatch = useDispatch();
  const tasksReducer = useSelector((state) => state.tasksReducer.data);

  const handleCheckStatus = (event, item) => {
    dispatch(
      tasksRequestUpdateStatus({
        id: item.id,
        status: getStatus(TASK_STATUS[item.status]),
      })
    );
  };

  const handleDelete = (item) => {
    dispatch(tasksRequestDelete(item.id));
  };

  return (
    <FormGroup sx={{ mt: 2, mb: 2 }}>
      {tasksReducer.length !== 0 ? (
        tasksReducer?.map((item, index) => (
          <Grid key={item.id} container spacing={3}>
            <Grid item xs={8}>
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    defaultChecked={TASK_STATUS[item.status]}
                    onChange={(e) => handleCheckStatus(e, item)}
                  />
                }
                label={item.description}
              />
            </Grid>

            <Grid item xs={2}>
              <Button onClick={() => handleUpdateTask(item)}> Edit </Button>
            </Grid>

            <Grid item xs={2}>
              <Button onClick={() => handleDelete(item)}> Delete </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <Skeleton animation="wave" sx={{ mt: 2, mb: 2 }} />
      )}
    </FormGroup>
  );
};

export default TasksList;
