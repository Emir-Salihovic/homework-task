import { useForm } from 'react-hook-form';

import { User } from 'types';

import FormGenerator from './components/formGenerator';
import List from './components/list';
import './styles.css';
import { createPostMutation, postValidationSchema } from './lib/api/posts';

const URL = 'https://jsonplaceholder.typicode.com/users';

const renderUser = (user: User) => (
    <div>
        <strong>ID:</strong> {user.id}
        <br />
        <strong>Name:</strong> {user.name}
        <br />
        <strong>Username:</strong> {user.username}
        <br />
        <strong>Email:</strong> {user.email}
        <br />
        <strong>Phone:</strong> {user.phone}
        <br />
        <hr className="my-2" />
    </div>
);

type FormData = {
    title: string;
    body: string;
};

function App() {
    return (
        <main>
            <List
                queryKey={['users']}
                url={URL}
                renderItem={renderUser}
                listTitle="User List"
            />

            <FormGenerator
                formTitle="Add a post"
                successMessage="Post Added!"
                useMutationFn={createPostMutation}
                mutationKey={['add-post']}
                // invalidateQueries={['posts']}
                validationSchema={postValidationSchema}
                renderForm={({
                    register,
                    errors,
                }: {
                    register: ReturnType<typeof useForm<FormData>>['register'];
                    errors: ReturnType<typeof useForm>['formState']['errors'];
                }) => (
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
                )}
            />
        </main>
    );
}

export default App;
