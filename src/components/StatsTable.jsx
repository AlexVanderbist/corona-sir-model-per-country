import React from "react";
import StatsRow from "./StatsRow";

export default function StatsTable({locations}) {
    return (
        <table>
            <thead>
                <th>Country</th>
                <th>Confirmed infections</th>
                <th>Days since first infection</th>
                <th>Infection rate</th>
                <th>Population</th>
            </thead>
            <tbody>
                {locations.map(location => <StatsRow location={location}/>)}
            </tbody>
        </table>
    );
}
