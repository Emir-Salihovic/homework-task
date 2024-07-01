import clsx from 'clsx';

export const Layout = ({ children, background }) => {
    return <section className={clsx('py-20', background)}>{children}</section>;
};
