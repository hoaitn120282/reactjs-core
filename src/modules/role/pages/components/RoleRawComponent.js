import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Checkbox } from 'antd';
import _ from 'lodash';

import styles from './style.scss';

const { Option } = Select;

class RoleRawComponent extends Component {
    _renderMultiSelect = (data, initData = []) => {
        return (
            <div className={styles.inputWrap}>
                <Select
                    allowClear
                    className={styles.inputSelect}
                    mode="multiple"
                    size="default"
                    defaultValue={initData}
                    onChange={e => this.onChangeField(e, 'routes')}
                >
                    {data.map(v => <Option key={v.id}>{v.name}</Option>)}
                </Select>
            </div>
        );
    };

    _renderMultiSelectField = (data, field, initData = []) => {
        data = [{ id: '*', name: 'All' }, ...data];
        const value = _.map(data, 'id') || [];
        _.remove(initData, v => {
            return !value.includes(v);
        });
        return (
            <div className={styles.inputWrap}>
                <Select
                    showSearch
                    allowClear
                    className={styles.inputSelect}
                    mode="multiple"
                    size="default"
                    defaultValue={initData}
                    onChange={e => this.onChangeField(e, field)}
                >
                    {data.map(v => <Option key={v.id}>{v.name}</Option>)}
                </Select>
            </div>
        );
    };

    onChangeField = (value, field) => {
        const { updateField, role } = this.props;

        updateField({ value, field, role });
    };

    render() {
        const { actions, role, fieldData } = this.props;
        const { routes, viewableFields, editableFields, deletableFields, exportableFields, addable } = role;
        return (
            <tr>
                <td>{role.widget}</td>
                <td>{this._renderMultiSelect(actions, routes)}</td>
                <td>
                    <Checkbox
                        defaultChecked={addable}
                        onChange={e => this.onChangeField(e.target.checked, 'addable')}
                    />
                </td>
                <td>{this._renderMultiSelectField(fieldData.data, 'viewableFields', viewableFields || [])}</td>
                <td>{this._renderMultiSelectField(fieldData.data, 'editableFields', editableFields || [])}</td>
                <td>{this._renderMultiSelectField(fieldData.data, 'deletableFields', deletableFields || [])}</td>
                <td>{this._renderMultiSelectField(fieldData.data, 'exportableFields', exportableFields || [])}</td>
            </tr>
        );
    }
}

RoleRawComponent.propTypes = {
    actions: PropTypes.array.isRequired,
    role: PropTypes.object.isRequired,
    fieldData: PropTypes.object.isRequired,
    updateField: PropTypes.func.isRequired
};

export default RoleRawComponent;
