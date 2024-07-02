import clsx from 'clsx';

export type HeaderProps = {
    title: string;
    subtitle: string;
    styles?: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle, styles }) => (
    <header className={clsx('bg-primary p-4', styles)}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </header>
);

export default Header;
