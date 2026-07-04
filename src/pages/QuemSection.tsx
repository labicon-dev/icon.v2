import MemberCard from '../features/members/components/MemberCard';
import { members } from '../features/members/members';

/**
 * Seção "Quem Somos" (ICO-14) — seção `quem` do frame do Figma: intro +
 * grid de cards de membros. Dados mockados até a integração com a API (M3).
 */
function QuemSection() {
  return (
    <section
      id="quem"
      aria-labelledby="quem-titulo"
      className="mx-auto max-w-[970px] px-6 py-16 md:py-[96px]"
    >
      <header className="flex items-baseline justify-between gap-4">
        <h2 id="quem-titulo" className="font-sans text-h1 font-bold text-neutral-50">
          <span className="mr-3 font-mono text-label font-medium text-accent">// 04</span>
          QUEM SOMOS
        </h2>
        <span aria-hidden="true" className="font-mono text-label text-neutral-650 uppercase">
          / Team
        </span>
      </header>

      <p className="mt-8 max-w-[640px] font-sans text-body-lg text-neutral-500">
        Acima de tudo, somos um conjunto de pessoas interessadas em realizar pesquisa e desenvolver
        projetos interdisciplinares envolvendo novas tecnologias.
      </p>

      <ul className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuemSection;
