import type { Member } from '../types';

/**
 * Textura de hachura diagonal do placeholder de foto (padrão do Figma).
 * O tom é o `border.DEFAULT`/`neutral.850` (#1F1F1F) dos tokens — vira
 * utilitário quando o design system formal consolidar padrões de textura.
 */
const HATCH_BACKGROUND =
  'repeating-linear-gradient(45deg, #1F1F1F 0, #1F1F1F 1px, transparent 1px, transparent 7px)';

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="border border-border bg-surface transition-colors duration-300 hover:border-border-muted">
      <div
        className="flex aspect-[4/3] items-center justify-center border-b border-border"
        style={member.photoUrl ? undefined : { backgroundImage: HATCH_BACKGROUND }}
      >
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={`Foto de ${member.name}`}
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="bg-surface px-2 font-sans text-h2 font-bold tracking-widest text-neutral-50"
          >
            {member.initials}
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <h3 className="font-sans text-h5 font-bold text-neutral-50">{member.name}</h3>
        <p className="mt-1 font-mono text-label-sm tracking-wide text-neutral-700 uppercase">
          {member.activities.join(' · ')}
        </p>
      </div>
    </article>
  );
}

export default MemberCard;
