import React, { useEffect, useState } from "react";
import userIamge from "../../assets/user.png";
import rotatingIamge from "../../assets/rotating.png";
import consultantIamge from "../../assets/consultant.png";
import classes from "./Loading.module.css";
import Consultant from './Consultant';

const Loading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? (
    <div className={classes["loading-container"]}>
      <div className={classes["loading-pic"]}>
        <img src={userIamge} alt="userIamge" />
        <img
          className={classes["loading-rotating-pic"]}
          src={rotatingIamge}
          alt="rotatingIamge"
        />
        <img src={consultantIamge} alt="consultantIamge" />
      </div>
      <div className={classes["loading-text"]}>
        <h1>스타일 변신하기 준비 중</h1>
        <h1>상담중에는 기능이 제한 될 수 있습니다.</h1>
      </div>
    </div>
  ) : (
    <Consultant />
  );
};

export default Loading;
