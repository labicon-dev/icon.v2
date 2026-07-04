import MemberCard from '../features/members/components/MemberCard';
import { members } from '../features/members/members';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

/**
 * Seção "Quem Somos" (ICO-14) — intro + grid de cards de membros na escala
 * do protótipo do design. Dados mockados (equipe ilustrativa) até a
 * integração com a API (M3).
 */
function QuemSection() {
  return (
    <section
      id="quem"
      aria-labelledby="quem-titulo"
      className="border-b border-border px-5 py-20 md:px-7.5 md:py-30"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionHeader index="04" title="QUEM SOMOS" label="/ Team" headingId="quem-titulo" />
        </Reveal>

        <Reveal>
          <p className="mt-4 max-w-[620px] font-sans text-body-lg text-neutral-500">
            Um time interdisciplinar de pesquisadores, desenvolvedores, artistas e designers.
          </p>
          <p className="mt-3.5 mb-12 font-mono text-label-sm text-neutral-750">
            {'//'} equipe ilustrativa — substitua pelos integrantes reais
          </p>
        </Reveal>

        <Reveal>
          <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <li key={member.id}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default QuemSection;
