import React, {useState, useEffect, useContext} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import { LanguageContext } from "../../context/languageContext";
import { UserContext } from "../../context/userContext";
import User from '../../assets/user.png'
import './profile.css'
import {useNavigate} from 'react-router-dom'
   
      export default function Profile(){
  const [words, setWords] = useState(0)      
  const {user, verifyUser} = useContext(UserContext)
  const {language, change, mainLanguage, modify} = useContext(LanguageContext)
  const [link, setLink] = useState('')
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  
  const [inputs, setInputs]= useState({
    name: user.name,
    username: user.username,
    email: user.email,
  })
  function handleChange(e){
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    //setInputs({...inputs, [e.target.name]: e.target.value})
  }
   
  async function upload() {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://localhost:4000/api/upload', {
        method: 'post',
        body: formData,
      });
      const data = await res.json(); // Parse the response data as JSON
      console.log('Uploaded image URL:', data); // Log the URL to check if it's correct
      return data; // Return the URL received from the server
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    getWords();
  }, []);//usar sempre uma funcao que chama outra funcao, nunca diretamente
  

   async function getWords(){
    try{
      const data = await fetch(`http://localhost:4000/api/user/words/${user.id}`, {
        credentials: 'include'
      })
      const numero = await data.json()
      setWords(numero)
      console.log(numero)//nao esquecer os parenteses
    }catch(err){
      console.log(err)
    }
   } 
   
    async function handleClick(e){
      e.preventDefault();
    let imgUrl = '';

    if (file) {
      imgUrl = await upload();
    } 

    let img;
    if (imgUrl !== "") {
      img = {
        profilePic: `http://localhost:4000/uploads/${imgUrl}` // Replace "uploads" with the folder where images are stored on the server.
      };
    } else {
      img = {
        profilePic: user.profilePic
      };
    }

      try{
        const data = {
          ...inputs,
          ...img
        }
        const res = await fetch(`http://localhost:4000/api/user/changeAll/${user.id}`, {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(data),
          credentials:'include'
        })
        console.log((res))
        if(res.status==404){
          console.log(res)
          alert('Username or email already taken')
          /*const rightData = await fetch('http://localhost:4000/api/user/user/'+user.id)
          verifyUser(rightData)*/
        }else if(res.status==401){
          alert('Session expired'),
          navigate('/login')
        }
        else{
          verifyUser({...data, id: user.id, createdAt: user.createdAt, learningLanguage: language, mainLanguage})
          alert('Changes saved')
          navigate('/')
        }
      }catch(err){
        /*const rightData = await fetch('http://localhost:4000/api/user/user/'+user.id)
          verifyUser(rightData)*/
        console.log(err)
        alert('Erro')
      }
    }
    
    
    const options = [
      { value: "english", label: "English", image: English },
      { value: "portuguese", label: "Portuguese", image: Portugal },
      { value: "german", label: "German", image: German },
      { value: "french", label: "French", image: France }
    ];
    
    useEffect(()=>{
      console.log(link, '')
    }, [link, file])
    
    const [selectedOption, setSelectedOption] = useState(language);
    
    
    const handleSelectChange = (selectedOption) => {
      setSelectedOption(selectedOption.target.value)
      change(selectedOption.target.value, user.id)
    };
    
    const options2 = [
      { value: "english", label: "English", image: English },
      { value: "portuguese", label: "Portuguese", image: Portugal },
      { value: "german", label: "German", image: German },
        { value: "french", label: "French", image: France }
      ];
      
      const [selectedOption2, setSelectedOption2] = useState(mainLanguage);
      
      const handleSelectChange2 = (selectedOption) => {
        setSelectedOption2(selectedOption.target.value);
      modify(selectedOption.target.value)
    };
    
    useEffect(()=>{
      setSelectedOption2(mainLanguage)
    }, [mainLanguage, selectedOption2])
    
    useEffect(()=>{
      setSelectedOption(language)
    }, [language, selectedOption])
    
    const handleFile =(e)=>{
      e.preventDefault()
      setFile(e.target.files[0])
      setLink(URL.createObjectURL(e.target.files[0]))
    }
    
    return(
      <div className="profile">
         <div className="imag">
            <img src={file ? URL.createObjectURL(file) : ( user.profilePic==undefined || user.profilePic == "" ? User : user.profilePic)} alt=""  id="imgFile"/>
            <span class="material-symbols-outlined">
            edit
            <input type="file" id = "file"onChange={e=>handleFile(e)} name="file"/>
            </span>        
            <div className="words">
              Words learned: {words}  
            </div>   
         </div>
         <div className="data">
            <div className="name">
                <label>Name:</label>
                <input type="text" className="i" value={inputs.name} onChange={handleChange} name="name"/>
            </div>
            <div className="username">
                <label>Username:</label>
                <input type="text" className="i" value={inputs.username} onChange={handleChange} name="username"/>
            </div>
            <div className="email">
                <label>Email:</label>
                <input type="text" value={inputs.email} className="i" onChange={handleChange} name="email"/>
            </div>
            <div className="learning">
                <label>Learning:</label>
                <select name="mainLanguage" id="" onChange={handleSelectChange} value={selectedOption}>
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
            <div className="native">
                <label>Native:</label>
                <select name="mainLanguage" id="" onChange={handleSelectChange2} value={selectedOption2}>
                  {options2.map((option)=>{
                    return(
                      <option key={option.value} value={option.value}>
                        <img src={option.image} alt={option.value} />
                        <label>{option.label}</label>
                      </option>
                    )
                  })}
                </select>
            </div>
            <button onClick={handleClick}>Submit</button>
         </div>
         </div>
        )
  }