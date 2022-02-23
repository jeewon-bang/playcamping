import { ReservationType, StoredReservation } from "./reservation";
import { RoomType } from "./room";
import { UserType } from "./user";

//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};

//* 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};

//* 숙소 등록하기 redux state
export type RegisterRoomState = {
  campingType: string | null;
  amenities: string[];
  maximumGuestCount: number;
  location: string;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  photos: string[];
  title: string;
  description: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

//* 숙소 검색 redux state
export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
};

//* 숙소 redux state
export type RoomState = {
  rooms: RoomType[];
  detail: RoomType | null;
};

//* 숙소 예약 상태
export type ReservationState = {
  roomReservations: StoredReservation[];
  userReservations: ReservationType[];
};
