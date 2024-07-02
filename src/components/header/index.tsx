import clsx from 'clsx';

export interface HeaderProps {
    title: string;
    subtitle: string;
    styles?: string; // Allow Tailwind classes as props
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, styles }) => (
    <header className={clsx('bg-primary p-4', styles)}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </header>
);

export default Header;
