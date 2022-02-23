import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { campingTypeList } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Selector from "../../common/Selector";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
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
  .register-room-camping-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const RegisterRoomCampingType: React.FC = () => {
  const campingType = useSelector((state) => state.registerRoom.campingType);

  const dispatch = useDispatch();

  //* 캠핑 종류 변경 시
  const onChangeCampingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCampingType(event.target.value));
  };

  return (
    <Container>
      <h2>🏕️ 등록할 캠핑장의 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-camping-selector-wrapper">
        <Selector
          type="register"
          value={campingType || undefined}
          label="하나를 선택해주세요."
          defaultValue="하나를 선택해주세요."
          options={campingTypeList}
          onChange={onChangeCampingType}
        />
      </div>
      <RegisterRoomFooter
        isValid={false}
        prevHref="/"
        nextHref="/room/register/amenities"
      />
    </Container>
  );
};

export default RegisterRoomCampingType;
