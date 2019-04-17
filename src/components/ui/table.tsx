import React from 'react';
import styled from '@/lib/styledComponents';

type Props = {};
const Table: React.SFC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Table;

const Wrapper = styled.table`
  width: 100%;
  background: #fff;
  margin: 1em 0;
  border: 1px solid rgba(34, 36, 38, 0.15);
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0.28571429rem;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  border-collapse: separate;
  border-spacing: 0;

  thead th {
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.92857143em 0.78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  }

  td,
  th {
    padding: 0.78571429em 0.78571429em;
  }
`;
