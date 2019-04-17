import React from 'react';
import styled from '@/lib/styledComponents';
import Heading from './heading';

type Props = {
  heading?: string;
  className?: string;
};

const Box: React.SFC<Props> = ({ heading, children, className }) => {
  return (
    <Wrapper className={className}>
      {heading && (
        <Title>
          <Heading as="h3">{heading}</Heading>
        </Title>
      )}
      <StyledBox>{children}</StyledBox>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const StyledBox = styled.div`
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: #fff;
  padding: ${props => props.theme.spacing.normal};
  color: ${props => props.theme.colors.text};
  /* border: 1px solid; */
  /* border-color: rgba(255, 255, 255, 0.1); */
  border-radius: 4px;
`;
const Title = styled.div`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: ${props => props.theme.spacing.normal};
`;

export default Box;
