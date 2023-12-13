import React, { useEffect, useState } from 'react';

import style from "./Graphic.module.css"
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

export const Graphic = ({ ordersData }) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const processData = (data) => {
      const ordersByDay = {};
      data.forEach((order) => {
        const day = getDayFromDate(order.fecha_de_compra);
        if (!ordersByDay[day]) {
          ordersByDay[day] = { totalAmount: 0, count: 0 };
        }
        ordersByDay[day].totalAmount += parseFloat(order.precio);
        ordersByDay[day].count += 1;
      });

      return Object.keys(ordersByDay).map((day) => ({
        name: day,
        totalAmount: ordersByDay[day].totalAmount,
        count: ordersByDay[day].count,
      }));
    };

    const getDayFromDate = (date) => {
      return date.split('T')[0];
    };

    if (ordersData && ordersData.length > 0) {
      const processed = processData(ordersData);
      setProcessedData(processed);
    }
  }, [ordersData]);

  return (
    <div className='mt-3 mb-5 '>
      <h4>Sales</h4>
      <hr />
      <div className={`p-3 bg-light rounded-3  ${style.containerLineChart}`}>
        <LineChart width={600} height={300} data={processedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" name="Order Profits" />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Number of orders" />
        </LineChart>
      </div>
    </div>
  );
};

