import React from 'react';
import styled from '@/lib/styledComponents';

const Loader = () => {
  return <Wrapper className="loader" />;
};

export default Loader;

const Wrapper = styled.div`
  /* display: none; */
  text-align: center;
  z-index: 1000;
  width: 2.28571429rem;
  height: 2.28571429rem;
  font-size: 1em;
  position: relative;
  vertical-align: middle;
  margin: 0;
  left: 0;
  top: 0;
  transform: none;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:before,
  &:after {
    width: 2.28571429rem;
    height: 2.28571429rem;
    margin: 0 0 0 -1.14285714rem;
  }

  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 500rem;
    border: 0.2em solid rgba(0, 0, 0, 0.1);
  }

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    -webkit-animation: loader 0.6s linear;
    animation: loader 0.6s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #767676 transparent transparent;
    border-style: solid;
    border-width: 0.2em;
    -webkit-box-shadow: 0 0 0 1px transparent;
    box-shadow: 0 0 0 1px transparent;
  }
`;
