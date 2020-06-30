import { Divider, ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Path from 'path-browserify';
import React from 'react';
import { NavigateFunction } from 'react-router';
import { IRouteParamOrDivider } from '../../interfaces/journeys';
import * as views from '../views/index';

interface INavigationItemProps {
  icon?: string
  path: string
  label: string
  divider: boolean
  key: string
  navigate: Function
}

const NavigationItem = (props: INavigationItemProps) => {

  const { icon, path, label, navigate, divider } = props;

  return (
    <ListItem button divider={divider} onClick={() => navigate(path)}>
      {icon && <ListItemIcon><Icon fontSize="small">{icon}</Icon></ListItemIcon>}
      <ListItemText primary={label} />
    </ListItem>
  );
};

export default function makeNavItemsFactory(navigate: NavigateFunction) {

  return function makeNavItems(items: Array<IRouteParamOrDivider>, basePath: string = '', level = 1): React.FunctionComponent[] {

    console.log('entered makeNavItems with count=', items.length);
    console.log('views exports:', views);

    return items.reduce((acc: Array<any>, next, index) => {
      let ret = [...acc];

      if (next === 'divider') {
        ret.push(<Divider key={`${level}.${index}`} />);
      } else {
        const uri = Path.join(basePath, next.path);
        if (next.label && next.elementId && views[next.elementId]) {
          ret.push(<NavigationItem
            icon={next.icon}
            path={uri}
            label={next.label}
            navigate={navigate}
            key={`${level}.${index}`}
            divider={!!next.divider} />);
        }

        if (next.children) {
          ret = ret.concat(makeNavItems(next.children, uri, level + 1));
        }
      }

      return ret;
    }, []);
  };

}
