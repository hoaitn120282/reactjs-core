import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import PropTypes from 'prop-types';

const TransactionTableData = [
    { sold: '22', name: 'John Doe', earnings: '$304', status: 'pending' },
    { sold: '12', name: 'Maria Smith', earnings: '$834', status: 'done' },
    { sold: '28', name: 'Sofia Andre', earnings: '$943', status: 'done' },
    { sold: '03', name: 'Jean Wilkinson', earnings: '$1234', status: 'pending' },
    { sold: '10', name: 'Alisha Seth', earnings: '$534', status: 'done' }
];

const TransactionTable = ({ data }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Seller</th>
                <th>Properties sold</th>
                <th>Net.Amount</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, i) => (
                <tr key={i}>
                    <td className="d-flex flex-column">
                        <strong>{item.name}</strong>
                    </td>
                    <td className="align-middle">{item.sold}</td>
                    <td className="align-middle">{item.earnings}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

TransactionTable.propTypes = {
    data: PropTypes.array
};

class TopSaleComponent extends Component {
    render() {
        return (
            <div className="col-md-4 mb-4">
                <Card>
                    <CardBody className="table-responsive">
                        <CardTitle className="text-uppercase h6">TOP 10 SELLERS</CardTitle>
                        <TransactionTable data={TransactionTableData} />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TopSaleComponent;
