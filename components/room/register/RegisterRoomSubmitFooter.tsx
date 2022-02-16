import React from "react";
import styled from "styled-components";
import Link from "next/link";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import { useSelector } from "../../../store";
import { useRouter } from "next/dist/client/router";
import { registerRoomAPI } from "../../../lib/api/rooms";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.darkgray};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  //*등록하기 클릭 시
  const onClickregisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };
    try {
      await registerRoomAPI(registerRoomBody);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Link href='/room/register/date'>
        <a className='register-room-footer-back'>
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button
        onClick={onClickregisterRoom}
        colorReverse={false}
        color='pink'
        width='102px'
      >
        등록하기
      </Button>
    </Container>
  );
};

export default RegisterRoomSubmitFooter;
