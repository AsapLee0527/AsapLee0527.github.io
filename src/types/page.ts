export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    category?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    videoGroupTitle?: string;
    videos?: Array<{
        title: string;
        src: string;
        description?: string;
        poster?: string;
    }>;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}
