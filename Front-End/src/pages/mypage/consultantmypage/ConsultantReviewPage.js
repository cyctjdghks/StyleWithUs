import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// component
import GetStarRating from "../../consultant/video/VideoUser/reviewinput/GetStarRating";
import ConsultantMyPageSideBar from "./ConsultantMyPageSideBar";
// img
import consultantWoman from "../../../assets/consultantwoman.png";
import consultantman from "../../../assets/consultantman.png";
// css style
import classes from "./ConsultantReviewPage.module.css";

const ConsultantReviewPage = () => {
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);
  const reviewAvg = useSelector((state) => state.auth.reviewAvg);

  const [reviewSort, setReviewSort] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgTwo, setmsgTwo] = useState("");

  const reviewMsg = () => {
    if (reviewAvg === 5) {
      setMsg("당신은 완벽한 컨설턴트!");
    } else if (reviewAvg >= 4) {
      setMsg("당신은 우수 컨설턴트!");
    } else if (reviewAvg >= 3) {
      setMsg("당신은 조금만 더 노력하면 우수 컨설턴트!");
    } else if (reviewAvg >= 2) {
      setMsg("당신은 분발해야 하는 컨설턴트!");
    } else if (reviewAvg >= 1) {
      setMsg("당신은 해고 위기 컨설턴트!");
    } else if (reviewAvg == 0) {
      setMsg("당신은 신입 컨설턴트!");
    }
  };

  const reviewMsgTwo = () => {
    if (reviewAvg === 5) {
      setmsgTwo(
        "당신은 이미 완벽한 컨설턴트입니다. 지금처럼 최선을 다하는 컨설턴트가 되어 주세요."
      );
    } else if (reviewAvg >= 4) {
      setmsgTwo(
        "당신의 리뷰 점수가 좋습니다. 분발하여 완벽한 컨설턴트에 도전해보세요."
      );
    } else if (reviewAvg >= 3) {
      setmsgTwo(
        "당신의 리뷰 점수가 좋습니다. 분발하여 우수 컨설턴트에 도전해보세요."
      );
    } else if (reviewAvg >= 2) {
      setmsgTwo(
        "당신의 리뷰 점수가 좋지 않습니다. 더욱 노력하는 컨설턴트가 되어주세요."
      );
    } else if (reviewAvg >= 1) {
      setmsgTwo(
        "당신의 리뷰 점수는 매우 좋지 않습니다. 더욱 노력하는 컨설턴트가 되세요."
      );
    } else if (reviewAvg == 0) {
      setmsgTwo("환영합니다! 스타일 윗 어스의 완벽한 컨설턴트에 도전해보세요.");
    }
  };

  useEffect(() => {
    for (let i = review.length - 1; i >= 0; i--) {
      setReviewSort((prevState) => {
        return [...prevState, review[i]];
      });
    }
  }, [review]);

  useEffect(() => {
    reviewMsg();
    reviewMsgTwo();
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={classes.ReviewPage}>
      <ConsultantMyPageSideBar />
      <div className={classes.ReviewMainBox}>
        <h3 className={classes.MyReviewName}>나의 리뷰</h3>
        <hr className={classes.hr} />
        <div className={classes.ImgTextBox}>
          <p>
            {data.consultantGender ? (
              <img src={consultantman} className={classes.consultantman} />
            ) : (
              <img src={consultantWoman} className={classes.consultantWoman} />
            )}
          </p>
          <div>
            <p className={classes.reviewAvg}>LV {reviewAvg}</p>
            <p className={classes.msg}>{msg}</p>
            <p className={classes.msgTwo}>{msgTwo}</p>
          </div>
        </div>
        <hr className={classes.hrgrey} />
        <ul className={classes.ul}>
          {reviewSort.map((item, idx) => {
            return (
              <li key={idx} className={classes.ReviewBox}>
                <div className={classes.ReviewOne}>
                  <GetStarRating
                    reviewScore={item.reviewScore}
                    className={classes.star}
                  />
                  <p className={classes.reviewScore}>{item.reviewScore}</p>
                  <p className={classes.userId}>{item.userId}</p>
                  <p className={classes.userDate}>
                    {item.reviewRegisterTime[0]}.{item.reviewRegisterTime[1]}.
                    {item.reviewRegisterTime[2]}
                  </p>
                </div>
                <div className={classes.reviewContent}>
                  <p>{item.reviewContent}</p>
                  {/* <p >{(data.userGender ? <img src={boyface} className={classes.boyface} /> : <img src={girlface} className={classes.girlface} />)}</p> */}
                </div>
                {/* <div className={classes.borderbottom}></div> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ConsultantReviewPage;
