import "../HomeCv/HomeCv.scss"
import Cv_photo from "../../Image/Cv_photo.jpg"
import db, { storage } from "../../Firebase"
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState } from "react";
import { async } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Admin = () => {
   const skills = ['Confident knowledge of HTML5, CSS3/SASS, experience in  adaptive and cross-browser layout',
        'Knowledge of Javascript and ES6+',
        'Understanding and ability to work with Bootstrap',
        'Knowledge of React',
        'Understanding Redux',
        'English language skills: pre-intermediate(in progress)']
        const contact = ['Phone number: +38 (097) 103 32 17','Email: olyaanovikk@gmail.com','LinkedIn: https://www.linkedin.com/in/olha-novik-1b3b33248']
     
const [user, setUser] = useState([])
  const collectionRef = collection(db, 'info')



  const addInfo = async () => {
    try {
      const docRef = await addDoc(collectionRef, {})
    }
    catch (e) {
      console.log(e);
    }
  }
  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) => {
      setUser(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }
  const deleteUser = async (userId) => {
    const DocRef = doc(db, collectionRef, userId)
    try {
      await deleteDoc(DocRef)
    }
    catch (e) {
      console.log(e);
    }
  }
         
  const EditUser = async (userId) => {
    const DocRef = doc(db, collectionRef, userId)
    try {
      await setDoc(DocRef, )
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
        .then(url=> console.log(url))
      })
    
    }

        return (
          <div className="globalBlock">

          <input type="file" onChange={handleUpload} />
            {/* <div className="Cv">
              <img className="img_av" src={Cv_photo} alt="#" />
              <div className="headerCv">
                <div className="title_Haeder">
                  <p className="p1">NOVIK OLHA</p>
                  <p className="p2">FRONTEND DEVELOPER</p>
                  <div className="about_text">
                    <p className="p2">ABOUT ME</p>
                    <p className="p3">I'm an enthusiastic and detail-oriented Frontend Developer seeking an entry-level position with Company to use my skills in coding. Ready for any challenges and difficulties.</p>
                  </div>
                </div>
              </div>
              <div className="main_Cv">
                <div className="skills">
                  <p className="s2">Skills</p>
                  {skills.map((el,index)=> <li className="list" key={index+el}>{el}</li>)}
                </div>
                <div className="experience">
                  <p className="s2">WORK EXPERIENCE</p>
                  <li>6-month FrontEnd course in It Logos Academy</li>
                </div>
                <div className="contact">
                   <p className="s2" >CONTACT INFORMATION</p>
                   {contact.map((el,index)=> <li className="list" key={el+index}>{el}</li>)}
                </div>
                <div className="education">
                  <p className="s2">EDUCATION</p>
                  <div className="univ_bl">
                  <div className="univ">
                    <p className="s1">LVIV IVAN FRANKO NATIONAL UNIVERSITY</p>
                    <p>CURRENT EDUCATIONAL ESTABLISHMENT</p>
                    <p className="text_o">Faculty of Electronics and Computer Sciences. Specialization Computer science.</p>
                  </div>
                  <div className="course">
                    <p className="s1" >LOGOS IT ACADEMY</p>
                    <p className="s1" >PRACTICAL COURSE OF WEB DEVELOPMENT</p>
                    <p className="text_o" >6-month web development course, namely Front-end Developer.</p>
                  </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
      
    )
}

export default Admin