import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
import { Popconfirm } from 'antd';
import { FontAwesome } from 'components/Icon';

class LanguageRawComponent extends Component {
    confirm = e => {
        const { onDelete, data } = this.props;
        onDelete(data);
    };

    cancel = e => {};

    render() {
        const { data, translate, onEdit } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/language/${data.id}/edit`}>{data.name}</Link>
                </td>
                <td>{data.countryCode}</td>
                <td>
                    <div className="float-right">
                        <ButtonGroup>
                            <Popconfirm
                                title="Are you sure you want to delete this language?"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText={translate('yes')}
                                cancelText={translate('no')}
                            >
                                <Button role="button" color="danger" size="sm">
                                    <FontAwesome name="trash" />
                                </Button>
                            </Popconfirm>
                            <Button onClick={e => onEdit(data)} role="button" color="secondary" size="sm">
                                <FontAwesome name="pencil" />
                            </Button>
                        </ButtonGroup>
                    </div>
                </td>
            </tr>
        );
    }
}

LanguageRawComponent.defaultProps = {
    onDelete: () => null,
    onEdit: () => null
};

LanguageRawComponent.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    translate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default LanguageRawComponent;
