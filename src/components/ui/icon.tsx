import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from '../../lib/styledComponents';

const Icon: React.SFC<any> = ({ pointer, ...other }) => {
  return (
    <StyledIcon pointer={!!pointer}>
      <FontAwesomeIcon {...other} />
    </StyledIcon>
  );
};

export default Icon;

const StyledIcon = styled('div')<{ pointer: boolean }>`
  display: inline-block;

  ${props =>
    props.pointer &&
    css`
      cursor: pointer;
    `}
`;
