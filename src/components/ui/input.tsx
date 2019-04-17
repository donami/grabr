import styled from '@/lib/styledComponents';

const Input = styled.input`
  padding: ${props => props.theme.spacing.small};
  border: ${props => props.theme.colors.light} 1px solid;
  border-radius: 5px;

  &:focus {
    outline: ${props => props.theme.colors.primary} 1px solid;
  }
`;

export default Input;
