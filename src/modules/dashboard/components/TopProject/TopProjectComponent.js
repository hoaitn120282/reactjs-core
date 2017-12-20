import React from 'react';
import { Card, CardBody, CardTitle} from 'reactstrap';
const TopProjectComponent = () => {
    return (
        <div className="col-md-8 mb-4">
            <Card>
                <CardBody>
                    <CardTitle className="h6 text-uppercase">Top 9 project sold out</CardTitle>
                </CardBody>
            </Card>
        </div>
    );
};

export default TopProjectComponent;
