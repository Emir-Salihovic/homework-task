import { z } from 'zod';

type CreatePostDto = {
    title: string;
    body: string;
};

export const postValidationSchema = z.object({
    title: z.string().min(2, 'Needs to be at least 2 characters long.'),
    body: z.string().min(2, 'Needs to be at least 2 characters long.'),
});

export const createPostMutation = async (data?: CreatePostDto) => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
