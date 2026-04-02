import React from 'react';

export default function ToolPanelContent({ panel }) {
  if (!panel) return null;

  if (panel.kind === 'content') {
    return (
      <div className="tool-panel-content">
        <div className="tool-option-group">
          <div className="tool-option-title">{panel.title}</div>
          <div className="tool-option-icons three">
            {panel.items.map((item) => (
              <div key={item.label} className={`tool-circle ${item.colorClass}`}>
                {item.icon}
              </div>
            ))}
          </div>
          <div className="tool-option-labels three">
            {panel.items.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (panel.kind === 'appearance') {
    return (
      <div className="tool-panel-content">
        <div className="tool-option-title">{panel.title}</div>
        <div className="tool-access-grid">
          <div>
            <div className="tool-mini-title">{panel.fontTitle}</div>
            <div className="tool-font-row">
              {panel.fontOptions.map((item) => (
                <span key={item.label} className={item.className}>
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="tool-mini-title">{panel.librasTitle}</div>
            <div className="tool-libras-row">
              {panel.librasOptions.map((item) => (
                <span key={item.label} className={item.active ? 'active' : ''}>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (panel.kind === 'reading') {
    return (
      <div className="tool-panel-content">
        <div className="tool-option-title">{panel.title}</div>
        <div className="tool-reading-grid">
          {panel.items.map((item) => (
            <div key={item.label} className="tool-reading-item">
              <span>{item.icon}</span>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
