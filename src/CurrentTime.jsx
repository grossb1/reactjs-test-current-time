import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class CurrentTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggleOn: true,
            tzList: [],
            tz:  this.props.selected || "America/Phoenix",
            hours: "00",
            minutes: "00",
            seconds: "00"
        };

        // This binding is necessarxy to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getTime = this.getTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        
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
          if(this.props["button-clicked"]) {
        eval(this.props["button-clicked"])(this.state.tz, event);
      }
    }

    handleOnChange(event) {
        this.setState({tz: event.target.value}, this.updateTime);
       
    }

    updateTime() {
        this.getTime();
         if(this.props["time-zone-changed"]) {
            eval(this.props["time-zone-changed"])(this.state.tz);
        }
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
             fontFamily: "'Avenir', Helvetica, Arial, sans-serif",
             textAlign: 'center',
             color: '#2c3e50',
             marginTop: 60
        }

        var selectStyle = {
            borderRadius: 5
        }

        return (
         <div style={currentTimeStyle}>
             The current time in {this.state.tz} is: {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            <br />
            <select style={selectStyle} value={this.state.tz} onChange={this.handleOnChange}>
                { this.state.tzlist }
            </select>
            <button onClick={this.handleClick}>Click me!</button>
        </div>
        );
    }
}

var content = document.getElementById('current-time');
var selected = content.dataset.selected;
var buttonClicked = content.dataset.buttonClicked;
var timeZoneChanged = content.dataset.timeZoneChanged;

ReactDOM.render(<CurrentTime selected={selected} time-zone-changed={timeZoneChanged} button-clicked={buttonClicked} />, content);

export default CurrentTime;