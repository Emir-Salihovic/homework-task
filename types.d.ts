declare const __CWD__: string;

export type Card = {
    title: string;
    image: string;
    description: string;
    background: string;
    onClick: () => void;
    buttonText: string;
};

export type ShowcaseItem = {
    title: string;
    description: string;
};

export type PanelShowcaseItem = {
    title: string;
    description: string;
    image: string;
};
