import React, { cloneElement, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { SideBarItem } from '../../types/sidebar';
import { Condition, Tooltip } from '@acala-dapp/ui-components';

import classes from './Sidebar.module.scss';

export const ProductItem: React.FC<SideBarItem & { showTitle?: boolean }> = memo(({ icon, isExternal, name, path, showTitle = true, target }) => {
  const search = window.location.search;

  if (isExternal) {
    return (
      <a
        className={classes.item}
        href={path}
        target={target}
      >
        <Tooltip
          show={!showTitle}
          title={name}
        >
          {cloneElement(icon)}
        </Tooltip>
        <Condition condition={showTitle}>
          <span className={classes.title}>
            {name}
          </span>
        </Condition>
      </a>
    );
  }

  return (
    <NavLink className={classes.item}
      to={`${path as string}${search}`}>
      {cloneElement(icon)}
      <span className={classes.title}>
        {name}
      </span>
    </NavLink>
  );
});

ProductItem.displayName = 'ProductItem';
