import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import DriverDetailsTable from "../components/DriverDetailsTable";

const DriverDetails = () => {
  const [driverInfo, setDriverInfo] = useState<any[]>([]);

  const driverDetailData: any = useLoaderData();

  const { name: team } =
    driverDetailData[0].MRData?.ConstructorTable.Constructors[0];
  const {
    givenName,
    familyName,
    dateOfBirth: birth,
    nationality,
  } = driverDetailData[1].MRData?.DriverTable.Drivers[0];

  const tableData = driverDetailData[2];

  useEffect(() => {
    setDriverInfo([
      "Nationality:" + " " + nationality,
      "Team:" + " " + team,
      "Birth:" + " " + birth,
    ]);
  }, [setDriverInfo, nationality, team, birth]);

  return (
    <>
      <div>
        {givenName} {familyName}
      </div>
      <ul>
        {driverInfo.map((driver, i) => (
          <li key={i}>{driver}</li>
        ))}
      </ul>
      <DriverDetailsTable data={tableData} />
    </>
  );
};

export default DriverDetails;

export const loader = async ({ params }: { params: any }) => {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/2013/drivers/${params.driverId}.json`
    );
    const responseTeam = await fetch(
      `https://ergast.com/api/f1/2013/drivers/${params.driverId}/constructors.json`
    );
    const resultResponse = await fetch(
      `http://ergast.com/api/f1/2013/drivers/${params.driverId}/results.json`
    );
    const dataTeam = await responseTeam.json();
    const dataInfo = await response.json();
    const dataResults = await resultResponse.json();
    const data = [dataTeam, dataInfo, dataResults];
    return data;
  } catch (error) {
    console.log(error);
  }
};