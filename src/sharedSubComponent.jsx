import React from 'react';
import ReactDOM from 'react-dom';

class SharedSubComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

        // This binding is necessarxy to make `this` work in the callback
        this.addOne = this.addOne.bind(this);
    }

    addOne() {
        this.setState({count: this.state.count+1});
    }

	render() {
        return (
            <div class="component">
    <h3>Shared Component</h3>
    <div><button onClick={this.addOne}>Click to add Count</button>&nbsp;-&nbsp;{this.state.count}</div>
    </div>
        );
    }
}

export default SharedSubComponent;