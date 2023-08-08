import React, {useContext, useEffect, useState} from "react";
import Portugal from '../../assets/portugal.png'
import English from '../../assets/united-kingdom.png'
import France from '../../assets/france.png'
import German from '../../assets/germany.png'
import './main.css'
import { LanguageContext } from "../../context/languageContext";
import { UserContext } from "../../context/userContext";
import {QueryClient, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"


export default function Main(){
  const navigate = useNavigate()
  const {language, mainLanguage} = useContext(LanguageContext)
  const {user} = useContext(UserContext)
  const [rightData, setRightData] = useState([])
  const queryClient = useQueryClient()
  const [loaded, setLoaded] = useState(true)
  const [idEditado, setIdEditado] = useState('')
  const [edit, setEdit] = useState(false)
  /*let p = {
    mainLanguage,
    learningLanguage: language
  }*/
  const [editInputs, setEditInputs] = useState({
    word: '',
    translation: ''  
  })

  const [inputs, setInputs] = useState({
    word: '',
    translation: ''
  })

  function handleChange(e){
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    let d = {
      ...inputs,
      learningLanguage: language,
      mainLanguage
    }
    mutation.mutate(d)
    setInputs({word: '', translation: ''})
  }

  const mutation = useMutation({
    mutationFn: async(d)=>{
      try{
        const res = await fetch(`http://localhost:4000/api/words/post/${user.id}`, {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(d),
          credentials: 'include'
        })
        console.log(res)
        if (response.status == 401) {
          alert('Session expired')
          navigate('/login')
        }
        else if(!res.ok){
          throw new Error('An error has ocured')
        }
        if(res.status == 401){
          alert('Session expired')
          na
        }
      }catch(err){
        console.log(err)
      }
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['words']})
    }
  })

  const deleteMutation = (e)=>{
    e.preventDefault();
    console.log(e.target.id)
    deleteWord.mutate(e.target.id)
  }

  const deleteWord = useMutation({
    mutationFn: async(id)=>{
      try{
      const res = await fetch(`http://localhost:4000/api/words/${id}`, {
        method: 'delete',
        credentials: 'include'
      })
      console.log(res)
      if (response.status == 401) {
        alert('Session expired')
        navigate('/login')
      }
    }catch(err){
      console.log(err)
    }
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['words']})
    }
  })

  const editWord = useMutation({
    mutationFn: async(body)=>{
      console.log(body)
      try{
        const res = await fetch(`http://localhost:4000/api/words/${body.id}`, {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(body.inputs),
          credentials: 'include'
        })
        if (response.status == 401) {
          alert('Session expired')
          navigate('/login')
        }else if(!res.ok){
          throw new Error()
        }
        console.log(res)
      }catch(err){
        console.log(err)
      }
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['words']})
    }
  })

  useEffect(()=>{
    console.log(editInputs)
  }, [editInputs])

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/words/get/${user.id}`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ mainLanguage }),
        credentials: 'include'
      });
      console.log(response)
      if (response.status == 401) {
        alert('Session expired')
        navigate('/login')
      }else if (!response.ok) {
        throw new Error('Network error');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  };
  


  const {isLoading, error, data} = useQuery({
    queryKey: ['words'],
    queryFn: getData,
      /*
      fetch(`http://localhost:4000/api/words/${user.id}`, {
      body: JSON.stringify(p)}).then((res)=>res.json())*/
  })

  useEffect(()=>{
    if(!loaded){
    let correct = data?.filter(l=>l.learningLanguage==language)
    setRightData(correct)
    }
  }, [language, data])


  useEffect(() => {
    getData()
      .then((jsonData) => {
        // Filter and set initial rightData based on the language
        const correct = jsonData?.filter((l) => l.learningLanguage === language);
        setRightData(correct);
      })
      .catch((err) => {
        console.log(err);
      });
      setLoaded(false)
  }, []);

  function prepareEdit(e, word){
    e.preventDefault()
    setIdEditado(word.id)
    setEditInputs({
      word: word.word,
      translation: word.translation
    })
    setEdit(true)
  }
  
  function change(e){
    setEditInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  async function submitEdit(e) {
    e.preventDefault();
    console.log(editInputs, "input");
    editWord.mutate({ id: idEditado, inputs: editInputs });
    // You can reset the idEditado here if needed
    setEdit(false);
  }

  function words() {
    if (error) {
      return "Erro";
    } else if (isLoading) {
      return "Loading...";
    } else {
      return (
        rightData?.map((word) => (
          <tr key={word.id} id={word.id}>
            <td>
              {edit && idEditado === word.id ? (
                <input
                  type="text"
                  key={word.id}
                  className="input"
                  name="word"
                  value={editInputs.word}
                  onChange={change}
                />
              ) : (
                word.word
              )}
            </td>
            <td>
              {edit && idEditado == word.id ? (
                <input
                  type="text"
                  className="input"
                  key={word.id}
                  name="translation"
                  value={editInputs.translation}
                  onChange={change}
                />
              ) : (
                word.translation
              )}
            </td>
            <td>19/7/2023</td>
            <td>
              {edit && idEditado == word.id ? (
                <button onClick={submitEdit}>Save</button>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined"
                    onClick={(e) => prepareEdit(e, word)} id={word.id}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={(e) => deleteMutation(e)} id={word.id}
                  >
                    delete
                  </span>
                </>
              )}
            </td>
          </tr>
        ))
      );
    }
  }
/*
  useEffect(()=>{
  let wordInput = document.getElementById('wordInput');
  let translationInput = document.getElementById('translationInput')
  wordInput?.addEventListener('keydown', handleClick)
  translationInput?.addEventListener('keydown', handleClick)
  }, [edit])*/
  

  function handleClick(e){
    if(e.key == "Enter"){
    e.preventDefault();
    submitEdit(e)  
    }
  }

    return(
    <div className="main">
      <div className="title">
      <h2>Your colletion</h2>
      </div>
      <div className="add">
           {mainLanguage == "german" && <img src={German} alt="" className="im"/>}
           {mainLanguage == "english" && <img src={English} alt=""  className="im"/>}
           {mainLanguage == "french" && <img src={France} alt=""  className="im"/>}
           {mainLanguage == "portuguese" && <img src={Portugal} alt=""  className="im"/>}
           <input type="text" placeholder="Add new word" value = {inputs.word} onChange={handleChange} name="word"/>
           {language == "german" && <img src={German} alt="" className="im"/>}
           {language == "english" && <img src={English} alt=""  className="im"/>}
           {language == "french" && <img src={France} alt=""  className="im"/>}
           {language == "portuguese" && <img src={Portugal} alt=""  className="im"/>}
           <input type="text" placeholder="Add its translation" value = {inputs.translation} onChange={handleChange} name="translation"/>
           <button className="send" onClick={handleSubmit}>Send</button>
      </div>
      <table>
        <thead>
         <tr>
          <th>
           {mainLanguage == "german" && <img src={German} alt="" />}
           {mainLanguage == "english" && <img src={English} alt=""/>}
           {mainLanguage == "french" && <img src={France} alt=""/>}
           {mainLanguage == "portuguese" && <img src={Portugal} alt=""/>}
          </th>
          <th> 
           {language == "german" && <img src={German} alt="" />}
           {language == "english" && <img src={English} alt="" />}
           {language == "french" && <img src={France} alt="" />}
           {language == "portuguese" && <img src={Portugal} alt="" />}
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
          {words()}
          
        </tbody>
      </table>
    </div>
  )
}

