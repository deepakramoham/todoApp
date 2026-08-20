import User from "./User";
import Input from "../../components/Input";
import styles from "./AdminDashBoard.module.css";
import { fetchUsers } from "./userThunks";
import { searchUser } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const {
    users,
    searchUser: searchUserValue,
    loading,
  } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
  };

  return (
    <div className={styles["outer-container"]}>
      <div className={styles["input-container"]}>
        <Input
          name={"searchUser"}
          placeholder={"Search User. . . "}
          value={searchUserValue}
          handleInputChange={handleSearch}
        />
      </div>

      <div className={styles["user-container"]}>
        {loading ? (
          <div>Loading users . . . </div>
        ) : true && users.length > 0 ? (
          users
            ?.filter((user) =>
              user?.name
                ?.toLowerCase()
                ?.includes(searchUserValue?.toLowerCase()),
            )
            ?.map((user) => <User user={user} key={user?._id} />)
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
