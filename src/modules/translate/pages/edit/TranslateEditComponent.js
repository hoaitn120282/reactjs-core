import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Col, Form, Button } from 'reactstrap';
import _ from 'lodash';

import { Translate } from 'components/utils';
import { Overlay } from 'components/loading';
import { contentPanelStyle } from './style.scss';
import { Notification } from 'helpers';

class TranslateEditComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            data: {
                translate: {}
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const { language: { translateInfo: { data } } } = nextProps;
        if (!_.isEmpty(data)) {
            this.setState({ data });
        }
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    onChangeValue = (value, field) => {
        const { data } = this.state;
        const translate = Object.assign({}, data.translate, { [field]: value });
        this.setState({
            data: Object.assign({}, data, { translate })
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { data: { id, translate: translateData } } = this.state;
        const { languageActions, translate } = this.props;
        languageActions
            .updateTranslate(id, translateData)
            .then(() => {
                Notification.success('updatedSuccessfully', translate);
            })
            .catch(err => {
                Notification.error(err.data, translate);
            });
    };

    render() {
        const { language: { translateInfo: { isFetching }, languageData: { data: languages } } } = this.props;
        const { data: { label = '', translate = {} } } = this.state;
        return (
            <Fragment>
                <Overlay loading={isFetching} />

                <div className={`${contentPanelStyle} card`}>
                    <h3 style={{ marginBottom: 30 }}>
                        <Translate text="translateFor" />: <code>{label}</code>
                    </h3>
                    <Form onSubmit={this.onSubmit}>
                        {languages.map((v, index) => (
                            <FormGroup row key={v.id}>
                                <Label sm={2}>{v.name}</Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        value={_.get(translate, v.countryCode, '') || ''}
                                        onChange={e => this.onChangeValue(e.target.value, v.countryCode)}
                                    />
                                </Col>
                            </FormGroup>
                        ))}
                        <Button>
                            <Translate text="save" />
                        </Button>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

TranslateEditComponent.propTypes = {
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

export default TranslateEditComponent;
