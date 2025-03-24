import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import HomeService from "../../../Services/HomeService";
import HttpClientXml from "../../../utils/HttpClientXml";
import Swal from "sweetalert2";

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold",
};

const ManageSalesPipeline = () => {
    const [allData, setAllData] = useState([]);

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

    const [uploading, setUploading] = useState(false)
    const [cities, setCities] = useState([]);

    const initialFormData = {
        name: "",
        email: "",
        city: "",
        role: "",
        qualification: "",
        designation: "",
        phoneNo: 0,
        salary: 0,
        photo: "",
        // password: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    const [editID, setEditID] = useState("")
    const [selectedCityID, setSelectedCityID] = useState("")

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

    const fetchAllData = async () => {
        try {
            const response = await HomeService.getSalesPipeline();
            console.log("IUYT109", response?.data);

            const formattedData = response?.data.map((item, index) => ({
                id: item._id,
                sln: index + 1,
                city: item?.city[0]?.name,
                leadType: item?.leadType,
                name: item?.name,
                companyName: item?.companyName,
                email: item?.email,
                contact: item?.contact,
                address: item?.address,
                action: (
                    <>
                        <span title="Edit" onClick={() => handleEdit(item)}>
                            <i
                                className="fa-solid fa-pen-to-square"
                                style={{
                                    cursor: "pointer",
                                    padding: "5px",
                                    marginRight: "5px",
                                    fontSize: "1.5em",
                                    color: "rgb(133, 218, 79)",
                                    backgroundColor: "#E9F3F7",
                                }}

                            ></i>
                        </span>
                        <span title="Delete" onClick={() => handleDelete(item._id)}>
                        <i
              className="fa-solid fa-trash-can text-danger"
              style={{
                cursor: "pointer",
                padding: "5px",
                marginRight: "5px",
                fontSize: "1.5em",
                color: "#477DA5",
                backgroundColor: "#E9F3F7",
              }}
            ></i>
                        </span>
                    </>
                ),
            }));

            console.log("DSE32", formattedData);

            setAllData(formattedData || []);
        } catch (error) {
            console.error("Error fetching Staffs:", error);
        }
    };

    // Fetch cities
    const fetchCities = async () => {
        try {
            const res = await HomeService.getCities();
            if (res?.data) {
                setCities(res.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

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

    useEffect(() => {
        fetchAllData();
        fetchCities();
        fetchDesignations();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Deleting CLient...",
            text: "Are you sure you want to delete this client record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#d33",
            cancelButtonText: "No, not sure!",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            try {
                const res = await HomeService.deleteSalesPipeline(id);
                if (res?.status) {
                    Swal.fire("Deleted!", "Client record has been deleted.", "success");
                    fetchAllData();
                }
            } catch (error) {
                Swal.fire("Error!", "Failed to delete stadd record.", "error");
            }
        }
    };

    const handleEdit = (data) => {
        setEditID(data?._id || "");
        console.log("HRE218", data);

        setFormData({
            ...data,
            city: data.city[0]._id,
        })

        const editSection = document.getElementById("edit-section");
        if (editSection) {
            editSection.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
                block: "start", // Align to the top of the section
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("updated submitted data", formData);

            const res = await HomeService.updatSalesPipeline(
                editID, formData
            );
            if (res?.status) {
                fetchAllData();
                setEditID(null)
                toast.success("Client data updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to update Client.");
            console.error("Error updating Client:", error);
        }
    };



    const columns = [
        { name: "Sl#", selector: (row) => row.sln, sortable: true },
        { name: "City", selector: (row) => row.city },
        { name: "Type", selector: (row) => sourceType.find(item => item.name === row.leadType)?.display || "N/A" },
        { name: "Name", selector: (row) => row.name },
        { name: "Company Name", selector: (row) => row.companyName, wrap: true },
        { name: "Email Address", selector: (row) => row.email },
        { name: "Contact Number", selector: (row) => row.contact },
        { name: "Address", selector: (row) => row.address, wrap: true },
       
        {
            name: "Action",
            selector: (row) => row.action,
            sortable: true,
            style: { textAlign: "center" },
        },
    ];

    return (
        <div className="main_wrap" style={{ marginTop: "6rem" }}>
            <div className="container-fluid" id="edit-section">
                <div className="mt-5">
                    <h2 className="text-center" style={headLineStyle}>
                        Manage Lead
                    </h2>
                    <section className="chartBox_area">
                        {editID ? (
                            <>
                                <h3>View/Modify Lead Data</h3>
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
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-3"
                                        style={{ marginLeft: "11px" }}
                                        onClick={() => setEditID(null)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </>

                        ) :
                            <DataTable columns={columns} data={allData} pagination />
                        }
                    </section>


                </div>
            </div>
        </div>
    );
}

export default ManageSalesPipeline;














