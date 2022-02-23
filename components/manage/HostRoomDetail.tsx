import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { deleteRoomAPI } from "../../lib/api/rooms";
import { useSelector } from "../../store";
import Button from "../common/Button";
import HostRoomDetailPhotos from "./HostRoomDetailPhotos";
import CustomizedTables from "./ReservationTable";

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;
  .room-detail-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 15px;
  }
  .room-detail-contents {
    display: flex;
    justify-content: space-between;
  }

  .delete-button {
    margin-top: 30px;
    float: right;
  }
`;

const HostRoomDetail = () => {
  const room = useSelector((state) => state.room.detail);
  const reservations = useSelector(
    (state) => state.reservation.roomReservations
  );
  const router = useRouter();

  const deleteRoom = async (roomId: number) => {
    try {
      await deleteRoomAPI(roomId);
      alert("캠핑장이 삭제되었습니다.");
      router.push("/manage");
    } catch (e) {
      console.log(e);
    }
  };

  if (!room) {
    return null;
  }

  return (
    <Container>
      <h1 className="room-detail-title">{room.title}</h1>
      <HostRoomDetailPhotos />
      {!isEmpty(reservations) ? (
        <CustomizedTables reservations={reservations} roomPrice={room.price} />
      ) : (
        "예약내역이 없습니다."
      )}
      <Button
        className="delete-button"
        color="cyan"
        width="89px"
        onClick={() => deleteRoom(room.id)}
      >
        삭제하기
      </Button>
    </Container>
  );
};

export default HostRoomDetail;
