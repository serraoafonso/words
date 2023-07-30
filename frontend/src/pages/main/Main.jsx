import React, {useContext} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import './main.css'
import { LanguageContext } from "../../context/languageContext";


export default function Main(){
  const {language} = useContext(LanguageContext)

  console.log(language)
  
    return(
    <div className="main">
      <div className="title">
      <h2>Your colletion</h2>
      </div>
      <div className="add">
           {language == "german" && <img src={German} alt="" className="im"/>}
           {language == "english" && <img src={English} alt=""  className="im"/>}
           {language == "french" && <img src={France} alt=""  className="im"/>}
           {language == "portuguese" && <img src={Portugal} alt=""  className="im"/>}
           <input type="text" placeholder="Add new word"/>
           <img src={German} alt=""  className="im"/>
           <input type="text" placeholder="Add its translation"/>
           <button className="send">Send</button>
      </div>
      <table>
        <thead>
         <tr>
          <th>
           {language == "german" && <img src={German} alt="" />}
           {language == "english" && <img src={English} alt="" />}
           {language == "french" && <img src={France} alt="" />}
           {language == "portuguese" && <img src={Portugal} alt="" />}
          </th>
          <th> 
            <img src={German} alt="" />
          </th>
          <th>
            Date
          </th>
          <th>
            Actions
          </th>
         </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hello</td>
            <td>Hallo</td>
            <td>19/7/2023</td>
            <td>
            <span class="material-symbols-outlined">
edit
</span> 
<span class="material-symbols-outlined">
delete
</span>
            </td>
          </tr>
          <tr>
            <td><input type="text" className="input"/></td>
            <td><input type="text" className="input"/></td>
            <td>19/7/2023</td>
            <td>
            <span class="material-symbols-outlined">
edit
</span> 
<span class="material-symbols-outlined">
delete
</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

