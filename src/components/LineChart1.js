import axios, { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
//import { LineChart, ComposedChart,Area, Line, Bar, Tooltip, CartesianGrid, XAxis, YAxis,Legend } from 'recharts';
import Chart from 'react-apexcharts'
import { useDispatch } from 'react-redux';

const ChartComponent = () => {

     const [data,setdata]=useState([]);
     const apiUrl = process.env.REACT_APP_API_URL;  
     const getAllLeadSourceOverview=async ()=>{
      try {
        const responce = await axios.get(
          "https://crm-backend-1qcz.onrender.com/api/v1/Income_Graph_Overview"
        );
        setdata(responce?.data?.monthlyIncom);
    
        
      } catch (error) {
        console.log(error);
      }
    } 

   useEffect(()=>{
       
    getAllLeadSourceOverview();
   },[])
   
  return (
    <React.Fragment>
     
        <Chart
          type="bar"
          width={1200}
          height={400}
          series={[
            {
              name: "Income Monthly",
              data: data,
            },
          ]}
          options={{
            title: {
            //   text: "BarChar Developed by DevOps Team",
            //   style: { fontSize: 30 },
            },

            subtitle: {
            //   text: "This is BarChart Graph",
            //   style: { fontSize: 18 },
            },

            colors: ["#02b053"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              title: {
                text: "Income Graph Monthly",
                style: { color: "#000", fontSize: 10 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#000"] },
              },
              title: {
                text: "Amount In (K)",
                style: { color: "#000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#000"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      
    </React.Fragment>
  );
};

export default ChartComponent;
