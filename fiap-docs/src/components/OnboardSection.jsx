import React from 'react';

function Divider() {
  return (
    <div className="onboard-divider">
      <span />
    </div>
  );
}

function DecorOrnaments() {
  return (
    <>
      <div className="decor-left-frame" aria-hidden="true">
        <span className="corner one" />
        <span className="corner two" />
        <span className="dot a" />
        <span className="dot b" />
        <span className="dot c" />
      </div>

      <div className="decor-right-dots" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="decor-right-plus" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="decor-right-vertical" aria-hidden="true">
        <span className="box top" />
        <span className="box middle" />
        <span className="line" />
      </div>
    </>
  );
}

export default function OnboardSection({
  id,
  titleTop,
  titleBottom = '',
  children,
  noDecor = false,
}) {
  return (
    <section id={id} className={`onboard-section ${noDecor ? 'no-decor' : ''}`}>
      {!noDecor && <DecorOrnaments />}

      <header className="onboard-section-header">
        <h2>{titleTop}</h2>
        {titleBottom ? <h3>{titleBottom}</h3> : null}
      </header>

      <Divider />

      <div className="onboard-section-body">{children}</div>
    </section>
  );
}