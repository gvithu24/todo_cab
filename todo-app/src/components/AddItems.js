import React, { Component } from 'react';
import { TextField, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Axios from 'axios';

class AddItems extends Component {

    state = {
        title: '',
        date:'',
        completed: false
        // todo:[this.state.title,this.state.date]
    }

    addTodo=(e)=>{
        // this.props.blast1();
        // alert(this.state.date)
        e.preventDefault();
    //    this.props.newTodo(this.state.title,this.state.date);
    //    this.setState({title: ''});
    console.log("ok working",this.state);
    Axios.post("http://localhost:4000/add_todo",this.state)
    .then(response =>{
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })

    window.location.reload();

    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value  });

    handleChange = (date) =>{
    // if(this.value === undefined) {return}
    this.setState({date: date})};

    render() {

        console.log("title", this.state.title);
        console.log("date",this.state.date);
        // const handleChange = (newValue) => {
        //     setValue(newValue);
        //   };
        return (
            
            <div>
                <h1 style = {styles.font}>TODO APP</h1>
                <div style={styles.textFieldItems}>
                <TextField 
                    style={{marginLeft:"20px"}} 
                    fullWidth 
                    label="Add Items" 
                    name="title"
                    id="fullWidth" 
                    value = {this.state.title}
                    onChange={this.onChange}
                    />
                
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                
            <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                // ormatDate={(date) => moment(date).format('DD-MM-YYYY')}/
                value={this.state.date}
                name="date"
                onChange={this.handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
            
            </LocalizationProvider>

                <Button  
                    onClick={this.addTodo}
                    style = {{marginRight:"20px", marginLeft:"10px"}} 
                    variant="contained" 
                    color="success">
                        Add        
                </Button>
                </div>
            </div>
        );
    }
}

export default AddItems;

var styles = {
    font:{
        textAlign:"center", 
        color:"#0a2c63"
    },
    textFieldItems:{
        display: "block", 
        marginLeft: "auto", 
        marginRight: "auto", 
        display:"flex", 
        alignItems:"center",
        justifyContent:"center"
    }

}