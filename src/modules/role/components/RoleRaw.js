import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
import { Popconfirm } from 'antd';

import { Translate } from 'components/utils';

class RoleRaw extends Component {
    render() {
        const { data, removeAction, editAction, translate } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/role/${data.id}`}>{data.name}</Link>
                </td>
                <td>
                    <div className="float-right">
                        <ButtonGroup>
                            <Popconfirm
                                title="Are you sure you want to delete this role?"
                                onConfirm={e => removeAction(data.id)}
                                okText={translate('yes')}
                                cancelText={translate('no')}
                            >
                                <Button role="button" color="danger" size="sm">
                                    <Translate text="delete" />
                                </Button>
                            </Popconfirm>
                            <Button
                                role="button"
                                color="secondary"
                                size="sm"
                                onClick={() => editAction(Object.assign({}, data))}
                            >
                                <Translate text="edit" />
                            </Button>
                        </ButtonGroup>
                    </div>
                </td>
            </tr>
        );
    }
}

RoleRaw.propTypes = {
    data: PropTypes.object.isRequired,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
};

export default RoleRaw;
