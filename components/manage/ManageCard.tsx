import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { ManageRoomType } from "../../types/room";
import Link from "next/link";
import { isEmpty } from "lodash";
import RoomAmentityIcon from "./RoomAmentityIcon";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

  .reservation-card {
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: middle;

    .reservation-card-photo-wrapper {
      width: 30%;
      min-width: 300px;
      height: 300px;
      overflow: hidden;
      img {
        width: 350px;
        height: 300px;
      }
    }

    .reservation-card-info {
      width: 70%;
      text-align: left;
      margin-left: 20px;
      padding: 20px;
      p {
        margin-bottom: 10px;
      }

      .reservation-card-info-title {
        font-size: 24px;
        font-weight: 600;
      }
      .reservation-card-info-location {
        font-size: 14px;
        color: ${palette.gray};
        margin-bottom: 20px;
      }
      .reservation-card-info-price {
        font-weight: 600;
        margin-top: 24px;
      }
      .reservation-card-cancel-button {
        float: right;
      }
    }
  }
  .room-detail-infos {
    width: 644px;
    .room-detail-room-type {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .room-detail-space-counts {
      font-size: 18px;
    }
    .room-detail-divider {
      width: 100%;
      height: 1px;
      background-color: ${palette.gray};
      margin: 32px 0;
    }
    .room-detail-description {
      white-space: break-spaces;
      word-break: keep-all;
    }
  }
  .room-detatil-bed-type-label {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .room-detatil-conveniences-label {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .room-detatil-conveniences-list {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      width: 32%;
      margin-bottom: 16px;
      img {
        margin-right: 16px;
      }
    }
  }
`;

interface Iprops {
  hostRoom: ManageRoomType;
}

const ManageCard: React.FC<Iprops> = ({ hostRoom }) => {
  return (
    <Container>
      <Link href={`/manage/${hostRoom.id}`}>
        <div className="reservation-card">
          <div className="reservation-card-photo-wrapper">
            {<img src={hostRoom.photos[0]} alt="" />}
          </div>
          <div className="reservation-card-info">
            <p className="reservation-card-info-title">{hostRoom.title}</p>
            <p className="reservation-card-info-location">
              {hostRoom.city} {hostRoom.district} {hostRoom.streetAddress}{" "}
              {hostRoom.detailAddress}({hostRoom.postcode})
            </p>
            <div className="room-detail-infos">
              <p className="room-detail-space-counts">
                {hostRoom.campingType} / 최대 인원 {hostRoom.maximumGuestCount}
                명
              </p>
              {!isEmpty(hostRoom.amenities) && (
                <>
                  <ul className="room-detatil-conveniences-list">
                    {hostRoom.amenities.map((amenity, index) => (
                      <li key={index}>
                        <RoomAmentityIcon amenity={amenity} />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default ManageCard;
