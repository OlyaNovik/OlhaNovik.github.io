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
  const [editValue, setEditValues] = useState(InfoUser)
  const [load,setLoad] =useState(false)
  const [add, setAddInfo] =useState(true)

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

  // useEffect(() => {
  //   user?.length > 0 && console.log(user[0]);
  // }, [user])

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
    setEditValues({
        ...editValue,
          [obj]: {
            ...editValue[obj],
            [key]: value,
          },
    })
    console.log(editValue);
};


  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <>
    <div className="group_button">
    <Button disabled={load} onClick={handleSave} variant="contained" color="warning"> Load</Button>
      {/* <button >Save</button> */}
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
                  <p className="s1">{user[0]?.education["title1"][0]}</p>
                  <p>{user[0]?.education["title1"][1]}</p>
                  <p className="text_o">{user[0]?.education["mainText"]}</p>
                </div>
                <div className="course">
                  <p className="s1" >{user[0]?.education["title2"][0]}</p>
                  <p className="s1" >{user[0]?.education["title2"][1]}</p>
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
              label="Name"
              variant="standard"
              onChange={(e)=>handleInputChange('mainInfo','fullName', e.target.value)}
               />
              {/* <p className="p2">{user[0]?.mainInfo.position}</p> */}
              <TextField  
              color ="warning" 
              id="standard-basic" 
              label="Position" 
              variant="standard"
              onChange={(e)=>handleInputChange('mainInfo',"position", e.target.value)} 
              />
              <div className="about_text">
                <p className="p2">ABOUT ME</p>
                {/* <p className="p3">{user[0]?.mainInfo.about}</p> */}
                    <TextField
                      className="area"
                      id="standard-textarea"
                      label="About me"
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
            {
              user[0]?.skills.map((el, index) =>
              <li className="list" key={index*3 + el}>
                <TextField
                      className="area"
                      id="standard-textarea"
                      label="Skills"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('skills',index, e.target.value)}
                    /></li>)}
               {/* {user[{0]?.skills.map((el, index) => <li className="list" key={index + el}>{el}</li>)}  */}
            </div>
            <div className="experience">
              <p className="s2">WORK EXPERIENCE</p>
              {
              user[0]?.workExperience.map((el, index) =>
              <li className="list" key={index*7+3 + el}>
                <TextField
                      className="area"
                      id="standard-textarea"
                      label="Work"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('workExperience',index, e.target.value)}
                    /></li>)}
              {/* {user[0]?.workExperience.map((el, index) => <li className="list" key={(index + el) * 2 / 3}>{el}</li>)} */}
            </div>
            <div className="contact">
              <p className="s2" >CONTACT INFORMATION</p>
              {
              user[0]?.contact.map((el, index) =>
              <li className="list" key={index*2 + el}>
                <TextField
                      className="area"
                      id="standard-textarea"
                      label="Contact"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('contact', index, e.target.value)}
                    /></li>)}
              {/* {user[0]?.contact.map((el, index) => <li className="list" key={el + index}>{el}</li>)} */}
            </div>
            <div className="education">
              <p className="s2">EDUCATION</p>
              <div className="univ_bl">
                <div className="univ">
                <TextField
                      className="area"
                      id="standard-textarea"
                      label="title one"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','title1', e.target.value)}
                    />
                  {/* <p className="s1">{user[0]?.education["title1"][0]}</p> */}
                  {/* <p>{user[0]?.education["title1"][1]}</p> */}
                  <TextField
                      className="area"
                      id="standard-textarea"
                      label="Main text"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','mainText', e.target.value)}
                    />
                  {/* <p className="text_o">{user[0]?.education["mainText"]}</p> */}
                </div>
                <div className="course">
               <TextField
                      className="area"
                      id="standard-textarea"
                      label="title two"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','title2', e.target.value)}
                    />
                  {/* <p className="s1" >{user[0]?.education["title2"][0]}</p> */}
                  {/* <p className="s1" >{user[0]?.education["title2"][1]}</p> */}
                  <TextField
                      className="area"
                      id="standard-textarea"
                      label="Main text"
                      color ="warning"
                      multiline
                      variant="standard"
                      onChange={(e)=>handleInputChange('education','mainText2', e.target.value)}
                    />
                  {/* <p className="text_o" >{user[0]?.education["mainText2"]}</p> */}
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