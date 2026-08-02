export interface SiteSection {
  number: string;
  href: string;
  short: string;
  long: string;
}

export const SITE_SECTIONS: readonly SiteSection[] = [
  { number: '01', href: '#inicio', short: 'Início', long: 'Início' },
  { number: '02', href: '#sobre', short: 'Sobre', long: 'Sobre' },
  { number: '03', href: '#interesse', short: 'Áreas', long: 'Áreas de Interesse' },
  { number: '04', href: '#quem', short: 'Equipe', long: 'Quem Somos' },
  { number: '05', href: '#live', short: 'Ao Vivo', long: 'Ao Vivo' },
  { number: '06', href: '#contato', short: 'Contato', long: 'Contato' },
];

/** Âncora da seção de transmissão, destacada à parte na navegação. */
export const LIVE_HREF = '#live';

/** Header no desktop e footer omitem "Ao Vivo" — ele tem link próprio em destaque. */
const withoutLive = SITE_SECTIONS.filter((section) => section.href !== LIVE_HREF);

export const HEADER_NAV = withoutLive;
export const FOOTER_NAV = withoutLive;

/** No mobile todas as seções entram na lista, inclusive "Ao Vivo". */
export const MOBILE_NAV = SITE_SECTIONS;
