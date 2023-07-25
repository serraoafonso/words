import React, {useState, useEffect} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import Select from "react-select";
import {Link} from 'react-router-dom'
import './register.css'

export default function Register(){

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    mainLanguage: "",
    learningLanguage: "" 
  })
  useEffect(()=>{
    console.log(inputs)
  }, [inputs])

  function handleChange(e){
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  
  const options = [
    { value: "english", label: "English", image: English },
    { value: "portuguese", label: "Portuguese", image: Portugal },
    { value: "german", label: "German", image: German },
    { value: "french", label: "French", image: France }
  ];

  const [selectedOption, setSelectedOption] = useState("english");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setInputs(prev=>({...prev, mainLanguage: selectedOption.target.value}))
  };

  const options2 = [
    { value: "english", label: "English", image: English },
    { value: "portuguese", label: "Portuguese", image: Portugal },
    { value: "german", label: "German", image: German },
    { value: "french", label: "French", image: France }
  ];

  const [selectedOption2, setSelectedOption2] = useState("english");

  const handleSelectChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setInputs(prev=>({...prev, learningLanguage: selectedOption.target.value}))
  };
  

    const [layout, setLayout] = useState(true)

    function handleCallbackResponse(response){
      console.log("Encoded JWT ID token: "+response.credential)
      var userObject = jwt_decode(response.credential)
      console.log(userObject)
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

    const Layout1 = ()=>{
        return(
            <> 
              <div className="header">
            <h1>Register</h1>
            </div>
            <form>

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
              <input name="usermane" type="text" onChange={handleChange} value={inputs.username}/>
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
              <div className="next" onClick={()=>setLayout(false)}>
              &gt;
              </div>
              </div>
            </form>
            </>
        )
    }


    
    const Layout2 = ()=>{
        return(
            <> 
              <div className="header">
            <h1>Register</h1>
            </div>
            <form className="form2"><div className="header1">
              <h3>Hello user!</h3>
            </div>
              <div className="mae">
                <label>Your native language:</label>
                <Select 
    options={options}
    getOptionLabel={(option) => option.label}
    getOptionValue={(option) => option.value} 
    formatOptionLabel={({value, label, image}) => (
      <div>
        <img src={image} alt={label} /> 
      </div>
       )}
       />
              </div>
              <div className="aprende">
              <label>You are learning:</label>
              <Select 
              className="s"
            options={options2}
            value={selectedOption2}
            onChange={handleSelectChange2}
            name="learningLanguage"
            getOptionLabel={(option) => (
              <>
                <img src={option.image} alt={option.label} />
              </>
            )}
            getOptionValue={(option) => option.value}
            placeholder="Choose your learning language"
          /> 
              </div>
            <div className="next2" onClick={()=>setLayout(true)}>
            &lt;
              </div>
              <div className="btn">
              <button>Register</button>
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