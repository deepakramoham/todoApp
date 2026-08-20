import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { auth } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      style={{
        display: "flex",
        minHeight: "75vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: "2em",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div>
            <div className="fw-bold fs-3">UserId: {auth?.id}</div>
            <div className="fw-bold fs-3">Name: {auth?.name}</div>
          </div>
          <div className="mt-5">
            <Button
              className="btn btn-secondary fs-4"
              buttonText={"Back"}
              handleClick={goBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
