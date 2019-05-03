import React from 'react';
//import Myclasscard from './Components/Myclasscard';
import Ttab from './Components/Ttab';
import PersistentDrawerLeft from './Components/PersistentDrawerLeft';

class Teachermain extends React.Component{

    state = {
        class_subjects:[],
        division_they_are_class_teacher_of:'',
        taught_subjects:[]
    }
    async componentDidMount(){
        console.log(this.props.location.state);
        console.log(localStorage.getItem('token'));
        // this.setState({
        //     class_subjects:this.props.location.state.class_subjects,
        //     division_they_are_class_teacher_of:this.props.location.state.division_they_are_class_teacher_of,
        //     taught_subjects:this.props.location.state.taught_subjects
        // });

        const res=await fetch(`https://wizdem.pythonanywhere.com/Attendance/dashboard-teacher/${this.props.location.state}`, {
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
            const class_subjects = data.class_subjects;
            const taught_subjects = data.taught_subjects;
            const division_they_are_class_teacher_of = data.division_they_are_class_teacher_of;
            this.setState({
              logged_in:true,
              class_subjects,
              taught_subjects,
              division_they_are_class_teacher_of
      
            });
            console.log(this.state);
            //console.log(jsonToCsv(data));
          }
    }
    render(){
        console.log(this.state);

        return(
        <div>
               <PersistentDrawerLeft  />


            <Ttab data={this.state}/>
            {/* <Myclasscard /> */}
            </div>
        );
    }

}



export default Teachermain;