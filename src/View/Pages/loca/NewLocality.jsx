

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const CityManager = () => {
    const [cityName, setCityName] = useState("");
    const [cityDesc, setCityDesc] = useState("");
    const [cityImage, setCityImage] = useState(null);
    const [localities, setLocalities] = useState([]);
    const [newLocality, setNewLocality] = useState({ name: "", desc: "", image: null });
    const [cities, setCities] = useState([]);

   
    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
        setCities(storedCities);
    }, []);

    
    const handleCityImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setCityImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

  
    const handleLocalityImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setNewLocality({ ...newLocality, image: reader.result });
            reader.readAsDataURL(file);
        }
    };

   
    const addLocality = () => {
        if (!newLocality.name || !newLocality.desc || !newLocality.image) {
            Swal.fire("Error!", "Please fill all fields before adding a locality.", "warning");
            return;
        }

      
        const updatedLocalities = [...localities, newLocality].sort((a, b) => a.name.localeCompare(b.name));
        setLocalities(updatedLocalities);
        setNewLocality({ name: "", desc: "", image: null });
    };


    const deleteLocality = (index) => {
        setLocalities(localities.filter((_, i) => i !== index));
    };

 
    const handleDeleteCity = (index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the city and all its localities.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCities = cities.filter((_, i) => i !== index);
                setCities(updatedCities);
                localStorage.setItem("cities", JSON.stringify(updatedCities));
                Swal.fire("Deleted!", "The city has been removed.", "success");
            }
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cityName || !cityImage || localities.length === 0 || !cityDesc) {
            Swal.fire("Error!", "Please fill all city details and add at least one locality.", "error");
            return;
        }

        const newCity = { 
            id: Date.now(), 
            cityName, 
            image: cityImage, 
            desc: cityDesc, 
            locality: localities || [] 
        };

        const updatedCities = [...cities, newCity];
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        setCities(updatedCities);

       
        setCityName("");
        setCityDesc("");
        setCityImage(null);
        setLocalities([]);
        document.getElementById("cityImageInput").value = "";
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">City & Locality Manager</h2>
            <div className="card shadow p-4 mb-5">
                <form onSubmit={handleSubmit}>
                   
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Enter city name" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" placeholder="Enter city description" value={cityDesc} onChange={(e) => setCityDesc(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="file" id="cityImageInput" className="form-control" accept="image/*" onChange={handleCityImageUpload} required />
                    </div>
                    {cityImage && <img src={cityImage} alt="City Preview" className="img-thumbnail mb-3" style={{ width: "100px", height: "100px" }} />}

                   
                    <h4>Add Localities</h4>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Locality Name" value={newLocality.name} onChange={(e) => setNewLocality({ ...newLocality, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Locality Description" value={newLocality.desc} onChange={(e) => setNewLocality({ ...newLocality, desc: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <input type="file" className="form-control" accept="image/*" onChange={handleLocalityImageUpload} />
                    </div>
                    {newLocality.image && <img src={newLocality.image} alt="Locality Preview" className="img-thumbnail mb-3" style={{ width: "100px", height: "100px" }} />}
                    <button type="button" className="btn btn-success w-100 mb-3" onClick={addLocality}>➕ Add Locality</button>

                    
                    {localities.length > 0 && (
                        <ul className="list-group mb-3">
                            {localities.map((loc, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {loc.name} - {loc.desc}
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteLocality(index)}>🗑️</button>
                                </li>
                            ))}
                        </ul>
                    )}

                   
                    <button type="submit" className="btn btn-primary w-100">🏙️ Add City</button>
                </form>
            </div>

           
            <h3 className="text-center mt-5">City List</h3>
            {cities.length === 0 ? <p className="text-center text-muted">No cities added yet.</p> : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>City Name</th>
                            <th>Description</th>
                            <th>Localities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{city.cityName}</td>
                                <td>{city.desc}</td>
                                <td>
                                    <ul>
                                        {(city.locality || []).map((loc, i) => <li key={i}>{loc.name}</li>)}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CityManager;










