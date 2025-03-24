

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const CityManager = () => {
    const [cityName, setCityName] = useState("");
    const [cityImage, setCityImage] = useState(null);
    const [cities, setCities] = useState([]);

    
    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
        setCities(storedCities);
    }, []);

   
    const handleNameChange = (e) => {
        setCityName(e.target.value);
    };

   
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCityImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cityName || !cityImage) {
            alert("Please enter a city name and upload an image.");
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

    
    const handleEdit = (index) => {
        const city = cities[index];

        Swal.fire({
            title: "Edit City",
            html: `
                <input type="text" id="city-name" class="swal2-input" placeholder="City Name" value="${city.name}">
                <input type="file" id="city-image" class="swal2-file">
                <img id="preview-image" src="${city.image}" alt="Preview" style="width: 100px; height: 100px; display: block; margin: 10px auto;">
            `,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
                const cityName = document.getElementById("city-name").value;
                const imageInput = document.getElementById("city-image").files[0];

                return new Promise((resolve) => {
                    if (imageInput) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            resolve({ name: cityName, image: e.target.result });
                        };
                        reader.readAsDataURL(imageInput);
                    } else {
                        resolve({ name: cityName, image: city.image });
                    }
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCities = [...cities];
                updatedCities[index] = result.value;
                setCities(updatedCities);
                localStorage.setItem("cities", JSON.stringify(updatedCities));
                Swal.fire("Updated!", "City details have been updated.", "success");
            }
        });
    };

   
    const columns = [
        { name: "ID", selector: (_, index) => index + 1, sortable: true },
        { name: "City Name", selector: (row) => row.name, sortable: true },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={row.image}
                    alt={row.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
            ),
        },
        {
            name: "Action",
            cell: (_, index) => (
                <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(index)}>
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
                        <input
                            type="text"
                            className="form-control rounded-pill px-3"
                            placeholder="Enter city name"
                            value={cityName}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="file"
                            id="imageInput"
                            className="form-control rounded-pill px-3"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                    </div>
                    {cityImage && (
                        <div className="text-center mb-3">
                            <img
                                src={cityImage}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100 rounded-pill">
                        ➕ Add City
                    </button>
                </form>
            </div>

            
            <h3 className="text-center mt-5"> Manage Cities</h3>
            {cities.length === 0 ? (
                <p className="text-center text-muted">No cities added yet.</p>
            ) : (
                <DataTable columns={columns} data={cities} pagination />
            )}
        </div>
    );
};

export default CityManager;










