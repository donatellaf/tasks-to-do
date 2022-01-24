import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tasksRequestData } from "../../store/slices/tasks/tasks";
import TasksCreate from "./TasksCreate";
import TasksList from "./TasksList";
import TasksModal from "./TasksModal";
import { useState } from "react";

const Tasks = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [object, setObjectSelect] = useState(null);

  useEffect(() => {
    dispatch(tasksRequestData());
  }, [dispatch]);

  const handleUpdateTask = (item) => {
    setObjectSelect(item);
    setOpenModal(true);
  };

  return (
    <Box>
      <Typography mt="15px" sx={{ fontWeight: "bold" }}>
        To-Do List
      </Typography>
      <TasksList handleUpdateTask={handleUpdateTask} />
      <TasksCreate />
      <TasksModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        initialValues={object}
      />
    </Box>
  );
};

export default Tasks;
