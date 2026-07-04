import type { Member } from '../types';

/**
 * Textura de hachura dupla do placeholder de foto (protótipo do design):
 * linhas diagonais amarelas (accent a 10%) cruzadas com brancas a 6%.
 * Vira utilitário quando o design system formal consolidar texturas.
 */
const HATCH_BACKGROUND =
  'repeating-linear-gradient(45deg, rgba(252,209,0,0.10) 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, rgba(250,250,250,0.06) 0 1px, transparent 1px 9px)';

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="group overflow-hidden rounded border border-border bg-surface transition-colors duration-300 hover:border-border-accent">
      <div
        className="flex h-[150px] items-center justify-center"
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
            className="font-sans text-h2 font-bold text-neutral-800 transition-colors duration-300 group-hover:text-accent"
          >
            {member.initials}
          </span>
        )}
      </div>

      <div className="border-t border-border p-4">
        <h3 className="font-sans text-h5 font-semibold text-neutral-50">{member.name}</h3>
        <p className="mt-1 font-mono text-caption tracking-wide text-neutral-700 uppercase">
          {member.activities.join(' · ')}
        </p>
      </div>
    </article>
  );
}

export default MemberCard;
