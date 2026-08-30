"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

import {
  Package,
  MessageCircle,
  Phone,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Users,
  Calendar
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminDashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    inquiries: 0,
    contacts: 0,
    visitors: 0,
    appointments: 0
  });

  const [activities, setActivities] = useState<any[]>([]);
  const [weeklyVisitors, setWeeklyVisitors] = useState<number[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const statsRes = await fetch("/api/stats");
        const statsData = await statsRes.json();
        setStats(statsData);

        const activityRes = await fetch("/api/activities");
        const activityData = await activityRes.json();
        setActivities(activityData);

        const visitorRes = await fetch("/api/visitors-week");
        const visitorData = await visitorRes.json();
        setWeeklyVisitors(visitorData);

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();

  }, []);

  const barData = {
    labels: ["Products", "Inquiries", "Contacts", "Visitors", "Appointments"],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.products,
          stats.inquiries,
          stats.contacts,
          stats.visitors,
          stats.appointments
        ],
        backgroundColor: [
          "rgba(95,179,169,0.8)",
          "rgba(95,179,169,0.6)",
          "rgba(95,179,169,0.4)",
          "rgba(95,179,169,0.3)",
          "rgba(95,179,169,0.2)"
        ],
        borderRadius: 8,
        barPercentage: 0.6
      }
    ]
  };

  const lineData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Weekly Visitors",
        data: weeklyVisitors.length ? weeklyVisitors : [0,0,0,0,0,0,0],
        borderColor: "#5fb3a9",
        backgroundColor: "rgba(95,179,169,0.1)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display:false }
    }
  };

  const StatCard = ({title,value,icon:Icon,trend,trendValue,color}:any)=>(
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition border">

      <div className="flex justify-between items-start">

        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon size={26} className="text-white"/>
        </div>

        {trend && (
          <div className={`flex items-center text-xs px-2 py-1 rounded-full
          ${trend==="up" ? "bg-green-100 text-green-600":"bg-red-100 text-red-600"}`}>

            {trend==="up"
            ? <ArrowUpRight size={14}/>
            : <ArrowDownRight size={14}/>}

            {trendValue}%
          </div>
        )}

      </div>

      <p className="text-gray-500 mt-4 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>

    </div>
  );

  if(loading){
    return(
      <div className="text-center py-40 text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow">
          <Clock size={16} className="text-[#5fb3a9]" />
          <span className="text-sm text-gray-600">
            Updated just now
          </span>
        </div>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
        title="Products"
        value={stats.products}
        icon={Package}
        trend="up"
        trendValue="12"
        color="from-blue-500 to-blue-600"
        />

        <StatCard
        title="Inquiries"
        value={stats.inquiries}
        icon={MessageCircle}
        trend="up"
        trendValue="8"
        color="from-green-500 to-green-600"
        />

        <StatCard
        title="Contacts"
        value={stats.contacts}
        icon={Phone}
        trend="down"
        trendValue="3"
        color="from-purple-500 to-purple-600"
        />

        <StatCard
        title="Visitors"
        value={stats.visitors}
        icon={Eye}
        trend="up"
        trendValue="24"
        color="from-orange-500 to-orange-600"
        />

      </div>


      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-lg font-semibold mb-4">
            Monthly Statistics
          </h3>

          <div className="h-64">
            <Bar data={barData} options={chartOptions}/>
          </div>

        </div>


        {/* <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-lg font-semibold mb-4">
            Weekly Visitors
          </h3>

          <div className="h-64">
            <Line data={lineData} options={chartOptions}/>
          </div>

        </div> */}

      


      {/* RECENT ACTIVITY */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between mb-4">

          <h3 className="text-lg font-semibold">
            Recent Activity
          </h3>

          

        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">

          {activities.map((item:any)=>{

            const Icon =
              item.type==="product" ? Package :
              item.type==="inquiry" ? MessageCircle :
              item.type==="appointment" ? Calendar :
              Users;

            return(

              <div key={item.id} className="flex gap-4 items-center">

                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon size={18}/>
                </div>

                <div className="flex-1">
                  <p className="text-gray-800">
                    {item.action}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.time}
                  </p>
                </div>

                <MoreHorizontal size={18}/>

              </div>

            )

          })}

        </div>

      </div>

    </div>
    </div>

  );

}