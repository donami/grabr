import styled from '../../lib/styledComponents';

const Tag = styled.div`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
`;

export default Tag;
