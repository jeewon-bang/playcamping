/* eslint-disable indent */
import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
// import WarningIcon from "../../public/static/svg/common/warning.svg";

const normalSelectorStyle = css`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray};
    font-size: 16px;
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    &:focus {
      border-color: ${palette.darkgray};
    }
  }
`;

const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/common/selector/register_selector_down_arrow.svg");
    background-position: right 14px center;
    background-repeat: no-repeat;
    font-size: 16px;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: "register" | "normal";
}
const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === "normal" && normalSelectorStyle};
  ${({ type }) => type === "register" && RegisterSelectorStyle};

  select {
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.pink};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.darkgray};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url("/static/svg/common/selector/disabled_register_selector_down_arrow.svg");
      background-color: ${palette.gray};
      border-color: ${palette.gray};
      color: ${palette.gray};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.pink};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  defaultValue?: string;
  options?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: "register" | "normal";
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  label,
  defaultValue,
  options = [],
  isValid,
  useValidation = true,
  type = "normal",
  disabledOptions = [],
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container
      isValid={!!isValid}
      validateMode={useValidation && validateMode}
      type={type}
    >
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          <option disabled selected hidden>
            {defaultValue}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {/* {useValidation && validateMode && !isValid && (
        <div className='selector-warning'>
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )} */}
    </Container>
  );
};

export default React.memo(Selector);
