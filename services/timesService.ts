const API_BASE_URL : string = '/api';

export const getTimes = async () : Promise<Times[]> => {
    try {
        return await $fetch<Times[]>(`${API_BASE_URL}/times`, {
            method: 'GET'
        })
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getTimeByUsername = async (username : string) : Promise<Times[]> => {
    try {
        return await $fetch<Times[]>(`${API_BASE_URL}/times/getTimeByUsername`, {
            method: 'GET',
            body : JSON.stringify(username)
        })
    } catch (error) {
        console.error(error);
        return []
    }
}

export const addTimes = async (timestamp : number): Promise<void> => {
    try {
        return await $fetch(`${API_BASE_URL}/times`, {
            method: 'POST',
            body: JSON.stringify({time_in_sec: timestamp})
        })
    } catch (error) {
        console.error(error);
    }
}

export const getLast5Times = async (): Promise<Times[]> => {
    try {
        return await $fetch(`${API_BASE_URL}/times/getLast5Times`, {
            method: 'GET'
        })
    } catch (error) {
        console.error(error);
        return []
    }
}