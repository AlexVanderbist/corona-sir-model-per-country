export async function fetchConfirmedNumbers() {
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed');

    return await response.json();
}
