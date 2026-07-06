'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const groupedItems = config.items.reduce(
        (groups, item, index) => {
            const category = item.category ?? '';
            const currentGroup = groups.at(-1);

            if (!currentGroup || currentGroup.category !== category) {
                groups.push({ category, items: [{ item, index }] });
            } else {
                currentGroup.items.push({ item, index });
            }

            return groups;
        },
        [] as Array<{
            category: string;
            items: Array<{ item: CardPageConfig['items'][number]; index: number }>;
        }>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={embedded ? "space-y-6" : "space-y-10"}>
                {groupedItems.map((group, groupIndex) => (
                    <section key={`${group.category}-${groupIndex}`}>
                        {group.category && (
                            <h2 className={`${embedded ? "text-xl" : "text-2xl"} font-serif font-bold text-primary mb-5`}>
                                {group.category}
                            </h2>
                        )}
                        <div className={`grid ${embedded ? "gap-4" : "gap-6"} ${group.items.some(({ item }) => item.image) ? "md:grid-cols-2" : ""}`}>
                            {group.items.map(({ item, index }) => (
                                <motion.article
                                    key={`${item.title}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
                                >
                                    {item.image && (
                                        <a
                                            href={item.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${item.subtitle ?? item.title} award certificate`}
                                            className="relative block aspect-[4/3] bg-neutral-50 dark:bg-neutral-800"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={`${item.subtitle ?? item.title} award certificate`}
                                                fill
                                                sizes="(min-width: 768px) 50vw, 100vw"
                                                className="object-contain p-3"
                                            />
                                        </a>
                                    )}
                                    <div className={embedded ? "p-4" : "p-6"}>
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
                                            {item.date && (
                                                <span className="shrink-0 text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>
                                        {item.subtitle && (
                                            <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
                                        )}
                                        {item.content && (
                                            <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                                <ReactMarkdown components={markdownComponents}>
                                                    {item.content}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                        {item.videos && item.videos.length > 0 && (
                                            <div className="mt-5">
                                                {item.videoGroupTitle && (
                                                    <h4 className={`${embedded ? "text-base" : "text-lg"} font-semibold text-primary mb-3`}>
                                                        {item.videoGroupTitle}
                                                    </h4>
                                                )}
                                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                                    {item.videos.map(video => (
                                                        <figure
                                                            key={video.src}
                                                            className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
                                                        >
                                                            <video
                                                                controls
                                                                playsInline
                                                                preload="metadata"
                                                                poster={video.poster}
                                                                className="aspect-video w-full bg-black object-contain"
                                                            >
                                                                <source src={video.src} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <figcaption className="p-3">
                                                                <p className="text-sm font-semibold text-primary">{video.title}</p>
                                                                {video.description && (
                                                                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
                                                                        {video.description}
                                                                    </p>
                                                                )}
                                                            </figcaption>
                                                        </figure>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </motion.div>
    );
}
