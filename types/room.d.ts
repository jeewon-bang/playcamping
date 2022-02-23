//리덕스의 registerROOM에 들어 있는 값에서 id, createdAt, updateAt, hostId가 추가됨
//hostId는 숙소의 호스트로 api를 보낼 때 body에 userId를 보낼 예정임
export type StoredRoomType = {
  id: number;
  maximumGuestCount: number;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  photos: string[];
  title: string;
  description: string;
  price: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  hostId: number;
  reservation: ReservationType[];
};

export type RoomType = {
  id: number;
  campingType: string;
  maximumGuestCount: number;
  amenities: string[];
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  host: UserType;
  reservation: ReservationType[];
};

export type ManageRoomType = {
  id: number;
  campingType: string;
  maximumGuestCount: number;
  amenities: string[];
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  host: UserType;
  reservation: ReservationType[];
};
