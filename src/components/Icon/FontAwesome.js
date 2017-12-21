import React from 'react';
import PropTypes from 'prop-types';

const FontIcon = ({ name, color, size, ...rest }) => {
    const style = {
        color,
        fontSize: size,
        width: size,
        height: size,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    return (
        <span style={{ display: 'inline-block' }}>
            <i {...rest} className={`fa fa-${name}`} style={style} />
        </span>
    );
};

FontIcon.defaultProps = {
    size: 18
};

FontIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default FontIcon;
