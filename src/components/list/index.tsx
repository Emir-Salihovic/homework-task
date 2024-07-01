import React from 'react';

import { useQuery, QueryKey } from '@tanstack/react-query';

import { fetchData } from '@homework-task/lib/api';

interface ListProps<T> {
    queryKey: QueryKey;
    url: string;
    renderItem: (item: T) => React.ReactNode;
    listTitle: string;
}

const List = <T,>({ queryKey, url, renderItem, listTitle }: ListProps<T>) => {
    const { data, isLoading, isError } = useQuery<T[], Error>({
        queryKey,
        queryFn: () => fetchData<T[]>(url),
    });

    if (isError) {
        return <div>Error fetching data...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-2">
            <h2 className="text-xl mb-2 font-semibold">{listTitle}</h2>
            <ul>
                {data?.map((item, index) => (
                    <li key={index}>{renderItem(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default List;
