import { aboutDisciplines, aboutGrowth, aboutIntro, aboutPrinciple } from './aboutContent.ts';
import { contactChannels } from './contactChannels.ts';
import {
  careerEntries,
  careerGroups,
  companyWorkSpecialties,
  selectedWorks,
  skillGroups,
  type Copy,
} from './portfolioContent.ts';
import { profilePortfolioItems } from './profilePortfolio.ts';
import { visiblePortfolioItems } from './siteRevision.ts';
import { prepareSearchQuery, scoreSearchFields } from './searchMatching.ts';

export interface SiteSearchEntry {
  id: string;
  title: Copy;
  section: Copy;
  excerpt: Copy;
  href: string;
  terms: Copy[];
}

const sameCopy = (value: string): Copy => ({ ko: value, en: value });

const categoryLabels: Record<string, Copy> = {
  design: { ko: '디자인', en: 'Design' },
  development: { ko: '개발', en: 'Development' },
  planning: { ko: '기획', en: 'Planning' },
  operations: { ko: '사업 운영', en: 'Business operations' },
  brand: { ko: '디자인', en: 'Design' },
  marketing: { ko: '마케팅', en: 'Marketing' },
  club: { ko: '동아리', en: 'Club' },
};

function getCareerHref(slug: string) {
  return slug === 'company-work' ? '/portfolio/company-work' : `/career/${slug}`;
}

export function buildSiteSearchIndex(): SiteSearchEntry[] {
  const entries: SiteSearchEntry[] = [
    {
      id: 'about:overview',
      title: { ko: '소개', en: 'About' },
      section: { ko: '소개', en: 'About' },
      excerpt: aboutIntro,
      href: '/about#about',
      terms: [aboutPrinciple],
    },
    ...aboutGrowth.map((step) => ({
      id: `about:growth:${step.id}`,
      title: step.title,
      section: { ko: '성장 과정', en: 'Growth' },
      excerpt: step.body,
      href: `/#${step.anchorId}`,
      terms: [step.phase, ...step.tags, step.learning],
    })),
    ...aboutDisciplines.map((discipline) => ({
      id: `about:${discipline.id}`,
      title: discipline.title,
      section: { ko: '소개', en: 'About' },
      excerpt: discipline.body,
      href: `/about#about-${discipline.id}`,
      terms: [],
    })),
    ...contactChannels.map((channel) => ({
      id: `contact:${channel.id}`,
      title: channel.label,
      section: { ko: '연락', en: 'Contact' },
      excerpt: sameCopy(channel.href.replace(/^mailto:/, '')),
      href: '/contact#contact',
      terms: [sameCopy(channel.href.replace(/^mailto:/, ''))],
    })),
    ...careerEntries.flatMap((entry) => {
      const group = careerGroups.find((item) => item.id === entry.group);
      const entryTerms = [
        ...(entry.organization ? [entry.organization] : []),
        entry.role,
        ...entry.responsibilities,
        ...(entry.areas ?? []),
        entry.statusText,
        ...(entry.members ? [sameCopy(`${entry.members} members`), sameCopy(`${entry.members}명`)] : []),
      ];
      const careerRecord: SiteSearchEntry = {
        id: `career:${entry.slug}`,
        title: entry.title,
        section: group?.label ?? { ko: '경력', en: 'Experience' },
        excerpt: entry.summary,
        href: getCareerHref(entry.slug),
        terms: entryTerms,
      };
      const contributions = (entry.contributions ?? []).map((contribution, index) => {
        const specialty = companyWorkSpecialties.find((item) => item.id === contribution.specialty);
        return {
          id: `contribution:${entry.slug}:${index}`,
          title: contribution.title,
          section: entry.organization ?? entry.title,
          excerpt: contribution.description,
          href: getCareerHref(entry.slug),
          terms: [
            ...(contribution.productSummary ? [contribution.productSummary] : []),
            ...(specialty ? [specialty.label] : []),
          ],
        } satisfies SiteSearchEntry;
      });
      const ventures = (entry.ventures ?? []).map((venture) => {
        const name = venture.name === '로블갤러리' ? { ko: '로블갤러리', en: 'Roblox Gallery' } : sameCopy(venture.name);
        return {
          id: `venture:${entry.slug}:${venture.name.toLocaleLowerCase()}`,
          title: name,
          section: entry.title,
          excerpt: venture.summary,
          href: getCareerHref(entry.slug),
          terms: [
            venture.field,
            venture.statusText,
            sameCopy(`${venture.members}명`),
            sameCopy(`${venture.members} members`),
          ],
        } satisfies SiteSearchEntry;
      });
      return [careerRecord, ...contributions, ...ventures];
    }),
    ...selectedWorks.map((work) => ({
      id: `project:${work.slug}`,
      title: { ko: work.title, en: work.title },
      section: categoryLabels[work.category],
      excerpt: work.summary,
      href: `/portfolio/${work.slug}`,
      terms: [
        sameCopy(work.slug),
        sameCopy(work.eyebrow),
        work.headline,
        work.roles,
        work.output,
        sameCopy(work.projectStatus === 'ongoing' ? '진행 중 Ongoing' : work.status === 'prototype' ? '프로토타입 Prototype' : '프로젝트 Project'),
        ...work.notes.flatMap((note) => [note.title, note.body]),
        ...(work.href ? [sameCopy(new URL(work.href).hostname)] : []),
      ],
    })),
    ...visiblePortfolioItems(profilePortfolioItems)
      .filter((item) => item.kind === 'project' && !item.detailHref)
      .map((item) => ({
        id: `project:${item.id}`,
        title: item.title,
        section: categoryLabels[item.category],
        excerpt: item.description,
        href: '/portfolio#projects',
        terms: [
          item.subtitle,
          ...item.tags,
          ...(item.status ? [item.status] : []),
          ...(item.href?.startsWith('https://') ? [sameCopy(new URL(item.href).hostname)] : []),
        ],
      })),
    ...skillGroups.flatMap((group, groupIndex) => group.items.ko.map((skill, skillIndex) => ({
      id: `skill:${groupIndex}:${skillIndex}`,
      title: { ko: skill, en: group.items.en[skillIndex] },
      section: group.title,
      excerpt: { ko: skill, en: group.items.en[skillIndex] },
      href: '/portfolio#skills',
      terms: [group.title],
    }))),
  ];

  return entries;
}

export function searchSiteContent(entries: readonly SiteSearchEntry[], query: string): SiteSearchEntry[] {
  const preparedQuery = prepareSearchQuery(query);
  if (!preparedQuery) return [];

  return entries
    .map((entry, index) => {
      const localized = (copy: Copy) => [copy.ko, copy.en];
      const score = scoreSearchFields({
        names: localized(entry.title),
        sections: localized(entry.section),
        excerpts: localized(entry.excerpt),
        keywords: entry.terms.flatMap(localized),
      }, preparedQuery);
      return score > 0 ? { entry, index, score } : null;
    })
    .filter((match): match is { entry: SiteSearchEntry; index: number; score: number } => match !== null)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ entry }) => entry);
}
