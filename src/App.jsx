import React, { useEffect, useRef, useState } from "react";

const App = () => {


  const [obj, setObj] = useState({});
  const [list, setList] = useState([]);
  const [hobby,setHobby] = useState([]);
  const [editIdx,setEditIdx] = useState(-1)
  const btn = useRef();
  const userIp = useRef();
  const fileIp =useRef()
  
  useEffect(() => {
    const oldData = JSON.parse(sessionStorage.getItem("user")) || [];
    setList(oldData)
  }, []);
  

  const handleChange = (e)=>{
    let {name,value,checked,files} = e.target;

    let data = {...obj,[name]:value}
    setObj(data)

    if(name === "hobby"){
      let newHobby = [...hobby];
      if(checked){
        newHobby.push(value)
      }
      else{
        newHobby = newHobby.filter((item)=>item != value)
      }
      setHobby(newHobby)
      setObj({...obj,hobby : newHobby})
    }

    if(files){
      let file = files[0]
      let reader = new FileReader();
      reader.onloadend = ()=>{
        let fileData = {
          name : file.name,
          type : file.type,
          url : reader.result
        }
        setObj({...obj,fileData : fileData})
      }
      reader.readAsDataURL(file)
    }

  }

  const handleSubmit =(e)=>{
    e.preventDefault()

    if(editIdx == -1){
      let data = [...list,{...obj,id : Date.now()}]
      setList(data)
      sessionStorage.setItem("user",JSON.stringify(data))
    }
    else{
      let data = list.map((item)=>{
        if(item.id == editIdx){
           return { ...obj, id: editIdx }; 
        }
        return item;
      })
      setList(data);
      setEditIdx(-1)
      sessionStorage.setItem("user",JSON.stringify(data))
      btn.current.classList.remove("btn-success")
      btn.current.innerText = "Submit";
      btn.current.classList.add("btn-primary")
    }
    setObj({});
    setHobby([])
    fileIp.current.value = ""
    userIp.current.focus()
    
  }

  const handleDelete =(id)=>{
    let data = list.filter((item)=>item.id != id)
    setList(data);
    sessionStorage.setItem("user",JSON.stringify(data))
  }

  const handleEdit = (id)=>{
    let data = list.filter((item)=>item.id==id)[0];
    setObj(data)
    setHobby(data.hobby)
    setEditIdx(id)
    btn.current.classList.remove("btn-primary")
    btn.current.classList.add("btn-success")
    btn.current.innerText = "Update";
    userIp.current.focus()
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form method="post" onSubmit={handleSubmit}>
              <h1 className="text-center fw-bold mt-3">Personal Detail</h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
                  Full Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={obj.username || ""}
                  onChange={handleChange}
                  ref={userIp}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={obj.email || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Radio-button */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold me-3">
                  Gender :
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={obj.gender == "Male"}
                    id="male"
                  />
                  <label className="form-check-label" htmlFor="radioDefault1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={obj.gender == "Female"}
                    id="female"
                  />
                  <label className="form-check-label" htmlFor="radioDefault2">
                    Female
                  </label>
                </div>
              </div>

              {/* Check-box */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold me-3">
                  Hobbys :
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    value="Cricket"
                    onChange={handleChange}
                    checked={hobby.includes("Cricket")? true : false}
                    id="checkDefault"
                  />
                  <label className="form-check-label" htmlFor="checkDefault">
                    Cricket
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    value="Volleyball"
                    onChange={handleChange}
                    checked={hobby.includes("Volleyball")? true : false}
                    id="checkChecked"
                  />
                  <label className="form-check-label" htmlFor="checkChecked">
                    Volleyball
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobby"
                    value="FootBall"
                    onChange={handleChange}
                    checked={hobby.includes("FootBall")? true : false}
                    id="checkChecked"
                  />
                  <label className="form-check-label" htmlFor="checkChecked">
                    FootBall
                  </label>
                </div>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">
                  Address :
                </label>
                <textarea 
                name="address"
                value={obj.address || ""}
                onChange={handleChange} 
                id="address" 
                className="w-100 p-3"
                placeholder="Enter your address"></textarea>
              </div>
              {/* Profile-image */}
              <div className="mb-3">
                  <input type="file" className='form-control' onChange={handleChange} ref={fileIp}/>
                </div>
                {/* Submit Button */}
              <button type="submit" className="btn btn-primary" ref={btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-11 mx-auto">
            <table className="table table-striped table-bordered caption-top">
              <caption>
                <h2>Details : </h2>
              </caption>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Profile</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Hobbys</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map((val,idx)=>(
                      <tr key={val.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <img
                          className='rounded-circle' 
                          src={val.fileData ? val.fileData.url : ""} 
                          alt={val.fileData ? val.fileData.name : ""} 
                          style={{width : "70px"}}/>
                        </td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.gender}</td>
                        <td>{val.hobby ? val.hobby.toString() : []}</td>
                        <td>{val.address}</td>
                        <td>
                          <button className="btn btn-warning me-2" onClick={()=>handleEdit(val.id)}>Edit</button>
                          <button className="btn btn-danger" onClick={()=>handleDelete(val.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
