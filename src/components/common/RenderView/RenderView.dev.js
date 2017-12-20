import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RenderViewComponent = ({ auth: { isFullPermission }, children, visible }) => {
    return isFullPermission || visible ? children : null;
};

RenderViewComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.any,
    visible: PropTypes.bool
};

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
};
export default connect(mapStateToProps)(RenderViewComponent);
