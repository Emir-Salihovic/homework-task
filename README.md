## PageGenerator Component

The `PageGenerator` component dynamically renders a page layout based on a configuration object.

### Example Configuration

```jsx
import PageGenerator from './PageGenerator';

const config = [
  {
    type: 'layoutSidebar',
    props: { styles: 'bg-[#eee] h-screen w-[20%] relative text-white hidden md:block' },
    components: [
      { type: 'header', props: { title: 'Sidebar Header', styles: 'h-[78px] flex items-center' } },
      { type: 'sidebar', props: { items: ['item 1', 'item 2', 'item 3'], styles: 'h-[calc(100%-178px)] bg-mainGreen' } },
      { type: 'footer', props: { text: 'Sidebar Footer', styles: 'absolute bottom-0 w-full h-[100px] flex items-center bg-red' } },
    ],
  },
  {
    type: 'layoutSection',
    props: { styles: 'bg-[#eee] h-screen w-full md:w-[80%] relative text-white' },
    components: [
      { type: 'header', props: { title: 'App Header', styles: 'h-[78px] flex items-center bg-red' } },
      { type: 'paper', props: { styles: 'h-[calc(100%-178px)] bg-lightPurple overflow-y-scroll' }, children: 'Dynamic content' },
      { type: 'footer', props: { text: 'App Footer', styles: 'absolute bottom-0 w-full h-[100px] flex items-center bg-primary' } },
    ],
  },
  {
    type: 'componentTrustBar',
    props: {
      title: 'Trust Bar',
      description: 'This is a trust bar to showcase how the page generator works without a layout',
,
      styles: 'bg-yellow-100 p-4 w-[400px] hidden lg:block',
    },
  },
];


const App: React.FC = () => (
  <PageGenerator config={config} containerStyles="page-container" />
);

export default App;

```

### Configuration Details

-   **config**: Defines layout sections (`layoutSection`, `layoutSidebar`) and their components.
    -   **type**: Type of layout section.
    -   **components**: Array of components (`header`, `footer`, `sidebar`, `paper`).
        -   **type**: Type of component.
        -   **children**: Content to render within the component.

### Component Mapping

Components (`header`, `footer`, `sidebar`, `paper`) are mapped using registries (`componentRegistry` and `layoutRegistry`) within the `PageGenerator` component.

## FormGenerator Component

The `FormGenerator` component simplifies form handling and submission using React Query and React Hook Form.

### Props

-   **formTitle** (`string`, optional): Title displayed above the form.
-   **successMessage** (`string`, default: 'Form Submitted!'): Message shown upon successful form submission.
-   **invalidateQueries** (`string[]`, optional): Queries to invalidate in React Query upon form submission.
-   **mutationKey** (`string[]`): Unique key for the mutation operation.
-   **validationSchema** (`ZodSchema<T>`): Validation schema for form data using Zod.
-   **useMutationFn** (`(data?: T) => Promise<void>`): Function to execute the mutation operation.
-   **renderForm** (`(props: RenderFormProps<T>) => React.ReactNode`): Function to render the form fields.

### Usage Example

```tsx
import React from 'react';
import { FormGenerator, RenderFormProps } from './FormGenerator'; // Adjust path as needed
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

// Define form data structure
type FormData = {
    username: string;
    password: string;
};

// Define validation schema using Zod
const validationSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const App: React.FC = () => {
    const { mutateAsync } = useMutation<void, Error, FormData>(
        async (formData) => {
            // Simulate async operation (replace with actual API call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    );

    // Render the FormGenerator component
    return (
        <FormGenerator
            formTitle="Login Form"
            successMessage="Login Successful!"
            mutationKey={['login']}
            validationSchema={validationSchema}
            useMutationFn={mutateAsync}
            renderForm={({ register, errors }: RenderFormProps<FormData>) => (
                <div>
                    <input type="text" {...register('username')} />
                    {errors.username && <span>{errors.username.message}</span>}
                    <input type="password" {...register('password')} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
            )}
        />
    );
};

export default App;
```

### Features

-   **Validation**: Automatically validates form data against the specified schema.
-   **Error Handling**: Handles and displays validation errors using Zod.
-   **Form Submission**: Uses React Query to manage asynchronous form submissions.
-   **Mutation Reset**: Allows resetting the form state upon error with a reset button.

## List Component

The `List` component fetches data and renders a list based on the provided props using React Query.

### Props

-   **queryKey** (`QueryKey`): Unique key for the query operation.
-   **renderItem** (`(item: T) => React.ReactNode`): Function to render each item in the list.
-   **listTitle** (`string`): Title displayed above the rendered list.

### Usage Example

```tsx
import React from 'react';
import { List } from './List'; // Adjust path as needed
import { useQueryClient } from '@tanstack/react-query';

// Example usage with user data
const UserList: React.FC = () => {
    const queryClient = useQueryClient();

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

    return (
        <List
            queryKey={['users']} // Query key for fetching user data
            renderItem={renderUser} // Example renderItem function
            listTitle="User List"
        />
    );
};

export default UserList;
```

### Features

-   **Data Fetching**: Fetches data using React Query based on the provided `queryKey`.
-   **Loading State**: Displays "Loading..." while data is being fetched.
-   **Error Handling**: Shows an error message if there is an issue fetching data.
-   **Rendering**: Renders each item in the list using the `renderItem` function provided.
