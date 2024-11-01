interface CategoriesProps {
  chosenCategory: string;
}

const Categories: React.FC<CategoriesProps> = ({ chosenCategory }) => {
  return (
    <select name="categories" value={chosenCategory}>
      <option value="select">Select</option>
      <option value="mortgage">Mortgage</option>
      <option value="carPayment">Car payment</option>
      <option value="carREpair">Car Repair</option>
      <option value="carCharging">Car Charging</option>
      <option value="carParking">Car Parking</option>
      <option value="groceries">Groceries</option>
      <option value="restaurants">Restaurants</option>
      <option value="petFood">Pet Food</option>
      <option value="electricity">Electricity</option>
      <option value="phone">Phone</option>
      <option value="internet">Internet</option>
      <option value="medical">Medical</option>
      <option value="medicine">Medicine</option>
      <option value="insurance">Insurance</option>
      <option value="misc">Miscelaneous</option>
      <option value="salon">Salon</option>
      <option value="loansFinance">Loans/Finance</option>
      <option value="gifts">Gifts</option>
      <option value="alcoholBars">Alcohol/Bars</option>
      <option value="games">Games</option>
      <option value="movies">Movies</option>
      <option value="concerts">Concerts</option>
      <option value="subscriptions">Subscriptions</option>
      <option value="entertainme">Entertainment</option>
    </select>
  );
};

export default Categories;
