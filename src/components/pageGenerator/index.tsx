import clsx from 'clsx';

import LayoutSection, { LayoutSectionComponentProps } from './section';
import LayoutSidebar, { LayoutSidebarProps } from './sidebar';
import Footer, { FooterProps } from '../footer';
import Header, { HeaderProps } from '../header';
import { Landing } from '../landing/Landing';
import Paper, { PaperProps } from '../paper';
import Sidebar, { SidebarProps } from '../sidebar';
import { TrustBar, TrustBarProps } from '../TrustBar';

/**
 * Props for a generic component within a layout.
 */
type ComponentProps = {
    type: string;
    props?: Record<string, unknown>;
    children?: React.ReactNode;
};

/**
 * Props for configuring a layout section.
 */
type LayoutSectionProps = {
    type: string;
    props?: Record<string, unknown>;
    components?: ComponentProps[];
};

/**
 * Props for configuring the PageGenerator component.
 */
type PageGeneratorProps = {
    config: LayoutSectionProps[];
    containerStyles?: string;
};

type ComponentTypeProps = PaperProps &
    HeaderProps &
    FooterProps &
    SidebarProps &
    TrustBarProps;

// Component type to component mapping
// ComponentTypeProps can be replaced with any also,
// but it is not allowed
const componentRegistry: Record<string, React.FC<ComponentTypeProps>> = {
    header: Header,
    footer: Footer,
    sidebar: Sidebar,
    paper: Paper,
    componentTrustBar: TrustBar,
    landing: Landing,
    // Add more components as needed
};

type LayoutComponentTypeProps = LayoutSidebarProps &
    LayoutSectionComponentProps;

// Layout type to layout component mapping
const layoutRegistry: Record<string, React.FC<LayoutComponentTypeProps>> = {
    layoutSection: LayoutSection,
    layoutSidebar: LayoutSidebar,
};

/**
 * Main PageGenerator component that dynamically renders layouts and components based on config.
 */
const PageGenerator: React.FC<PageGeneratorProps> = ({
    config,
    containerStyles,
}) => (
    <div className={clsx(containerStyles)}>
        {config.map((section, index) => {
            const { type, props, components } = section;

            // Check if type exists in layoutRegistry
            const LayoutComponent = layoutRegistry[type];

            if (LayoutComponent) {
                const layoutProps = {
                    ...props,
                    children: components?.map((component, idx) => {
                        const Component = componentRegistry[component.type];
                        if (Component) {
                            return (
                                <Component
                                    key={idx}
                                    {...(component.props as unknown as ComponentTypeProps)}
                                >
                                    {component.children}
                                </Component>
                            );
                        }
                        return null;
                    }),
                };

                return <LayoutComponent key={index} {...layoutProps} />;
            } else {
                // Treat as a standalone component if not a known layout type
                const Component = componentRegistry[type];
                if (Component) {
                    return (
                        <Component
                            key={index}
                            {...(props as unknown as ComponentTypeProps)}
                        >
                            {props?.children as React.ReactNode}
                        </Component>
                    );
                }
            }

            // console.warn(`No layout or component found for type: ${type}`);
            return null;
        })}
    </div>
);

export default PageGenerator;
