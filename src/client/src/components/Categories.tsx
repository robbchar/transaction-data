import { forwardRef, useState } from 'react';
import styled from 'styled-components';

import withClickOutside from '../hooks/withClickOutside';
import { Category } from '../types/DataType';

const DropdownDiv = styled.div`
  position: relative;
`;

const MenuUl = styled.ul`
  position: absolute;

  list-style-type: none;
  margin: 5px 0 0 -65px;
  padding: 0;

  border: 1px solid grey;
  width: 150px;
  z-index: 10;
  & > li {
    margin: 0;

    background-color: white;
    padding-left: 1rem;
    &:hover {
      background-color: lightgray;
    }
    & > button {
      width: 100%;
      height: 100%;
      text-align: left;

      background: none;
      color: inherit;
      border: none;
      padding: 5px;
      margin: 0;
      font: inherit;
      cursor: pointer;
    }
  }
`;

interface CategoriesProps {
  open: Boolean;
  setOpen: Function;
  chosenCategoryLabel: string;
  categoryChosen: Function;
}

const Categories: React.FC<CategoriesProps> = forwardRef(
  (
    { open, setOpen, chosenCategoryLabel = ' -- Select -- ', categoryChosen },
    ref,
  ) => {
    const [selectedText, setSelectedText] = useState<string>(
      chosenCategoryLabel === '' ? ' -- Select -- ' : chosenCategoryLabel,
    );

    const categoryClicked = (categoryName: string) => {
      setSelectedText(categoryName);
      categoryChosen(categoryName);
      setOpen(false);
    };

    return (
      <DropdownDiv ref={ref}>
        <button onClick={() => setOpen(!open)}>{selectedText}</button>
        {open ? (
          <MenuUl>
            {Object.keys(Category).map((value, index) => (
              <li key={index} onClick={() => categoryClicked(value)}>
                {value}
              </li>
            ))}
          </MenuUl>
        ) : null}
      </DropdownDiv>
    );
  },
);

export default withClickOutside(Categories);
