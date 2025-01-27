import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Calendar, 
  Download, ChevronDown, X, PieChart, LineChart,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, subMonths, startOfDay, endOfDay } from 'date-fns';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const Reports = () => {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));
  const [activeChart, setActiveChart] = useState(null);
  const [dateRange, setDateRange] = useState('This Month');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateSelection, setCustomDateSelection] = useState(false);

  const stats = [
    { 
      icon: <BarChart3 className="text-blue-500" />, 
      title: 'Total Bookings', 
      value: '1,234',
      change: { value: 12, type: 'increase' },
      detail: 'from last month'
    },
    { 
      icon: <TrendingUp className="text-green-500" />, 
      title: 'Court Utilization', 
      value: '78%',
      change: { value: 5, type: 'increase' },
      detail: 'from last month'
    },
    { 
      icon: <DollarSign className="text-yellow-500" />, 
      title: 'Revenue', 
      value: '$12,345',
      change: { value: 8, type: 'increase' },
      detail: 'from last month'
    },
    { 
      icon: <Users className="text-purple-500" />, 
      title: 'New Members', 
      value: '45',
      change: { value: 15, type: 'increase' },
      detail: 'from last month'
    }
  ];

  const bookingTimes = [
    { time: 'Morning (6AM-11AM)', percentage: 75 },
    { time: 'Afternoon (11AM-4PM)', percentage: 60 },
    { time: 'Evening (4PM-9PM)', percentage: 85 }
  ];

  const bookingTimeData = [
    { name: '6AM', bookings: 10 },
    { name: '8AM', bookings: 25 },
    { name: '10AM', bookings: 35 },
    { name: '12PM', bookings: 28 },
    { name: '2PM', bookings: 22 },
    { name: '4PM', bookings: 32 },
    { name: '6PM', bookings: 45 },
    { name: '8PM', bookings: 30 }
  ];

  const demographics = [
    { age: '18-30 years', percentage: 30, color: '#8b5cf6' },
    { age: '31-45 years', percentage: 40, color: '#6366f1' },
    { age: '46-60 years', percentage: 20, color: '#3b82f6' },
    { age: '60+ years', percentage: 10, color: '#2563eb' }
  ];

  const handleDateRangeChange = (range) => {
    const now = new Date();
    switch (range) {
      case 'Today':
        setStartDate(startOfDay(now));
        setEndDate(endOfDay(now));
        break;
      case 'This Week':
        setStartDate(startOfWeek(now));
        setEndDate(endOfWeek(now));
        break;
      case 'This Month':
        setStartDate(startOfMonth(now));
        setEndDate(endOfMonth(now));
        break;
      case 'Last 3 Months':
        setStartDate(startOfMonth(subMonths(now, 3)));
        setEndDate(endOfMonth(now));
        break;
      case 'Custom Range':
        setCustomDateSelection(true);
        break;
      default:
        setStartDate(startOfMonth(now));
        setEndDate(endOfMonth(now));
    }
    setDateRange(range);
    setShowDatePicker(false);
  };

  const handleExport = () => {
    // Prepare the export data
    const exportData = {
      reportInfo: {
        generatedAt: new Date().toISOString(),
        dateRange: {
          start: format(startDate, 'yyyy-MM-dd'),
          end: format(endDate, 'yyyy-MM-dd'),
          period: dateRange
        }
      },
      statistics: stats.map(stat => ({
        metric: stat.title,
        value: stat.value,
        change: {
          percentage: stat.change.value,
          direction: stat.change.type,
          context: stat.detail
        }
      })),
      bookingAnalytics: {
        timeDistribution: bookingTimes.map(slot => ({
          timeSlot: slot.time,
          utilizationRate: slot.percentage
        })),
        hourlyBookings: bookingTimeData.map(data => ({
          hour: data.name,
          numberOfBookings: data.bookings
        }))
      },
      memberDemographics: demographics.map(group => ({
        ageGroup: group.age,
        distribution: group.percentage
      }))
    };

    try {
      // Create the JSON string with proper formatting
      const jsonString = JSON.stringify(exportData, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `analytics-report-${format(startDate, 'yyyy-MM-dd')}-to-${format(endDate, 'yyyy-MM-dd')}.json`;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Cleanup
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Failed to export report. Please try again.');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const dateRanges = [
    'Today',
    'This Week',
    'This Month',
    'Last 3 Months',
    'Custom Range'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Analytics & Reports
        </motion.h1>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{dateRange}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.button>

            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-10"
                >
                  {dateRanges.map((range, index) => (
                    <motion.button
                      key={range}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleDateRangeChange(range)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700"
                    >
                      {range}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {customDateSelection && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="px-2 py-1 border rounded"
              />
              <span>to</span>
              <input
                type="date"
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="px-2 py-1 border rounded"
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export Report
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-full bg-gray-50"
              >
                {stat.icon}
              </motion.div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-2xl font-semibold text-gray-800"
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center gap-1">
                  {stat.change.type === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${
                    stat.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change.value}% {stat.detail}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Booking Times */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Popular Booking Times</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChart('bookings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LineChart className="h-5 w-5 text-gray-500" />
            </motion.button>
          </div>
          <div className="space-y-6">
            {bookingTimes.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-32 text-sm text-gray-600">{slot.time}</div>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${slot.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="ml-4 text-sm font-medium text-gray-600"
                >
                  {slot.percentage}%
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Member Demographics */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Member Demographics</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChart('demographics')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <PieChart className="h-5 w-5 text-gray-500" />
            </motion.button>
          </div>
          <div className="space-y-6">
            {demographics.map((group, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-32 text-sm text-gray-600">{group.age}</div>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${group.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full"
                      style={{ backgroundColor: group.color }}
                    ></motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="ml-4 text-sm font-medium text-gray-600"
                >
                  {group.percentage}%
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Chart Modal */}
      <AnimatePresence>
        {activeChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveChart(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {activeChart === 'bookings' ? 'Booking Times Analysis' : 'Demographics Analysis'}
                </h3>
                <button
                  onClick={() => setActiveChart(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="h-96">
                {activeChart === 'bookings' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={bookingTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={demographics}
                        dataKey="percentage"
                        nameKey="age"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {demographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Reports;