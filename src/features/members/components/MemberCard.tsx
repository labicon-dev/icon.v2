import type { Member } from '../types';

/**
 * Textura de hachura dupla do placeholder de foto (protótipo do design):
 * linhas diagonais amarelas (accent a 10%) cruzadas com brancas a 6%.
 * Vira utilitário quando o design system formal consolidar texturas.
 */
const HATCH_BACKGROUND =
  'repeating-linear-gradient(45deg, rgba(252,209,0,0.10) 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, rgba(250,250,250,0.06) 0 1px, transparent 1px 9px)';

function MemberCard({ member }: Readonly<{ member: Member }>) {
  return (
    <article className="group h-full overflow-hidden rounded border border-border bg-surface transition-colors duration-300 hover:border-border-accent">
      <div
        className="flex h-[200px] items-center justify-center"
        style={member.avatarUrl ? undefined : { backgroundImage: HATCH_BACKGROUND }}
      >
        {member.avatarUrl ? (
          <img
            src={member.avatarUrl}
            alt={`Foto de ${member.name}`}
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-sans text-h2 font-bold text-neutral-800 transition-colors duration-300 group-hover:text-accent"
          >
            {member.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </span>
        )}
      </div>

      <div className="border-t border-border p-4">
        <h3 className="font-sans text-h5 font-semibold text-neutral-50">{member.name}</h3>
        <p className="mt-1 font-mono text-caption tracking-wide text-neutral-700 uppercase">
          {member.activity || 'Membro do laboratório'}
        </p>
      </div>
    </article>
  );
}

export default MemberCard;
