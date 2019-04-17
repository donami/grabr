import React, { useState } from 'react';
import { CategoryFilter } from '../../interfaces/models';
import styled from '../../lib/styledComponents';

type Props = {
  filter: CategoryFilter;
  activeFilters: CategoryFilter[];
  onChange: (e: any, value: string) => any;
};

const CategoryFilter: React.SFC<Props> = ({
  filter,
  onChange,
  activeFilters,
}) => {
  const isChecked = (value: string) => {
    const hasFilterWithKey = activeFilters.find(
      item => item.key === filter.key
    );

    if (hasFilterWithKey && hasFilterWithKey.values.indexOf(value) > -1) {
      return true;
    }
    return false;
  };

  // remove duplicate values
  const values = filter.values.reduce<string[]>((acc, value) => {
    if (acc.indexOf(value) > -1) {
      return acc;
    }
    acc.push(value);
    return acc;
  }, []);

  return (
    <Wrapper>
      <Key>{filter.key}</Key>
      {values.map((value, index) => (
        <Value key={index}>
          <input
            defaultChecked={isChecked(value)}
            id={`${value}_${index}`}
            type="checkbox"
            key={index}
            onChange={e => {
              onChange(e, value);
            }}
          />
          <LabelSelected
            selected={isChecked(value)}
            htmlFor={`${value}_${index}`}
          >
            {value}
          </LabelSelected>
        </Value>
      ))}
    </Wrapper>
  );
};

export default CategoryFilter;

const Wrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const Key = styled.h4`
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;

  label {
    cursor: pointer;
  }
  input {
    margin-right: 5px;
  }
`;

const LabelSelected = styled.label<{ selected: boolean }>`
  color: ${props =>
    props.selected ? props.theme.colors.accent : props.theme.colors.text};
`;
