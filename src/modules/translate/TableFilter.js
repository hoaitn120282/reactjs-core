import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'reactstrap';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Translate } from 'components/utils';
import { headerStyle } from './style.scss';

class TableFilterComponent extends Component {
    constructor() {
        super();

        this.state = {
            searchText: '',
            filterData: []
        };
    }

    componentWillMount() {
        const { data } = this.props;
        this.setState({ filterData: data });
    }

    onInputChange = e => {
        this.setState({ searchText: e.target.value });
    };

    onSearch = e => {
        e.preventDefault();
        const { data } = this.props;
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'i');
        const filterData = data
            .map(record => {
                const match = record.label.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    label: record.label.split(reg).map(
                        (text, i) =>
                            i > 0
                                ? [
                                      <span key={i} style={{ textDecoration: 'underline' }}>
                                          {match[0]}
                                      </span>,
                                      text
                                  ]
                                : text
                    )
                };
            })
            .filter(record => !!record);
        this.setState({ filterData });
    };

    render() {
        const { translate } = this.props;
        const { searchText, filterData } = this.state;

        const columns = [
            {
                title: (
                    <div className="d-flex align-items-center">
                        <Translate text="label" />

                        <div className="d-flex" style={{ marginLeft: 10 }}>
                            <Form onSubmit={this.onSearch}>
                                <Input
                                    innerRef={ele => (this.searchInput = ele)}
                                    placeholder={translate('search')}
                                    value={searchText}
                                    onChange={this.onInputChange}
                                />
                            </Form>
                        </div>
                    </div>
                ),
                dataIndex: 'label',
                key: 'label',
                render: (text, record) => (
                    <Link style={{ display: 'block' }} to={`/translate/${record.id}/edit`}>
                        {record.label}
                    </Link>
                ),
                sorter: (a, b) => {
                    const nameA = _.toUpper(a.label);
                    const nameB = _.toUpper(b.label);
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                },
                className: headerStyle
            },
            {
                title: <Translate text="description" />,
                dataIndex: 'description',
                key: 'description'
            }
        ];

        const pagination = {
            pageSize: 15
        };
        return (
            <Fragment>
                <Table pagination={pagination} rowKey={record => record.id} columns={columns} dataSource={filterData} />
            </Fragment>
        );
    }
}

TableFilterComponent.defaultProps = {
    translate: () => null
};

TableFilterComponent.propTypes = {
    data: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired
};

export default TableFilterComponent;
