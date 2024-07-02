import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

export type TrustBarProps = {
    images: string[];
    styles?: string;
    title?: string;
    subtitle?: string;
};

export const TrustBar = ({
    images,
    styles,
    title,
    subtitle,
}: TrustBarProps) => {
    return (
        <div className={clsx(styles)}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <h4>{subtitle}</h4>
            <Marquee>
                {images?.map((image) => (
                    <img
                        width={100}
                        key={image}
                        src={image}
                        className="mx-10"
                    />
                ))}
            </Marquee>
        </div>
    );
};
