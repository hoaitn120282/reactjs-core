import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import { Translate } from 'components/utils';
import { FontAwesome } from 'components/Icon';

const HeaderComponent = ({
    toggleNav,
    toggleFullPermission,
    onLogout,
    language: { languageData: { data } },
    languageActions,
    auth: { userInfo }
}) => (
    <header className="site-head d-flex align-items-center justify-content-between">
        <div className="wrap mr-4 click-toggle-nav">
            <FontAwesome name="bars" size={24} color="#c0a328" onClick={toggleNav} style={{ cursor: 'pointer' }} />
        </div>
        <div className="right-elems ml-auto d-flex">
            <div className="wrap hidden-sm-down">
                <FontAwesome size={22} name="arrows-alt" onClick={() => screenfull.toggle()} />
            </div>

            <div className="wrap profile">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <img src="http://i.imgur.com/0rVeh4A.jpg" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu right style={{ minWidth: '12rem' }}>
                        <DropdownItem header>{`${userInfo.firstName} ${userInfo.lastName}`}</DropdownItem>
                        <DropdownItem divider />
                        {data.map(v => (
                            <DropdownItem key={v.id} onClick={e => languageActions.changeLanguage(v.countryCode)}>
                                <span>{v.name}</span>
                            </DropdownItem>
                        ))}
                        <DropdownItem divider />

                        <div className="text-right ml-3 mr-3 mt-2">
                            <Button onClick={onLogout} block color="success" size="sm">
                                <FontAwesome name="power-off" size="15" />&emsp;<Translate text="logout" />
                            </Button>
                        </div>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>
    </header>
);

HeaderComponent.defaultProps = {
    toggleFullPermission: () => null,
    toggleNav: () => null,
    onLogout: () => null
};

HeaderComponent.propTypes = {
    toggleNav: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    toggleFullPermission: PropTypes.func.isRequired,
    languageActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default HeaderComponent;
