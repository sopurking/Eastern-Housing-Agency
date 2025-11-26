"use client";

import React, { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/actions/analytics.actions";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Users, Eye, UserCheck, Shield, TrendingUp, TrendingDown, Home, DollarSign } from "lucide-react";

const COLORS = ["#2da3dd", "#1e55a7", "#0d2549", "#60a5fa", "#3b82f6"];

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getAnalytics();
      if (res.success) setAnalytics(res.analytics);
    }
    load();
  }, []);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  // Calculate percentage changes and insights
  const calculateTrend = (current, previous) => {
    if (!previous) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  // Calculate total properties
  const totalProperties = analytics.propertyTypes.reduce((sum, type) => sum + type.count, 0);
  
  // Calculate average price from price ranges (estimation)
  const estimateAvgPrice = () => {
    let totalValue = 0;
    let totalCount = 0;
    analytics.priceRanges.forEach(range => {
      const match = range.range.match(/[\d,]+/g);
      if (match) {
        const min = Number(match[0].replace(/,/g, ''));
        const max = match[1] ? Number(match[1].replace(/,/g, '')) : min * 2;
        totalValue += ((min + max) / 2) * Number(range.count);
        totalCount += Number(range.count);
      }
    });
    return totalCount > 0 ? Math.round(totalValue / totalCount) : 0;
  };

  const avgPrice = estimateAvgPrice();

  const visitorCards = [
    { 
      label: "Total Visits", 
      value: analytics.visitors.total, 
      icon: Eye, 
      color: "#2da3dd",
      subtext: `${analytics.visitors.last7Days} in last 7 days`
    },
    { 
      label: "Active Now", 
      value: analytics.visitors.activeNow, 
      icon: UserCheck, 
      color: "#1e55a7",
      subtext: `${analytics.visitors.activeToday} active today`
    },
    { 
      label: "Total Properties", 
      value: totalProperties, 
      icon: Home, 
      color: "#0d2549",
      subtext: `${analytics.propertyTypes.length} different types`
    },
    { 
      label: "Avg. Price", 
      value: `₦${(avgPrice / 1000000).toFixed(1)}M`, 
      icon: DollarSign, 
      color: "#60a5fa",
      subtext: "Estimated average"
    },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const displayLabel = typeof label === 'string' ? label : String(label);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{displayLabel}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].name}: <span className="font-bold">{Number(payload[0].value).toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Find most popular property type
  const mostPopularType = analytics.propertyTypes.reduce((max, type) => 
    type.count > (max?.count || 0) ? type : max, null
  );

  // Find most common status
  const mostCommonStatus = analytics.statusBreakdown.reduce((max, status) => 
    status.count > (max?.count || 0) ? status : max, null
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header with Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-700 text-sm mb-4">
          Comprehensive insights and metrics for your real estate platform
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Most Popular: </span>
            <span className="font-semibold text-gray-900">{mostPopularType?.type}</span>
          </div>
          <div>
            <span className="text-gray-600">Common Status: </span>
            <span className="font-semibold text-gray-900">{mostCommonStatus?.status}</span>
          </div>
          <div>
            <span className="text-gray-600">Admin Activity: </span>
            <span className="font-semibold text-gray-900">{analytics.visitors.admins} visits</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visitorCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${card.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                </p>
                <p className="text-sm font-medium text-gray-700">{card.label}</p>
                <p className="text-xs text-gray-500">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Visits Chart - Enhanced with Area */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Daily Visits Trend</h2>
            <p className="text-sm text-gray-600">Last 30 days activity</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {analytics.dailyViews.reduce((sum, day) => Number(sum) + Number(day.views), 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-600">Total views</p>
          </div>
        </div>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.dailyViews}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2da3dd" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2da3dd" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#2da3dd"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property Types & Status Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Property Types Pie - Enhanced */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Property Types Distribution</h2>
            <p className="text-sm text-gray-600">{totalProperties} total properties</p>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.propertyTypes}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ type, count, percent }) => 
                    `${type}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={true}
                >
                  {analytics.propertyTypes.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Property Type Legend with Counts */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {analytics.propertyTypes.map((type, i) => (
              <div key={type.type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-gray-700">
                  {type.type}: <span className="font-semibold">{type.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown Bar - Enhanced */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Property Status</h2>
            <p className="text-sm text-gray-600">Current listings breakdown</p>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#1e55a7" radius={[10, 10, 0, 0]}>
                  {analytics.statusBreakdown.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Status percentages */}
          <div className="mt-4 space-y-2">
            {analytics.statusBreakdown.map((status, i) => {
              const percentage = ((status.count / totalProperties) * 100).toFixed(1);
              return (
                <div key={status.status} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{status.status}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS[i % COLORS.length]
                        }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900 w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price Distribution - Enhanced */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Price Distribution</h2>
            <p className="text-sm text-gray-600">Property pricing across ranges</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">₦{(avgPrice / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-600">Avg. estimated price</p>
          </div>
        </div>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.priceRanges}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#0d2549" radius={[10, 10, 0, 0]}>
                {analytics.priceRanges.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(${210 - index * 15}, 70%, ${45 + index * 5}%)`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}