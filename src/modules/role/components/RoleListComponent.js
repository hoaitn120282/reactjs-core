import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import { Table, Button, Row, Col } from 'reactstrap';
import { FaPlus } from 'react-icons/lib/fa';

import RoleRaw from './RoleRaw';
import ModalAddRole from './ModalAddRole';
import ModelEditRole from './ModelEditRole';
import { Translate } from 'components/utils';

class RoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddOpen: false,
            isUpdateOpen: false,
            initData: {}
        };
    }

    toggleModalAdd = () => {
        this.setState({
            isAddOpen: !this.state.isAddOpen
        });
    };

    toggleModalUpdate = (data = {}) => {
        this.setState({
            isUpdateOpen: !this.state.isUpdateOpen,
            initData: data
        });
    };

    removeRole = id => {
        const { roleActions } = this.props;
        roleActions.removeRole(id);
    };

    createRole = (values, ...options) => {
        const { roleActions } = this.props;
        roleActions.createRole(values, ...options).then(() => this.toggleModalAdd());
    };

    updateRole = ({ roleId, values }, ...options) => {
        const { roleActions } = this.props;
        roleActions.updateRole(roleId, values, ...options).then(() => this.toggleModalUpdate());
    };

    render() {
        const { translate, role: { roleData: { data } } } = this.props;
        const { isAddOpen, isUpdateOpen, initData } = this.state;
        return (
            <div>
                <Row>
                    <Col sm="4">
                        <div className="d-flex flex-row-reverse">
                            <div className="p-2">
                                <Button role="button" color="primary" onClick={this.toggleModalAdd}>
                                    <FaPlus />
                                </Button>
                            </div>
                        </div>
                        <div className="card">
                            <Table hover>
                                <thead className="thead-light">
                                    <tr>
                                        <th>
                                            <Translate text="name" />
                                        </th>
                                        <th className="text-right">
                                            <Translate text="action" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map(v => (
                                            <RoleRaw
                                                editAction={this.toggleModalUpdate}
                                                removeAction={this.removeRole}
                                                key={v.id}
                                                data={v}
                                                translate={translate}
                                            />
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

                <ModalAddRole
                    isOpen={isAddOpen}
                    saveAction={this.createRole}
                    toggleModal={this.toggleModalAdd}
                    translate={translate}
                />
                <ModelEditRole
                    isOpen={isUpdateOpen}
                    saveAction={this.updateRole}
                    toggleModal={this.toggleModalUpdate}
                    initData={initData}
                    translate={translate}
                />
            </div>
        );
    }
}

RoleComponent.propTypes = {
    role: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

export default RoleComponent;
