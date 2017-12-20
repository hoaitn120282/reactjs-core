import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class RowLangComponent extends Component {
    render() {
        const { data, onChangeValue, index } = this.props;
        return (
            <tr>
                <td style={{ verticalAlign: 'middle' }}>
                    <code>{data.label}</code>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                    <Input type="text" value={data.value} onChange={e => onChangeValue(e.target.value, index)} />
                </td>
            </tr>
        );
    }
}

RowLangComponent.defaultProps = {
    onChangeValue: () => null
};

RowLangComponent.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChangeValue: PropTypes.func.isRequired
};

export default RowLangComponent;
