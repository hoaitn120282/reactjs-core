import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Col, Row, Button } from 'reactstrap';
import Helmet from 'react-helmet';

import { Notification } from 'helpers';
import { Translate } from 'components/utils';
import routes from './routes';
import ModalAddLanguageComponent from './pages/create/ModalAddLanguageComponent';
import ModalEditLanguageComponent from './components/ModalEditLanguageComponent';
import LanguageRawComponent from './LanguageRaw';
import { boxStyle, boxPaddingStyle } from './style.scss';

class LanguageComponent extends Component {
    constructor() {
        super();

        this.state = {
            isAddLang: false,
            isEditLang: false,
            editData: {}
        };
    }

    toggleAddLanguage = () => {
        this.setState({ isAddLang: !this.state.isAddLang });
    };

    toggleEditLanguage = () => {
        this.setState({ isEditLang: !this.state.isEditLang });
    };

    onSubmitAdd = data => {
        const { languageActions, translate } = this.props;
        languageActions
            .createLanguage(data)
            .then(() => {
                this.toggleAddLanguage();
                languageActions.getListLanguage();
            })
            .catch(err => {
                Notification.error(err.data, translate);
            });
    };

    onSubmitEdit = data => {
        const { languageActions, translate } = this.props;
        languageActions
            .updateLanguage(data.id, data)
            .then(() => {
                this.toggleEditLanguage();
                languageActions.getListLanguage();
            })
            .catch(err => {
                Notification.error(err.data, translate);
            });
    };

    deleteLanguage = data => {
        const { languageActions, translate } = this.props;
        languageActions
            .deleteLanguage(data.id)
            .then(() => {
                languageActions.getListLanguage();
            })
            .catch(err => {
                Notification.error(err.data, translate);
            });
    };

    onEditLanguage = data => {
        this.setState({ editData: data, isEditLang: true });
    };

    render() {
        const { translate, language: { languageData: { data } } } = this.props;
        const { isAddLang, isEditLang, editData } = this.state;
        return (
            <Fragment>
                <Helmet title={translate('language')} />
                <div className="main-page-header has-border">
                    <h1 className="title-head-page">
                        <Translate text="language" />
                    </h1>
                    <span className="flex" />
                </div>
                <Row style={{ marginTop: 20 }}>
                    <Col xs="4">
                        <ModalAddLanguageComponent
                            isOpen={isAddLang}
                            toggle={this.toggleAddLanguage}
                            onSubmit={this.onSubmitAdd}
                        />
                        <ModalEditLanguageComponent
                            isOpen={isEditLang}
                            toggle={this.toggleEditLanguage}
                            onSubmit={this.onSubmitEdit}
                            data={editData}
                        />
                        <div className={`${boxStyle} card`}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <Translate text="language" />
                                        </th>
                                        <th>
                                            <Translate text="code" />
                                        </th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(v => (
                                        <LanguageRawComponent
                                            translate={translate}
                                            key={v.id}
                                            data={v}
                                            onDelete={this.deleteLanguage}
                                            onEdit={this.onEditLanguage}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                            <div className={boxPaddingStyle}>
                                <Button onClick={this.toggleAddLanguage}>
                                    <Translate text="addLanguage" />
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs="8">{routes}</Col>
                </Row>
            </Fragment>
        );
    }
}

LanguageComponent.propTypes = {
    languageActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

export default LanguageComponent;
