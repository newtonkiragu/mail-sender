import React from 'react';
import {JsonTable} from 'react-json-to-html';

class Nested extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataFromChild: null
        };
    }
    myCallback = (dataFromChild) => {
        this.setState({ listDataFromChild: dataFromChild });
    };
    render() {
        return (
            <JsonTable json={json} />
        )
    }
}

export default Nested;
