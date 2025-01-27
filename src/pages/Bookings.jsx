import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Clock, Users, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addHours, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const Bookings = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [view, setView] = useState('today');
  const [bookings, setBookings] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  // Simulate some existing bookings
  useEffect(() => {
    const mockBookings = {
      [`${format(date, 'yyyy-MM-dd')}-10:00 AM-1`]: { court: 1, bookedBy: 'John Doe' },
      [`${format(date, 'yyyy-MM-dd')}-2:00 PM-2`]: { court: 2, bookedBy: 'Jane Smith' },
      [`${format(date, 'yyyy-MM-dd')}-3:00 PM-3`]: { court: 3, bookedBy: 'Mike Johnson' },
    };
    setBookings(mockBookings);
  }, [date]);

  const generateTimeSlots = (startDate) => {
    const slots = [];
    const currentHour = startDate.getHours();
    
    for (let i = 0; i < 24; i++) {
      const slotTime = addHours(startDate, i);
      if (isSameDay(startDate, slotTime) || view === 'next24') {
        slots.push(format(slotTime, 'h:mm a'));
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(date);

  const getBookedCourts = (time) => {
    const courts = [1, 2, 3, 4];
    return courts.filter(court => bookings[`${format(date, 'yyyy-MM-dd')}-${time}-${court}`]);
  };

  const getAvailableCourts = (time) => {
    const courts = [1, 2, 3, 4];
    return courts.filter(court => !bookings[`${format(date, 'yyyy-MM-dd')}-${time}-${court}`]);
  };

  const handleBooking = () => {
    if (!selectedTime || !selectedCourt) return;

    const bookingKey = `${format(date, 'yyyy-MM-dd')}-${selectedTime}-${selectedCourt}`;
    setBookings(prev => ({
      ...prev,
      [bookingKey]: { court: selectedCourt, bookedBy: 'Current User' }
    }));
    setShowBookingModal(false);
    setSelectedTime(null);
    setSelectedCourt(null);
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

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        Court Bookings
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full rounded-lg border-none"
              tileClassName="rounded-full hover:bg-indigo-100 transition-colors"
            />
            
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setView('today')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  view === 'today' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setView('next24')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  view === 'next24' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Next 24h
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {view === 'today' 
                ? `Bookings for ${format(date, 'MMMM d, yyyy')}`
                : 'Next 24 Hours Bookings'
              }
            </h2>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {timeSlots.map((time, index) => {
                const availableCourts = getAvailableCourts(time);
                const bookedCourts = getBookedCourts(time);
                return (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (availableCourts.length > 0) {
                        setSelectedTime(time);
                        setShowBookingModal(true);
                      }
                    }}
                    className="p-5 rounded-xl bg-gray-50 border-2 border-transparent hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-800 font-medium">{time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-600">
                          {availableCourts.length} available
                        </span>
                      </div>
                    </div>

                    {/* Booked Courts Section */}
                    {bookedCourts.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <div className="text-sm font-medium text-gray-500">Booked Courts:</div>
                        {bookedCourts.map(court => {
                          const bookingKey = `${format(date, 'yyyy-MM-dd')}-${time}-${court}`;
                          const booking = bookings[bookingKey];
                          return (
                            <div 
                              key={court}
                              className="flex items-center justify-between bg-indigo-50 rounded-lg p-2 text-sm"
                            >
                              <span className="text-indigo-600">Court {court}</span>
                              <span className="text-gray-600">{booking.bookedBy}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Available Courts Indicator */}
                    {availableCourts.length > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-500">Available Courts:</div>
                        <div className="flex gap-2 mt-1">
                          {availableCourts.map(court => (
                            <span 
                              key={court}
                              className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-sm"
                            >
                              Court {court}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4">Book a Court</h3>
              <p className="text-gray-600 mb-4">
                Selected time: {selectedTime} on {format(date, 'MMMM d, yyyy')}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {getAvailableCourts(selectedTime).map(court => (
                  <button
                    key={court}
                    onClick={() => setSelectedCourt(court)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCourt === court
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    Court {court}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedCourt}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCourt
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  } transition-colors`}
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookings;