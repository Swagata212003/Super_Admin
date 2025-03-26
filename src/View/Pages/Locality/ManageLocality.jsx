

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HomeService from "../../../Services/HomeService";

const ManageLocality = () => {
    const [cities, setCities] = useState([]); 
    const [localities, setLocalities] = useState([]); 
    const [filteredLocalities, setFilteredLocalities] = useState([]); 
    const [apartments, setApartments] = useState([]); 
    const [filteredApartments, setFilteredApartments] = useState([]); 
    const [formData, setFormData] = useState({ city: "", locality: "", aptName: "" });

    const fetchCities = async () => {
        try {
            const response = await HomeService.getCities();
            setCities(response?.data || []);
        } catch (error) {
            console.error("Error fetching cities:", error);
            toast.error("Failed to load cities.");
        }
    };

    const fetchLocalities = async () => {
        try {
            const response = await HomeService.getLocalities(); 
            setLocalities(response?.data || []);
        } catch (error) {
            console.error("Error fetching localities:", error);
            toast.error("Failed to load localities.");
        }
    };

    const fetchApartments = async () => {
        try {
            const response = await HomeService.getApartments(); 
            setApartments(response?.data || []);
        } catch (error) {
            console.error("Error fetching apartments:", error);
            toast.error("Failed to load apartments.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "city") {
            const filteredLocs = localities.filter(loc => loc.city._id === value);
            setFilteredLocalities(filteredLocs);
            setFilteredApartments([]);
            setFormData((prev) => ({ ...prev, locality: "", aptName: "" }));
        }

        if (name === "locality") {
            const filteredApts = apartments.filter(apartment => apartment.locality._id === value);
            setFilteredApartments(filteredApts);
            setFormData((prev) => ({ ...prev, aptName: "" }));
        }
    };

    const handleAddApartment = async () => {
        if (!formData.city || !formData.locality || !formData.aptName) {
            toast.error("Please fill in all fields.");
            return;
        }
    
        const cityObj = cities.find(city => city._id === formData.city);
        const localityObj = localities.find(loc => loc._id === formData.locality);
    
        if (!cityObj || !localityObj) {
            toast.error("Invalid city or locality selection.");
            return;
        }
    
        const newApartment = {
            city: formData.city, 
            locality: formData.locality, 
            aptName: formData.aptName
        };
    
        try {
            await HomeService.addApartment(newApartment);  
            toast.success("Apartment added successfully!");
            setFormData({ city: formData.city, locality: formData.locality, aptName: "" }); 
            fetchApartments(); 
        } catch (error) {
            console.error("Error adding apartment:", error);
            toast.error("Failed to add apartment.");
        }
    };
    

    useEffect(() => {
        fetchCities();
        fetchLocalities();
        fetchApartments();
    }, []);

    return (
        <div className="main_wrap" style={{ marginTop: "6rem" }}>
            <div className="container-fluid">
                <h2 className="text-center" style={{ fontSize: "30px", color: "#868e96", fontWeight: "bold" }}>
                    Manage Locality & Apartments
                </h2>
                <form>
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            <label>City <span className="text-danger">*</span></label>
                            <select className="form-control" name="city" value={formData.city} onChange={handleChange} required>
                                <option value="">---Select---</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city._id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mt-3">
                            <label>Locality</label>
                            <select className="form-control" name="locality" value={formData.locality} onChange={handleChange}>
                                <option value="">---Select---</option>
                                {filteredLocalities.map((loc) => (
                                    <option key={loc._id} value={loc._id}>{loc.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mt-3">
                            <label>Apartment Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="aptName"
                                value={formData.aptName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleAddApartment}>
                            Add Apartment
                        </button>
                    </div>
                </form>
                <div className="mt-5">
                    <h3>Added Apartments</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Locality</th>
                                <th>Apartment Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apartments.map((apt, index) => (
                                <tr key={index}>
                                    <td>{apt.city.name}</td>
                                    <td>{apt.locality.name}</td>
                                    <td>{apt.aptName}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageLocality;











// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import HomeService from "../../../Services/HomeService";
// import { useNavigate } from "react-router-dom";

// const ManageLocality = () => {
//     const [cities, setCities] = useState([]); 
//     const [localities, setLocalities] = useState([]); 
//     const [filteredLocalities, setFilteredLocalities] = useState([]); 
//     const [apartments, setApartments] = useState([]); 
//     const [filteredApartments, setFilteredApartments] = useState([]); 
//     const [formData, setFormData] = useState({ city: "", locality: "", aptName: "" });

//     // Fetch cities
//     const fetchCities = async () => {
//         try {
//             const response = await HomeService.getCities();
//             if (response?.data && Array.isArray(response.data)) {
//                 setCities(response.data);
//             } else {
//                 console.error("Invalid city data format:", response);
//                 setCities([]);
//             }
//         } catch (error) {
//             console.error("Error fetching cities:", error);
//             toast.error("Failed to load cities.");
//         }
//     };

//     // Fetch localities
//     const fetchLocalities = async () => {
//         try {
//             const response = await HomeService.getLocalities(); 
//             if (response?.data && Array.isArray(response.data)) {
//                 setLocalities(response.data);
//             } else {
//                 console.error("Invalid locality data format:", response);
//                 setLocalities([]);
//             }
//         } catch (error) {
//             console.error("Error fetching localities:", error);
//             toast.error("Failed to load localities.");
//         }
//     };

//     // Fetch apartments
//     const fetchApartments = async () => {
//         try {
//             const response = await HomeService.getApartments(); 
//             if (response?.data && Array.isArray(response.data)) {
//                 setApartments(response.data);
//             } else {
//                 console.error("Invalid apartment data format:", response);
//                 setApartments([]);
//             }
//         } catch (error) {
//             console.error("Error fetching apartments:", error);
//             toast.error("Failed to load apartments.");
//         }
//     };


    

//     // Handle form change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         // Filter localities based on selected city
//         if (name === "city") {
//             const filteredLocs = localities.filter(loc => loc.city._id === value);
//             setFilteredLocalities(filteredLocs);
//             setFilteredApartments([]); // Reset apartment selection
//             setFormData((prev) => ({ ...prev, locality: "", aptName: "" }));
//         }

//         // Filter apartments based on selected locality
//         if (name === "locality") {
//             const filteredApts = apartments.filter(apartment => apartment.locality._id === value);
//             setFilteredApartments(filteredApts);
//             setFormData((prev) => ({ ...prev, aptName: "" }));
//         }
//     };

//     // Fetch data on mount
//     useEffect(() => {
//         fetchCities();
//         fetchLocalities();
//         fetchApartments();
//     }, []);

//     return (
//         <div className="main_wrap" style={{ marginTop: "6rem" }}>
//             <div className="container-fluid">
//                 <h2 className="text-center" style={{ fontSize: "30px", color: "#868e96", fontWeight: "bold" }}>
//                     Manage Locality & Apartments
//                 </h2>
//                 <form>
//                     <div className="row">
//                         {/* City Dropdown */}
//                         <div className="col-md-4 mt-3">
//                             <label>City <span className="text-danger">*</span></label>
//                             <select className="form-control" name="city" value={formData.city} onChange={handleChange} required>
//                                 <option value="">---Select---</option>
//                                 {cities.map((city) => (
//                                     <option key={city._id} value={city._id}>{city.name}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Locality Dropdown */}
//                         <div className="col-md-4 mt-3">
//                             <label>Locality</label>
//                             <select className="form-control" name="locality" value={formData.locality} onChange={handleChange}>
//                                 <option value="">---Select---</option>
//                                 {filteredLocalities.map((loc) => (
//                                     <option key={loc._id} value={loc._id}>{loc.name}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Apartment Dropdown */}
//                         <div className="col-md-4 mt-3">
//                             <label>Apartment Name</label>
//                             <select className="form-control" name="aptName" value={formData.aptName} onChange={handleChange}>
//                                 <option value="">---Select---</option>
//                                 {filteredApartments.map((apt) => (
//                                     <option key={apt._id} value={apt.aptName}>{apt.aptName}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ManageLocality;











