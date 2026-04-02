import React, { useMemo, useState } from 'react';

export default function OnboardImage({ src, alt }) {
  const [broken, setBroken] = useState(false);
  const label = useMemo(() => {
    if (!src) return 'imagem indisponível';
    const chunks = src.split('/');
    return chunks[chunks.length - 1] || 'imagem indisponível';
  }, [src]);

  return (
    <div className="onboard-shot">
      {!broken ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <div className="onboard-shot-fallback" role="img" aria-label={alt || 'Imagem não carregada'}>
          <strong>Imagem não encontrada</strong>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}