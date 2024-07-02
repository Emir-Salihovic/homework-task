import clsx from 'clsx';

export interface ComponentTrustBarProps {
    title: string;
    description: string;
    styles?: string;
}

const ComponentTrustBar: React.FC<ComponentTrustBarProps> = ({
    title,
    description,
    styles,
}) => (
    <div className={clsx(styles, 'bg-gray-100 p-4')}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
    </div>
);

export default ComponentTrustBar;
