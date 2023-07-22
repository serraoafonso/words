import React, {useState, useEffect} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import Select from "react-select";
import {Link} from 'react-router-dom'
import './register.css'

export default function Register(){
  const options = [
    { value: "english", label: "English", image: English },
    { value: "portuguese", label: "Portuguese", image: Portugal },
    { value: "german", label: "German", image: German },
    { value: "french", label: "French", image: France }
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const options2 = [
    { value: "english", label: "English", image: English },
    { value: "portuguese", label: "Portuguese", image: Portugal },
    { value: "german", label: "German", image: German },
    { value: "french", label: "French", image: France }
  ];

  const [selectedOption2, setSelectedOption2] = useState(null);

  const handleSelectChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
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
              <input type="text"/>
            </div>  
            <div className="email">
              <label>Email:</label>
              <input type="email"/>
            </div> 
            <div className="user">
              <label>Username:</label>
              <input type="text"/>
            </div>
            <div className="pass">
              <label>Password:</label>
              <input type="password"/>
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
              className="select"
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            getOptionLabel={(option) => (
              <>
                <img src={option.image} alt={option.label} />
              </>
            )}
            getOptionValue={(option) => option.value}
            placeholder="Choose your native language"
          />
              </div>


              <div className="aprende">
              <label>You are learning:</label>
              <Select
              className="select"
            options={options2}
            value={selectedOption2}
            onChange={handleSelectChange2}
            getOptionLabel={(option) => (
              <>
                <img src={option.image} alt={option.label} />
              </>
            )}
            getOptionValue={(option) => option.value}
            placeholder="Choose your native language"
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