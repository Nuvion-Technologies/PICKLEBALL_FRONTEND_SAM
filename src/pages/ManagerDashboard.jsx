import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Activity,Users,Calendar,Package,DollarSign,Clock,AlertCircle,CreditCard,Plus,Edit3,UserPlus,X,CheckCircle,XCircle,Search,Trash2,Save} from 'lucide-react';

const ManagerDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showCourtModal, setShowCourtModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showManageBookingsModal, setShowManageBookingsModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  

  const stats = [
    { 
      icon: <Activity className="text-emerald-500" />, 
      title: 'Court Status', 
      value: '6/8', 
      subtitle: 'Active Courts',
      details: [
        { label: 'Available', value: '2' },
        { label: 'In Use', value: '6' },
        { label: 'Maintenance', value: '0' }
      ]
    },
    { 
      icon: <Users className="text-blue-500" />, 
      title: 'Membership', 
      value: '124', 
      subtitle: 'Total Members',
      details: [
        { label: 'Active', value: '98' },
        { label: 'Expiring Soon', value: '15' },
        { label: 'Expired', value: '11' }
      ]
    },
    { 
      icon: <Calendar className="text-purple-500" />, 
      title: 'Bookings', 
      value: '28', 
      subtitle: "Today's Total",
      details: [
        { label: 'Current', value: '4' },
        { label: 'Upcoming (12h)', value: '12' },
        { label: 'Completed', value: '12' }
      ]
    },
    { 
      icon: <DollarSign className="text-orange-500" />, 
      title: 'Financial', 
      value: '₹15,240', 
      subtitle: 'Today\'s Revenue',
      details: [
        { label: 'Cash', value: '₹5,240' },
        { label: 'UPI', value: '₹8,000' },
        { label: 'Card', value: '₹2,000' }
      ]
    }
  ];

  // Keep existing courts array
  const courts = [
    { id: 1, name: 'Court 1', status: 'booked', isActive: true, currentBooking: { time: '14:00 - 15:00', member: 'John Doe' } },
    { id: 2, name: 'Court 2', status: 'available', isActive: true },
    { id: 3, name: 'Court 3', status: 'booked', isActive: true, currentBooking: { time: '14:30 - 15:30', member: 'Jane Smith' } },
    { id: 4, name: 'Court 4', status: 'available', isActive: false },
    { id: 5, name: 'Court 5', status: 'booked', isActive: true, currentBooking: { time: '15:00 - 16:00', member: 'Mike Johnson' } },
    { id: 6, name: 'Court 6', status: 'available', isActive: true },
    { id: 7, name: 'Court 7', status: 'maintenance', isActive: false },
    { id: 8, name: 'Court 8', status: 'available', isActive: true },
  ];

  // Keep existing inventory array
  const inventory = [
    { id: 1, name: 'Shuttlecocks', total: 100, available: 45, inUse: 55 },
    { id: 2, name: 'Rackets', total: 30, available: 12, inUse: 18 },
    { id: 3, name: 'Nets', total: 10, available: 8, inUse: 2 },
    { id: 4, name: 'Court Shoes', total: 20, available: 15, inUse: 5 },
  ];


  const futureBookings = [
    { 
      id: 1, 
      courtId: 1,
      memberId: 'M001',
      memberName: 'John Doe',
      time: '16:00 - 17:00',
      date: '2024-03-20',
      status: 'confirmed'
    },
    { 
      id: 2,
      courtId: 3,
      memberId: 'M002',
      memberName: 'Jane Smith',
      time: '17:00 - 18:00',
      date: '2024-03-20',
      status: 'confirmed'
    },
    { 
      id: 3,
      courtId: 2,
      memberId: 'M003',
      memberName: 'Mike Johnson',
      time: '09:00 - 10:00',
      date: '2024-03-21',
      status: 'pending'
    }
  ];

  // Members data
  const members = [
    {
      id: 'M001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      membershipType: 'Premium',
      status: 'active',
      expiryDate: '2024-12-31'
    },
    {
      id: 'M002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      membershipType: 'Standard',
      status: 'expiring',
      expiryDate: '2024-04-15'
    },
    {
      id: 'M003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 98765 43212',
      membershipType: 'Premium',
      status: 'expired',
      expiryDate: '2024-03-01'
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };


  const BookingModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{isEdit ? 'Edit Booking' : 'New Booking'}</h2>
          <button onClick={() => {
            setShowBookingModal(false);
            setEditingBooking(null);
          }} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                {members.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                {courts.map(court => (
                  <option key={court.id} value={court.id}>{court.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>06:00 - 07:00</option>
                <option>07:00 - 08:00</option>
                <option>08:00 - 09:00</option>
                {/* Add more time slots */}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            {isEdit && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Cancel Booking</span>
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update' : 'Create'} Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ManageBookingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage Bookings</h2>
          <button onClick={() => setShowManageBookingsModal(false)} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {futureBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Court {booking.courtId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.memberName}</div>
                    <div className="text-sm text-gray-500">ID: {booking.memberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setEditingBooking(booking);
                        setShowBookingModal(true);
                        setShowManageBookingsModal(false);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const MembershipModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{isEdit ? 'Edit Member' : 'New Member'}</h2>
          <button onClick={() => {
            setShowMembershipModal(false);
            setEditingMember(null);
          }} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            {isEdit && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Member</span>
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update' : 'Create'} Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );


  const Sidebar = () => (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#292333] text-white p-6 space-y-6 z-50">
      <div className="flex items-center justify-center mb-8">
        <img
          src="src/assets/fnr_cropped.jpg"
          alt="Flick N Roll Logo"
          className="h-12"
        />
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setShowInventoryModal(true)}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Package className="w-5 h-5" />
          <span>View Inventory</span>
        </button>
        
        <button
          onClick={() => {
            setEditingBooking(null);
            setShowBookingModal(true);
          }}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Booking</span>
        </button>
        
        <button
          onClick={() => setShowManageBookingsModal(true)}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Edit3 className="w-5 h-5" />
          <span>Manage Bookings</span>
        </button>
        
        <button
          onClick={() => {
            setEditingMember(null);
            setShowMembershipModal(true);
          }}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>Member Management</span>
        </button>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );


  // Keep existing getStatusColor function
  const getStatusColor = (status, isActive) => {
    if (!isActive) return 'bg-red-100 text-red-800';
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Keep existing InventoryModal component
  const InventoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Inventory Status</h2>
          <button onClick={() => setShowInventoryModal(false)} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="space-y-4">
          {inventory.map((item) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-sm text-gray-500">Total: {item.total}</span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                      Available: {item.available}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-200 text-gray-800">
                      In Use: {item.inUse}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(item.available / item.total) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                  <div
                    style={{ width: `${(item.inUse / item.total) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Keep existing CourtModal component
  const CourtModal = ({ court }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{court.name} Settings</h2>
          <button onClick={() => setShowCourtModal(false)} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Court Status</span>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(court.status, court.isActive)}`}>
              {court.status.charAt(0).toUpperCase() + court.status.slice(1)}
            </span>
          </div>
          {court.currentBooking && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Current Booking</h3>
              <p className="text-sm text-gray-600">Time: {court.currentBooking.time}</p>
              <p className="text-sm text-gray-600">Member: {court.currentBooking.member}</p>
            </div>
          )}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Court Availability</span>
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                court.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {court.isActive ? 'Deactivate Court' : 'Activate Court'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Animate the Quick Actions section
  const QuickActions = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {[
        { onClick: () => setShowInventoryModal(true), icon: <Package className="w-5 h-5" />, text: "View Inventory", color: "blue" },
        { onClick: () => setShowBookingModal(true), icon: <Plus className="w-5 h-5" />, text: "New Booking", color: "green" },
        { onClick: () => setShowManageBookingsModal(true), icon: <Edit3 className="w-5 h-5" />, text: "Manage Bookings", color: "purple" },
        { onClick: () => setShowMembershipModal(true), icon: <UserPlus className="w-5 h-5" />, text: "Member Management", color: "orange" }
      ].map((action, index) => (
        <motion.button
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className={`flex items-center justify-center space-x-2 p-4 rounded-lg bg-${action.color}-500 text-white hover:bg-${action.color}-600 transition-colors`}
        >
          {action.icon}
          <span>{action.text}</span>
        </motion.button>
      ))}
    </motion.div>
  );

  // Animate the Stats Grid
  const StatsGrid = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-3 rounded-full bg-gray-50"
              >
                {stat.icon}
              </motion.div>
              <div className="ml-4">
                <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold text-gray-800"
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-500 text-sm">{stat.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              {stat.details.map((detail, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm text-gray-600">{detail.label}</p>
                  <p className="font-semibold text-gray-800">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  // Animate the Court Status Grid
  const CourtStatusGrid = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Court Status</h2>
        <select
          className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm"
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
        >
          <option value="24h">Next 24 hours</option>
          <option value="12h">Next 12 hours</option>
          <option value="6h">Next 6 hours</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {courts.map((court) => (
          <motion.button
            key={court.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCourt(court);
              setShowCourtModal(true);
            }}
            className={`p-4 rounded-lg ${getStatusColor(court.status, court.isActive)} transition-colors`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{court.name}</span>
              {court.isActive ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p className="text-sm">
              {court.status.charAt(0).toUpperCase() + court.status.slice(1)}
            </p>
            {court.currentBooking && (
              <p className="text-xs mt-1">{court.currentBooking.time}</p>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  // Animate the Future Bookings Section
  const FutureBookingsSection = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Future Bookings</h2>
        <div className="flex space-x-2">
          <select
            className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="24h">Next 24 hours</option>
            <option value="12h">Next 12 hours</option>
            <option value="6h">Next 6 hours</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {futureBookings.map((booking, index) => (
              <motion.tr 
                key={booking.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Court {booking.courtId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  // Animate the modals
  const AnimatedModal = ({ isOpen, onClose, children }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Update the main return statement
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-transparent p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Clock className="text-gray-500" />
            <span className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </motion.div>

        <QuickActions />
        <StatsGrid />
        <CourtStatusGrid />
        <FutureBookingsSection />

        <AnimatedModal isOpen={showInventoryModal} onClose={() => setShowInventoryModal(false)}>
          <InventoryModal />
        </AnimatedModal>

        <AnimatedModal isOpen={showCourtModal && selectedCourt} onClose={() => setShowCourtModal(false)}>
          <CourtModal court={selectedCourt} />
        </AnimatedModal>

        <AnimatedModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)}>
          <BookingModal isEdit={!!editingBooking} />
        </AnimatedModal>

        <AnimatedModal isOpen={showMembershipModal} onClose={() => setShowMembershipModal(false)}>
          <MembershipModal isEdit={!!editingMember} />
        </AnimatedModal>

        <AnimatedModal isOpen={showManageBookingsModal} onClose={() => setShowManageBookingsModal(false)}>
          <ManageBookingsModal />
        </AnimatedModal>
      </div>
    </motion.div>
  );
};


export default ManagerDashboard;