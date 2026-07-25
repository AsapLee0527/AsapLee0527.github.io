'use client';

import { motion } from 'framer-motion';

interface ProjectShowcaseProps {
  locale: string;
}

const copy = {
  zh: {
    eyebrow: 'Game Agent Showcase',
    title: '通用游戏 Agent 项目展示',
    description:
      '基于大小脑协同架构，大脑负责长程规划、任务切换与高层指令生成，小脑负责 COT 导航指令遵循、战斗策略执行与实时推理闭环。',
    caption: '项目宣传视频：展示导航、战斗与端到端游戏智能体能力。',
  },
  en: {
    eyebrow: 'Game Agent Showcase',
    title: 'General Game Agent Demo',
    description:
      'A cortex-cerebellum style game agent, where the cortex handles long-horizon planning and skill routing while the cerebellum executes COT navigation, combat policies, and real-time inference.',
    caption: 'Project video highlighting navigation, combat, and end-to-end game-agent behavior.',
  },
};

export default function ProjectShowcase({ locale }: ProjectShowcaseProps) {
  const text = locale === 'zh' ? copy.zh : copy.en;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {text.eyebrow}
        </p>
        <h2 className="text-2xl font-serif font-bold text-primary">{text.title}</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-500">
          {text.description}
        </p>
      </div>

      <div className="bg-neutral-950">
        <video
          className="aspect-video w-full bg-black"
          controls
          preload="metadata"
          playsInline
          aria-label={text.title}
        >
          <source src="/videos/game-agent-showcase.mp4" type="video/mp4" />
        </video>
      </div>

      <p className="px-5 py-3 text-xs text-neutral-500 dark:text-neutral-600">
        {text.caption}
      </p>
    </motion.section>
  );
}
