import React from "react";

type Props = {
    rank: number;
    location: App.LocationStats;
};

export default function StatsRow({location: {id, country, daysSinceFirstInfection, beta, population, confirmed, peakInfected, peakInfectionDay}, rank}: Props) {
    const tabularNums = {fontVariantNumeric: 'tabular-nums' };

    return (
        <tr key={id}>
            <td>{rank}</td>
            <td className="text-left">{country}</td>
            <td style={tabularNums} className="text-right">{confirmed}</td>
            <td style={tabularNums} className="text-right">{daysSinceFirstInfection}</td>
            <td style={tabularNums} className="text-right">{beta?.toFixed(2)}</td>
            <td>{peakInfectionDay}</td>
            <td>{(peakInfected / population).toFixed(2)}%</td>
            <td>{Math.round(peakInfected)}</td>
            <td style={tabularNums} className="text-right">{population}</td>
        </tr>
    );
}
