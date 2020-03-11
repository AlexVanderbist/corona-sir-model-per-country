import React, {useState} from 'react';
import LocationStats from "./LocationStats";

export default function SirCalculator({locations}) {
    const [location, setLocation] = useState();

    return (
        <div>
            <select
                value={location?.id}
                onChange={event => setLocation(locations.find(location => location.id === event.target.value))}
            >
                {locations.map(({ country, province, country_code, id }) => (
                    <option key={id} value={id}>
                        {country}, {province} ({country_code})
                    </option>
                ))}
            </select>

            {location && <LocationStats location={location}/>}
        </div>
    );
}
