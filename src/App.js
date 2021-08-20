import React from 'react';
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      tasks:[],
      taskId:0,
      taskName:'',
      timeSpentOnTask:'',
      taskGroup:'',
      assignee:'',
      status:''
    }

  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        tasks:res.data,
        taskId:0,
        taskName:'',
        timeSpentOnTask:'',
        taskGroup:'',
        assignee:'',
        status:''
      })
    })
  }
  submit(event,taskId){
    event.preventDefault();
    if(taskId === 0){
      axios.post("http://localhost:8080/api/",{
        taskName:this.state.taskName,
        timeSpentOnTask:this.state.timeSpentOnTask,
        taskGroup:this.state.taskGroup,
        assignee:this.state.assignee,
        status:this.state.status
      })
      .then((res)=>{
        console.log(res.data);
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        taskId:this.state.taskId,
        taskName:this.state.taskName,
        timeSpentOnTask:this.state.timeSpentOnTask,
        taskGroup:this.state.taskGroup,
        assignee:this.state.assignee,
        status:this.state.status
      }).then(()=>{
        this.componentDidMount();
      })

    }

  }
  delete(taskId){
    axios.delete(`http://localhost:8080/api/${taskId}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(taskId){
    axios.get(`http://localhost:8080/api/${taskId}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        taskId:res.data.taskId,
        taskName:res.data.taskName,
        timeSpentOnTask:res.data.timeSpentOnTask,
        taskGroup:res.data.taskGroup,
        assignee:res.data.assignee,
        status:res.data.status
      })
    })
  }
  render(){
  return (
    <div className="container" >
    <div className="row">
    <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.taskId)}>
        <div className="input-field col s12">
          <i className="material-icons prefix">person</i>
          <input onChange={(e)=>this.setState({taskName:e.target.value})} value={this.state.taskName} type="text" id="autocomplete-input" className="autocomplete" />
          <label htmlFor="autocomplete-input">Autocomplete</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">access_time</i>
          <input onChange={(e)=>this.setState({timeSpentOnTask:e.target.value})} value={this.state.timeSpentOnTask} type="text" id="autocomplete-input" className="autocomplete" />
          <label htmlFor="autocomplete-input">TimeSpentOnTask</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">group</i>
          <input onChange={(e)=>this.setState({taskGroup:e.target.value})} value={this.state.taskGroup} type="text" id="autocomplete-input" className="autocomplete" />
          <label htmlFor="autocomplete-input">TaskGroup</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">person</i>
          <input onChange={(e)=>this.setState({assignee:e.target.value})} value={this.state.assignee} type="text" id="autocomplete-input" className="autocomplete" />
          <label htmlFor="autocomplete-input">Assignee</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">check_circle</i>
          <input onChange={(e)=>this.setState({status:e.target.value})} value={this.state.status} type="text" id="autocomplete-input" className="autocomplete" />
          <label htmlFor="autocomplete-input">Status</label>
        </div>

        <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>

        </form>
      </div>

      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th width="20%">Task_Name</th>
              <th width="40%">Time_Spent_On_Task</th>
              <th width="20%">Task_Group</th>
              <th width="20%">Assignee</th>
              <th width="20%">Status</th>
              <th width="20%">Edit</th>
              <th width="20%">Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.tasks.map(task=>
              <tr key={task.taskId}>
                <td>{task.taskName}</td>
                <td>{task.timeSpentOnTask}</td>
                <td>{task.taskGroup}</td>
                <td>{task.assignee}</td>
                <td>{task.status}</td>
                <td>
                <button onClick={(e)=>this.edit(task.taskId)} className="btn waves-effect waves-light" type="submit" name="action">
                  <i className="material-icons">edit</i>
                </button>
                </td>
                <td>
                <button onClick={(e)=>this.delete(task.taskId)} className="btn waves-effect waves-light" type="submit" name="action">
                  <i className="material-icons">delete</i>
                </button>
                </td>
              </tr>
              )
          }

        </tbody>
      </table>
      </div>

    </div>
    </div>
  );
  }
}

export default App;