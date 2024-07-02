import { FormProps, User } from 'types';

import FormGenerator from './components/formGenerator';
import PostForm from './components/formGenerator/postForm';
import List from './components/list';
import './styles.css';
import PageGenerator from './components/pageGenerator';
import { createPostMutation, postValidationSchema } from './lib/api/posts';
// import { Landing } from './components/landing/Landing';

type FormData = {
    title: string;
    body: string;
};

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

// ORDER OF THE COMPONENTS IS IMPORTANT!!!
const config = [
    {
        type: 'layoutSidebar',
        props: {
            styles: 'bg-[#eee] h-screen w-[20%] relative text-white hidden md:block',
        },
        components: [
            {
                type: 'header',
                props: {
                    title: 'Sidebar Header',
                    styles: 'h-[78px] flex items-center',
                },
            },
            {
                type: 'sidebar',
                props: {
                    items: ['item 1', 'item 2', 'item 3'],
                    styles: 'h-[calc(100%-178px)] bg-mainGreen',
                },
            },
            {
                type: 'footer',
                props: {
                    text: 'Sidebar Footer',
                    styles: 'absolute bottom-0 w-full h-[100px] flex items-center bg-red',
                },
            },
        ],
    },
    {
        type: 'layoutSection',
        props: {
            styles: 'bg-[#eee] h-screen w-full md:w-[80%] relative text-white',
        },
        components: [
            {
                type: 'header',
                props: {
                    title: 'App Header',
                    styles: 'h-[78px] flex items-center bg-red',
                },
            },
            {
                type: 'paper',
                props: {
                    styles: 'h-[calc(100%-178px)] bg-lightPurple overflow-y-scroll',
                },
                children: (
                    <div className="text-black bg-cream mt-8">
                        <FormGenerator
                            formTitle="Add a post"
                            successMessage="Post Added!"
                            useMutationFn={createPostMutation}
                            mutationKey={['add-post']}
                            validationSchema={postValidationSchema}
                            renderForm={({
                                register,
                                errors,
                            }: FormProps<FormData>) => (
                                <PostForm register={register} errors={errors} />
                            )}
                        />
                        <List
                            queryKey={['users']}
                            renderItem={renderUser}
                            listTitle="User List"
                        />
                    </div>
                ),
            },
            {
                type: 'footer',
                props: {
                    text: 'App Footer',
                    styles: 'absolute bottom-0 w-full h-[100px] flex items-center bg-primary',
                },
            },
        ],
    },
    {
        type: 'componentTrustBar',
        props: {
            title: 'Trust Bar',
            description:
                'This is a trust bar to showcase how the page generator works without a layout',
            styles: 'bg-yellow-100 p-4 w-[400px] hidden lg:block',
        },
    },
];

// FEEL FREE TO TRY IT, IT WILL REVERT THE APP
// LAYOUT TO THE INITIAL STARTER TEMPLATE LAYOUT
// const initialAppConfig = [
//     {
//         type: 'layoutSection',
//         components: [
//             {
//                 type: 'landing',
//             },
//         ],
//     },
// ];

function App() {
    return (
        <main>
            <PageGenerator config={config} containerStyles="flex" />
            {/* <Landing /> */}
        </main>
    );
}

export default App;
