import React from 'react';

import { useQuery, QueryKey } from '@tanstack/react-query';

import { fetchData } from '@homework-task/lib/api/users';

type ListProps<T> = {
    queryKey: QueryKey;
    renderItem: (item: T) => React.ReactNode;
    listTitle: string;
};

const List = <T,>({ queryKey, renderItem, listTitle }: ListProps<T>) => {
    const { data, isLoading, isError } = useQuery<T[], Error>({
        queryKey,
        queryFn: () => fetchData<T[]>(),
    });

    if (isError) {
        return (
            <div className="text-2xl text-center text-red">
                Error fetching data...
            </div>
        );
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
