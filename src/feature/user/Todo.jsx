import ListInput from "./ListInput";
import TaskList from "./TaskList";
import styles from "./Todo.module.css";

function Todo() {
  return (
    <div className={styles["outer-container"]}>
      <ListInput />
      <TaskList />
    </div>
  );
}

export default Todo;
