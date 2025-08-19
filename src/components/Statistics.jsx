import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaFacebook, FaGoogle, FaInstagram, FaTiktok, FaYoutube, FaLink } from 'react-icons/fa';

const COLORS = ['#1877F2', '#DB4437', '#E4405F', '#000000', '#FF0000', '#6C757D', '#546E7A'];


const sourceIcons = {
  'facebook': <FaFacebook color={COLORS[0]} />,
  'google': <FaGoogle color={COLORS[1]} />,
  'instagram': <FaInstagram color={COLORS[2]} />,
  'tiktok': <FaTiktok color={COLORS[3]} />,
  'youtube': <FaYoutube color={COLORS[4]} />,
  'direct': <FaLink color={COLORS[5]} />
};

function Statistics({ leads }) {
  

  const getStats = (allLeads) => {
    const today = new Date().toISOString().split('T')[0];
    const aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);

    const dailyStatsMap = allLeads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString('he-IL');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const dailyStats = Object.keys(dailyStatsMap).map(date => ({
      date,
      count: dailyStatsMap[date]
    }));

    const sourceStatsMap = allLeads.reduce((acc, lead) => {
      const source = lead.utm_source || 'לא ידוע';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    const sourceStats = Object.keys(sourceStatsMap).map(source => ({
      name: source,
      value: sourceStatsMap[source]
    }));

    return {
      totalLeads: allLeads.length,
      leadsToday: allLeads.filter(l => l.createdAt.startsWith(today)).length,
      leadsThisWeek: allLeads.filter(l => new Date(l.createdAt) >= aWeekAgo).length,
      dailyStats,
      sourceStats
    };
  };

  const stats = getStats(leads);

  if (!stats) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">טוען סטטיסטיקות...</span>
        </div>
      </div>
    );
  }

  const pieData = stats.sourceStats.map(item => ({
    ...item,
    percentage: ((item.value / stats.totalLeads) * 100).toFixed(1)
  }));
  const dailyData = stats.dailyStats.sort((a,b) => new Date(a.date) - new Date(b.date));

  const CustomTooltip = ({ active, payload, label }) => {
    
 console.log("label :",{ active, payload, label });
    if (active && payload && payload.length) {
        console.log({ active, payload, label })
      return (
        <div className="bg-dark text-white p-2 rounded shadow">
          <p className="mb-1">{`מקור: ${payload[0].payload.name}`}</p>
          <p className="mb-1">{`לידים: ${payload[0].value}`}</p>
          <p className="mb-0">{`אחוז: ${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid">
      
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card stat-card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title opacity-75">סה״כ לידים</h6>
                  <h2 className="mb-0 fw-bold">{stats.totalLeads}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="bi bi-people-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card stat-card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title opacity-75">לידים היום</h6>
                  <h2 className="mb-0 fw-bold">{stats.leadsToday}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="bi bi-calendar-day"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card stat-card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title opacity-75">לידים השבוע</h6>
                  <h2 className="mb-0 fw-bold">{stats.leadsThisWeek}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="bi bi-calendar-week"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      
      <div className="row mb-4">
        
        <div className="col-lg-6 col-md-12 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                התפלגות לידים לפי מקור
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip  />} />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle"
                    formatter={(value, entry) => (
                      <span className="d-flex align-items-center">
                        {sourceIcons[value.toLowerCase()] || <FaLink color="#6C757D" />}
                        <span className="ms-2 "> {value}   - {entry.payload.value}</span>
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        
        <div className="col-lg-6 col-md-12 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-bar-chart text-success me-2"></i>
                לידים יומיים
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d6efd" name="לידים" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;