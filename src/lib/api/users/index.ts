const URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchData = async <T>(url: string = URL): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data...');
    }
    return response.json() as T;
};
