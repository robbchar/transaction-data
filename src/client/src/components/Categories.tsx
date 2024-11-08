import { useState } from "react";
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
  "Groceries",
  "Eating out",
  "Eating In",
  "Alcohol/Bars",
  "Pet - Food",
  "Pet - Boarding",
  "Pet - Grooming",
  "Pet - Misc",
  "Pet - Vet",
  "Electricity",
  "Phone",
  "Internet",
  "Medical",
  "Medicine",
  "Insurance",
  "Clothes",
  "Miscelaneous",
  "Salon",
  "Loans/Finance",
  "Gifts",
  "Games",
  "Movies",
  "Concerts",
  "Subscriptions",
  "Entertainment",
  "Taxi/Lyft",
  "Hotel",
  "Mystery Transaction",
];

interface CategoriesProps {
  open: Boolean;
  setOpen: Function;
  chosenCategoryLabel: string;
  categoryChosen: Function;
}

const Categories: React.FC<CategoriesProps> = ({
  open,
  setOpen,
  chosenCategoryLabel,
  categoryChosen,
}) => {
  const [selectedText, setSelectedText] = useState<string>(
    chosenCategoryLabel ?? " -- Select -- "
  );

  const categoryClicked = (categoryName: string) => {
    setSelectedText(categoryName);
    categoryChosen(categoryName);
    setOpen(false);
  };

  return (
    <DropdownDiv>
      <button onClick={() => setOpen(!open)}>{selectedText}</button>
      {open ? (
        <MenuUl>
          {items.map((value, index) => (
            <li key={index} onClick={() => categoryClicked(value)}>
              {value}
            </li>
          ))}
        </MenuUl>
      ) : null}
    </DropdownDiv>
  );
};

export default withClickOutside(Categories);
