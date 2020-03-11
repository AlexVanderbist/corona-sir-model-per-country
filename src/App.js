import React, {useEffect, useState} from 'react';
import SirCalculator from "./components/SirCalculator";
import {fetchConfirmedNumbers} from "./services/coronaApi";
import StatsTable from "./components/StatsTable";

function App() {
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        fetchConfirmedNumbers().then(({locations}) => {
            setLocations(
                locations
                    .filter(location => location.province.length === 0)
                    .map(location => ({...location, id: Math.random().toString(36).substr(2, 9)}))
            );
        });
    }, []);

    return (
        <div className="flex justify-center">
            <div className="max-w-lg w-3/4">
                {locations && (
                    <>
                        <SirCalculator locations={locations} />
                        <StatsTable locations={locations}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
