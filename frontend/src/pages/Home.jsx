import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import BookingForm from '../components/BookingForm'
import TrackStatusModal from '../components/TrackStatusModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const navigate = useNavigate();

  const openBooking = (eventType) => {
    setSelectedEvent(eventType);
    setIsModalOpen(true);
  };

  // Handler for gallery navigation
  const handleViewFullGallery = () => {
    navigate('/gallery');
  };

  return (
    <>
      {/* Prop passed to enable HeroSection booking functionality and tracking mechanisms */}
      <HeroSection onInquire={openBooking} onTrack={() => setIsTrackModalOpen(true)} />
      {/* Services component configured to trigger openBooking */}
      <Services onInquire={openBooking} />
      {/* Gallery component configured with view full gallery handler */}
      <Gallery onViewFullGallery={handleViewFullGallery} />
      <Footer />

      {/* Modal rendered conditionally does not interfere with the layout flow */}
      {isModalOpen && (
        <BookingForm 
          onClose={() => setIsModalOpen(false)} 
          eventType={selectedEvent} 
        />
      )}

      {/* Public Tracking Interface Panel Backdrop Overlay Layer */}
      {isTrackModalOpen && (
        <TrackStatusModal 
          onClose={() => setIsTrackModalOpen(false)} 
        />
      )}
    </>
  )
}
