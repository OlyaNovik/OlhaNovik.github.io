import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import "../HomeCv/HomeCv.scss"
import "./Admin.scss"

const Admin =()=>{

    const user = useSelector((state) => state.info.infoUser)
    
    useEffect (()=>{
        console.log(user);
    },[])


    return (
        <>
        <div className='group_button'>
       
            <Button variant="contained" color="warning"> Save</Button>
            </div>
        <div className="globalBlock">
            <div className="Cv">
                <img className="img_av" src={user[0]?.image} alt="#" />
                <div className="headerCv">

                    <div className="title_Haeder">
                        {/* <p className="p1">{user[0]?.mainInfo.fullName}</p> */}
                        <TextField
                            color="warning"
                            className="input_text"
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                        />
                        {/* <p className="p2">{user[0]?.mainInfo.position}</p> */}
                        <TextField
                            color="warning"
                            id="standard-basic"
                            label="Position"
                            variant="standard"
                        />
                        <div className="about_text">
                            <p className="p2">ABOUT ME</p>
                            {/* <p className="p3">{user[0]?.mainInfo.about}</p> */}
                            <TextField
                                className="area"
                                id="standard-textarea"
                                label="About me"
                                color="warning"
                                multiline
                                variant="standard"
                            />
                        </div>

                    </div>

                </div>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton>
                <div className="main_Cv">
                    <div className="skills">
                        <p className="s2">Skills</p>
                        <li className="list">
                            <TextField
                                className="area"
                                id="standard-textarea"
                                // label="Skill"
                                color="warning"
                                multiline
                                variant="standard"
                            />
                            <Button variant="contained" color="warning"> Add</Button>
                        </li>
                    </div>
                    <div className="experience">
                        <p className="s2">WORK EXPERIENCE</p>

                        {/* {user[0]?.workExperience.map((el, index) => <li className="list" key={(index + el) * 2 / 3}>{el}</li>)} */}
                    </div>
                    <div className="contact">
                        <p className="s2" >CONTACT INFORMATION</p>


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
                                    color="warning"
                                    multiline
                                    variant="standard"
                                />
                                {/* <p className="s1">{user[0]?.education["title1"][0]}</p> */}
                                {/* <p>{user[0]?.education["title1"][1]}</p> */}
                                <TextField
                                    className="area"
                                    id="standard-textarea"
                                    label="Main text"
                                    color="warning"
                                    multiline
                                    variant="standard"
                                />
                                {/* <p className="text_o">{user[0]?.education["mainText"]}</p> */}
                            </div>
                            <div className="course">
                                <TextField
                                    className="area"
                                    id="standard-textarea"
                                    label="title two"
                                    color="warning"
                                    multiline
                                    variant="standard"
                                />
                                {/* <p className="s1" >{user[0]?.education["title2"][0]}</p> */}
                                {/* <p className="s1" >{user[0]?.education["title2"][1]}</p> */}
                                <TextField
                                    className="area"
                                    id="standard-textarea"
                                    label="Main text"
                                    color="warning"
                                    multiline
                                    variant="standard"
                                />
                                {/* <p className="text_o" >{user[0]?.education["mainText2"]}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Admin;