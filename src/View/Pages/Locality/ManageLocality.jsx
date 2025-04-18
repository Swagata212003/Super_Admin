import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import HomeService from "../../../Services/HomeService";

const ManageLocality = () => {
    const [cities, setCities] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [filteredLocalities, setFilteredLocalities] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [formData, setFormData] = useState({ city: "", locality: "", aptName: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCities();
        fetchLocalities();
        fetchApartments();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await HomeService.getCities();
            setCities(response?.data || []);
        } catch (error) {
            toast.error("Failed to load cities.");
        }
    };

    const fetchLocalities = async () => {
        try {
            const response = await HomeService.getLocalities();
            setLocalities(response?.data || []);
        } catch (error) {
            toast.error("Failed to load localities.");
        }
    };

    const fetchApartments = async () => {
        try {
            const response = await HomeService.getApartments();
            setApartments(response?.data || []);
        } catch (error) {
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

        try {
            await HomeService.addApartment({ ...formData });
            toast.success("Apartment added successfully!");
            fetchApartments();
            setFormData({ city: "", locality: "", aptName: "" });
        } catch (error) {
            toast.error("Failed to add apartment.");
        }
    };

    const handleEdit = (apartment) => {
        setEditId(apartment._id);
        setFormData({
            city: apartment.city._id,
            locality: apartment.locality._id,
            aptName: apartment.aptName
        });

        setFilteredLocalities(localities.filter(loc => loc.city._id === apartment.city._id));
        setFilteredApartments(apartments.filter(apt => apt.locality._id === apartment.locality._id));
    };

    const handleUpdateApartment = async () => {
        if (!formData.city || !formData.locality || !formData.aptName || !editId) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            await HomeService.updateApartment(editId, { ...formData });
            toast.success("Apartment updated successfully!");
            fetchApartments();
            setEditId(null);
            setFormData({ city: "", locality: "", aptName: "" });
        } catch (error) {
            toast.error("Failed to update apartment.");
        }
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setFormData({ city: "", locality: "", aptName: "" });
    };

    const columns = [
        { name: "City", selector: (row) => row.city.name, sortable: true },
        { name: "Locality", selector: (row) => row.locality.name, sortable: true },
        { name: "Apartment Name", selector: (row) => row.aptName, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <button className="btn btn-warning" onClick={() => handleEdit(row)}>Update</button>
            ),
        },
    ];

    return (
        <div className="container" style={{ marginTop: "6rem" }}>
            <h2 className="text-center">Manage Locality & Apartments</h2>
            <form>
                <div className="row">
                    <div className="col-md-4">
                        <label>City *</label>
                        <select className="form-control" name="city" value={formData.city} onChange={handleChange}>
                            <option value="">---Select---</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label>Locality</label>
                        <select className="form-control" name="locality" value={formData.locality} onChange={handleChange}>
                            <option value="">---Select---</option>
                            {filteredLocalities.map((loc) => (
                                <option key={loc._id} value={loc._id}>{loc.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label>Apartment Name</label>
                        <input type="text" className="form-control" name="aptName" value={formData.aptName} onChange={handleChange} />
                    </div>
                </div>

                {editId ? (
                    <>
                        <button type="button" className="btn btn-success mt-3" onClick={handleUpdateApartment}>Update Apartment</button>
                        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={handleCancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button type="button" className="btn btn-primary mt-3" onClick={handleAddApartment}>Add Apartment</button>
                )}
            </form>

            <DataTable title="Apartments" columns={columns} data={apartments} pagination />
        </div>
    );
};

export default ManageLocality;











