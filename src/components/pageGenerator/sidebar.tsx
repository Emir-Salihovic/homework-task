export type LayoutSidebarProps = {
    styles?: string;
    children: React.ReactNode;
};

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ styles, children }) => (
    <div className={`flex ${styles}`}>{children}</div>
);

export default LayoutSidebar;
