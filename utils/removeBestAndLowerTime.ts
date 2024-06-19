
export default function (timesList : Times[])
{
    if (timesList.length <= 2) return timesList;

    const sortedTimes = timesList.sort((a, b) => a.time_in_sec - b.time_in_sec);
    return sortedTimes.slice(1, sortedTimes.length - 1); // Retire le meilleur et le pire temps
}