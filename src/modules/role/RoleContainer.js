import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import { Cube } from 'components/loading';
import { Translate } from 'components/utils';
import { translate } from 'helpers/Translate';
import { actions } from 'redux-utils';
import RoleListComponent from './components/RoleListComponent';

class RoleContainer extends Component {
    componentWillMount() {
        const { roleActions } = this.props;

        roleActions.getRoleList({ sort: [{ property: 'name', direction: 'ASC' }] });
    }

    render() {
        const { role, roleActions, translate } = this.props;
        return (
            <div>
                <Helmet title={translate('role')} />
                <div className="main-page-header">
                    <h1 className="title-head-page">
                        <Translate text="role" />
                    </h1>
                    <span className="flex" />
                </div>
                <RoleListComponent role={role} roleActions={roleActions} translate={translate} />
                <Cube loading={role.hasRequestRoleData} />
            </div>
        );
    }
}

RoleContainer.propTypes = {
    role: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { role, language } = state;
    return {
        role,
        translate: translate(language)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        roleActions: bindActionCreators(actions.roleActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleContainer);
