import React from 'react';
import PropTypes from 'prop-types';

const FontIcon = ({ name, color, size }) => {
    const style = { color, fontSize: size, width: size, height: size, textAlign: 'center' };
    return <i className={`fa fa-${name}`} style={style} />;
};

FontIcon.defaultProps = {
    size: 18
};

FontIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};

export default FontIcon;
