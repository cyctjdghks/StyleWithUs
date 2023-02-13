import React, { Fragment, useState, useEffect } from "react";
import classes from "./Consultant.module.css";
import { useSelector } from "react-redux";
import history from "./video/history";

import VideoConsultant from "./video/VideoConsultant/VideoConsultant";
import VideoUser from "./video/VideoUser/VideoUser";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";
import ChatContent from "./chat/ChatContent";
import ChatForm from "./chat/ChatForm";
import chatImage from "../../assets/chat.png";
import axios from "axios";

const Consultant = (props) => {
  const [toggleChatToCart, setToggleChatToCart] = useState(false);

  // 세션
  const [session, setSession] = useState();

  // 유저, 유저타입
  const user = useSelector((state) => state.auth);
  const userType = user.userType;

  // 컨설턴트인 경우 세션에 유저가 접속하면 유저 아이디를 받는다.
  const [sessionUserNickname, setSessionUserNickname] = useState(null);
  const [sessionUserGender, setSessionUserGender] = useState(null);
  const [sessionUserId, setSessionUserId] = useState(null);

  // 채팅창 아이템들
  const chattings = useSelector((state) => state.chat.chattings);

  // 알람창 카운트
  const [alarmCount, setAlarmCount] = useState(0);

  // 채팅창 focus blur 이벤트 작동 조건
  document.querySelector("body").addEventListener("click", function (event) {
    if (String(event.target.className).includes("chat-toggle-event")) {
      onFucusHandler();
    } else {
      onBlurHandler();
    }
  });

  // 뒤로가기 버튼을 누를 때 loading 상태 업데이트
  useEffect(() => {
    const listenBackEvent = () => {
      props.onChangeLoading(true);
    };

    const listenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return listenHistoryEvent;
  }, []);

  // 포커스 될 때 채팅창이 보이게 하는 함수
  const onFucusHandler = () => {
    setAlarmCount(0);
    setToggleChatToCart(true);
  };

  // 블러 될 때 카트가 보이게 하는 함수
  const onBlurHandler = () => {
    setToggleChatToCart(false);
  };

  // 챗 알람
  const chattingAlarm = (count) => {
    setAlarmCount(count);
  };

  // 메세지 Event
  const messageSendHandler = (data) => {
    session
      .signal({
        data: data, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "my-chat", // The type of message (optional)
      })
      .then(() => {
        // console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sessionSend = (session) => {
    setSession(session);
  }

  // 만약 컨설턴트일 경우 
  const getSessionUserNickname = (nickname) => {
    if (nickname !== user.userData.consultantNickname && nickname !== null && nickname !== undefined) {
      setSessionUserNickname(nickname);
    }
  }

  useEffect(() => {
    if (sessionUserNickname !== null) {
      axios
        .get(`https://i8d105.p.ssafy.io/be/user/gender/${sessionUserNickname}`, {
          headers: {
            Authorization: user.token,
          },
        })
        .then((response) => {
          setSessionUserGender(response.data.userGender);
          setSessionUserId(response.data.userId);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSessionUserId(null);
      setSessionUserGender(null);
    }
  }, [sessionUserNickname]);

  return (
    <Fragment>
      <main className={classes.main}>
        <section>{!userType ? <VideoUser sessionSend={sessionSend} /> : <VideoConsultant sessionSend={sessionSend} getUserNickname={getSessionUserNickname} userId={sessionUserId} />}</section>
        <section className={classes.section}>
          {userType === 0 ? <Shop userGender={user.userData.userGender} userId={user.userId} session={session}/> : <Shop userGender={sessionUserGender} userId={sessionUserId} session={session}/>}
        </section>
        <section className={classes.section}>
          <div className={classes["show-cart-chat"]}>
            <Cart
              className={
                !toggleChatToCart
                  ? classes["toggle-animation-on"]
                  : classes["toggle-animation-off"]
                }
              userId={sessionUserId}
              session={session}
            />
            <ChatContent
              className={
                toggleChatToCart
                  ? classes["toggle-animation-on"]
                  : classes["toggle-animation-off"]
              }
              chattings={chattings}
              alarm={chattingAlarm}
              alarmCount={alarmCount}
            />
          </div>
          <ChatForm onMessageSend={messageSendHandler} />
          <div
            className={`${classes.alarm} ${
              alarmCount > 0 ? classes["alarm-on"] : ""
            }`}
          >
            <span>{alarmCount}</span>
            <img src={chatImage} alt="chat" />
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Consultant;
