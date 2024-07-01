import { User } from 'types';

import List from './components/list';
import './styles.css';

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

function App() {
    return (
        <main>
            <List
                queryKey={['users']}
                url={URL}
                renderItem={renderUser}
                listTitle="User List"
            />{' '}
        </main>
    );
}

export default App;
