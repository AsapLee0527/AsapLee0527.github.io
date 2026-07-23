'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
    images?: string[];
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm text-neutral-700">{item.content}</p>
                            {item.images && item.images.length > 0 && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {item.images.map((image, imageIndex) => (
                                        <a
                                            key={image}
                                            href={image}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group relative block h-32 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <Image
                                                src={image}
                                                alt={`News image ${imageIndex + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                sizes="(max-width: 640px) 100vw, 180px"
                                            />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
