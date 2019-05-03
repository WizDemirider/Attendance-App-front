import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid, Button, CardContent } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import {Link,Redirect} from 'react-router-dom';

var Save_as = require('file-saver');

//import './style.css'

const styles = theme => ({

  card: {
    height: 225,

  },
  content: {
    padding: 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },


});

class Mysubjectcard extends React.Component {
  state = { expanded: false};
  

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


    async handleClick(subject,div){
      //alert("heyyyy");
    console.log(`https://wizdem.pythonanywhere.com/Attendance/get_csv/${subject}/${div}/01-01-2019/01-05-2019`);
    const url = `https://wizdem.pythonanywhere.com/Attendance/get_csv/${subject}/${div}/01-01-2019/01-05-2019`;
    const res1 = await fetch(url,{
      method: 'GET',
      headers: {
      'Content-Type': 'text/csv',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    },
    responseType: 'blob',
    }).then(res => res.blob())
    .then(blob => Save_as(blob, 'test.csv'))
  }

  render() {
    const { classes } = this.props;

    console.log("Hello");
    console.log(this.props.taught_subjects);
    console.log(this.props.taught_subjects.div);
    console.log("End");
    

    return (

      // <div>
      <Grid container spacing={16}>
      {this.props.taught_subjects.map((subject) => {
        return(
        <Grid item xs={12} sm={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom className={classes.content}><b>{subject.name}</b></Typography>
              <Typography variant="h6" gutterBottom className={classes.content}>Semester{subject.semester}</Typography>
              <Typography variant="title" gutterBottom className={classes.content}>{subject.subjectCode}</Typography>

            </CardContent>

            <CardActions disableActionSpacing style={{}}>
              <Button variant="contained" color="default" className={classes.button} onClick={this.handleClick.bind(this,subject.name,subject.div)}>
                Download
        <CloudDownloadIcon className={classes.rightIcon} />
              </Button>
              <Link to={{
                pathname:`/attendanceTable/${subject.div}`, state:subject}} style={{textDecoration:'none'}}><Button variant="contained" color="default" className={classes.button}>
                View
        <RemoveRedEyeIcon className={classes.rightIcon} />
              </Button></Link>
              <Link to={{
                pathname:`/editTable/${subject.div}`, state:subject}} style={{textDecoration:'none'}}><Button variant="contained" color="default" className={classes.button}>
                Edit
        <CreateIcon className={classes.rightIcon} />
              </Button></Link>
            </CardActions>
          </Card>
        </Grid>
)})}
        

      </Grid>
    );
  }
}
Mysubjectcard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mysubjectcard);