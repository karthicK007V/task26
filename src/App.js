import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';

import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function App() {
  let formvalues={
    id:"",
    name:"",
    age:"",
    email:"",
    gender:"",
    course:""
  }

const[formdata,setformdata]=useState(formvalues)
  const [user ,setuser]=useState([]);

 

  useEffect( () => {
 async function  getuser(){
  const response=await axios.get('https://6320be7482f8687273a6d96b.mockapi.io/User');
  console.log(response.data);
  setuser(response.data)

  }
  getuser()

  },[])
const onpop=(id)=>{
  
 const abc= user.filter((row) => row.id === id)[0];
  setformdata({...formdata,...abc})

}

  const handelchange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  const ondel=async(id)=>{
    const res=await axios.delete(`https://6320be7482f8687273a6d96b.mockapi.io/User/${id}`)
    const users=user.filter((row)=>row.id!==res.data.id)
    setuser(users)
  }
  const Handelsumbit=async(e)=>{
    e.preventDefault();
    if(formdata.id){
      const response=await axios.put(`https://6320be7482f8687273a6d96b.mockapi.io/User/${formdata.id}`,{
        name:formdata.name,
        age:formdata.age,
        email:formdata.email,
        gender:formdata.gender,
        course:formdata.course
      })
      let users=[...user];
      let index=users.findIndex((row)=>row.id===  response.data.id );
      users[index]=response.data;
      setuser(users)


    }
 else{
    const res=await axios.post("https://6320be7482f8687273a6d96b.mockapi.io/User",{
      name:formdata.name,
      age:formdata.age,
      email:formdata.email,
      gender:formdata.gender,
      course:formdata.course
 

    })   
     setuser([...user,res.data]);
  }
    setformdata(formvalues);
 
  

    
   }
   
   

  return (  
    <>
    <h1 style={{backgroundColor:"yellowgreen",border:"10px 10px",textAlign:"center",padding:"20px"}}>CRED APP</h1>
    <h1>User Form</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30ch' },
      }}
    onSubmit={Handelsumbit}
    >
     
      <TextField id="standard-basic" label="NAME" variant="standard" name='name' required
      value={formdata.name}
 onChange={(e)=>handelchange(e)}  
   

       />
      <TextField id="standard-basic" label="Age" variant="standard" name='age' required
      value={formdata.age}
 onChange={(e)=>handelchange(e)}      
      />
      <TextField    id="email" label="Email" variant="standard" type="email" name='email' required      value={formdata.email}
      onChange={(e)=>handelchange(e)}
       
      /><br/>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="gender" required
        value={formdata.gender}
        onChange={(e)=>handelchange(e)}      
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         
          label="Course"
          name='course' required
          value={formdata.course}
          onChange={(e)=>handelchange(e)}         
      
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="node">Node</MenuItem>
        </Select>
      </FormControl><br/>
    
      <Button variant="contained" type="submit">Submit</Button>
 
      
    </Box>

     <h1>USER DATA</h1>
     <TableContainer component={Paper}>
      <Table sx={{ Minwidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">course</TableCell>
            <TableCell align="right">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {user.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.course}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell>
             
              <Button align="right" style={{color: "Black" ,border :" solid Black 2px",backgroundColor:"green",margin:"2px"}} onClick={()=>onpop(row.id)}>Edit</Button>
              <Button align="right" style={{color: "Black"  ,border :" solid Black 2px",backgroundColor:"red",margin:"2px"}} onClick={()=>ondel(row.id)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      

        </Table>
        </TableContainer>


        
    </>
  );
}

export default App;
