import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from './Components/Datepicker';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';
import CustomizedTable from "./Components/CustomizedTable";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Grid from '@material-ui/core/Grid';
import { CsvDownload } from 'react-json-to-csv';

var Save_as = require('file-saver');

const styles = theme => ({ 

})
 
class AttendanceTable extends React.Component {

  state={
    startDate: new Date(),
    formattedDate:'',
    attendance:[]
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
     
    });

  }

  updateChange = async (event) => {
    event.preventDefault();
    var completeDate=this.state.startDate;
    console.log(this.state.startDate);
    var date=completeDate.getDate();
    var month =completeDate.getMonth()+1;
    var year = completeDate.getFullYear();
    
        console.log(date +"/"+month+"/"+year);
        const formattedDate = date + "-" + month + "-" + year;
        await this.setState({
          formattedDate
        });

        const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-day/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
          // mode: 'no-cors',
        })
        console.log(res);
        const data = await res.json();
        console.log(data);
    
        if(res.status === 200){
         
          
          console.log('fuck off');
          this.setState({
            attendance:data.attendance
          })          
      }
    

  }

  async componentDidMount(){
    console.log('hi');
    console.log(this.props);
    var completeDate=this.state.startDate;
    console.log(this.state.startDate);
    var date=completeDate.getDate();
    var month =completeDate.getMonth()+1;
    var year = completeDate.getFullYear();
    
        console.log(date +"/"+month+"/"+year);
        const formatdDate = date + "-" + month + "-" + year;
        console.log(formatdDate);
        await this.setState({
          formattedDate:formatdDate
        })
        console.log(this.state.formattedDate);
    
    const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/get-attendance-of-day/${this.props.location.state.name}/${this.props.location.state.div}/${this.state.formattedDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      // mode: 'no-cors',
    })
    console.log(res);
    const data = await res.json();
    console.log(data);

    if(res.status === 200){
      this.setState({
        attendance:data.attendance
      })
      
      console.log('fuck off');

  }
}
    
  render() {
    const { classes } = this.props;
   
    return (
        <div>
            <PersistentDrawerLeft />
          <Grid container>

            <Grid item md={12} lg={1}>
            </Grid>
            <Grid item md={12} lg={7}>
            <CustomizedTable attendance={this.state.attendance} subject={this.props.location.state.name}/>
            </Grid>
            <Grid item md={12} lg={4} style={{padding:'25px 50px'}}>
            <Datepicker startDate={this.state.startDate} handleChange={this.handleChange} updateChange={this.updateChange}/>
            </Grid>
          </Grid>
          
           
        
        </div>
    );
  }
}

AttendanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendanceTable);

