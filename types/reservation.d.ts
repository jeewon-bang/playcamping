import { RoomType } from "./room";
import { UserType } from "./user";

// 예약내역 저장 타입
export type StoredReservation = {
  id: number;
  roomId: number;
  user: UserType;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  createdAt: string;
  updatedAt: string;
};

// 유저 예약내역 조회 타입
export type ReservationType = {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  createdAt: string;
  updatedAt: string;
  room: RoomType;
  user: user[];
};
