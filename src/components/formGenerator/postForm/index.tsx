import { FormProps } from 'types';

type FormData = {
    title: string;
    body: string;
};

const PostForm: React.FC<FormProps<FormData>> = ({ register, errors }) => {
    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor="id"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Title:
                </label>
                <input
                    id="title"
                    {...register('title')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.title && (
                    <span className="text-red text-sm">
                        {errors.title.message as string}
                    </span>
                )}
            </div>
            <div className="mb-6">
                <label
                    htmlFor="body"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Body:
                </label>
                <textarea
                    rows={4}
                    id="body"
                    {...register('body')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.body && (
                    <span className="text-red text-sm">
                        {errors.body.message as string}
                    </span>
                )}
            </div>
        </>
    );
};

export default PostForm;
