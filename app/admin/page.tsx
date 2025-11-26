"use client";

import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/actions/analytics.actions";
import {
  Home,
  CheckCircle,
  Clock,
  Users,
  UserPlus,
  MapPin,
  TrendingUp,
  AlertCircle,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = ["#2da3dd", "#1e55a7", "#0d2549", "#60a5fa", "#3b82f6", "#93c5fd"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getDashboardStats();
      if (res.success) setStats(res.stats);
    }
    load();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate insights
  const activePercentage = ((stats.activeListings / stats.totalListings) * 100).toFixed(1);
  const pendingPercentage = ((stats.pendingListings / stats.totalListings) * 100).toFixed(1);
  const topLocation = stats.listingsByState[0];
  const totalLocations = stats.listingsByState.length;
  const locationConcentration = topLocation ? ((topLocation.count / stats.totalListings) * 100).toFixed(1) : 0;

  // Prepare data for location chart
  const topLocations = stats.listingsByState.slice(0, 5);
  const othersCount = stats.listingsByState.slice(5).reduce((sum, loc) => sum + loc.count, 0);
  const locationChartData = [...topLocations];
  if (othersCount > 0) {
    locationChartData.push({ state: "Others", count: othersCount });
  }

  const kpis = [
    {
      label: "Total Listings",
      value: stats.totalListings.toLocaleString(),
      icon: Home,
      color: "#2da3dd",
      subtext: "All properties",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Listings",
      value: stats.activeListings.toLocaleString(),
      icon: CheckCircle,
      color: "#10b981",
      subtext: `${activePercentage}% of total`,
      bgColor: "bg-green-50",
    },
    {
      label: "Pending Approvals",
      value: stats.pendingListings.toLocaleString(),
      icon: Clock,
      color: "#f59e0b",
      subtext: `${pendingPercentage}% pending`,
      bgColor: "bg-amber-50",
      alert: stats.pendingListings > 0,
    },
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "#1e55a7",
      subtext: "Registered users",
      bgColor: "bg-indigo-50",
    },
    {
      label: "Active Now",
      value: stats.activeUsersNow.toLocaleString(),
      icon: Activity,
      color: "#10b981",
      subtext: `${stats.activeUsersToday} active today`,
      bgColor: "bg-green-50",
    },
    {
      label: "Active Locations",
      value: totalLocations.toLocaleString(),
      icon: MapPin,
      color: "#ec4899",
      subtext: `${topLocation?.state || 'N/A'} leads`,
      bgColor: "bg-pink-50",
    },
  ];

  // Quick actions
  const quickStats = [
    {
      label: "Approval Rate",
      value: `${(((stats.activeListings) / (stats.totalListings || 1)) * 100).toFixed(0)}%`,
      change: "+2.5%",
      positive: true,
    },
    {
      label: "Avg per Location",
      value: (stats.totalListings / totalLocations).toFixed(1),
      change: "Steady",
      positive: true,
    },
    {
      label: "User Growth",
      value: `${((stats.recentUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      change: "This week",
      positive: true,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.state}</p>
          <p className="text-sm text-blue-600">
            Properties: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
        </div>
        <p className="text-blue-100 text-lg mb-6">
          Welcome back! Here's what's happening with your platform today.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-xs mb-1">{stat.label}</p>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-300" />
                <p className="text-xs text-blue-200">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      {stats.pendingListings > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900">Action Required</h3>
            <p className="text-sm text-amber-800">
              You have <span className="font-bold">{stats.pendingListings}</span> listing(s) waiting for approval.
              Review them to keep your platform up to date.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`${kpi.bgColor} rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group`}
            >
              {/* Background decoration */}
              <div 
                className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: kpi.color }}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl shadow-sm"
                    style={{ backgroundColor: `${kpi.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                  {kpi.alert && (
                    <div className="animate-pulse">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-4xl font-extrabold text-gray-900">
                    {kpi.value}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">{kpi.label}</p>
                  <p className="text-xs text-gray-600">{kpi.subtext}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Locations - Detailed List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Locations</h2>
              <p className="text-sm text-gray-600">Distribution across {totalLocations} states</p>
            </div>
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>

          {/* Visual bars for each location */}
          <div className="space-y-4">
            {stats.listingsByState.map((item, index) => {
              const percentage = ((item.count / stats.totalListings) * 100).toFixed(1);
              const isTop = index < 3;
              
              return (
                <div key={item.state} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isTop ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-gray-900 font-semibold">{item.state}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 text-lg">{item.count}</span>
                      <span className="text-xs text-gray-500 ml-2">{percentage}%</span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out group-hover:opacity-80"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Top location: <span className="font-semibold text-gray-900">{topLocation?.state}</span>
              </span>
              <span className="text-gray-600">
                Represents <span className="font-semibold text-gray-900">{locationConcentration}%</span> of all listings
              </span>
            </div>
          </div>
        </div>

        {/* Location Distribution Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Distribution</h2>
          <p className="text-sm text-gray-600 mb-6">Top 5 + Others</p>
          
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationChartData}
                  dataKey="count"
                  nameKey="state"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                >
                  {locationChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            {locationChartData.slice(0, 3).map((loc, index) => (
              <div key={loc.state} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-700">{loc.state}</span>
                </div>
                <span className="font-semibold text-gray-900">{loc.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <p className="text-xs text-blue-700 font-semibold mb-1">LISTING STATUS</p>
          <p className="text-2xl font-bold text-blue-900">{activePercentage}%</p>
          <p className="text-xs text-blue-700">Currently Active</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <p className="text-xs text-green-700 font-semibold mb-1">COVERAGE</p>
          <p className="text-2xl font-bold text-green-900">{totalLocations}</p>
          <p className="text-xs text-green-700">States with Listings</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <p className="text-xs text-purple-700 font-semibold mb-1">USER BASE</p>
          <p className="text-2xl font-bold text-purple-900">{stats.totalUsers}</p>
          <p className="text-xs text-purple-700">Total Registered</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <p className="text-xs text-amber-700 font-semibold mb-1">GROWTH</p>
          <p className="text-2xl font-bold text-amber-900">+{stats.recentUsers}</p>
          <p className="text-xs text-amber-700">New This Week</p>
        </div>
      </div>
    </div>
  );
}