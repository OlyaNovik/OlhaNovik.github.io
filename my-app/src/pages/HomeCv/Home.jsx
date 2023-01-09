import "./HomeCv.scss"
import db, { storage } from "../../Firebase"
import {useDispatch, useSelector} from "react-redux";
import {addDoc,collection, onSnapshot, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {InfoAction} from '../../Redux/Action/Action'
import {InfoUser} from '../Admin/InfoUser'

const Home = () => {


  const dispatch = useDispatch()
  const user = useSelector((state)=>state.info.infoUser)
  const collectionRef = collection(db, 'info')
  const [infoValue, setInfoValue] = useState(InfoUser)

  const addInfo = async () => {
    try {
      const docRef = await addDoc(collectionRef, infoValue)
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
    addInfo();
  }, [])

  return (
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

  )
};

export default Home;