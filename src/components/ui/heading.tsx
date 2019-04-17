import React, { HTMLProps } from 'react';
import styled, { css } from '@/lib/styledComponents';

type Props = {
  as?: string;
  divided?: boolean;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  brand?: boolean;
  onClick?: any;
  className?: string;
};

const Heading: React.SFC<Props> = ({
  children,
  divided = false,
  as = 'h3',
  primary = false,
  secondary = false,
  accent = false,
  brand = false,
  className,
  ...other
}) => {
  return (
    <Wrapper
      as={as as any}
      divided={divided}
      primary={primary}
      accent={accent}
      brand={brand}
      secondary={secondary}
      className={className ? `${className} heading` : 'heading'}
      {...other}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;

type ElemProps = {
  divided?: boolean;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  brand?: boolean;
};
const Wrapper = styled.h3<ElemProps>`
  text-transform: uppercase;
  font-weight: 300;

  ${props => {
    if (props.divided) {
      let background = props.theme.colors.brand;

      if (props.primary) {
        background = props.theme.colors.primary;
      } else if (props.secondary) {
        background = props.theme.colors.secondary;
      } else if (props.accent) {
        background = props.theme.colors.accent;
      } else if (props.brand) {
        background = props.theme.colors.brand;
      }

      return css`
        position: relative;
        border-bottom: #eee 1px solid;
        border-color: rgba(255, 255, 255, 0.1);
        padding-bottom: ${props.theme.spacing.small};
        margin-bottom: ${props.theme.spacing.small};

        &::before {
          content: '';
          background: ${background};
          height: 2px;
          width: 40px;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      `;
    }
    return null;
  }}
`;
