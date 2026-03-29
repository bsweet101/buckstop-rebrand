interface AuthorBioProps {
  name: string;
  title: string;
  bio?: string;
  initials: string;
}

export default function AuthorBio({ name, title, initials }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-4 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex items-center gap-4 w-full">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: '#1a3c2a' }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-forest">{name}</p>
          <p className="text-xs text-charcoal/60">{title}</p>
          <p className="text-xs text-charcoal/50">Last Updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
