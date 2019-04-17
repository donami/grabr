import React, { useState } from 'react';
import Heading from './heading';
import styled from '@/lib/styledComponents';
import Icon from './icon';

type Props = { title: string };
const Accordion: React.SFC<Props> = ({ title, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Wrapper>
      <Heading
        className="accordion-title"
        as="h4"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <Icon icon="caret-down" /> : <Icon icon="caret-right" />}
        {title}
      </Heading>
      {visible && <Body>{children}</Body>}
    </Wrapper>
  );
};

export default Accordion;

const Wrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
  border: #eee 1px solid;
  padding: ${props => props.theme.spacing.normal};
  border-radius: ${props => props.theme.radius};

  .accordion-title {
    cursor: pointer;

    i,
    svg {
      margin-right: ${props => props.theme.spacing.small};
    }
  }
`;
const Body = styled.div``;
