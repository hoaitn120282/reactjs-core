import PropTypes from 'prop-types';

const RenderViewComponent = ({ children, visible }) => {
    return visible ? children : null;
};

RenderViewComponent.propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool
};

export default RenderViewComponent;
