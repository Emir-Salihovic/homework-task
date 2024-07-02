export type LayoutSectionComponentProps = {
    styles?: string;
    children: React.ReactNode;
};

const LayoutSection: React.FC<LayoutSectionComponentProps> = ({
    styles,
    children,
}) => <div className={styles}>{children}</div>;

export default LayoutSection;
