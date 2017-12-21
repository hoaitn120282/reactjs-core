import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'reactstrap';
import { Helmet } from 'react-helmet';

import { Notification } from 'helpers';
import ModalAddLocaleComponent from './pages/create/ModalAddLocaleComponent';
import { Translate } from 'components/utils';
import TableFilterComponent from './TableFilter';
import routes from './routes';
import { FontAwesome } from 'components/Icon';
import { boxStyle } from './style.scss';

class TranslateComponent extends Component {
    constructor() {
        super();

        this.state = {
            openAdd: false
        };
    }

    toggleModalAdd = () => {
        this.setState({
            openAdd: !this.state.openAdd
        });
    };

    onSubmitAdd = data => {
        const { languageActions, translate } = this.props;
        languageActions
            .createTranslate(data)
            .then(() => {
                this.toggleModalAdd();
                languageActions.getListTranslate();
            })
            .catch(err => {
                Notification.error(err.data, translate);
            });
    };

    render() {
        const { translate, language: { translateData: { data } } } = this.props;
        const { openAdd } = this.state;

        return (
            <Fragment>
                <Helmet title={translate('translate')} />
                <ModalAddLocaleComponent isOpen={openAdd} toggle={this.toggleModalAdd} onSubmit={this.onSubmitAdd} />
                <div className="main-page-header has-border">
                    <h1 className="title-head-page">
                        <Translate text="translate" />
                    </h1>
                    <span className="flex" />
                    <div>
                        <Button role="button" color="primary" onClick={this.toggleModalAdd}>
                            <FontAwesome name="plus" />
                        </Button>
                    </div>
                </div>
                <Row style={{ marginTop: 20 }}>
                    <Col xs="5">
                        <div className={`${boxStyle} card`}>
                            {data.length > 0 && <TableFilterComponent data={data} translate={translate} />}
                        </div>
                    </Col>
                    <Col xs="7">{routes}</Col>
                </Row>
            </Fragment>
        );
    }
}

TranslateComponent.defaultProps = {
    translate: () => null
};

TranslateComponent.propTypes = {
    languageActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

export default TranslateComponent;
