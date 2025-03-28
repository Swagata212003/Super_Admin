
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import HomeService from '../../../Services/HomeService';
import 'bootstrap/dist/css/bootstrap.min.css';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await HomeService.getBanners();
      setBanners(res.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await HomeService.updateBanner(id, { status: updatedStatus });
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === id ? { ...banner, status: updatedStatus } : banner
        )
      );
    } catch (error) {
      console.error('Error updating banner status:', error);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Added By',
      selector: (row) => row.addedBy?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Added By Email',
      selector: (row) => row.addedBy?.email || 'N/A',
      sortable: true,
    },
    {
      name: 'User Full Name',
      selector: (row) => row.user?.fullName || 'N/A',
      sortable: true,
    },
    {
      name: 'User Email',
      selector: (row) => row.user?.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Company Name',
      selector: (row) => row.user?.companyName || 'N/A',
      sortable: true,
    },
    {
      name: 'User Address',
      selector: (row) => row.user?.address || 'N/A',
      sortable: true,
    },
    {
      name: 'User Mobile No',
      selector: (row) => row.user?.mobileNo || 'N/A',
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.city?.[0]?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Localities',
      selector: (row) =>
        row.locality?.map((loc) => loc.name).join(', ') || 'N/A',
      sortable: true,
    },
    {
        name: 'Status',
        cell: (row) => (
          <button
            onClick={() => toggleStatus(row._id, row.status)}
            className={`btn ${row.status ? 'btn-success' : 'btn-danger'}`}
          >
            {row.status ? 'Active' : 'Inactive'}
          </button>
        ),
        sortable: true,
      },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Banner List</h2>
      <DataTable
        columns={columns}
        data={banners}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default BannerList;










