import { Link } from "react-router-dom";

import { findFlagUrlByNationality } from "country-flags-svg";

import useTableFilter from "../hooks/useTableFilter";

const DriversTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings
  );

  const filteredDrivers = applyFilter(
    props.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings
  );

  return (
    <>
      <div>DriversTable</div>
      <div>
        <label htmlFor="filter">Search:</label>
        <input
          type="text"
          id="filter"
          value={filterTable}
          onChange={handleFilterChange}
        />
      </div>

      <table>
        <tbody>
          {filteredDrivers.map((driver, i) => {
            const { driverId, givenName, familyName, nationality } =
              driver.Driver;
            const { points } = driver;
            const { name } = driver.Constructors[0];

            return (
              <tr key={driverId}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                  <Link to={`${driverId}`}>
                    {" "}
                    {givenName} {familyName}
                  </Link>
                </td>
                <td>{name}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DriversTable;