import { useEffect, useState, type ReactNode } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
  children?: ReactNode;
}

function ObfuscatedEmail({
  user,
  domain,
  className = '',
  children,
}: Readonly<ObfuscatedEmailProps>) {
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
