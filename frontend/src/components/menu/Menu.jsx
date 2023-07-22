import React, {useContext, useState} from "react";
import Select from "react-select";
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

  const [selectedOption, setSelectedOption] = useState(language == options[0].value ? options[0] : (language == options[1].value ? options[1] : (language == options[2].value ? options[2] : (language == options[3].value && options[3]))));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    change(selectedOption.value)
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
            placeholder="Choose your learning language"
          />
      </div>
      <div className="profilePic">
        <Link to="/profile/:username">
      <img src="https://lh3.googleusercontent.com/a/AAcHTte3Cx612zxY54ElrMSXajq4H9bpOIGnAnsif_DPsHbyHCM=s360-c-no " alt="" className="profile"/>
        </Link>
      </div>
    </main>
  )
}

export default Menu