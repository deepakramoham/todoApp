import { useState, useRef, useCallback, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { postTask } from "./taskThunks";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Todo.module.css";
import { searchTask } from "./taskSlice";

function ListInput() {
  const taskRef = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const searchTaskValue = useSelector((state) => state.taskState?.searchTask);
  const { auth } = useSelector((state) => state?.authState);

  useEffect(() => {
    taskRef?.current?.focus();
  }, []);

  const handleInputChange = useCallback((e) => {
    setTaskName(e.target.value);
    setError("");
  }, []);
  const handleSearch = useCallback((e) => {
    dispatch(searchTask(e.target.value));
  }, []);

  const handleAddButton = () => {
    if (taskName) {
      dispatch(postTask({ taskName: taskName, userId: auth?.id }));
      setTaskName("");
    } else {
      setError("Task name cannot be empty !");
    }
  };

  return (
    <div className={styles["input-container"]}>
      <div className={styles["task-input-box"]}>
        <Input
          inputRef={taskRef}
          name={"taskName"}
          value={taskName}
          placeholder={"Enter your task . . "}
          handleInputChange={handleInputChange}
          error={error}
        />
        <Input
          name={"searchTask"}
          value={searchTaskValue}
          placeholder={"Search task . . . "}
          handleInputChange={handleSearch}
        />
      </div>

      <Button
        className="btn btn-success"
        buttonText={"Add"}
        handleClick={handleAddButton}
      />
    </div>
  );
}

export default ListInput;
