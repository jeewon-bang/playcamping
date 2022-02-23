/**
 * 1. api method가 POST인지 확인한다.
 * 2. req.body에 필요한 값이 전부 들어있는지 확인한다.
 * 3. 'data/rooms.json'에 저장한다
 */
import { NextApiResponse, NextApiRequest } from "next";
import { isEmpty } from "lodash";
import { StoredRoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //숙소 등록하기
    try {
      const {
        campingType,
        amenities,
        maximumGuestCount,
        latitude,
        longitude,
        city,
        district,
        streetAddress,
        postcode,
        photos,
        title,
        description,
        price,
        startDate,
        endDate,
        hostId,
      } = req.body;
      if (
        !campingType ||
        !amenities ||
        !maximumGuestCount ||
        !latitude ||
        !longitude ||
        !city ||
        !district ||
        !streetAddress ||
        !postcode ||
        !photos ||
        !title ||
        !description ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        res.statusCode = 400;
        res.send("필수 값이 없습니다. 체크리스트를 확인해주세요!");
        console.log("필수 값 없음 400에러");
      }
      const rooms = Data.room.getList();
      if (isEmpty(rooms)) {
        //room 리스트가 비어있다면(처음 등록하는거라면)
        const newRoom: StoredRoomType = {
          id: 1, //id는 1번부터 시작
          ...req.body,
          createdAt: new Date(),
          updateAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1, //마지막 id에서 +1
        ...req.body,
        createdAt: new Date(),
        updateAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.end();
    } catch (e: any) {
      console.log(e);
      return res.send(e.message);
    }
  }

  //* 숙소 리스트 검색
  if (req.method === "GET") {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      location,
    } = req.query;

    try {
      const rooms = await Data.room.getList();
      const reservations = await Data.reservation.getList();

      const filteredRooms = rooms.filter((room) => {
        // 위치로 검색
        if (latitude && latitude !== "0" && longitude && longitude !== "0") {
          if (
            !(
              Number(latitude) - 0.1 < room.latitude &&
              room.latitude < Number(latitude) + 0.1 &&
              Number(longitude) - 0.1 < room.longitude &&
              room.longitude < Number(longitude) + 0.1
            )
          ) {
            return false;
          }
        }
        // 체크인 & 체크아웃 날짜로 검색
        const filteredReservations = reservations.filter(
          // 해당 room의 모든 예약내역들
          (v) => v.roomId === room.id
        );
        // 검색한 체크인 날짜보다 예약된 체크인 날짜가 작거나 같고 예약된 체크아웃 날짜가 큰 경우 - 예약불가
        const checkInPossible = filteredReservations.some(
          (v) =>
            new Date(v.checkInDate) <= new Date(checkInDate as string) &&
            new Date(checkInDate as string) < new Date(v.checkOutDate)
        );
        // 검색한 체크아웃 날짜보다 예약된 체크인 날짜가 작은 경우 - 예약 불가
        const checkOutPossible = filteredReservations.some(
          (v) => new Date(v.checkInDate) < new Date(checkOutDate as string)
        );
        if (checkInDate) {
          if (
            new Date(checkInDate as string) < new Date(room.startDate) ||
            new Date(checkInDate as string) > new Date(room.endDate) ||
            checkInPossible
          ) {
            return false;
          }
        }
        if (checkOutDate) {
          if (
            new Date(checkOutDate as string) < new Date(room.startDate) ||
            new Date(checkOutDate as string) > new Date(room.endDate) ||
            checkOutPossible
          ) {
            return false;
          }
        }
        // 인원수로 검색
        if (
          room.maximumGuestCount <
          Number(adultCount as string) +
            (Number(childrenCount as string) * 0.5 || 0)
        ) {
          return false;
        }

        return true;
      });

      //* host 정보 넣기
      const roomsWithHost = await Promise.all(
        filteredRooms.map(async (room) => {
          const host = await Data.user.find({ id: room.hostId });
          return { ...room, host };
        })
      );

      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  res.statusCode = 405;

  return res.end();
};
