import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import _ from 'lodash';

import { translate } from 'helpers/Translate';
import { Translate } from 'components/utils';
import { inputStyle } from './style.scss';

const StatusComponent = ({ typeList, translate, ...rest }) => {
    const props = _.omit(rest, ['dispatch']);
    const { className = '' } = props;
    return (
        <Input {...props} className={`${inputStyle} ${className}`} type="select">
            <option value="">---{translate('select')}---</option>
            {typeList.map(v => (
                <option key={v.key} value={v.key}>
                    <Translate text={v.value} />
                </option>
            ))}
        </Input>
    );
};

StatusComponent.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    typeList: PropTypes.array,
    className: PropTypes.string,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { language, common: { userTypeList: typeList } } = state;
    return { typeList, translate: translate(language) };
};
export default connect(mapStateToProps)(StatusComponent);
