import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import Icon from '../../../components/ui/icon';
import styled from '../../../lib/styledComponents';

type Props = {
  label?: string;
};
const AdminBack: React.SFC<Props> = ({ label }) => {
  return (
    <StyledLink to="/admin">
      <Icon icon="arrow-circle-left" />
      {label || 'Back'}
    </StyledLink>
  );
};

export default AdminBack;

const StyledLink = styled(Link)<LinkProps & {}>`
  text-decoration: none;
  i,
  svg {
    margin-right: ${props => props.theme.spacing.small};
  }
`;
