import React from "react";
import {calculateLocationStats} from "../services/sirCalculator";

export default function StatsRow({location}) {
    const {daysSinceFirstInfection, beta, population, confirmed} = calculateLocationStats(location);

    return (
        <tr key={location.id}>
            <td>{location.country}</td>
            <td>{confirmed}</td>
            <td>{daysSinceFirstInfection}</td>
            <td>{beta.toFixed(2)}</td>
            <td>{population}</td>
        </tr>
    );
}
