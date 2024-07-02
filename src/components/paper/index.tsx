import clsx from 'clsx';

export interface PaperProps {
    styles?: string;
    children: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({ styles, children }) => {
    return <div className={clsx(styles)}>{children}</div>;
};

export default Paper;
