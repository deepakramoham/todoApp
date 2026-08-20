import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./taskThunks";
import styles from "./Todo.module.css";
import Loading from "../../components/Loading";

function TaskList() {
  const dispatch = useDispatch();
  const { loading, searchTask, tasks } = useSelector(
    (state) => state?.taskState,
  );

  useEffect(() => {
    const promise = dispatch(fetchTasks());

    return () => {
      console.log(promise);
      promise?.abort();
    };
  }, [dispatch]);

  return (
    <div className={styles["task-container"]}>
      {loading && <Loading />}
      {!loading && tasks?.length > 0 ? (
        tasks
          ?.filter((task) =>
            task?.taskName?.toLowerCase()?.includes(searchTask?.toLowerCase()),
          )
          ?.map((task) => <Task task={task} key={task?._id} />)
      ) : (
        <div>No tasks found</div>
      )}
    </div>
  );
}

export default TaskList;
