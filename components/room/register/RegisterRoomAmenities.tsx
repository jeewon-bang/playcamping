import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { amenitiesList } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import CheckboxGroup from "../../common/CheckboxGroup";
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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomAmenities: React.FC = () => {
  const amenities = useSelector((state) => state.registerRoom.amenities);

  const dispatch = useDispatch();

  const onChangeAmenities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmenities(selected));
  };

  return (
    <Container>
      <h2>🚿 어떤 편의 시설을 제공하시나요?</h2>
      <h3>2단계</h3>
      <p className="register-room-step-info">
        일반적으로 게스트가 기대하는 편의 시설 목록입니다. 숙소를 등록한 수
        언제든 편의 시설을 추가할 수 있어요.
      </p>
      <div className="register-room-amenities-checkbox-group-wrapper">
        <CheckboxGroup
          value={amenities}
          onChange={onChangeAmenities}
          options={amenitiesList}
        />
      </div>
      <RegisterRoomFooter
        isValid={false}
        prevHref="/room/register/campingtype"
        nextHref="/room/register/guestcount"
      />
    </Container>
  );
};

export default RegisterRoomAmenities;
