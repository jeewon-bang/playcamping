import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

//버튼 색상 구하기
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "darkgray":
        return css`
          border: 2px solid ${palette.darkgray};
          color: ${palette.darkgray};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "darkgray":
      return css`
        background-color: ${palette.darkgray};
        color: white;
      `;
    case "pinl":
      return css`
        background-color: ${palette.pink};
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray};
      `;
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};

  svg {
    margin-right: 12px;
    width: 20px;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "darkgray" | "white";
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<IProps> = ({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
