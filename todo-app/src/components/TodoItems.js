import { Checkbox ,Button  } from '@mui/material';
import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios';

class TodoItems extends Component {

    constructor(props) {
      super(props);
      this.state = {
          items: [],
          checked : false,
          value:'date',
          isOldestFirst: true
      }
    }
    
     componentDidMount(){ 
       console.log("11111112222");
      Axios.get("http://localhost:4000/todo").then((response)=>{
        this.setState({items: response.data})
      })
    }


    removeItem =(id)=>{
      Axios.delete("http://localhost:4000/remove/"+id)
      .then(response =>{
        if(response.data != null){
          alert("item removed");
        }
      })
      window.location.reload();
    };

    toggleChange = (id) => {

      console.log(id);
      // console.log(this.state.items[]);

      this.state.items.map((todo)=>{
          console.log("gorilla", todo.title);
          if(todo._id == id ){
            console.log("am in");
            todo.checked = !todo.completed 
          }
      });
      
  
    }



    applyChanges = ()=>{
      let newItems = this.state.items;
      if(this.state.isOldestFirst){
        newItems = this.state.items.sort((a,b) => a.date<b.date)
      }else{
        newItems = this.state.items.sort((a,b) => a.date>b.date)
      }
      this.setState({
        isOldestFirst: !this.state.isOldestFirst,
        items : newItems
    })
    // this.setState({
    //   isOldestFirst: !this.state.isOldestFirst
    // })



      // console.log("jookl", this.state.value);
      // if(this.state.value == "date"){
      //   console.log("in");
      //   let newItems = this.state.items.reverse();
      //   console.log(newItems);
      //   this.setState({
      //     items : newItems.sort((a,b)=>a.date >b.date)
      // })

      // }
    }

    handleChange = (event, index, value) => {
      this.setState({ value:event.target.value });
      console.log(event.target.value);
      console.log(event, index, value);
   }
   
    render() {
        return (
        <div style={{marginTop:"30px"}}>


    {/* {this.props.todo} */}


    <FormControl style={{width:"180px", marginLeft:"20px"}}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.value}
          label="Sort"
          onChange={this.handleChange}
        >
          <MenuItem value={"date"}>end-date</MenuItem>
          <MenuItem value={"order"}>insertion order</MenuItem>
        </Select>
      </FormControl>

      <Button 
          onClick={this.test}   
          variant="contained" 
          style={{marginLeft:"10px", marginTop:"10px"}}
          onClick={this.applyChanges}
          >Apply
          </Button>




      {this.state.items.map((item)=>(
    // <h1>{item[0]}</h1>
    <div>
    

    <div 
      style={styles.cmp}
      id={item._id}
    >
                <Checkbox
                key={item._id} 
                  id={item._id}
                  style={{marginLeft:"50px"}} 
                  // defaultChecked = 'false'
                  
                  // checked  = {item.completed}
                  checked = {item.completed}
                  onChange = {this.toggleChange.bind(this, item._id)}
                  // value = "true"
                  color="success" />
                <text  style={{marginLeft:"30px"}}> {item.title} </text>
                {/* <text style={{position:"absolute", right:"250px", marginTop:"10px",color:"#143261"}}>{item[1].getDate()}/{item[1].getMonth()}/{item[1].getYear()}</text> */}
                <text   style={{position:"absolute", right:"250px", marginTop:"10px",color:"#143261"}}> {item.date} </text>
                <Button 
                  // id={item._id}
                  // key={item._id}
                  style= {styles.btn} 
                  variant="outlined" 
                  color="error"
                  onClick={this.removeItem.bind(this, item._id)}                  
                  >Remove</Button>        
            </div>
            </div>

))}

        </div>
        );
    }
}

export default TodoItems;

var styles = {
    cmp:{
        marginTop:"5px", 
        background:"#f5f5f5"
    },
    btn:{
        position:"absolute",
        right:"50px", 
        height:"30px", 
        marginTop:"7px"
    }
}