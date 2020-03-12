import React, {useEffect, useState} from 'react';
import SirCalculator from "./components/SirCalculator";
import {fetchConfirmedNumbers} from "./services/coronaApi";
import StatsTable from "./components/StatsTable";
import {calculateLocationStats} from "./services/sirCalculator";

function App() {
    const [locations, setLocations] = useState<Array<App.LocationStats> | null>(null);

    useEffect(() => {
        fetchConfirmedNumbers().then(({locations}) => {
            setLocations(
                locations
                    .filter(location => location.province.length === 0)
                    .map(location => ({
                        ...location,
                        id: Math.random().toString(36).substr(2, 9),
                    }))
                    .map(location => calculateLocationStats(location))
            );
        });
    }, []);

    return (
        <div className="flex justify-center">
            <div className="mx-4">
                <p className="my-3 text-lg">Expected infection rate based on cruise ship case is <strong>0.16</strong></p>
                <p className="my-3 text-lg">Expected R0 based on cruise ship case is <strong>2.28</strong></p>
                {locations && (
                    <>
                        {/*<SirCalculator locations={locations}/>*/}
                        <StatsTable locations={locations}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
