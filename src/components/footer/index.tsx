import clsx from 'clsx';

export interface FooterProps {
    text: string;
    styles?: string; // Allow Tailwind classes as props
}

const Footer: React.FC<FooterProps> = ({ text, styles }) => (
    <footer className={clsx('p-4', styles)}>
        <p>{text}</p>
    </footer>
);

export default Footer;
