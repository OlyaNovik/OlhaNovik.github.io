import "../HomeCv/HomeCv.scss"
import "./Admin.scss"
import db, { storage } from "../../Firebase"
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useDispatch, useSelector} from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {InfoAction} from '../../Redux/Action/Action'
import {InfoUser} from './InfoUser'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
// import { getInfoUser} from '../../Redux/Action/Action'
const Admin = () => {
   
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.info.infoUser)
  const collectionRef = collection(db, 'info')
  const [infoValue, setInfoValue] = useState(InfoUser)
  const [editMode, setEdit] = useState(false)
  const [title, setTitle] =useState(true)
  const [editValue, setEditValues] = useState(InfoUser)
  const [load,setLoad] =useState(false)
  const [add, setAddInfo] =useState(true)
  const [editNewValue,setValue] = useState({
    skill: '',
    workExperience: '',
    contact: '',
  })

  const addInfo = async () => {
    try {
      const docRef = await addDoc(collectionRef, infoValue)
      setAddInfo(false)
    }
    catch (e) {
      console.log(e);
    }
  }
  
  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) => {
    dispatch(InfoAction.SetInfo(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
    })
  }


  useEffect(() => {
    getInfo();
  }, [])


  // const deleteUser = async (userId) => {
  //   const DocRef = doc(db, collectionRef, userId)
  //   try {
  //     await deleteDoc(DocRef)
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  const EditUser = async (info) => {
    const DocRef = doc(db, 'info', "1xCzo2rAFRNCaypmhPq6")
    try {
      await setDoc(DocRef, {
        mainInfo :{
          fullName: info.mainInfo.fullName,
          position: info.mainInfo.position,
          about: info.mainInfo.about
        },
      skills: info.skills,
      workExperience : info.workExperience,
      contact:info.contact,
      education: {
          title1: info.education.title1,
          mainText : info.education.mainText,
          title2: info.education.title2,
          mainText2: info.education.mainText2,
      },
      image: info.image,
      })
    }
    catch (e) {
      console.log(e);
    }
  }

   const handleUpload = (e)=>{
      const StorageRef = ref(storage,`/images/${e.target.files[0].name}`)
      const  uploadData = uploadBytesResumable(StorageRef, e.target.files[0])
      uploadData.on("state_changed",(snapshot)=>{
        const PROG = ((snapshot.bytesTransferred/snapshot.totalBytes)*100)
        console.log(PROG);
      },(err)=> console.log(err),()=>{
        getDownloadURL(uploadData.snapshot.ref)
        .then(url => {
          setEditValues({
              ...editValue,
              image: url,
              imageName: e.target.files[0].name
          })
      })
})

}


  const handleEditMode = ()=>{
    setEdit((prev)=>!prev)
    EditUser(editValue)
  }
  const handleSave = () => {
    addInfo();
    if(add === false){
      setLoad(prev=>!prev) 
    }
  }
  const handleInputChange = (obj, key, value) => {
    if(obj === 'mainInfo'){
      setEditValues({
        ...editValue,
          mainInfo: {
            ...editValue.mainInfo,
            [key]:value
          }
    })
    }
    if(obj === 'education'){
      setEditValues({
        ...editValue,
          education: {
            ...editValue.education,
            [key]:value
          }
    })
    }
    
    console.log(editValue);
    
};
  const handleEditValue = (key,value)=>{
    setValue({
      [key]:value,
    })
    setTitle(false)
    console.log(editNewValue);
    // if(key === 'skill'){
    //   setEditValues({
    //     ...editValue,
    //       skills:[],
    // })
    // }
    if(key === 'contact'){
      setEditValues({
        ...editValue,
          contact: [],
    })
    }
    if(key === 'workExperience'){
      setEditValues({
        ...editValue,
          workExperience: [],
    })
    }
    console.log(editValue);
   
  } 

  const handlePush =(key)=>{
    setValue({
      skill:'',
      contact: '',
      workExperience: ''
    })
    if(key === 'skill'){
      editValue.skills.push(editNewValue.skill)
    }
    if(key === 'contact'){
      editValue.contact.push(editNewValue.contact)
    }
    if(key === 'work'){
    editValue.workExperience.push(editNewValue.workExperience)
    }
    
    console.log('edit value', editValue);
  }

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <>
    <div className="group_button">
    <Button disabled={load} onClick={handleSave} variant="contained" color="warning"> Load</Button>
      <Switch onClick={handleEditMode} {...label} color="warning" />
      <label htmlFor="">Edit mode</label>
    </div>
      {!  editMode ?
      <div className="globalBlock">
        <div className="Cv">
          <img className="img_av" src={user[0]?.image} alt="#" />
          <div className="headerCv">
            <div className="title_Haeder">
              <p className="p1">{user[0]?.mainInfo.fullName}</p>
              <p className="p2">{user[0]?.mainInfo.position}</p>
              <div className="about_text">
                <p className="p2">ABOUT ME</p>
                <p className="p3">{user[0]?.mainInfo.about}</p>
              </div>
            </div>
          </div>
          <div className="main_Cv">
            <div className="skills">
              <p className="s2">Skills</p>
              {user[0]?.skills.map((el, index) => <li className="list" key={index + el}>{el}</li>)}
            </div>
            <div className="experience">
              <p className="s2">WORK EXPERIENCE</p>
              {user[0]?.workExperience.map((el, index) => <li className="list" key={(index + el)}>{el}</li>)}
            </div>
            <div className="contact">
              <p className="s2" >CONTACT INFORMATION</p>
              {user[0]?.contact.map((el, index) => <li className="list" key={el + index}>{el}</li>)}
            </div>
            <div className="education">
              <p className="s2">EDUCATION</p>
              <div className="univ_bl">
                <div className="univ">
                  {title ? <p className="s1">{user[0]?.education["title1"]}</p> 
                  :
                  <><p className="s1">{user[0]?.education["title1"][0]}</p>
                  <p>{user[0]?.education["title1"][1]}</p></>
                  }
                  <p className="text_o">{user[0]?.education["mainText"]}</p>
                </div>
                <div className="course">
                {title ? <p className="s1">{user[0]?.education["title2"]}</p> 
                  :
                  <><p className="s1">{user[0]?.education["title2"][0]}</p>
                  <p>{user[0]?.education["title2"][1]}</p></>
                  }
                  <p className="text_o" >{user[0]?.education["mainText2"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      :
      <>
        <div className="globalBlock">
        <div className="Cv">
          <img className="img_av" src={user[0]?.image} alt="#" />
          <div className="headerCv">
          
            <div className="title_Haeder">
              {/* <p className="p1">{user[0]?.mainInfo.fullName}</p> */}
              <TextField 
              color ="warning"
              className="input_text"
              id="standard-basic"
              value={editValue?.mainInfo.fullName}
              variant="standard"
              onChange={(e)=>handleInputChange('mainInfo','fullName', e.target.value)}
               />
              {/* <p className="p2">{user[0]?.mainInfo.position}</p> */}
              <TextField  
              color ="warning" 
              value={editValue?.mainInfo.position}
              id="standard-basic" 
              variant="standard"
              onChange={(e)=>handleInputChange('mainInfo',"position", e.target.value)} 
              />
              <div className="about_text">
                <p className="p2">ABOUT ME</p>
                {/* <p className="p3">{user[0]?.mainInfo.about}</p> */}
                    <TextField
                      className="area"
                      id="standard-textarea"
                      value={editValue?.mainInfo.about}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('mainInfo',"about", e.target.value)}
                    />
              </div>
             
            </div>
            
          </div>
          <IconButton onChange={handleUpload} color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
          <div className="main_Cv">
            <div className="skills">
              <p className="s2">Skills</p>
           <li className="list_edit">
            <TextField
                      className="area"
                      id="standard-textarea"
                      value={editNewValue.skill}
                      // label="Skill"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleEditValue('skill', e.target.value)} 
              /> 
              <Button className="list_btn" onClick={()=>handlePush('skill')} variant="contained" color="warning"> Add</Button>
               </li> 
            </div>
            <div className="experience">
              <p className="s2">WORK EXPERIENCE</p>
              <li className="list_edit">
            <TextField
                      className="area"
                      id="standard-textarea"
                      value={editNewValue.workExperience}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleEditValue('workExperience', e.target.value)} 
              /> 
              <Button className="list_btn"  onClick={()=>handlePush("work")} variant="contained" color="warning"> Add</Button>
               </li> 
            </div>
            <div className="contact">
              <p className="s2" >CONTACT INFORMATION</p>
              <li className="list_edit">
            <TextField
                      className="area"
                      id="standard-textarea"
                      value={editNewValue.contact}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleEditValue('contact', e.target.value)} 
              /> 
              <Button className="list_btn" onClick={()=>handlePush('contact')} variant="contained" color="warning"> Add</Button>
               </li> 
            </div>
            <div className="education">
              <p className="s2">EDUCATION</p>
              <div className="univ_bl">
                <div className="univ">
                <TextField
                      className="area"
                      id="standard-textarea"
                      value={editValue.education['title1']}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','title1', e.target.value)}
                    />

                  <TextField
                      className="area"
                      id="standard-textarea"
                      value={editValue.education['mainText']}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','mainText', e.target.value)}
                    />

                </div>
                <div className="course">
               <TextField
                      className="area"
                      id="standard-textarea"
                      value={editValue.education['title2']}
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','title2', e.target.value)}
                    />

                  <TextField
                      className="area"
                      id="standard-textarea"
                      color ="warning"
                      value={editValue.education['mainText2']}
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','mainText2', e.target.value)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </>}
    </>
  )
}

export default Admin