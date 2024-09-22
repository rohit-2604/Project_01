import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCountryIndData } from "../../api/postApi";
import Loader from "../UI/Loader";


const CountryDetails = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryIndData(params.id);
        if (res.status === 200) {
          setCountry(res.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch country data:", error);
      }
    });
  }, [params.id]); // Add params.id as a dependency

  if (isPending) return <Loader />;
  

  if (!country) return <div>No country data available</div>;

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        <div className="country-image grid grid-two-cols">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="flag"
          />
          <div className="country-content">
            <p className="card-title"> {country.name.official} </p>
            <div className="infoContainer">
              <p>
                <span className="card-description"> Native Names:</span>
                {Object.values(country.name.nativeName)
                  .map((name) => name.common)
                  .join(", ")}
              </p>
              <p>
                <span className="card-description"> Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="card-description"> Region:</span>
                {country.region}
              </p>
              <p>
                <span className="card-description"> Sub Region:</span>
                {country.subregion}
              </p>
              <p>
                <span className="card-description"> Capital:</span>
                {country.capital}
              </p>
              <p>
                <span className="card-description"> Top Level Domain:</span>
                {country.tld[0]}
              </p>
              <p>
                <span className="card-description"> Currencies: </span>
                {Object.values(country.currencies)
                  .map((cur) => cur.name)
                  .join(", ")}
              </p>
              <p>
                <span className="card-description">Languages: </span>
                {Object.values(country.languages)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="country-card-backBtn">
          <NavLink to="/country" className="backBtn">
            <button>Go Back</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails
