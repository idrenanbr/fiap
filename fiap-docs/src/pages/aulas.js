import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { getAllAulas } from '../data/aulas';

export default function AulasPage() {
  const aulas = getAllAulas();

  return (
    <Layout title="Aulas" description="Catálogo de aulas disponíveis">
      <main style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h1>Aulas disponíveis</h1>
          <ul>
            {aulas.map((aula) => (
              <li key={aula.aulaId}>
                <Link to={aula.routePath || '/aula-fiap'}>
                  {aula.disciplina} - {aula.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
}
