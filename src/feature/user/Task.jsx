import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { deleteTask } from "./taskThunks";
import styles from "./Todo.module.css";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = async (deleteTaskId) => {
    const result = confirm("Are you sure to delete this task");
    if (result) {
      dispatch(deleteTask(deleteTaskId));
    }
  };
  return (
    <div className={styles.task}>
      <div>{task?.taskName}</div>
      <Button
        buttonText={"Delete"}
        className={"btn btn-danger"}
        handleClick={() => handleDeleteTask(task?._id)}
      />
    </div>
  );
};

export default Task;
