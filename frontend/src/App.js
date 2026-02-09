import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import DevoteeAuth from "@/pages/DevoteeAuth";
import SevaList from "@/pages/SevaList";
import SevaBooking from "@/pages/SevaBooking";
import BookingTicket from "@/pages/BookingTicket";
import MyBookings from "@/pages/MyBookings";
import Donations from "@/pages/Donations";
import DonationReceipt from "@/pages/DonationReceipt";
import Accommodation from "@/pages/Accommodation";
import AccommodationBooking from "@/pages/AccommodationBooking";
import AboutTemple from "@/pages/AboutTemple";
import Gallery from "@/pages/Gallery";
import TicketLookup from "@/pages/TicketLookup";
import NewsPage from "@/pages/NewsPage";
import LiveTV from "@/pages/LiveTV";
import VideoGallery from "@/pages/VideoGallery";
import ContactUs from "@/pages/ContactUs";
import FAQ from "@/pages/FAQ";
import Volunteer from "@/pages/Volunteer";
import QuickBooking from "@/pages/QuickBooking";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminSevas from "@/pages/admin/Sevas";
import AdminProfiles from "@/pages/admin/Profiles";
import AdminSlots from "@/pages/admin/Slots";
import AdminBookings from "@/pages/admin/Bookings";
import AdminDevotees from "@/pages/admin/Devotees";
import AdminNews from "@/pages/admin/News";
import AdminAccommodations from "@/pages/admin/Accommodations";
import AdminGallery from "@/pages/admin/GalleryAdmin";
import AdminDonations from "@/pages/admin/Donations";
import "@/App.css";

function ProtectedDevotee({ children }) {
  const { user, userType, loading } = useAuth();
  if (loading) return null;
  if (!user || userType !== 'devotee') return <Navigate to="/login" />;
  return children;
}

function ProtectedAdmin({ children }) {
  const { user, userType, loading } = useAuth();
  if (loading) return null;
  if (!user || userType !== 'admin') return <Navigate to="/admin/login" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<DevoteeAuth />} />
          <Route path="/register" element={<DevoteeAuth isRegister />} />
          <Route path="/auth/sign-in" element={<DevoteeAuth />} />
          <Route path="/auth/sign-up" element={<DevoteeAuth isRegister />} />
          <Route path="/about" element={<AboutTemple />} />
          <Route path="/sevas" element={<SevaList />} />
          <Route path="/sevas/pratyaksha" element={<SevaList />} />
          <Route path="/sevas/paroksha" element={<SevaList paroksha />} />
          <Route path="/paroksha-seva" element={<SevaList paroksha />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/donations/:type" element={<Donations />} />
          <Route path="/donations/e-hundi" element={<Donations />} />
          <Route path="/donations/annadanam" element={<Donations />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/media/gallery/photos" element={<Gallery />} />
          <Route path="/media/gallery/videos" element={<VideoGallery />} />
          <Route path="/media/live-tv" element={<LiveTV />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/media/news" element={<NewsPage />} />
          <Route path="/print-ticket" element={<TicketLookup />} />
          <Route path="/support/contact" element={<ContactUs />} />
          <Route path="/support/faq" element={<FAQ />} />
          <Route path="/support/helpdesk" element={<ContactUs />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/booking/quick" element={<QuickBooking />} />
          <Route path="/booking/seva" element={<SevaList />} />
          <Route path="/booking/darshan" element={<SevaList />} />
          <Route path="/donation-receipt/:donationId" element={<DonationReceipt />} />
          {/* Protected Devotee */}
          <Route path="/book/:sevaId" element={<ProtectedDevotee><SevaBooking /></ProtectedDevotee>} />
          <Route path="/ticket/:bookingId" element={<ProtectedDevotee><BookingTicket /></ProtectedDevotee>} />
          <Route path="/my-bookings" element={<ProtectedDevotee><MyBookings /></ProtectedDevotee>} />
          <Route path="/accommodation/book/:accId" element={<ProtectedDevotee><AccommodationBooking /></ProtectedDevotee>} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="/admin/sevas" element={<ProtectedAdmin><AdminSevas /></ProtectedAdmin>} />
          <Route path="/admin/profiles" element={<ProtectedAdmin><AdminProfiles /></ProtectedAdmin>} />
          <Route path="/admin/slots" element={<ProtectedAdmin><AdminSlots /></ProtectedAdmin>} />
          <Route path="/admin/bookings" element={<ProtectedAdmin><AdminBookings /></ProtectedAdmin>} />
          <Route path="/admin/devotees" element={<ProtectedAdmin><AdminDevotees /></ProtectedAdmin>} />
          <Route path="/admin/news" element={<ProtectedAdmin><AdminNews /></ProtectedAdmin>} />
          <Route path="/admin/accommodations" element={<ProtectedAdmin><AdminAccommodations /></ProtectedAdmin>} />
          <Route path="/admin/gallery" element={<ProtectedAdmin><AdminGallery /></ProtectedAdmin>} />
          <Route path="/admin/donations" element={<ProtectedAdmin><AdminDonations /></ProtectedAdmin>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
