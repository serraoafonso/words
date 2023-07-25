import React, {useState, useEffect, useContext} from "react";
import Select from "react-select";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import { LanguageContext } from "../../context/languageContext";
import './profile.css'

export default function Profile(){

    const {language, change} = useContext(LanguageContext)

    const options = [
      { value: "english", label: "English", image: English },
      { value: "portuguese", label: "Portuguese", image: Portugal },
      { value: "german", label: "German", image: German },
      { value: "french", label: "French", image: France }
    ];
    
  
    const [selectedOption, setSelectedOption] = useState(language);
  
 
    const handleSelectChange = (selectedOption) => {
      setSelectedOption(selectedOption.target.value)
      change(selectedOption.target.value)
    };
  
    const options2 = [
        { value: "english", label: "English", image: English },
        { value: "portuguese", label: "Portuguese", image: Portugal },
        { value: "german", label: "German", image: German },
        { value: "french", label: "French", image: France }
      ];

      const [selectedOption2, setSelectedOption2] = useState('english');
  
    const handleSelectChange2 = (selectedOption) => {
      setSelectedOption2(selectedOption.target.value);
    };
    useEffect(()=>{
      setSelectedOption(language)
    }, [language, selectedOption])

    const Layout1 = ()=>{
        return(
            <div className="profile">
         <div className="imag">
            <img src="https://lh3.googleusercontent.com/a/AAcHTte3Cx612zxY54ElrMSXajq4H9bpOIGnAnsif_DPsHbyHCM=s360-c-no" alt="" />
            <span class="material-symbols-outlined">
            edit
            </span>        
            <div className="words">
              Words learned: 2000    
            </div>   
         </div>
         <div className="data">
            <div className="name">
                <label>Name:</label>
                <input type="text" value="Afonso" className="i"/>
            </div>
            <div className="username">
                <label>Username:</label>
                <input type="text" value="serraoafonso" className="i"/>
            </div>
            <div className="email">
                <label>Email:</label>
                <input type="text" value="afonsoserrao07@gmail.com" className="i"/>
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
            <button>Submit</button>
         </div>
         </div>
        )
       } 

    return(
        <div className="profile">
            <Layout1/>
        </div>
    )
}