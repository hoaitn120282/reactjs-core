import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

// icons
import { Translate } from 'components/utils';
import { isAdmin, hasRole } from 'helpers/Guard';
import LogoImg from 'assets/images/logo.png';
import styles from './style.scss';
import { FontAwesome } from 'components/Icon';

const { SubMenu } = Menu;

const NavHead = props => (
    <header className="nav-head">
        <NavLink to="/">
            <img src={LogoImg} style={{ maxHeight: 37 }} alt="" />
            <strong className="h4 text-uppercase" />
        </NavLink>
    </header>
);

class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [''],
            selectedKeys: ['']
        };
        this.nav = {
            crm: ['dashboard'],
            admin: ['language', 'translate', 'role']
        };
    }

    componentWillMount() {
        this.hasActive(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.hasActive(nextProps);
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        const rootSubmenuKeys = Object.keys(this.nav);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };
    handleClick = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleOpen = (index, e) => {
        e.stopPropagation();
    };

    checkActive = (data, props) => {
        const { location: { hash } } = props;
        return _.some(data || [], v => {
            return hash.includes(v);
        });
    };

    hasActive = props => {
        const { location: { hash } } = props;
        const { crm, admin } = this.nav;
        const selectedKeys = _.filter([...crm, ...admin], v => {
            return hash.includes(v);
        });
        this.setState({
            selectedKeys
        });

        if (this.checkActive(crm, props)) {
            this.setState({
                openKeys: ['crm']
            });
        }

        if (this.checkActive(admin, props)) {
            this.setState({
                openKeys: ['admin']
            });
        }
    };

    render() {
        const { auth } = this.props;
        const { selectedKeys, openKeys } = this.state;
        return (
            <Scrollbars className={styles.navListContainer} autoHide>
                <Menu
                    mode="inline"
                    theme="dark"
                    onOpenChange={this.onOpenChange}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ width: '100%' }}
                    className={styles.wrapList}
                >
                    <SubMenu
                        key="crm"
                        title={
                            <a>
                                <span>CRM</span>
                            </a>
                        }
                        className={styles.subMenu}
                    >
                        <Menu.Item key="dashboard">
                            <NavLink to="/dashboard" activeClassName="active">
                                <FontAwesome name="th-large" />
                                <span className="name">
                                    <Translate text="dashboard" />
                                </span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    {isAdmin(auth) && (
                        <SubMenu
                            key="admin"
                            title={
                                <a>
                                    <span>ADMIN PANEL</span>
                                </a>
                            }
                            className={styles.subMenu}
                        >
                            <Menu.Item key="language">
                                <NavLink to="/language" activeClassName="active">
                                    <FontAwesome name="globe" />
                                    <span className="name">
                                        <Translate text="language" />
                                    </span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="translate">
                                <NavLink to="/translate" activeClassName="active">
                                    <FontAwesome name="language" />
                                    <span className="name">
                                        <Translate text="translate" />
                                    </span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="role">
                                <NavLink to="/role" activeClassName="active">
                                    <FontAwesome name="user-secret" />
                                    <span className="name">
                                        <Translate text="roles" />
                                    </span>
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    )}
                </Menu>
                {/* end scroll-area */}
            </Scrollbars>
        );
    }
}

NavList.propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const NavComponent = ({ location, auth, hasRole, mini }) => {
    return (
        <nav className={`site-nav ${mini ? 'mini' : ''}`}>
            <NavHead />
            <NavList location={location} auth={auth} hasRole={hasRole} />
        </nav>
    );
};

NavComponent.defaultProps = {
    auth: {},
    location: {}
};

NavComponent.propTypes = {
    mini: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    hasRole: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { auth, router: { location } } = state;
    return {
        location,
        auth,
        hasRole: hasRole(auth)
    };
};

export default connect(mapStateToProps)(NavComponent);
