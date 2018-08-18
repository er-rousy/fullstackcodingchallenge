import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

class HomePage extends React.Component {
    render() {
        return (
            <Card className="container">
                <CardTitle title="My Facebook" subtitle="This is the home page." />
            </Card>
        );
    }
}

export default HomePage;