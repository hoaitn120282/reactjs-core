import React from 'react';
import PropTypes from 'prop-types';

import { aspectStyle, beforeStyle, contentStyle } from './style.scss';
const AspectImage = ({ w, h, children, ...rest }) => {
    const aspect = h / w * 100;
    const style = { paddingTop: `${aspect}%` };
    const { className = '' } = rest;

    return (
        <div {...rest} className={`${aspectStyle} ${className}`}>
            <div className={beforeStyle} style={style} />
            <div className={contentStyle}>{children}</div>
        </div>
    );
};

AspectImage.propTypes = {
    children: PropTypes.any.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired
};

export default AspectImage;
