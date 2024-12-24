import { useState, useEffect } from 'react';
import Heading from '../Heading';
import collapse_box from './collapseBox.module.css';

export default function CollapseBox({
  children,
  heading,
  icon,
  defaultExpanded,
  callBack,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const headingStyles = {};
  if (heading?.icon) {
    headingStyles.display = 'flex';
    headingStyles.alignItems = 'center';
    headingStyles.gap = 'var(--spacer-s)';
  }

  let selectedIcon = expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

  if (typeof icon === 'string') {
    selectedIcon = icon;
  } else if (typeof icon === 'object') {
    selectedIcon = expanded ? icon.expanded : icon.closed;
  }

  function handleClick() {
    setExpanded(!expanded);
    if (callBack) {
      callBack(!expanded);
    }
  }

  return (
    <div
      className={`${collapse_box.collapse_box}${
        expanded ? ` ${collapse_box.collapse_box_expanded}` : ''
      }`}
    >
      <button
        className={collapse_box.collapse_box_toggle}
        onClick={handleClick}
      >
        <Heading
          style={headingStyles}
          className={collapse_box.collapse_box_heading}
          tag={heading?.tag ? heading.tag : 'h2'}
        >
          {heading?.icon && (
            <i className="material-symbols-outlined" aria-hidden="true">
              {heading.icon}
            </i>
          )}
          {heading?.text || 'Expand'}
        </Heading>
        <i className="material-symbols-outlined" aria-hidden="true">
          {selectedIcon}
        </i>
      </button>
      <div
        className={`${collapse_box.collapse_box_content_wrap}${
          expanded ? ` ${collapse_box.collapse_box_open}` : ''
        }`}
      >
        <div className={collapse_box.collapse_box_content}>{children}</div>
      </div>
    </div>
  );
}
