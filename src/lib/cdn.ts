/**
 * Assets servidos pela CDN do laboratório.
 *
 * A CDN não lista o próprio conteúdo: os caminhos abaixo foram levantados no
 * site anterior e testados um a um. Só existem em PNG — não há SVG da marca.
 */

/**
 * Todas as versões da logo publicadas.
 *
 * - `symbol*`: só o símbolo (as listras cruzadas), quadrado.
 * - `full*`: símbolo + "ICON" + a descrição do laboratório (~2,4:1).
 *
 * O sufixo diz a cor da marca e do fundo: `OnTransparent` tem fundo
 * transparente; `BlackOnWhite`/`WhiteOnBlack` vêm com fundo chapado.
 */
export const LOGO_PATHS = {
  symbolLargeBlackOnWhite: 'logo/square-large-black-white.png',
  symbolMediumWhiteOnTransparent: 'logo/square-medium-white-transparent.png',
  symbolMediumBlackOnTransparent: 'logo/square-medium-black-transparent.png',
  symbolSmallWhiteOnTransparent: 'logo/square-small-white-transparent.png',
  symbolSmallBlackOnTransparent: 'logo/square-small-black-transparent.png',
  fullBlackOnWhite: 'logo/full-large-black-white.png',
  fullWhiteOnBlack: 'logo/full-large-white-black.png',
  fullWhiteOnTransparent: 'logo/full-large-white-transparent.png',
  fullBlackOnTransparent: 'logo/full-large-black-transparent.png',
} as const;

export type LogoVersion = keyof typeof LOGO_PATHS;

/** Playlist HLS da câmera do laboratório (vídeo 640×480 + áudio). */
export const LIVE_STREAM_PATH = 'stream/live/stream/index.m3u8';

/** Monta a URL absoluta de um asset da CDN. */
export function cdnUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_CDN_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'VITE_CDN_BASE_URL não configurada. Copie `.env.template` para `.env.local` ' +
        'e preencha o valor (ver README).',
    );
  }
  return `${baseUrl.replace(/\/+$/u, '')}/${path.replace(/^\/+/u, '')}`;
}

export function logoUrl(version: LogoVersion): string {
  return cdnUrl(LOGO_PATHS[version]);
}
