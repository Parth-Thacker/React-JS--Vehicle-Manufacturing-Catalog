import React, { useEffect, useState } from "react";
//import 'bootstrap/dist/css/bootstrap.css'
import "./catalog.css"
const Catalog = () => {
    const [Data,setData] = useState(null)
    const [name,setName] = useState('')
    const [type,setType] = useState(null)
    
    useEffect(()=>{
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?&format=json`).then((res)=>{
            return res.json()
        }).then((data)=>{
            let result = data
            //console.log(data.Results);
            setData(result.Results)
            //console.log((Data))
            
        }).catch((err)=>{
                console.log(err);
        })
    },[Data,type])
    const HanleInput=(e)=>{
        e.preventDefault()
        setName(e.target.value)
        //console.log(name);
        const resultData = Data.filter((data)=>
        data.Name.toLowerCase().includes(name.toLowerCase())
        )
        //console.log(resultData);
        setData(resultData)
        return
        //console.log(Data);
    }
   
  return (
    <>
      <div className="container">
      <h1>Vehical Manufacturers</h1>
        <div className="headingContainer">
          <div>
            <label class="form-label">Search CarName: </label>
            <input type="text" onChange={HanleInput} value={name}/>
          </div>
         <div>
         <div className="input-group">
          <label class="form-label">Filter By Type: </label>
            <select className="custom-select" id="inputGroupSelect04">
              <option >ALL...</option>
              <option value="Motorcycle" onClick={(e)=>{setType(e.target.value)}}>Motorcycle</option>
              <option value="Passenger Car" onClick={(e)=>{setType(e.target.value)}}>Passenger Car</option>
              <option value="Trailer" onClick={(e)=>{setType(e.target.value)}}>Trailer</option>
            </select>
          </div>
         </div>
        </div>
        <div className="content">
        <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Country</th>
      <th scope="col">Type</th>
    </tr>
  </thead>
  <tbody>
    {Data && Data.map((detail,i)=>{
        return(
            <tr key={i}>
                <td>{detail.Name}</td>
                <td>{detail.Country}</td>
                <td>{detail.VehicleType}</td>
            </tr>
        )
    })}
  </tbody>
        </table>
        

        </div>
      </div>
    </>
  );
};

export default Catalog;
