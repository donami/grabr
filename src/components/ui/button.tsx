import styled, { css } from '@/lib/styledComponents';
import { HTMLProps } from 'react';

type Props = {
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
} & HTMLProps<HTMLButtonElement>;

const Button = styled.button<Props>`
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  font-family: Poppins, serif;
  margin: 0 0.25em 0 0;
  padding: 0.78571429em 1.5em 0.78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #cacbcd;
    background-image: none;
    box-shadow: 0 0 0 1px transparent inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset;
    color: rgba(0, 0, 0, 0.8);
  }

  ${props => {
    if (props.primary) {
      return css`
        background-color: #2185d0;
        color: #fff;
        text-shadow: none;
        background-image: none;

        &:hover {
          background-color: #1678c2;
          color: #fff;
          text-shadow: none;
        }
      `;
    }
    if (props.secondary) {
      return css`
        background-color: ${props => props.theme.colors.secondary};
        color: #fff;
        text-shadow: none;
        background-image: none;

        &:hover {
          background-color: #2ca179;
          color: #fff;
          text-shadow: none;
        }
      `;
    }
    return null;
  }}

  ${props => {
    if (props.loading) {
      return css`
        position: relative;
        cursor: default;
        text-shadow: none !important;
        color: transparent !important;
        opacity: 1;
        pointer-events: auto;
        -webkit-transition: all 0s linear, opacity 0.1s ease;
        transition: all 0s linear, opacity 0.1s ease;

        &:before {
          position: absolute;
          content: '';
          top: calc(50% - 2px);
          left: calc(50% - 2px);
          margin: -0.64285714em 0 0 -0.64285714em;
          width: 1.28571429em;
          height: 1.28571429em;
          border-radius: 500rem;
          border: 0.2em solid rgba(0, 0, 0, 0.15);
        }

        &:after {
          position: absolute;
          content: '';
          top: calc(50% - 2px);
          left: calc(50% - 2px);
          margin: -0.64285714em 0 0 -0.64285714em;
          width: 1.28571429em;
          height: 1.28571429em;
          -webkit-animation: button-spin 0.6s linear;
          animation: button-spin 0.6s linear;
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
          border-radius: 500rem;
          border-color: #fff transparent transparent;
          border-style: solid;
          border-width: 0.2em;
          -webkit-box-shadow: 0 0 0 1px transparent;
          box-shadow: 0 0 0 1px transparent;
        }
      `;
    }
    return null;
  }}

  &:disabled {
    background-color: #555;
    opacity: 0.3;
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: #555;
    }
  }
`;

export default Button;
