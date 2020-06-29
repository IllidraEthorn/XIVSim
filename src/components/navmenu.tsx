import List from '@material-ui/core/List';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IJourney, IRouteParamOrDivider } from '../interfaces/journeys';
import makeNavItemsFactory from './lib/makenavmenu';


const mapStateToProps = (state: { journey: IJourney }) => {
  return {
    rootJourney: state.journey?.rootJourney || [],
  };
};

const NavMenu = (props: { rootJourney: Array<IRouteParamOrDivider> }) => {
  console.log('entered NavMenu FC', window.location.href);
  const { rootJourney } = props;

  const navigate = useNavigate();
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    const makeItems = makeNavItemsFactory(navigate);
    const items = makeItems(rootJourney);
    setNavItems(items);
  }, [rootJourney]);

  return (
    <List>
      {navItems}
    </List>
  );
};

export default connect(mapStateToProps)(NavMenu);
