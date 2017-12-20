import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Button, Table } from 'reactstrap';

import { Overlay } from 'components/loading';
import { Translate } from 'components/utils';
import RowLang from './RowLang';
import { boxPaddingStyle } from './../../style.scss';

class LanguageEditComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                languages: []
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const { languageInfo: { data } } = nextProps;
        this.setState({ data });
    }

    onChangeValue = (value, index) => {
        const { data } = this.state;
        const rowData = data[index];
        Object.assign(rowData, { value });
        data.splice(index, 1, rowData);
        this.setState({ data });
    };

    onSubmit = e => {
        e.preventDefault();

        // console.log(this.state.data);
    };
    render() {
        const { data: { name = '', languages } } = this.state;
        const { languageInfo: { isFetching } } = this.props;
        return (
            <Row>
                <Col>
                    <Overlay loading={isFetching} />
                    <div className={`${boxPaddingStyle} card`}>
                        <h1 className="text-center">{name}</h1>
                        {languages.length > 0 && (
                            <Form onSubmit={this.onSubmit}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Translate text="label" />
                                            </th>
                                            <th>
                                                <Translate text="translate" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {languages.map((v, index) => (
                                            <RowLang
                                                key={v.id}
                                                data={v}
                                                index={index}
                                                onChangeValue={this.onChangeValue}
                                            />
                                        ))}
                                    </tbody>
                                </Table>

                                <Button>
                                    <Translate text="save" />
                                </Button>
                            </Form>
                        )}
                    </div>
                </Col>
            </Row>
        );
    }
}

LanguageEditComponent.defaultProps = {};

LanguageEditComponent.propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    languageInfo: PropTypes.object.isRequired
};

export default LanguageEditComponent;
