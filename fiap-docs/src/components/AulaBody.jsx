import React from 'react';
import '../css/onboard.css';
import OnboardSection from './OnboardSection';
import OnboardImage from './OnboardImage';
import { sectionMeta } from '../data/onboardCourseData';
import { sectionParagraphs } from '../data/onboardSectionParagraphs';

export function ContentOptions() {
  return (
    <div className="tool-panel-content">
      <div className="tool-option-group">
        <div className="tool-option-title">Opções de conteúdo</div>
        <div className="tool-option-icons three">
          <div className="tool-circle tool-circle-purple">↓</div>
          <div className="tool-circle tool-circle-pink">▶</div>
          <div className="tool-circle tool-circle-cyan">♫</div>
        </div>
        <div className="tool-option-labels three">
          <span>E-book</span>
          <span>Vídeos</span>
          <span>Podcasts</span>
        </div>
      </div>
    </div>
  );
}

export function AppearanceContent() {
  return (
    <div className="tool-panel-content">
      <div className="tool-option-title">Aparência e acessibilidade</div>
      <div className="tool-access-grid">
        <div>
          <div className="tool-mini-title">Tamanho da fonte</div>
          <div className="tool-font-row">
            <span className="tool-font-off">-A</span>
            <span className="tool-font-on">A</span>
            <span className="tool-font-big">A+</span>
          </div>
        </div>

        <div>
          <div className="tool-mini-title">Libras</div>
          <div className="tool-libras-row">
            <span>Ativado</span>
            <span className="active">Desativado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReadingResources() {
  return (
    <div className="tool-panel-content">
      <div className="tool-option-title">Recursos de leitura</div>
      <div className="tool-reading-grid">
        <div className="tool-reading-item">
          <span>☆</span>
          <small>Favoritar</small>
        </div>
        <div className="tool-reading-item">
          <span>⌁</span>
          <small>Tags</small>
        </div>
        <div className="tool-reading-item">
          <span>✎</span>
          <small>Anotações</small>
        </div>
        <div className="tool-reading-item">
          <span>⚠</span>
          <small>Relatar problema</small>
        </div>
      </div>
    </div>
  );
}


function HeroOnboard() {
  return (
    <section className="onboard-hero">
      <div className="onboard-hero-noise" />
      <div className="onboard-hero-line line-left-top" />
      <div className="onboard-hero-line line-left-bottom" />
      <div className="onboard-hero-line line-right-mid" />

      <div className="onboard-grid-pink" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="onboard-diamonds" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="onboard-plus left-plus">+</div>

      <div className="onboard-hero-inner">
        <div className="onboard-hero-copy">
          <div className="onboard-hero-discipline">CIÊNCIA DA COMPUTAÇÃO</div>
          <h1>ONBOARD</h1>
        </div>

        <div className="onboard-hero-art">
          <div className="onboard-orbit" />
          <div className="onboard-core-glow" />
          <div className="onboard-mouse">
            <div className="wheel" />
            <div className="split" />
          </div>
          <div className="onboard-scroll-down">
            <span>SCROLL DOWN</span>
            <strong>⌄</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenshotBlock({ src, alt }) {
  return <OnboardImage src={src} alt={alt} />;
}

function NarrativeSection({ meta, children, noDecor = false }) {
  return (
    <OnboardSection
      id={meta.id}
      titleTop={meta.titleTop}
      titleBottom={meta.titleBottom}
      noDecor={noDecor}
    >
      {children}
    </OnboardSection>
  );
}

function ParagraphBlocks({ paragraphs }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

function FooterRating() {
  return (
    <section id="secao-13" className="onboard-experience">
      <div className="onboard-experience-inner">
        <div className="experience-small">CONTE-NOS SOBRE A SUA EXPERIÊNCIA</div>
        <div className="experience-question">O QUE VOCÊ ACHOU DO CONTEÚDO DESTE CAPÍTULO?</div>
        <div className="experience-stars">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
    </section>
  );
}

export default function AulaBody() {
  return (
    <div className="onboard-page">
      <HeroOnboard />

      <NarrativeSection meta={sectionMeta.prepare} noDecor>
        <ScreenshotBlock src="/img/onboard/01-video-guia.png" alt="Guia de navegação da plataforma do aluno" />

        <p>Agora é hora de conhecer seu novo espaço de aprendizado.</p>
        <p>
          Para acessar sua conta, utilize as informações que foram enviadas para o e-mail que você utilizou na
          matrícula. Ao acessar a plataforma você verá um novo layout pensado totalmente para você.
        </p>

        <ScreenshotBlock src="/img/onboard/02-dashboard-home.png" alt="Dashboard inicial da plataforma" />

        <p>
          Ao fazer login e acessar esta área, você encontrará na barra lateral um guia completo para iniciar seus
          estudos e explorar todos os recursos adicionais que a plataforma oferece.
        </p>

        <ScreenshotBlock src="/img/onboard/03-menu-home.png" alt="Menu lateral inicial" />

        <p>
          Na barra lateral, você terá acesso ao nosso Onboard, onde poderá conhecer todas as funcionalidades da
          plataforma e navegar com mais facilidade.
        </p>

        <ScreenshotBlock src="/img/onboard/04-menu-aulas.png" alt="Menu lateral com aba Aulas aberta" />

        <p>
          No dashboard inicial, você encontrará informações importantes, como o ponto em que parou na fase atual dos
          seus estudos.
        </p>

        <ScreenshotBlock src="/img/onboard/05-continuar-assistindo.png" alt="Continuar assistindo e atividades" />

        <p>
          Logo ao lado, você encontrará sua jornada até o momento, ideal para acompanhar o que já foi visto e o que
          vem na sequência.
        </p>

        <ScreenshotBlock src="/img/onboard/06-sua-jornada.png" alt="Sua jornada" />

        <p>Na nova plataforma, você poderá, também, acompanhar seu desempenho em tempo real.</p>

        <ScreenshotBlock src="/img/onboard/07-desempenho.png" alt="Desempenho geral" />

        <p>
          E temos uma novidade: a cada conquista no curso, você receberá uma flag que poderá ser compartilhada com seus
          colegas. Elas ficarão disponíveis na parte superior da plataforma, como pequenas bandeirinhas.
        </p>

        <ScreenshotBlock src="/img/onboard/08-flags.png" alt="Flags e conquistas" />

        <p>
          Para acessar os conteúdos do seu curso, utilize o menu lateral, na aba Aulas, e, dentro dela, acesse Fases.
        </p>

        <ScreenshotBlock src="/img/onboard/09-fases.png" alt="Acesso às fases do curso" />

        <p>
          Nessa aba, você terá acesso às 7 fases que compõem o seu curso. No entanto, elas serão liberadas conforme
          datas específicas.
        </p>

        <ScreenshotBlock src="/img/onboard/10-capitulos.png" alt="Capítulos da fase" />

        <p>
          Para acessar os capítulos, você contará com um espaço dedicado somente para isso. Os conteúdos da fase estarão
          disponíveis em dois formatos: versão web responsiva e e-book.
        </p>

        <p>
          O conteúdo é disponibilizado em versão web responsiva, permitindo acesso completo a textos, imagens, vídeos e
          áudios. Este é o espaço ideal para aprender e aproveitar tudo o que preparamos para você.
        </p>

        <p>
          E, se precisar de uma ajuda extra, você pode contar com a Luri, nossa inteligência artificial, disponível
          diretamente no capítulo. Basta clicar no ícone e tirar suas dúvidas sempre que quiser.
        </p>

        <ScreenshotBlock src="/img/onboard/11-luri.png" alt="Conteúdo com assistente Luri" />

        <p>
          Na barra lateral, dentro do capítulo, você também pode acessar os conteúdos em formato de vídeo ou áudio,
          ideais para momentos em que não é possível dedicar atenção total aos estudos.
        </p>

        <p>Se preferir, o material também está disponível em formato de texto, por meio de um e-book.</p>

        <ScreenshotBlock
          src="/img/onboard/12-menu-ferramentas-opcoes.png"
          alt="Menu de ferramentas com opções de conteúdo"
        />

        <p>Você também pode contar com o ícone de acessibilidade.</p>

        <ScreenshotBlock
          src="/img/onboard/13-menu-ferramentas-acessibilidade.png"
          alt="Menu de ferramentas com acessibilidade"
        />

        <p>
          E para deixar seus estudos ainda mais organizados, a aba Recursos de Leitura está disponível para você
          favoritar conteúdos, adicionar tags, fazer anotações e reportar qualquer problema para a nossa equipe.
        </p>

        <ScreenshotBlock
          src="/img/onboard/14-menu-ferramentas-leitura.png"
          alt="Menu de ferramentas com recursos de leitura"
        />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.pbl}>
        <ParagraphBlocks paragraphs={sectionParagraphs.pbl} />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.atividades}>
        <p>
          Para que você entenda o que está estudando, há as Atividades de Fase, exercícios que avaliam o seu
          aprendizado no decorrer do ano letivo, relacionados ao projeto que está desenvolvendo.
        </p>

        <p>
          Para não perder nenhum detalhe, fique atento às atividades disponibilizadas a cada fase para garantir que tudo
          esteja em dia. Muitas das atividades são realizadas em grupo, para que você exercite soft skills como trabalho
          em equipe, liderança, gestão de conflitos e gestão de tarefas.
        </p>

        <p>
          Na plataforma você pode conhecer as atividades, verificar o prazo de entrega, gerenciar os materiais
          entregáveis e acompanhar quem faz parte da sua equipe, a cada atividade.
        </p>

        <ScreenshotBlock src="/img/onboard/15-atividades-lista.png" alt="Lista de atividades da fase" />

        <p>
          Você poderá verificar se as atividades são individuais ou em grupo, adicionar os membros de sua equipe e
          atualizar as informações até a data de entrega. Uma vez definido os membros, qualquer integrante do grupo
          poderá realizar a entrega das atividades.
        </p>

        <ScreenshotBlock src="/img/onboard/16-atividade-detalhe.png" alt="Detalhe de atividade da fase" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.fasttests}>
        <p>
          No final de cada capítulo estudado, existem os Fast Tests, testes avaliativos rápidos para que você entenda se
          consumiu os conteúdos prestando atenção em determinados pontos. Eles valem nota, mas servem principalmente
          para que entenda se dedicou atenção ao conteúdo que acabou de ver.
        </p>

        <ScreenshotBlock src="/img/onboard/17-fast-test.png" alt="Fast Test" />

        <p>
          Depois de realizado o Fast Test, você pode nos ajudar avaliando o conteúdo que estudou. Dê uma nota de 1 a 5,
          elogiando se curtiu o conteúdo, ou indicando pontos que poderíamos melhorar.
        </p>

        <ScreenshotBlock src="/img/onboard/18-experiencia.png" alt="Avaliação de experiência do conteúdo" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.challenge}>
        <ParagraphBlocks paragraphs={sectionParagraphs.challenge} />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.globalsolutions}>
        <ParagraphBlocks paragraphs={sectionParagraphs.globalsolutions} />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.notas}>
        <p>
          Mantenha-se sempre informado sobre seu desempenho. Na aba lateral, você encontra suas notas detalhadas por
          disciplina. É só clicar no ícone “Notas”.
        </p>

        <ScreenshotBlock src="/img/onboard/19-notas-menu.png" alt="Menu lateral com acesso às notas" />

        <p>
          Nessa aba você conseguirá ver o seu boletim, e para entender como tudo se encaixa, consulte o “Mapa de
          Atividades” para visualizar a relação entre as atividades e as disciplinas.
        </p>

        <ScreenshotBlock src="/img/onboard/20-notas-mapa.png" alt="Mapa de atividades e notas" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.falecomagente}>
        <p>
          Não deixe de visitar a seção “Fale com a Gente”. Seja para conversar com seus colegas ou tirar dúvidas com a
          coordenação e os tutores do seu curso. E, se preferir, também estamos disponíveis no WhatsApp.
        </p>

        <ScreenshotBlock src="/img/onboard/21-fale-com-a-gente.png" alt="Fale com a gente" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.notificacoes}>
        <p>
          De volta à plataforma, você receberá outras notificações importantes, como as datas das atividades, lives e
          demais avisos. Além disso, será notificado sobre a aproximação de datas relevantes através do ícone
          “Calendário” e na aba lateral.
        </p>

        <ScreenshotBlock src="/img/onboard/22-calendario-avisos.png" alt="Calendário e avisos" />
         <ScreenshotBlock src="/img/onboard/34-calendario.png" alt="Calendário e avisos" />

        <p>
          Todo o conteúdo do seu curso é assíncrono, isto é, materiais pensados e construídos com carinho para que você
          estude quando e como quiser.
        </p>

        <p>
          No entanto, acreditamos que conexões também são importantes e trazemos, aproximadamente, lives com sua turma.
          Aqui, o tutor traz convidados para falar sobre a carreira, apresentar atividades hands-on complementares, tirar
          dúvidas sobre avaliações, entre muitas outras coisas.
        </p>

        <p>
          Para acessar as lives é só clicar no menu lateral no ícone “Lives”. Ali ficam todas as informações
          necessárias, além da gravação das transmissões.
        </p>

        <ScreenshotBlock src="/img/onboard/23-lives-menu.png" alt="Menu lateral com acesso às lives" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.outras}>
        <p>Estudar na FIAP é ter um grande leque de experiências e oportunidades para que você se torne o melhor profissional do mercado.</p>

        <p>
          Com a parceria FIAP/Alura, os estudantes da graduação na FIAP têm acesso aos mais de 1400 cursos de curta
          duração da ALURA. Explore o conteúdo da Alura e turbine seus conhecimentos.
        </p>

        <ScreenshotBlock src="/img/onboard/24-cursos-alura.png" alt="Cursos da Alura" />

        <p>
          Além disso, os Nanocourses também estão disponíveis aos nossos estudantes. São cursos de curta duração,
          online, rápidos e práticos, disponíveis por até 2 anos após sua formação.
        </p>

        <ScreenshotBlock src="/img/onboard/25-cursos-nano.png" alt="Nanocourses" />

        <p>E para se manter atualizado ou consultar referências bibliográficas, você terá acesso à biblioteca virtual da FIAP.</p>

        <ScreenshotBlock src="/img/onboard/26-biblioteca.png" alt="Biblioteca virtual" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.helpcenter}>
        <p>
          Na plataforma Fiap ON, você tem tudo o que precisa a um clique de distância. Acesse a secretaria virtual da
          FIAP e resolva pendências como solicitação de documentos, consulta de pagamentos ou segunda via de boletos.
        </p>

        <ScreenshotBlock src="/img/onboard/27-helpcenter.png" alt="Helpcenter da secretaria" />
      </NarrativeSection>

      <NarrativeSection meta={sectionMeta.talentlab}>
        <p>
          Ao entrar na FIAP e iniciar seus estudos, temos certeza de que você busca novas oportunidades de trabalho e
          estágio. A FIAP conta com o Talent Lab, departamento especializado em ações de captação, divulgação e seleção
          de vagas, além de auxiliar em questões psicopedagógicas na sua jornada.
        </p>

        <p>
          Na aba “Talent Lab” você pode encontrar oportunidades de estágios e empregos e uma série de outros eventos,
          além de atendimento psicopedagógico.
        </p>

        <ScreenshotBlock src="/img/onboard/28-talent-lab.png" alt="Talent Lab" />

        <p>
          Para mais informações, não deixe de acessar a aba “Orientação” e encontre o guia acadêmico e outras
          informações importantes para sua jornada.
        </p>

        <ScreenshotBlock src="/img/onboard/29-orientacoes.png" alt="Orientações" />

        <p>
          Ao concluir o semestre letivo com uma boa média, ser o campeão dos Challenges, das Global Solutions ou
          realizar as micro certificações nanocourses, você poderá ganhar certificados exclusivos.
        </p>

        <ScreenshotBlock src="/img/onboard/30-certificados.png" alt="Certificados" />

        <p>
          E você pode personalizar a sua plataforma alterando a foto de perfil, mudando a senha e visualizando a sua
          carteirinha. Para isso você acessa a aba perfil que fica localizada na parte superior da página.
        </p>

        <ScreenshotBlock src="/img/onboard/31-perfil-topo.png" alt="Acesso ao perfil" />
        <ScreenshotBlock src="/img/onboard/32-perfil-dados.png" alt="Dados do perfil" />

        <p>
          E para ter acesso à sua carteirinha do estudante para garantir benefícios, basta clicar no ícone carteirinha
          e baixar.
        </p>

        <ScreenshotBlock src="/img/onboard/33-carteirinha.png" alt="Carteirinha estudantil" />

        <p>E tudo pronto para seus estudos. Reinvente-se conosco e aproveite a jornada!</p>
      </NarrativeSection>

      <FooterRating />
    </div>
  );
}