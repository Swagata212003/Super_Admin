
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HomeService from "../../../Services/HomeService";
import { useNavigate } from "react-router-dom";

const ManageLocality = () => {
    const [cities, setCities] = useState([]); 
    const [localities, setLocalities] = useState([]); 
    const [filteredLocalities, setFilteredLocalities] = useState([]); 
    const [formData, setFormData] = useState({ city: "", locality: "" });

    
    const fetchCities = async () => {
        try {
            const response = await HomeService.getCities();
            console.log("Cities API Response:", response);

            if (response?.data && Array.isArray(response.data)) {
                setCities(response.data);
            } else {
                console.error("Invalid city data format:", response);
                setCities([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            toast.error("Failed to load cities.");
        }
    };

 
    const fetchLocalities = async () => {
        try {
            const response = await HomeService.getLocalities(); 
            console.log("Localities API Response:", response);

            if (response?.data && Array.isArray(response.data)) {
                setLocalities(response.data);
            } else {
                console.error("Invalid locality data format:", response);
                setLocalities([]);
            }
        } catch (error) {
            console.error("Error fetching localities:", error);
            toast.error("Failed to load localities.");
        }
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "city") {
            console.log("Filtering localities for city:", value);
            const filtered = localities.filter(loc => loc.city._id === value);
            setFilteredLocalities(filtered);
        }
    };


    useEffect(() => {
        fetchCities();
        fetchLocalities();
    }, []);

    return (
        <div className="main_wrap" style={{ marginTop: "6rem" }}>
            <div className="container-fluid">
                <h2 className="text-center" style={{ fontSize: "30px", color: "#868e96", fontWeight: "bold" }}>
                    Manage Locality
                </h2>
                <form>
                    <div className="row">
                       
                        <div className="col-md-6 mt-3">
                            <label>City <span className="text-danger">*</span></label>
                            <select className="form-control" name="city" value={formData.city} onChange={handleChange} required>
                                <option value="">---Select---</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city._id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                    
                        <div className="col-md-6 mt-3">
                            <label>Locality</label>
                            <select className="form-control" name="locality" value={formData.locality} onChange={handleChange}>
                                <option value="">---Select---</option>
                                {filteredLocalities.map((loc) => (
                                    <option key={loc._id} value={loc._id}>{loc.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageLocality;

