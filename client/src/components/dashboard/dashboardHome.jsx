import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { FiDollarSign, FiShoppingCart, FiRefreshCcw } from 'react-icons/fi';
import { BsFillBarChartFill, BsFileEarmarkBarGraph } from "react-icons/bs";
import { FaArrowTrendDown, FaArrowTrendUp, FaPeopleRoof } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { GiReceiveMoney, GiArmoredBoomerang } from "react-icons/gi";
import { IoBarChart } from "react-icons/io5";
import { FaLaughWink, FaThumbsDown } from "react-icons/fa";
{/* Chart/Graphs */ }
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";


function DashboardHome() {
  // State for selected dates
  const [selectedFromDate, setSelectedFromDate] = useState(moment());
  const [selectedToDate, setSelectedToDate] = useState(moment());

  // Days of the week for current day display
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Format current date in DD-MM-YYYY
  const currentDate = moment().format("DD-MM-YYYY");

  // Handle form submit to log selected dates
  const handleSubmit = () => {
    console.log("From Date:", selectedFromDate.format("DD-MM-YYYY"));
    console.log("To Date:", selectedToDate.format("DD-MM-YYYY"));
    alert("Form submitted successfully!");
  };

  // Sample data for charts
  const barData = [
    { month: 'Jan', sales: 120, revenue: 140 },
    { month: 'Feb', sales: 160, revenue: 180 },
    { month: 'Mar', sales: 140, revenue: 160 },
    { month: 'Apr', sales: 180, revenue: 200 },
    { month: 'May', sales: 200, revenue: 220 },
    { month: 'Jun', sales: 170, revenue: 190 },
  ];

  const pieData = [
    { id: 'Product A', value: 30, color: 'hsl(190, 70%, 50%)' },
    { id: 'Product B', value: 25, color: 'hsl(190, 70%, 50%)' },
    { id: 'Product C', value: 20, color: 'hsl(190, 70%, 50%)' },
    { id: 'Product D', value: 15, color: 'hsl(190, 70%, 50%)' },
    { id: 'Product E', value: 10, color: 'hsl(190, 70%, 50%)' },
  ];
  const data = [
    {
      product: 'Product A',
      sales: 5000,
      grossMargin: 2000,
      revenue: 7000,
    },
    {
      product: 'Product B',
      sales: 8000,
      grossMargin: 3500,
      revenue: 11000,
    },
    {
      product: 'Product C',
      sales: 6000,
      grossMargin: 2500,
      revenue: 9500,
    },
  ];

  const lineData = [
    {
      id: 'traffic',
      data: [
        { x: 'Mon', y: 40 },
        { x: 'Tue', y: 60 },
        { x: 'Wed', y: 45 },
        { x: 'Thu', y: 70 },
        { x: 'Fri', y: 55 },
        { x: 'Sat', y: 80 },
        { x: 'Sun', y: 65 },
      ]
    }
  ];

  const stats = [
    { title: 'Total Revenue', value: '৳ 54,321', icon: FiDollarSign, change: '+3.1%' },
    { title: 'Total Stock', value: '৳ 54,321', icon: GiArmoredBoomerang, change: '+3.1%' },
    { title: 'Total Product', value: '12,345', icon: AiFillProduct, change: '+5.2%' },
    { title: 'Stock Out Items', value: '0', icon: FaThumbsDown, change: '+3.1%' },
    { title: 'Todays Sales', value: '৳ 12,345', icon: BsFileEarmarkBarGraph, change: '+5.2%' },
    { title: 'Total Monthly Sell', value: '৳ 12,345', icon: IoBarChart, change: '+5.2%' },
    { title: 'Total Sales', value: '৳ 12,345', icon: BsFillBarChartFill, change: '+5.2%' },
    { title: 'Total Active Customers', value: '12,345', icon: FaPeopleRoof, change: '+5.2%' },
    { title: 'Total Paid Customers', value: '12,345', icon: GiReceiveMoney, change: '+5.2%' },
    { title: 'Total Winning Customers', value: '12,345', icon: FaLaughWink, change: '+5.2%' },
    { title: 'Total Orders', value: '1,234', icon: FiShoppingCart, change: '+2.5%' },
    { title: 'Total Returns', value: '43', icon: FiRefreshCcw, change: '-1.2%' },
  ];

  // Sample customer details data
  const customerDetails = [
    { name: 'John Doe', phone: '123-456-7890', device: 'desktop', status: 'Active', time: '10:00 AM' },
    { name: 'Jane Smith', phone: '987-654-3210', device: 'app', status: 'Active', time: '11:30 AM' },
    { name: 'Alice Johnson', phone: '555-123-4567', device: 'desktop', status: 'Active', time: '02:15 PM' },
    { name: 'Bob Brown', phone: '444-987-6543', device: 'app', status: 'Active', time: '03:45 PM' },
    { name: 'Charlie Davis', phone: '333-222-1111', device: 'desktop', status: 'Active', time: '09:00 AM' },
    { name: 'Diana Prince', phone: '222-333-4444', device: 'desktop', status: 'Active', time: '01:30 PM' },
    { name: 'Eve Adams', phone: '111-222-3333', device: 'desktop', status: 'Active', time: '04:00 PM' },
    { name: 'Frank Castle', phone: '666-555-4444', device: 'desktop', status: 'Active', time: '05:15 PM' },
    { name: 'Grace Hopper', phone: '777-888-9999', device: 'desktop', status: 'Active', time: '06:45 PM' },
    { name: 'Hank Pym', phone: '000-111-2222', device: 'desktop', status: 'Active', time: '07:30 PM' },
  ];

  return (
    <div className="space-y-6 px-2 py-8">
      {/* Stats Day Date Picker */}
      <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    {/* Day & Date */}
    <div className="flex justify-between text-md font-semibold w-auto">
      <span className="pr-4">Day: {currentDay}</span>
      <span>Date: {currentDate}</span>
    </div>

    {/* Date Range Selection */}
    <div className="flex flex-col sm:flex-row lg:items-center gap-2 w-full lg:w-auto">
      <div className="flex items-center gap-4 pr-2 w-full lg:w-auto">
        {/* From Date */}
        <div className="flex items-center gap-2">
          <label className="hidden xl:block text-md font-semibold">From Date:</label>
          <ReactDatePicker
            selected={selectedFromDate.toDate()}
            onChange={(date) => setSelectedFromDate(moment(date))}
            dateFormat="dd-MM-yyyy"
            className="w-[110px] p-2 border rounded-md font-semibold"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-2">
          <label className="hidden xl:block text-md font-semibold">To Date:</label>
          <ReactDatePicker
            selected={selectedToDate.toDate()}
            onChange={(date) => setSelectedToDate(moment(date))}
            dateFormat="dd-MM-yyyy"
            className="w-[110px] p-2 border rounded-md font-semibold"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full sm:w-[110px]"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  </div>
</div>



      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-custom-orange p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 ${index % 2 === 0 ? 'text-white' : 'text-white'}`} />
              </div>
              <div className='text-right'>
                <p className="text-custom-black text-sm">{stat.title}</p>
                <h3 className="text-2xl font-semibold text-custom-black mt-1">{stat.value}</h3>
                <div className="flex items-center justify-end mt-2">
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-white' : 'text-red-800'}`}>
                    {stat.change.startsWith('+') ? <FaArrowTrendUp className="inline-block mr-1" /> : <FaArrowTrendDown className="inline-block mr-1" />}
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-custom-black mb-4">Sales Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 0, bottom: 50, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#008000" />
                <Bar dataKey="revenue" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-custom-black">Active Customer Details</h3>
            <button className="text-sm text-slate-900 hover:text-custom-orange focus:outline-none">
              View More
            </button>
          </div>
          {/* Active Customer Details */}
          <table className="min-w-full">
            <thead>
              <tr className=''>
                <th className='py-1 px-2 border-b border-gray-100 bg-custom-orange rounded-l-lg text-left text-sm font-medium text-white uppercase tracking-wider'>Name</th>
                <th className='py-1 px-2 border-b border-gray-100 bg-custom-orange text-left text-sm font-medium text-white uppercase tracking-wider'>Phone Number</th>
                <th className='py-1 px-2 border-b border-gray-100 bg-custom-orange text-left text-sm font-medium text-white uppercase tracking-wider'>Device</th>
                <th className='py-1 px-2 border-b border-gray-100 bg-custom-orange text-left text-sm font-medium text-white uppercase tracking-wider'>Status</th>
                <th className='py-1 px-2 border-b border-gray-100 bg-custom-orange rounded-r-lg text-left text-sm font-medium text-white uppercase tracking-wider'>Time</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails.map((customer, index) => (
                <tr key={index} className="text-sm">
                  <td className='py-1 px-2 border-b border-slate-300'>{customer.name}</td>
                  <td className='py-1 px-2 border-b border-slate-300'>{customer.phone}</td>
                  <td className='py-1 px-2 border-b border-slate-300'>{customer.device}</td>
                  <td className='py-1 px-2 border-b border-slate-300'>
                    <button className="bg-green-600 text-white py-1 px-2 rounded-full">
                      {customer.status}
                    </button>
                  </td>
                  <td className='py-1 px-2 border-b border-slate-300'>{customer.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-custom-black mb-4">Product Distribution</h3>
          <div className="h-80">
            <ResponsivePie
              data={pieData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: 'paired' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableArcLabels={true}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            />
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-custom-black mb-4">Product Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#008000" />
                <Bar dataKey="grossMargin" fill="#0000ff" />
                <Bar dataKey="revenue" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-custom-black mb-4">Traffic Overview</h3>
          <div className="h-80">
            <ResponsiveLine
              data={lineData}
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              // pointBorderColor={{ from: 'serieColor' }}
              pointBorderColor={['#0891b2']}
              pointLabelYOffset={-12}
              useMesh={true}
              colors={['#0891b2']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;