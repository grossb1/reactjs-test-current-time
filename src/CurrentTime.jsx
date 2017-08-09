import React from 'react';
import axios from 'axios';

class CurrentTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggleOn: true,
            tzList: [],
            tz:  this.props.selected,
            hours: "01",
            minutes: "25",
            seconds: "23"
        };

        // This binding is necessarxy to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getTime = this.getTime.bind(this);
        
    }

    componentDidMount() {
         axios.get("https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=all")
          .then(response => {
            const tzlist = []; 
            Object.keys(response.data).forEach(tz => {
                tzlist.push(<option key={tz} value={tz}>{tz}</option>)    
            });
            this.setState({ tzlist })
            this.getTime();
          })
    }
    
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    handleOnChange(event) {
        this.setState({tz: event.target.value}, this.getTime);
    }

    getTime() {
        axios.get("https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=" + this.state.tz)
        .then(response => {
            this.setState(({
                hours: response.data.hours,
                minutes: response.data.minutes,
                seconds: response.data.seconds
            }));
        })
    }

	render() {
        var currentTimeStyle = {
             fontFamily: 'Avenir',
             textAlign: 'center',
             color: '#2c3e50',
             marginTop: 60
        }

        return (
         <div style={currentTimeStyle}>
             The current time in {this.state.tz} is: {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            <br />
            <select value={this.state.tz} onChange={this.handleOnChange}>
                { this.state.tzlist }
            </select>
            <button onClick={this.handleClick}>{this.state.isToggleOn?"ON":"OFF"}</button>
        </div>
        );
    }
    
}

export default CurrentTime;