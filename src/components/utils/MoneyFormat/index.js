import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

const MoneyFormatComponent = ({ value, ...props }) => {
    const { decimal } = props;
    if (decimal) {
        Object.assign(props, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    return <FormattedNumber value={value} {...props} />;
};

MoneyFormatComponent.defaultProps = {
    value: 0,
    decimal: false,
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};
MoneyFormatComponent.propTypes = {
    value: PropTypes.number.isRequired,
    decimal: PropTypes.bool
};
export default MoneyFormatComponent;
