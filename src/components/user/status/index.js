import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Translate } from 'components/utils';

const StatusComponent = ({ status, statusList }) => {
    const statusInfo = _.find(statusList, { key: status }) || {};
    return <Translate text={statusInfo.value} /> || 'N/A';
};

StatusComponent.propTypes = {
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    statusList: PropTypes.array
};

const mapStateToProps = state => {
    const { common: { userStatusList: statusList } } = state;
    return { statusList };
};
export default connect(mapStateToProps)(StatusComponent);
