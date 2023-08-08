import React, {useState, useEffect} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import {Link, useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './register.css'

export default function Register(){
  
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [gl,setGl] = useState(false)

  /*
  const [selectedOption, setSelectedOption] = useState("english");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setInputs(prev=>({...prev, mainLanguage: selectedOption.target.value}))
  };



  const [selectedOption2, setSelectedOption2] = useState("english");

  const handleSelectChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setInputs(prev=>({...prev, learningLanguage: selectedOption.target.value}))
  };

  <Select 
    options={options}
    getOptionLabel={(option) => option.label}
    getOptionValue={(option) => option.value} 
    formatOptionLabel={({value, label, image}) => (
      <div>
        <img src={image} alt={label} /> 
      </div>
       )}
       />*/
  

    const [layout, setLayout] = useState(true)
    const [passou, setPassou] = useState(true)

    async function changeLayout(inputs){
      const data = {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
        name: inputs.name,
        profilePic: ''
      }
    
      if(data.email=="" || data.username=="" || data.password=="" || data.username==""){
        setPassou(false)
      }else{
      localStorage.setItem('inputs', JSON.stringify(data))
      setLayout(false)
      }

    if(layout && passou){//se o layout ja for false e se ja tiver passado
    try{
      const res = await fetch('http://localhost:4000/api/user/find', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: data.email})
      })
      console.log(res)
      if(res.status==404){
       return 
      }else{
        alert('User already registered')
        setLayout(true)
      }
     }catch(err){
      console.log(err)
     }
    }
    }

    const Layout1 = ()=>{

      const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        name: "",
      })
    
      
      useEffect(()=>{
        console.log(inputs)
      }, [inputs])
    
      function handleChange(e){
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
      }
      useEffect(()=>{
        /* global google */
        
        google.accounts.id.initialize({
          client_id: "451868079952-0n9a0jnfiqioms8fm9sbhh9vcmus2djv.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
        
        google.accounts.id.renderButton(
          document.getElementById('sign'),
          {theme: "outline", size: "large"}
        )
        //preciso por o comentario acima
      }, [layout])

      async function handleCallbackResponse(response){
        setGl(true)
        setLayout(false)
        var userObject = jwt_decode(response.credential)
        console.log(userObject)
        const {name, email, picture} =userObject;
        const a = Math.floor(Math.random()*10000000)
        const username = `user-${a}`
        const data = {name, email, username, profilePic: picture, password: ''}
        console.log('OLA')
        localStorage.setItem('inputs', JSON.stringify(data))
       try{
        const data = await fetch('http://localhost:4000/api/user/find', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email})
        })
        if(data){
          alert('Register succesfull, now login')
        navigate('/login')
        localStorage.removeItem('inputs')
        }
       }catch(err){
        console.log(err)
       }
       } 
       
       const estilo = !passou ? {
        visibility: "visible"
       } : {
        visibility: "hidden"
       }
   
        return(
            <> 
              <div className="header">
            <h1>Register</h1>
            </div>
            <form className="form1">
            <div className="name">
              <label>Name:</label>
              <input name="name" type="text" onChange={handleChange} value={inputs.name}/>
            </div>  
            <div className="email">
              <label>Email:</label>
              <input name="email" type="email" onChange={handleChange} value={inputs.email}/>
            </div> 
            <div className="user">
              <label>Username:</label>
              <input name="username" type="text" onChange={handleChange} value={inputs.username}/>
            </div>
            <div className="pass">
              <label>Password:</label>
              <input name="password" type="password" onChange={handleChange} value={inputs.password}/>
            </div>   
              <div className="button">
              <div id="sign">
              </div>
              <Link to ="/login">
              <button >Already have an account?</button>
              </Link>
              <div className="next" onClick={()=>changeLayout(inputs)}>
              &gt;
              </div>
              </div>
            </form>
            <div className="aviso" style={estilo}>
              <p>Please fill all the gaps</p>
              <button onClick={()=>setPassou(true)}>Ok</button>
              </div>
            </>
        )
    }


    
    const Layout2 = ()=>{

          
    const options2 = [
      { value: "german", label: "German", image: German },
      { value: "english", label: "English", image: English },
      { value: "portuguese", label: "Portuguese", image: Portugal },
      { value: "french", label: "French", image: France }
    ];
    const options = [
      { value: "english", label: "English", image: English },
      { value: "portuguese", label: "Portuguese", image: Portugal },
      { value: "german", label: "German", image: German },
      { value: "french", label: "French", image: France }
    ];
    const [selectedOption, setSelectedOption] = useState("english");

    const handleSelectChange = (selectedOption) => {
      setSelectedOption(selectedOption.target.value);
    };
  
    const [selectedOption2, setSelectedOption2] = useState("german");
  
    const handleSelectChange2 = (selectedOption) => {
      setSelectedOption2(selectedOption.target.value);
    };
     
    const handleSubmit = async(e)=>{
      
      e.preventDefault()
      const inputs = JSON.parse(localStorage.getItem('inputs'))
      const userData = {
        ...inputs,
        mainLanguage: selectedOption,
        learningLanguage: selectedOption2
      }
      console.log(userData)
      try{
        const res = await fetch('http://localhost:4000/api/user/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData),
          credentials: 'include'
        })
        if(res.status == 404){
          alert('Username or email already taken')
          setLayout(false)
        }else{
        localStorage.removeItem('inputs')
        alert('Register succesfull, now login')
        navigate('/login')
        }
      }catch(err){
        alert('User already created')
        setLayout(false)
      }
    }

        return(
            <> 
              <div className="header">
            <h1>Register</h1>
            </div>
            <form className="form2"><div className="header1">
              <h3>Hello {JSON.parse(localStorage.getItem('inputs'))?.name}!</h3>
            </div>
              <div className="mae">
                <label>Your native language:</label>
                <select name="mainLanguage" id="" value={selectedOption} onChange={handleSelectChange}>
                  {options.map((option)=>{
                    return(
                      <option key={option.value} value={option.value}>
                        <img src={option.image} alt={option.value} />
                        <label>{option.label}</label>
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="aprende">
              <label>You are learning:</label>
              <select name="mainLanguage" id="" value={selectedOption2} onChange={handleSelectChange2}>
                  {options2.map((option)=>{
                    return(
                      <option key={option.value}>
                        <img src={option.image} alt={option.value} />
                        <label>{option.label}</label>
                      </option>
                    )
                  })}
                </select>
              </div>
            <div className="next2" onClick={()=>setLayout(true)}>
            &lt;
              </div>
              <div className="btn">
              <button onClick={handleSubmit}>Register</button>
              </div>
            </form>

            </>
        )
    }
    return(
        <div className="register">
            {layout ? <Layout1/>: <Layout2/>}
        </div>
    )
}