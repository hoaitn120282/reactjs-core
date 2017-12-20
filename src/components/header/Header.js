import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Progress } from 'reactstrap';

import { Translate } from 'components/utils';
// icons
import IconNotification from 'react-icons/lib/fa/bell-o';
import IconFullScreen from 'react-icons/lib/md/crop-free';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconMenu from 'react-icons/lib/md/menu';

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
            <IconMenu size="24" color="#c0a328" onClick={toggleNav} style={{ cursor: 'pointer' }} />
        </div>
        <div className="right-elems ml-auto d-flex">
            <div className="wrap hidden-sm-down">
                <IconFullScreen size="22" color="#fff" onClick={() => screenfull.toggle()} />
            </div>
            <div className="wrap notify hidden-sm-down">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <IconNotification size="22" color="#1e2531" />
                        <span className="badge">4</span>
                    </DropdownToggle>

                    <DropdownMenu right style={{ minWidth: '18rem' }}>
                        <DropdownItem header>You have 4 new notifications</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="mb-2">
                            <p>Server Upgrade Required</p>
                            <Progress value={70} color="danger" style={{ height: '3px' }} />
                        </DropdownItem>
                        <DropdownItem className="d-flex align-items-center">
                            <IconDownload size="28" className="text-success" />
                            <div className="ml-3">
                                <div>5 App Downloaded</div>
                                <small className="text-muted">5 min ago</small>
                            </div>
                        </DropdownItem>

                        <DropdownItem className="d-flex align-items-center">
                            <IconCake size="28" className="text-primary" />
                            <div className="ml-3">
                                <div>You're earned a badge</div>
                                <small className="text-muted">12 hours ago</small>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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
                        {process.env.REACT_APP_ENV !== 'production' && (
                            <DropdownItem header>
                                <Button onClick={toggleFullPermission} block color="info" size="sm">
                                    Toggle Full Permission
                                </Button>
                            </DropdownItem>
                        )}

                        <div className="text-right ml-3 mr-3 mt-2">
                            <Button onClick={onLogout} block color="success" size="sm">
                                <IconLogout size="15" />&emsp;<Translate text="logout" />
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
