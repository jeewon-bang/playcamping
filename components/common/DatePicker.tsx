import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

const Container = styled.div`
  width: 100%;
  height: 100%;
  .react-datepicker-popper {
    z-index: 9999;
  }
  .react-datepicker {
    padding: 16px 32px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
    border-radius: 32px;
    cursor: default;
  }
  .react-datepicker__triangle {
    border-bottom-color: white !important;
  }
  .react-datepicker__month-container {
    padding: 0 27px;
  }
  .react-datepicker__header {
    padding-top: 22px;
    font-size: 16px;
    font-weight: 600;
    border: 0;
    background-color: white;
  }
  .react-datepicker__navigation--previous {
    height: 20px;
    position: absolute;
    top: 40px;
    left: 56px;
    border: 0;
    background-image: url("/static/svg/common/datePicker/datepicker_left_arrow.svg");
    background-repeat: no-repeat;
    background-color: transparent;
    span {
      display: none;
    }
  }
  .react-datepicker__navigation--next {
    height: 20px;
    position: absolute;
    top: 40px;
    right: 56px;
    border: 0;
    background-image: url("/static/svg/common/datePicker/datepciker_right_arrow.svg");
    background-repeat: no-repeat;
    background-color: transparent;
    span {
      display: none;
    }
  }
  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: 600;
    font-family: Airbnb Cereal, sans-serif;
    text-align: center;
  }
  .react-datepicker__day-names {
    padding-top: 16px;
    display: flex;
  }
  .react-datepicker__day-name {
    width: 48px;
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    text-align: center;
    color: ${palette.gray};
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__week {
    display: flex;
    align-items: center;
  }
  .react-datepicker__day {
    width: 48px;
    height: 48px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, sans-serif;
    color: ${palette.black};
    outline: none;
    &:hover {
      border: 1px solid ${palette.black};
      background-color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${palette.whitegray};
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${palette.whitegray};
  }
  .react-datepicker__day--selected {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--range-start {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    color: ${palette.lightgray};
    cursor: no-drop;
    &:hover {
      border: 0;
    }
  }
  /* .react-datepicker__day--outside-month {
		background-color: transparent;
		pointer-events: none;
	} */

  .day-reserved {
    color: ${palette.lightgray};
    pointer-events: none;
  }
`;

const DatePicker: React.FC<ReactDatePickerProps> = ({ ...props }) => {
  return (
    <Container>
      <ReactDatePicker {...props} disabledKeyboardNavigation />
    </Container>
  );
};

export default DatePicker;
