import React, { useState, useEffect } from "react";

import Loader from "../Loader";
import axios from "axios";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
export default function AllFollowupstable() {
  const apiUrl = process.env.REACT_APP_API_URL;
    
  const [leads, setleads] = useState([]);
  const [status, setstatus] = useState();
  const [search, setsearch] = useState("");
  const [filterleads, setfilterleads] = useState([]);
  const getAllLead1 = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/get_All_Lead_Followup`
      );
      
      setleads(responce?.data?.lead);
      setfilterleads(responce?.data?.lead);
    } catch (error) {
      console.log(error);
      setfilterleads();
    }
  };
  

  const getAllLead2 = async (assign_to_agent) => {
    try {
      const responce = await axios.post(
        `${apiUrl}/get_Leadby_agentid_status`,
          
          {
             assign_to_agent, 
          } 
        
      );
           
      if(responce?.data?.success===true){ 
        setstatus(responce?.data?.success)
        setleads(responce?.data?.lead); 
        setfilterleads(responce?.data?.lead);
      }
      if(responce?.data?.success===false){

        setstatus(responce?.data?.success)
        setleads(responce?.data?.lead); 
        setfilterleads(responce?.data?.lead);
       
      }
     
      
    } catch (error) { 
      console.log(error);
      setfilterleads();
    }
 };



  useEffect(() => {
   if(localStorage.getItem("role")==='admin'){
    getAllLead1();
   }else{
       getAllLead2(localStorage.getItem("user_id"));
   }     
  }, [localStorage.getItem("user_id")]);

  useEffect(() => {
    const result = leads?.filter((lead) => {
      return (
        lead.full_name.toLowerCase().match(search.toLowerCase()) ||
        lead?.agent_details[0]?.agent_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.service_details[0]?.product_service_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.lead_source_details[0]?.lead_source_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.status_details[0]?.status_name
          .toLowerCase()
          .match(search.toLowerCase())
      );
    });
    setfilterleads(result);
  }, [search]);
  const isAdmin = localStorage.getItem("role") === "admin";
  const commonColumns  = [
    {
      name: "Name",
      cell: (row) => (
        <a href={`/followupleads/${row?._id}`}>{row?.full_name}</a>
      ),
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row?.contact_no,
      sortable: true,
   },
   
   
  //  {
  //    name: "Agent",
  //    selector: (row) => row?.agent_details[0]?.agent_name,
  //    sortable: true,
  //  },
    {
      name: "Service",
      selector: (row) => row?.service_details[0]?.product_service_name,
      sortable: true,
    },
    // {
    //   name: "Lead Source",
    //   selector: (row) => row?.lead_source_details[0]?.lead_source_name,
    //   sortable: true,
    //  },
    
  ]; 

  const getStatusBadgeClass = (statusName) => {
    switch (statusName) {
      case "Call Back & Hot Lead":{
        return "bg-danger";
      }
        case "Meeting":{
          return "bg-success";
        }
        case "Call Back":{
          return "bg-warning text-dark";
        }
         
      default:
        return "bg-default"; // Default class for other statuses
    }
  };


  const adminColumns = [
      {
      name: "Agent",
      selector: (row) => row?.agent_details[0]?.agent_name,
      sortable: true,
      },
      {  
      name: "Followup date",
       selector: (row) => (row?.followup_date)?(row?.followup_date):(''),
     //  + 
      //  row?.status_details['0']?.status_name,
       sortable: true,  
      },
      {
       name: "Action",     
        cell: (row) => (
         <a href={`/followupleads/${row?._id}`}><button className="btn btn-success btn-sm"><i className="fa fa-pencil-square" aria-hidden="true"></i></button>
         <span className={`badge ${getStatusBadgeClass(row?.status_details[0]?.status_name)}`}  style={{ marginLeft: '10px' }} >
              {row?.status_details[0]?.status_name=='Call Back & Hot Lead'? 'Hot':row?.status_details[0]?.status_name=='Call Back'?'C':
              row?.status_details[0]?.status_name=='Meeting'?'M':''
              }
      </span>
         </a>
       ),
       sortable: true,
     },
  ];

  const userColumns = [
    
    {  
    name: "Followup date",
     selector: (row) => (row?.followup_date)?(row?.followup_date):(''),
     //+ (row?.status_details['0']?.status_name),
     sortable: true,  
    },
    {
     name: "Action",     
      cell: (row) => (
       <a href={`/followupleads/${row?._id}`}><button className="btn btn-success btn-sm"><i className="fa fa-pencil-square" aria-hidden="true"></i></button>
        <span className={`badge ${getStatusBadgeClass(row?.status_details[0]?.status_name)}`}  style={{ marginLeft: '10px' }} >
              {row?.status_details[0]?.status_name=='Call Back & Hot Lead'? 'Hot':row?.status_details[0]?.status_name=='Call Back'?'C':
              row?.status_details[0]?.status_name=='Meeting'?'M':''
              }
      </span>
       </a>
     ),
     sortable: true,
   },
];
  
  const columns = isAdmin ? [...commonColumns, ...adminColumns] : [...commonColumns, ...userColumns];
  

  const getdatetimeformate=(datetime)=>{
    const dateObject = new Date(datetime);
    const formattedDate = `${dateObject.getFullYear()}-${padZero(dateObject.getMonth() + 1)}-${padZero(dateObject.getDate())} ${padZero(dateObject.getHours())}:${padZero(dateObject.getMinutes())}`;
    return formattedDate;
   
  }
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  
  

  const exportToPDF = () => {
    
    const doc = new jsPDF();
    const tableDataForPDF = filterleads.map((row) =>
    columns.map((column) => {
          if (column.selector && typeof column.selector === 'function') {
        return column.selector(row);
      }
      return row[column.selector];
    })
  );

    

    

    doc.autoTable({
      head: [columns.map((column) => column.name)],
      body: tableDataForPDF,
    });
      doc.save('table.pdf');
  };

  const customStyles = {
    cells: {
      style: {
        border: "0px solid #ddd", // Set the cell border
        fontSize: "14px",
        // background: "#f4f3fe",
      },
    },
    headCells: {
      style: {
        border: "0px solid #111", // Set the header cell border
        fontSize: "14px",
        background: "#f0f0f0",
        
      },
    },
    rows: {
      style: {
        background: "#fdf1f1", // Set the default background color
      },
    },
    highlightOnHover: {
      style: {
        background: "#f4f3fe", // Set the background color on hover
      },
    },
    striped: {
      style: {
        background: "#f8f9fa", // Set the background color for striped rows
      },
    },
  };


  const exportToExcel = () => {
    const columnsForExport = columns.map(column => ({
      title: column.name,
      dataIndex: column.selector,
    }));

    const dataForExport = filterleads.map(row =>
      columns.map(column => {
        if (column.selector && typeof column.selector === "function") {
          return column.selector(row);
        }
        return row[column.selector];
      })
    );

    const exportData = [columnsForExport.map(col => col.title), ...dataForExport];

      const blob = new Blob([exportData.map(row => row.join('\t')).join('\n')], {
      type: 'application/vnd.ms-excel',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleSelectedRowsChange = ({ selectedRows }) => {
    const selectedIds = selectedRows.map((row) => row._id);
    setSelectedRowIds(selectedIds);
    
  };
  const DeleteSelected = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
  if (confirmDelete) {
    const aaaaa={ids:selectedRowIds};
       
    fetch("https://crm-backend-1qcz.onrender.com/api/v1/BulkDeleteLead", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aaaaa),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response from server:", data);
      if (data?.success == true) {  
        toast.success(data?.message);
        setTimeout(()=>{ 
          window.location.reload(false);
          }, 500); 
       } else {
        toast.warn(data?.message);
      }
     })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
    } else {
      toast.success('Delete canceled');
     console.log('Delete canceled');
    }
   
  };




  
  //if (leads.length === 0) {
   /// return <Loader />;
   //return  <p>No leads found.</p>;
 // }
   
  return (   
    <div>
      {status === false ? (
       <table id="example" className="table table-striped pt-3" style={{width: '100%'}}>
       <thead>
         <tr>
           <th>Full Name</th>
           <th>Number</th>
           <th>Agent</th>
           <th>Service</th>
           <th>Lead Source</th>
           <th>Status</th> 
         </tr> 
       </thead>
       <tbody>
         <tr>
        <p className="text-center">No Followup leads Founds</p>
         </tr>
      
       </tbody>
     </table>
      ) : (
        <>
        <button className="btn btn-sm shadow_btn btn-success" onClick={exportToPDF}>Export PDF</button>
        <button className="btn btn-sm shadow_btn btn-success" onClick={exportToExcel}>
        Export Excel
      </button>
        {
          isAdmin?(<button className="btn shadow_btn btn-sm btn-danger" onClick={DeleteSelected}>
          Delete
        </button>):(<></>)
        }
        <DataTable
        responsive 
        id="table-to-export"
        columns={columns}
        data={filterleads}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="form-control w-25 "
          />
        }
        customStyles={customStyles} 
        selectedRows={selectedRowIds}
        onSelectedRowsChange={handleSelectedRowsChange}
        striped
      />
        </>
        
      )}
      
    
     
     
      
      
    </div>
  );
}
