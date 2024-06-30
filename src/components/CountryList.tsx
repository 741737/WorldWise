import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { UseCities } from "../contexts/Citiescontext";
function CountryList() {
  const { cities, isloading } = UseCities();
  if (isloading) return <Spinner />;
  if (!cities)
    return <Message message="Add your first city by clicking on map.." />;

  // Extract unique country names
  const countriesSet = new Set();
  cities.forEach((city) => {
    if (city.country) {
      countriesSet.add(city.country);
    }
  });

  const countries = Array.from(countriesSet); // Convert set to array

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country} emoji={country.emoji} />
      ))}
    </ul>
  );
}
export default CountryList;
