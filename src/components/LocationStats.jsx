import React from 'react';
import {calculateLocationStats} from "../services/sirCalculator";

export default function LocationStats({location}) {
    const { daysSinceFirstInfection, beta, population } = calculateLocationStats(location);

    return (
        <div>days since first infection: {daysSinceFirstInfection} and beta {beta}, population {population}</div>
    );
}
