import React from "react";

interface IProps {
  amenity: string;
}

const RoomAmentityIcon: React.FC<IProps> = ({ amenity }) => {
  const iconUrl = () => {
    switch (amenity) {
      case "바비큐장":
        return "/static/svg/room/detail/bbq.svg";
      case "수영장":
        return "/static/svg/room/detail/pool.svg";
      case "반려동물":
        return "/static/svg/room/detail/dog.svg";
      case "글램핑":
        return "/static/svg/room/detail/camping.svg";
      case "카라반":
        return "/static/svg/room/detail/caravan.svg";
      case "와이파이":
        return "/static/svg/room/detail/wifi.svg";
      case "침대방":
        return "/static/svg/room/detail/bed.svg";
      case "계곡":
        return "/static/svg/room/detail/valley.svg";
      case "바닷가":
        return "/static/svg/room/detail/wave.svg";
      case "화장실/샤워실":
        return "/static/svg/room/detail/shower.svg";
      default:
        return "";
    }
  };
  return <img src={iconUrl()} alt="" />;
};

export default RoomAmentityIcon;
