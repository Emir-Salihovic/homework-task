import clsx from 'clsx';

export type SidebarProps = {
    items: string[];
    styles?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ items, styles }) => (
    <aside className={clsx('p-4', styles)}>
        <h2>Sidebar</h2>
        <ul>{items?.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </aside>
);

export default Sidebar;
