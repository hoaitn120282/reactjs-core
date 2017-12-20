import React from 'react';
import PropTypes from 'prop-types';
import { FaSortDesc, FaSort, FaSortAsc } from 'react-icons/lib/fa';
import _ from 'lodash';

const OrderComponent = ({ children, direction, ...props }) => {
    let caret;
    switch (_.toLower(direction)) {
        case 'asc':
            caret = <FaSortAsc />;
            break;
        case 'desc':
            caret = <FaSortDesc />;
            break;
        default:
            caret = <FaSort color="#7b7996" />;
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
