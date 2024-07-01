import Marquee from 'react-fast-marquee';

type TrustBarProps = {
    images: string[];
};

export const TrustBar = ({ images }: TrustBarProps) => {
    return (
        <Marquee>
            {images.map((image) => (
                <img width={100} key={image} src={image} className="mx-10" />
            ))}
        </Marquee>
    );
};
