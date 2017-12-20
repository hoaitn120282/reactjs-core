import React from 'react';
import { Card, CardBody, CardTitle} from 'reactstrap';
const TotalSaleComponent = () => {
    return (
        <div className="col-md-4 mb-4">
            <Card>
                <CardBody>
                    <CardTitle className="h6 text-uppercase">Total Sale</CardTitle>
                </CardBody>
            </Card>
        </div>
    );
};

export default TotalSaleComponent;
