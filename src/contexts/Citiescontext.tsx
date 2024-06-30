import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();

        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsloading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isloading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function UseCities() {
  const context = useContext(CitiesContext);
  if (context == undefined)
    throw new Error("CitiesContext is used outside of CitiesProvider");
  return context;
}
export { CitiesProvider, UseCities };
