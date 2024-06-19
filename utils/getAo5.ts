import {getLast5Times} from "~/services/timesService";

export default async function getAo5() : Promise<number>
{
    const timesList = await getLast5Times()
    console.log("Last 5 times: ", timesList);

    if (timesList.length < 5) return 1

    let ao5 = removeBestAndLowerTime(timesList)
    console.log("Times after removing best and worst: ", ao5);

    let totalTimeInTimestamp : number = ao5.reduce((sum : number, time : Times) => sum + time.time_in_sec, 0)
    console.log("Total time in timestamp: ", totalTimeInTimestamp);

    return totalTimeInTimestamp / ao5.length
}