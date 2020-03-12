import React from "react";
import StatsRow from "./StatsRow";

type Props = {
    locations: Array<App.LocationStats>;
};

export default function StatsTable({locations}: Props) {
    locations = locations.sort((l1, l2) => l2?.beta - l1?.beta).filter(l => l.beta < 1.0);

    return (
        <table className="text-right">
            <thead>
            <tr>
                <th>#</th>
                <th className="text-left">Country</th>
                <th>Confirmed infections</th>
                <th>Days since first infection</th>
                <th>Infection rate</th>
                <th>Peak after days</th>
                <th>% infected of population</th>
                <th>Peak infected</th>
                <th>Population</th>
            </tr>
            </thead>
            <tbody>
            {locations.map((location, key) => <StatsRow location={location} rank={key + 1}/>)}
            </tbody>
        </table>
    );
}
