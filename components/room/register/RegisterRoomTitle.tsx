import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import RegisterRoomFooter from "./RegisterRoomFooter";
import Input from "../../common/Input";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomTitle: React.FC = () => {
  const title = useSelector((state) => state.registerRoom.title);

  const dispatch = useDispatch();

  //제목 변경 시
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(registerRoomActions.setTitle(event.target.value));

  return (
    <Container>
      <h2>✨ 캠핑장의 제목을 만드세요.</h2>
      <h3>6단계</h3>
      <div className="register-room-descript-wrapper">
        <Input
          label="캠핑장의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요."
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/description"
      />
    </Container>
  );
};

export default RegisterRoomTitle;
