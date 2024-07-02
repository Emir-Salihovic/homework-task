import clsx from 'clsx';

export type FooterProps = {
    text: string;
    styles?: string;
};

const Footer: React.FC<FooterProps> = ({ text, styles }) => (
    <footer className={clsx('p-4', styles)}>
        <p>{text}</p>
    </footer>
);

export default Footer;
