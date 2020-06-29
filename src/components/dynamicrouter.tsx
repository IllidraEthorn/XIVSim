import { createElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { IJourney, IRouteParam, IRouteParamOrDivider } from '../interfaces/journeys';
import * as views from './views/index';
import { setJourney } from '../store/actions/journey';
import { JOURNEY } from '../consts';

const makeElement = (o: IRouteParam) => {
    return createElement(views[o.elementId]);
};

const makeRoutesConfig = (routes: Array<IRouteParamOrDivider>): Array<PartialRouteObject> => {
    /**
     * First filter out 'divider' string, leaving only objects
     */
    console.log('entered makeRoutesConfig');
    const aRouteParams = routes.filter(item => typeof item === 'object');
    return (aRouteParams as Array<IRouteParam>)
        .filter(item => views[item.elementId] !== undefined)
        .map(o => {
            let ret: PartialRouteObject = {
                path: o.path,
                element: makeElement(o)
            };
            if (typeof o === 'object' && o.children) {
                ret.children = makeRoutesConfig(o.children);
            }

            return ret;
        });
};

const mapStateToProps = (state: { journey: IJourney }) => {
    return {
        routes: state.journey?.rootJourney,
    };
};

const mapDispatchToProps = (dispatch: Function) => {

    return {
      setJourn: function () {
        dispatch(setJourney(JOURNEY))
      }
    };
  };

const DynamicRouter = (props: { routes?: Array<IRouteParamOrDivider>, setJourn: any }) => {
    console.log('entered DynamicRouter FC', window.location.href);
    const { routes, setJourn } = props;

    const [routesConfig, setRouter] = useState([]);
    useEffect(() => {
        setJourn()
        const rc = makeRoutesConfig(props.routes);
        setRouter(rc);
    }, [routes]);

    const element = useRoutes(routesConfig);

    return element;
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicRouter);
