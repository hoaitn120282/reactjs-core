import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Button } from 'antd';
import { List, Map } from 'immutable';
import _ from 'lodash';

import RoleRawContainer from './components/RoleRawContainer';
import { Overlay } from 'components/loading';
import { Translate } from 'components/utils';
// import Logger from 'helpers/Logger';

const findWidget = (obj, role) => obj.get('widget') === role.widget;

class RoleViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roleData: List([])
        };
    }

    componentWillMount() {
        const { permission: { fetchData } } = this.props;
        const data = List(fetchData.data).map(v =>
            Map(
                _.pick(v, [
                    'routes',
                    'addable',
                    'widget',
                    'viewableFields',
                    'editableFields',
                    'deletableFields',
                    'exportableFields'
                ])
            )
        );

        this.setState({
            roleData: data
        });
    }

    onChangeField = ({ value, field, role }) => {
        const { roleData } = this.state;
        let newRoleData;
        let widget = roleData.find(obj => {
            return findWidget(obj, role);
        });

        if (!widget) {
            widget = Map(
                Object.assign(
                    {
                        routes: [],
                        widget: role.widget,
                        addable: false,
                        viewableFields: ['*'],
                        editableFields: ['*'],
                        deletableFields: ['*'],
                        exportableFields: ['*']
                    },
                    {
                        [field]: value
                    }
                )
            );
            newRoleData = roleData.push(widget);
        } else {
            const newWidget = widget.set(field, value);
            newRoleData = roleData.set(
                roleData.findIndex(obj => {
                    return findWidget(obj, role);
                }),
                newWidget
            );
        }

        this.setState({
            roleData: newRoleData
        });
    };

    onUpdateRoleAction = () => {
        const { roleData } = this.state;
        const { updatePermissionAction } = this.props;
        updatePermissionAction(roleData.toJS());
    };

    render() {
        const { routeData, permission: { fetchData }, roleInfo, isLoading } = this.props;
        const data = roleInfo.data || {};

        return (
            <div>
                <h3>
                    <Translate text="roles" />: {data.name}
                </h3>
                <Overlay loading={isLoading} />
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <Translate text="widget" />
                            </th>
                            <th>
                                <Translate text="action" />
                            </th>
                            <th>
                                <Translate text="add" />
                            </th>
                            <th>
                                <Translate text="view" />
                            </th>
                            <th>
                                <Translate text="edit" />
                            </th>
                            <th>
                                <Translate text="delete" />
                            </th>
                            <th>
                                <Translate text="export" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchData.data.map((role, index) => (
                            <RoleRawContainer
                                onChangeField={this.onChangeField}
                                routeData={routeData}
                                role={role}
                                key={index}
                            />
                        ))}
                    </tbody>
                </Table>
                <Button
                    icon="save"
                    role="button"
                    size="large"
                    type="primary"
                    loading={isLoading}
                    onClick={this.onUpdateRoleAction}
                >
                    <Translate text="update" />
                </Button>
            </div>
        );
    }
}

RoleViewComponent.defaultProps = {
    permission: {}
};

RoleViewComponent.propTypes = {
    roleInfo: PropTypes.object.isRequired,
    permission: PropTypes.object.isRequired,
    routeData: PropTypes.object.isRequired,
    updatePermissionAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default RoleViewComponent;
