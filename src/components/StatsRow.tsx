import React from "react";

type Props = {
    rank: number;
    location: App.LocationStats;
};

export default function StatsRow({location: {id, country, daysSinceFirstInfection, beta, population, confirmed, peakInfected, peakInfectionDay}, rank}: Props) {
    const tabularNums = {fontVariantNumeric: 'tabular-nums' };

    return (
        <tr key={id}>
            <td className="px-3">{rank}</td>
            <td className="text-left px-3">{country}</td>
            <td style={tabularNums} className="text-right px-3">{confirmed}</td>
            <td style={tabularNums} className="text-right px-3">{daysSinceFirstInfection}</td>
            <td style={tabularNums} className="text-right px-3">{beta?.toFixed(2)}</td>
            <td className="px-3">{peakInfectionDay}</td>
            <td className="px-3">{(peakInfected / population).toFixed(2)}%</td>
            <td className="px-3">{Math.round(peakInfected)}</td>
            <td style={tabularNums} className="text-right px-3">{population}</td>
        </tr>
    );
}