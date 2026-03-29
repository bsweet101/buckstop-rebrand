'use client';

import { useState } from 'react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  image?: string;
}

interface ExpandableArticleProps {
  article: Article;
}

function renderContent(content: string) {
  // Split by double newlines into paragraphs, handle bold markers
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading lines start with **...**
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
      return (
        <h4 key={i} className="mt-6 mb-2 text-base font-bold text-charcoal">
          {trimmed.replace(/\*\*/g, '')}
        </h4>
      );
    }

    // Bullet lists (lines starting with -)
    if (trimmed.split('\n').every((line) => line.startsWith('- '))) {
      return (
        <ul key={i} className="my-2 ml-4 list-disc space-y-1 text-charcoal/70">
          {trimmed.split('\n').map((line, j) => (
            <li key={j}>{renderInlineBold(line.replace(/^- /, ''))}</li>
          ))}
        </ul>
      );
    }

    // Regular paragraph with potential inline bold
    return (
      <p key={i} className="my-2 text-charcoal/70 leading-relaxed">
        {renderInlineBold(trimmed)}
      </p>
    );
  });
}

function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ExpandableArticle({ article }: ExpandableArticleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Article Image */}
      <div className="relative h-52 overflow-hidden bg-[#1a3c2a]/10">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-16 w-16 text-[#1a3c2a]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="inline-block bg-forest/10 text-forest text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          {article.category}
        </span>
        <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
          {article.title}
        </h3>
        <p className="text-charcoal/70 leading-relaxed mb-4">
          {article.excerpt}
        </p>

        {expanded && (
          <div className="mt-4 border-t border-charcoal/10 pt-4">
            {renderContent(article.content)}
          </div>
        )}

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center text-forest font-semibold text-sm group cursor-pointer mt-2"
          aria-expanded={expanded}
        >
          {expanded ? 'Show Less' : 'Read More'}
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}
