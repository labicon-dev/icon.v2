import { useEffect, useState, type ReactNode } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
  /** Conteúdo extra depois do endereço (ex.: a seta ↗). */
  children?: ReactNode;
}

/**
 * E-mail ofuscado anti-spam (padrão do protótipo do design): o HTML inicial
 * mostra "user ⟨at⟩ domain" sem mailto; o endereço real só é montado no
 * cliente, após a hidratação — crawlers simples não o capturam.
 */
function ObfuscatedEmail({ user, domain, className = '', children }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setEmail(`${user}@${domain}`), 60);
    return () => clearTimeout(id);
  }, [user, domain]);

  return (
    <a href={email ? `mailto:${email}` : '#'} className={className}>
      <span>{email ?? `${user} ⟨at⟩ ${domain}`}</span>
      {children}
    </a>
  );
}

export default ObfuscatedEmail;
