import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LanguageRawComponent extends Component {
    confirm = e => {
        const { onDelete, data } = this.props;
        onDelete(data);
    };

    cancel = e => {};

    render() {
        const { data } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/translate/${data.id}/edit`}>
                        <code>{data.label}</code>
                    </Link>
                </td>
                <td>{data.description}</td>
            </tr>
        );
    }
}

LanguageRawComponent.defaultProps = {
    onDelete: () => null
};

LanguageRawComponent.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func
};

export default LanguageRawComponent;
