import styled from '@/lib/styledComponents';

const Item = styled.div`
  background: #fff;
  padding: ${props => props.theme.spacing.normal};
  border-radius: ${props => props.theme.radius};
  color: ${props => props.theme.colors.darkText};
`;

export default Item;
