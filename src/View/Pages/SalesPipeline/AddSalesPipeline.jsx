import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HomeService from "../../../Services/HomeService";
import HttpClientXml from "../../../utils/HttpClientXml";
import { useNavigate } from "react-router-dom";

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold",
};

const AddSalesPipeline = () => {
    const [cities, setCities] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [sourceType, setSourceType] = useState([
        {
            _id: 1,
            name: "linkedin",
            display: "LinkedIn"
        },
        {
            _id: 2,
            name: "facebook",
            display: "Facebook"
        },
        {
            _id: 3,
            name: "google_ad",
            display: "Google Adsense"
        },
        {
            _id: 4,
            name: "instagram",
            display: "Instagram"
        },
        {
            _id: 5,
            name: "seo",
            display: "SEO"
        },
        {
            _id: 6,
            name: "reference",
            display: "Reference"
        },
        {
            _id: 6,
            name: "out_reach",
            display: "Out Reach"
        }
    ]);


    const [logo, setLogo] = useState("");
    const [image, setImage] = useState("");

    const [uploading, setUploading] = useState(false)

    const userRole = localStorage.getItem("role");
    const userCity = localStorage.getItem("city");
    const loggedUserID = localStorage.getItem("uid");

    const initialFormData = {
        city: userCity || "",
        name: "",
        companyName: "",
        email: "",
        contact: "",
        address: "",
        leadType: "",
    }
    const [formData, setFormData] = useState(initialFormData)

    const navigate = useNavigate();


    // Fetch cities
    // const fetchCities = async () => {
    //     try {
    //         const res = await HomeService.getCities();
    //         if (res?.data) {
    //             setCities(res.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching cities:", error);
    //     }
    // }

    // const fetchCities = async () => {
    //     try {
    //         // Fetch from API
    //         const res = await HomeService.getCities();
    //         const apiCities = res?.data || [];
    
    //         // Fetch from localStorage
    //         const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    
    //         // Merge both sources
    //         const combinedCities = [...apiCities, ...storedCities];
    
    //         setCities(combinedCities);
    //     } catch (error) {
    //         console.error("Error fetching cities:", error);
    //     }
    // };
    

    const fetchCities = async () => {
        try {
            const res = await HomeService.getCities();
            const apiCities = res?.data || [];
            const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    
            // Ensure uniqueness by using a Map (prevents duplicate IDs)
            const combinedCities = [
                ...new Map([...apiCities, ...storedCities].map(city => [city.id || city._id, city])).values()
            ];
            
            setCities(combinedCities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }; 
    

    // Fetch Designations
    const fetchDesignations = async () => {
        try {
            const res = await HomeService.getDesignations();
            if (res?.data) {
                setDesignations(res.data);
            }
        } catch (error) {
            console.error("Error fetching designations:", error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault()

        let name = e.target.name
        let value = e.target.value

        if (name === "phoneNo" || name === "salary") { value = parseInt(value) }

        setFormData({ ...formData, [name]: value })
    }

    const handleFileUpload = async (e) => {
        setUploading(true)
        const file = e.target.files[0];
        const data = new FormData();
        data.append("image", file);

        try {
            const res = await HttpClientXml.fileUplode("image-upload", "POST", data);
            if (res?.image) {
                setFormData({ ...formData, [e.target.name]: res.image })
                setUploading(false)
            }
        } catch (error) {
            toast.error(`Upload Failed.`);
            console.error(`Error uploading:`, error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("YTR134", formData);
        // return

        try {
            const res = await HomeService.addSalesPipeline(formData);
            if (res?.status) {
                toast.success("Client added successfully!");
                setFormData(initialFormData)
                navigate("/manage-sales-pipeline");
            }
        } catch (error) {
            toast.error("Failed to add staff.");
            console.error("Error adding staff:", error);
        }
    };

    useEffect(() => {
        fetchCities();
        fetchDesignations();
    }, []);

    return (
        <div className="main_wrap" style={{ marginTop: "6rem" }}>
            <div className="container-fluid">
                <div className="mt-5">
                    <h2 className="text-center" style={headLineStyle}>
                        Add Lead
                    </h2>

                    <section className="chartBox_area">
                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                <div className="col-md-6 mt-3">
                                    <label>
                                        City<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-control"
                                        name="city"
                                        value={formData?.city || ""}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="" disabled>---Select---</option>
                                        {cities.map((city) => (
                                            <option key={city._id} value={city._id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label>
                                        Lead Type
                                    </label>
                                    <select
                                        className="form-control"
                                        name="leadType"
                                        value={formData?.leadType || ""}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    >
                                        <option value="" disabled>---Select---</option>
                                        {sourceType.map((item, index) => (
                                            <option key={index} value={item.name}>
                                                {item.display}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mt-3"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <label>
                                        Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData?.name}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <div className="col-md-6 mt-3"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <label>
                                        Company Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="companyName"
                                        value={formData?.companyName}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter Company Name"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label>
                                        Email Address<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData?.email || ""}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter Email address"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label>
                                        Contact Number<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contact"
                                        value={formData?.contact || ""}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter contact number"
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mt-3">
                                    <label>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData?.address || ""}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter address"
                                    />
                                </div>
                            </div>
                            <button style={{
                                background: 'rgb(133, 218, 79)',
                                borderRadius: '13px'
                            }} type="submit" className="btn mt-3">
                                Submit
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AddSalesPipeline;







// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import HomeService from "../../../Services/HomeService";
// import HttpClientXml from "../../../utils/HttpClientXml";
// import { useNavigate } from "react-router-dom";

// const AddSalesPipeline = () => {
//     const [cities, setCities] = useState([]);
//     const [localities, setLocalities] = useState([]); // New state for localities
//     const [selectedCity, setSelectedCity] = useState("");
    
//     const initialFormData = {
//         city: "",
//         locality: "",
//         name: "",
//         companyName: "",
//         email: "",
//         contact: "",
//         address: "",
//         leadType: "",
//     };
    
//     const [formData, setFormData] = useState(initialFormData);
//     const navigate = useNavigate();

//     // Fetch cities
//     const fetchCities = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/cities");
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
    
//             const data = await response.json();
//             console.log("API Response:", data);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     };
    

//     // Fetch localities based on selected city
//     const fetchLocalities = async (cityId) => {
//         try {
//             const res = await HomeService.getLocalities(cityId); // API call
//             if (res?.data) {
//                 setLocalities(res.data);
//             } else {
//                 setLocalities([]); // Clear if no localities found
//             }
//         } catch (error) {
//             console.error("Error fetching localities:", error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         // If city is selected, fetch its localities
//         if (name === "city") {
//             setSelectedCity(value);
//             fetchLocalities(value);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await HomeService.addSalesPipeline(formData);
//             if (res?.status) {
//                 toast.success("Client added successfully!");
//                 setFormData(initialFormData);
//                 navigate("/manage-sales-pipeline");
//             }
//         } catch (error) {
//             toast.error("Failed to add client.");
//             console.error("Error:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCities();
//     }, []);

//     return (
//         <div className="main_wrap" style={{ marginTop: "6rem" }}>
//             <div className="container-fluid">
//                 <h2 className="text-center" style={{ fontSize: "30px", color: "#868e96", fontWeight: "bold" }}>
//                     Add Lead
//                 </h2>

//                 <form onSubmit={handleSubmit}>
//                     <div className="row">
                        
//                         {/* City Dropdown */}
//                         <div className="col-md-6 mt-3">
//                             <label>City<span className="text-danger">*</span></label>
//                             <select className="form-control" name="city" value={formData.city} onChange={handleChange} required>
//                                 <option value="">---Select---</option>
//                                 {cities.map((city) => (
//                                     <option key={city._id} value={city._id}>
//                                         {city.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Locality Dropdown (Changes Based on City) */}
//                         <div className="col-md-6 mt-3">
//                             <label>Locality</label>
//                             <select className="form-control" name="locality" value={formData.locality} onChange={handleChange}>
//                                 <option value="">---Select---</option>
//                                 {localities.map((loc) => (
//                                     <option key={loc._id} value={loc._id}>
//                                         {loc.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Other Fields */}
//                         <div className="col-md-6 mt-3">
//                             <label>Name<span className="text-danger">*</span></label>
//                             <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
//                         </div>

//                         <div className="col-md-6 mt-3">
//                             <label>Company Name<span className="text-danger">*</span></label>
//                             <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} required />
//                         </div>

//                         <div className="col-md-6 mt-3">
//                             <label>Email<span className="text-danger">*</span></label>
//                             <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
//                         </div>

//                         <div className="col-md-6 mt-3">
//                             <label>Contact<span className="text-danger">*</span></label>
//                             <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required />
//                         </div>

//                         <div className="col-md-12 mt-3">
//                             <label>Address</label>
//                             <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
//                         </div>
//                     </div>

//                     <button style={{ background: 'rgb(133, 218, 79)', borderRadius: '13px' }} type="submit" className="btn mt-3">
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSalesPipeline;

