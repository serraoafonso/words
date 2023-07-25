import React, {useContext, useEffect, useState} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import './menu.css'
import { LanguageContext } from "../../context/languageContext";
import {Link} from 'react-router-dom'

function Menu(){

  const {language, change} = useContext(LanguageContext)

  const options = [
    { value: "english", label: "English", image: English },
    { value: "portuguese", label: "Portuguese", image: Portugal },
    { value: "german", label: "German", image: German },
    { value: "french", label: "French", image: France }
  ];
  
 

  const [selectedOption, setSelectedOption] = useState(language);

  useEffect(()=>{
    setSelectedOption(language)
  }, [language, selectedOption])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.target.value)
    change(selectedOption.target.value)
  };

  return(
    <main className="m">
      <div className="head">
        <Link to="/">
          <h1>Words</h1>
        </Link>
      </div>
      <div className="a"></div>
      <div className="language">
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
      <div className="profilePic">
        <Link to="/profile/:username">
      <img src="https://lh3.googleusercontent.com/a/AAcHTte3Cx612zxY54ElrMSXajq4H9bpOIGnAnsif_DPsHbyHCM=s360-c-no" alt="" className="profile"/>
        </Link>
      </div>
    </main>
  )
}

export default Menu