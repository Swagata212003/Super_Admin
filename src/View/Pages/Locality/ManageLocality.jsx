import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HomeService from "../../../Services/HomeService";
import HttpClientXml from "../../../utils/HttpClientXml";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://43.205.231.210:8157/api/v1/admin/";

const ManageLocality = () => {
    const [cities, setCities] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [formData, setFormData] = useState({ city: "", locality: "" });

    // Fetch cities 
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
        }
    };
    
    
    
    

    // Fetch localities based on selected city
    const fetchLocalities = async (cityId) => {
        try {
            const response = await HomeService.getLocalities(cityId); // ✅ Use HomeService
            console.log("Localities API Response:", response);
    
            if (response?.data && Array.isArray(response.data)) {
                setLocalities(response.data);
            } else {
                console.error("Invalid locality data format:", response);
                setLocalities([]);
            }
        } catch (error) {
            console.error("Error fetching localities:", error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "city") fetchLocalities(value);
    };

    useEffect(() => {
        fetchCities();
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
                            <label>City<span className="text-danger">*</span></label>
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
                                {localities.map((loc) => (
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











