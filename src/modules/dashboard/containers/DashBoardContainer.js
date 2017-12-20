import React, { Component } from 'react';

class DashBoardContainer extends Component {
    render() {
        return (
            <div className="view">
                <div className="view-header d-flex align-items-center">
                    <header className="text-white">
                        <h1 className="h5 title text-uppercase">Dashboard</h1>
                    </header>
                </div>
                <div className="view-content view-dashboard">Dashboard</div>
            </div>
        );
    }
}

export default DashBoardContainer;
