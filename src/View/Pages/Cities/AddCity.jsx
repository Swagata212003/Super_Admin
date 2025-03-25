
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeService from "../../../Services/HomeService";

const CityManager = () => {
    const [cityName, setCityName] = useState("");
    const [cityImage, setCityImage] = useState(null);
    const [cities, setCities] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedCity, setEditedCity] = useState({ name: "", image: "" });

    const fetchCities = async () => {
        try {
            const res = await HomeService.getCities();
            const apiCities = res?.data || [];
            const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
            const combinedCities = [...new Map([...apiCities, ...storedCities].map(city => [city._id || city.id, city])).values()];
            setCities(combinedCities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleNameChange = (e) => setCityName(e.target.value);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setCityImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cityName || !cityImage) {
            alert("Please enter a city name and upload an image.");
            return;
        }

        const existingCityIndex = cities.findIndex(city => city.name.toLowerCase() === cityName.toLowerCase());
        if (existingCityIndex !== -1) {
            Swal.fire("Duplicate!", "This city already exists!", "warning");
            return;
        }

        const newCity = { id: Date.now(), name: cityName, image: cityImage };
        const updatedCities = [...cities, newCity];

        localStorage.setItem("cities", JSON.stringify(updatedCities));
        setCities(updatedCities);
        setCityName("");
        setCityImage(null);
        document.getElementById("imageInput").value = "";
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCities = cities.filter((_, i) => i !== index);
                setCities(updatedCities);
                localStorage.setItem("cities", JSON.stringify(updatedCities));
                Swal.fire("Deleted!", "The city has been removed.", "success");
            }
        });
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditedCity(cities[index]);
    };

    const handleEditChange = (e) => {
        setEditedCity({ ...editedCity, name: e.target.value });
    };

    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setEditedCity({ ...editedCity, image: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEdit = () => {
        if (!editedCity.name || !editedCity.image) {
            Swal.fire("Error", "City name and image cannot be empty!", "error");
            return;
        }

        const updatedCities = [...cities];
        updatedCities[editingIndex] = editedCity;
        setCities(updatedCities);
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedCity({ name: "", image: "" });
    };

    const columns = [
        { name: "ID", selector: (_, index) => index + 1, sortable: true },
        {
            name: "City Name",
            cell: (row, index) =>
                editingIndex === index ? (
                    <input type="text" value={editedCity.name} onChange={handleEditChange} className="form-control form-control-sm" />
                ) : (
                    row.name
                ),
            sortable: true,
        },
        {
            name: "Image",
            cell: (row, index) =>
                editingIndex === index ? (
                    <>
                        <input type="file" accept="image/*" onChange={handleEditImageUpload} className="form-control form-control-sm mb-2" />
                        <img src={editedCity.image} alt="Preview" className="img-thumbnail" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                    </>
                ) : (
                    <img src={row.image} alt={row.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                ),
        },
        {
            name: "Action",
            cell: (_, index) =>
                editingIndex === index ? (
                    <>
                        <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>
                            ✅ Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                            ❌ Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(index)}>
                            ✏️ Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                            🗑️ Delete
                        </button>
                    </>
                ),
        },
    ];

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 mb-5">
                <h2 className="text-center mb-4">Add a City</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control rounded-pill px-3" placeholder="Enter city name" value={cityName} onChange={handleNameChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="file" id="imageInput" className="form-control rounded-pill px-3" accept="image/*" onChange={handleImageUpload} required />
                    </div>
                    {cityImage && (
                        <div className="text-center mb-3">
                            <img src={cityImage} alt="Preview" className="img-thumbnail" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100 rounded-pill">➕ Add City</button>
                </form>
            </div>
            <h3 className="text-center mt-5">Manage Cities</h3>
            {cities.length === 0 ? (
                <p className="text-center text-muted">No cities added yet.</p>
            ) : (
                <DataTable columns={columns} data={cities} pagination />
            )}
        </div>
    );
};

export default CityManager;








