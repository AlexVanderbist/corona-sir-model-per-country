import React from "react";
import StatsRow from "./StatsRow";

type Props = {
    locations: Array<App.LocationStats>;
};

export default function StatsTable({locations}: Props) {
    locations = locations.sort((l1, l2) => l2?.latest - l1?.latest).filter(l => l.beta < 1.0);

    return (
        <table className="text-right">
            <thead>
            <tr>
                <th className="px-3">#</th>
                <th className="px-3 text-left">Country</th>
                <th className="px-3">Confirmed infections</th>
                <th className="px-3">Days since first 100 infected</th>
                <th className="px-3">Infection rate</th>
                <th className="px-3">R0</th>
                <th className="px-3">Peak after days</th>
                <th className="px-3">% infected at peak</th>
                <th className="px-3">Peak infected</th>
                <th className="px-3">Population</th>
            </tr>
            </thead>
            <tbody>
            {locations.map((location, key) => <StatsRow location={location} rank={key + 1}/>)}
            </tbody>
        </table>
    );
}
