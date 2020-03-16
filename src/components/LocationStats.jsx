import React from 'react';
import {calculateLocationStats} from "../services/sirCalculator";

export default function LocationStats({location}) {
    const { daysSinceFirst100Infected, beta, population } = calculateLocationStats(location);

    return (
        <div>days since first infection: {daysSinceFirst100Infected} and beta {beta}, population {population}</div>
    );
}
