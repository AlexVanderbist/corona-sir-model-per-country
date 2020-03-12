import React from "react";

type Props = {
    rank: number;
    location: App.LocationStats;
};

export default function StatsRow({location: {id, country, daysSinceFirstInfection, beta, population, confirmed, peakInfected, peakInfectionDay, rNaught }, rank}: Props) {
    const tabularNums = {fontVariantNumeric: 'tabular-nums'};

    const hasData = daysSinceFirstInfection > 1 && confirmed > 1;

    return (
        <tr key={id}>
            <td className="px-3">{rank}</td>
            <td className="text-left px-3">{country}</td>
            <td style={tabularNums} className="text-right px-3">{confirmed}</td>
            <td style={tabularNums} className="text-right px-3">{daysSinceFirstInfection}</td>
            <td style={tabularNums} className="text-right px-3">{beta?.toFixed(2)}</td>
            {hasData ? (
                <>
                    <td>{rNaught.toFixed(2)}</td>
                    <td className="px-3">{peakInfectionDay}</td>
                    <td className="px-3">{Math.round((peakInfected / population) * 100)}%</td>
                    <td className="px-3">{Math.round(peakInfected)}</td>
                </>
            ): <td colSpan={4} className="text-left text-gray-500 bg-gray-100 px-2">not enough data</td>}
            <td style={tabularNums} className="text-right px-3">{population}</td>
        </tr>
    );
}
