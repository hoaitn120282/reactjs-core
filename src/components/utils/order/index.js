import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FontAwesome } from 'components/Icon';

const OrderComponent = ({ children, direction, ...props }) => {
    let caret;
    switch (_.toLower(direction)) {
        case 'asc':
            caret = <FontAwesome name="sort-asc" />;
            break;
        case 'desc':
            caret = <FontAwesome name="sort-desc" />;
            break;
        default:
            caret = <FontAwesome name="sort" color="#7b7996" />;
            break;
    }
    return (
        <div
            role="button"
            {...props}
            className="d-flex justify-content-between align-items-center"
            style={{ userSelect: 'none' }}
        >
            {children}
            {caret}
        </div>
    );
};

OrderComponent.defaultProps = {
    direction: ''
};
OrderComponent.propTypes = {
    children: PropTypes.any.isRequired,
    direction: PropTypes.string
};
export default OrderComponent;
