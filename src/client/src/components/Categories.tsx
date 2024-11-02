import { forwardRef, MutableRefObject, useState } from "react";
import { styled } from "styled-components";

import withClickOutside from "../hooks/withClickOutside";

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

const items: Array<string> = [
  "Mortgage",
  "Car payment",
  "Car Charging",
  "Pet Food",
  "Electricity",
  "Phone",
  "Internet",
  "Medical",
  "Medicine",
  "Insurance",
  "Miscelaneous",
  "Salon",
  "Loans/Finance",
  "Gifts",
  "Alcohol/Bars",
  "Games",
  "Movies",
  "Concerts",
  "Subscriptions",
  "Entertainment",
];

interface CategoriesProps {
  open: Boolean;
  setOpen: Function;
  chosenCategory: string;
}

const Categories: React.FC<CategoriesProps> = forwardRef(
  ({ open, setOpen, chosenCategory }, ref) => {
    const [selectedText, setSelectedText] = useState<string>(
      chosenCategory ?? " -- Select -- "
    );

    const itemClicked = (itemName: string) => {
      setSelectedText(itemName);
      setOpen(false);
    };

    return (
      <DropdownDiv ref={ref}>
        <button onClick={() => setOpen(!open)}>{selectedText}</button>
        {open ? (
          <MenuUl>
            {items.map((value, index) => (
              <li key={index} onClick={() => itemClicked(value)}>
                {value}
              </li>
            ))}
          </MenuUl>
        ) : null}
      </DropdownDiv>
    );
  }
);

export default withClickOutside(Categories);
