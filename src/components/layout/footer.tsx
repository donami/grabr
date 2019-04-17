import React from 'react';
import styled from '../../lib/styledComponents';

type Props = { className?: string };

const Footer: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>Copyright &copy; 2019 - Grabr.io</Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing.huge};
  background-color: ${props => props.theme.colors.darker};
`;
