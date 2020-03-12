type ConfirmedNumbersResponse = {
    locations: Array<App.LocationData>;
};

export async function fetchConfirmedNumbers(): Promise<ConfirmedNumbersResponse> {
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed');

    return await response.json();
}
