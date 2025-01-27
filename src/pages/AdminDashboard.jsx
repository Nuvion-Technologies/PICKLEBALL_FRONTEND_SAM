import React, { useState } from 'react';
import { 
  Activity, Users, Calendar, Package, TrendingUp, DollarSign, Settings, UserCog, 
  FileText, Key, Bell, X, ChevronRight, AlertTriangle, CheckCircle, Info, 
  BarChart2, Clock, Shield, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'System maintenance scheduled for tonight', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Backup completed successfully', time: '4 hours ago' },
    { id: 3, type: 'info', message: 'New member registration spike detected', time: '6 hours ago' }
  ]);

  const stats = [
    { icon: <Activity className="text-emerald-500" />, title: 'Active Courts', value: '6/8', subtitle: 'Courts in use' },
    { icon: <Users className="text-blue-500" />, title: 'Members', value: '124', subtitle: 'Active members' },
    { icon: <DollarSign className="text-yellow-500" />, title: 'Revenue', value: '$12,345', subtitle: 'This month' },
    { icon: <TrendingUp className="text-purple-500" />, title: 'Growth', value: '+15%', subtitle: 'vs last month' }
  ];

  const quickActions = [
    { 
      id: 'settings',
      title: 'System Settings', 
      icon: <Settings className="h-5 w-5" />, 
      color: 'indigo',
      description: 'Configure system preferences, notifications, and general settings.',
      options: [
        'General Settings',
        'Email Configuration',
        'Security Settings',
        'Backup & Restore'
      ]
    },
    { 
      id: 'users',
      title: 'User Management', 
      icon: <UserCog className="h-5 w-5" />, 
      color: 'purple',
      description: 'Manage user accounts, roles, and permissions.',
      options: [
        'User Accounts',
        'Role Management',
        'Access Control',
        'User Activity Logs'
      ]
    },
    { 
      id: 'reports',
      title: 'Financial Reports', 
      icon: <FileText className="h-5 w-5" />, 
      color: 'green',
      description: 'View and generate financial reports and analytics.',
      options: [
        'Revenue Reports',
        'Expense Reports',
        'Member Payments',
        'Financial Analytics'
      ]
    },
    { 
      id: 'access',
      title: 'Access Control', 
      icon: <Key className="h-5 w-5" />, 
      color: 'blue',
      description: 'Manage system access, security, and permissions.',
      options: [
        'Access Logs',
        'Security Policies',
        'API Keys',
        'Authentication Settings'
      ]
    }
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'New member registration', time: '5 minutes ago' },
    { id: 2, type: 'system', message: 'System backup completed', time: '1 hour ago' },
    { id: 3, type: 'security', message: 'Failed login attempt detected', time: '2 hours ago' },
    { id: 4, type: 'financial', message: 'Monthly report generated', time: '3 hours ago' }
  ];

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleQuickAction = (actionId) => {
    setActiveModal(actionId);
  };

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
          Admin Dashboard
        </motion.h1>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 relative"
            onClick={() => setActiveModal('notifications')}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
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
                <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-2xl font-semibold text-gray-800"
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-500 text-sm">{stat.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* System Overview */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">System Overview</h2>
          <div className="space-y-6">
            {['Court Utilization', 'Member Activity', 'Revenue Growth', 'Equipment Status'].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-32 text-sm text-gray-600">{metric}</div>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${[75, 85, 65, 90][index]}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-emerald-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`}
                    ></motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="ml-4 text-sm font-medium text-gray-600"
                >
                  {[75, 85, 65, 90][index]}%
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAction(action.id)}
                className={`p-4 rounded-lg bg-${action.color}-500 text-white hover:bg-${action.color}-600 transition-all
                  flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
              >
                {action.icon}
                <span>{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-white p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'system' ? 'bg-green-100 text-green-600' :
                  activity.type === 'security' ? 'bg-red-100 text-red-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'user' ? <Users className="h-5 w-5" /> :
                   activity.type === 'system' ? <Database className="h-5 w-5" /> :
                   activity.type === 'security' ? <Shield className="h-5 w-5" /> :
                   <BarChart2 className="h-5 w-5" />
                  }
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              {activeModal === 'notifications' ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Notifications</h3>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        {getNotificationIcon(notification.type)}
                        <div>
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {quickActions.map(action => {
                    if (action.id === activeModal) {
                      return (
                        <div key={action.id}>
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                              {action.icon}
                              <h3 className="text-xl font-semibold">{action.title}</h3>
                            </div>
                            <button
                              onClick={() => setActiveModal(null)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="text-gray-600 mb-4">{action.description}</p>
                          <div className="space-y-2">
                            {action.options.map((option, index) => (
                              <motion.button
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full p-3 text-left rounded-lg hover:bg-gray-50 flex items-center justify-between group"
                              >
                                <span>{option}</span>
                                <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;