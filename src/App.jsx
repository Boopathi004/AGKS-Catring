import React, { useState } from 'react';
import ThreeLoader from './components/ThreeLoader';
import MenuViewer from './components/MenuViewer';
import BookingForm from './components/BookingForm';
import { Leaf, Flame, Sparkles, Phone, Compass, Award, CheckCircle, MapPin } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading]           = useState(true);
  const [language,  setLanguage]            = useState('en');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [expandedFAQ, setExpandedFAQ]       = useState(null);

  const toggleLanguage = () => setLanguage(p => p === 'en' ? 'ta' : 'en');

  const handleBookingSuccess = (data) => {
    setBookingSuccess(data);
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* ── Cinematic 3-D Spice Loader ── */}
      {isLoading && <ThreeLoader onComplete={() => setIsLoading(false)} />}

      {/* ── Main App ── */}
      {!isLoading && (
        <div className="app-container">
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/918220627025?text=Hello%20AGKS%20Catering,%20I%20would%20like%20to%20enquire%20about%20your%20catering%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.115-2.905-6.99C16.552 1.876 14.079.845 11.44.845 6.002.845 1.577 5.263 1.574 10.702c-.001 1.702.447 3.366 1.299 4.803l-.999 3.648 3.738-.98c1.378.75 2.82 1.144 4.445 1.147zM17.487 14.39c-.3-.15-1.781-.879-2.057-.98-.277-.101-.48-.15-.68.15-.2.3-.779.98-.956 1.18-.178.2-.355.226-.655.076-1.84-.93-2.927-1.758-3.86-3.35-.256-.442.256-.41.73-.9l.287-.384c.08-.107.12-.22.18-.328.06-.11.03-.21-.015-.31-.045-.1-.4-.967-.55-1.32-.143-.349-.302-.302-.413-.302h-.352c-.22 0-.58.08-.88.41-.3.33-1.15 1.122-1.15 2.738 0 1.617 1.176 3.177 1.34 3.398.163.22 2.302 3.512 5.578 4.92.778.336 1.388.536 1.86.686.782.249 1.493.214 2.055.13.627-.094 1.781-.727 2.03-1.43.25-.703.25-1.303.175-1.43-.075-.127-.275-.202-.575-.352z"/>
            </svg>
          </a>

          {/* ── Header ── */}
          <header>
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <img 
                src="/logo_chef.jpg" 
                alt="AGKS Logo" 
                style={{ 
                  height: '38px', 
                  width: '38px', 
                  borderRadius: '50%', 
                  border: '2px solid var(--color-gold)', 
                  objectFit: 'cover',
                  boxShadow: '0 0 8px rgba(212,175,55,0.4)' 
                }} 
              />
              <div className="logo-text">
                <h1>AGKS CATERING</h1>
                <p>The Modern Tradition</p>
              </div>
            </div>

            <nav className="nav-actions">
              <a href="#menus" className="btn btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                {language === 'en' ? 'Menus' : 'மெனுக்கள்'}
              </a>
              <a href="#booking-section" className="btn btn-primary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                {language === 'en' ? 'Get a Quote' : 'விசாரணை'}
              </a>
              <button className="toggle-lang-btn" onClick={toggleLanguage}>
                {language === 'en' ? 'தமிழ்' : 'English'}
              </button>
            </nav>
          </header>

          {/* ── Hero ── */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>
                  {language === 'en'
                    ? 'Premium South Indian Catering in Dindigul — Veg & Non-Veg'
                    : 'திண்டுக்கல்லில் பாரம்பரிய தென்னிந்திய சமையல் — சைவம் & அசைவம்'}
                </span>
              </div>

              <h2>
                {language === 'en' ? (
                  <>A Culinary Blend of <span>Tradition</span> and <span>Modernity</span> in Dindigul</>
                ) : (
                  <>திண்டுக்கல்லில் பாரம்பரிய சுவை <span>நவீன</span> <span>உபசரிப்பில்</span></>
                )}
              </h2>

              <p>
                {language === 'en'
                  ? 'AGKS Catering offers premium Veg & Non-Veg feast experiences for weddings, Valakappu, engagements, and cultural events across Dindigul, Palani, Madurai, and surrounding regions. Build your custom banana-leaf wishlist and send us an enquiry — our manager will call you with a personalised quote.'
                  : 'AGKS கேட்டரிங் திண்டுக்கல், பழனி, மதுரை மற்றும் சுற்றியுள்ள பகுதிகளில் திருமணம், வளைகாப்பு, நிச்சயதார்த்தம் மற்றும் அனைத்து கலாச்சார நிகழ்ச்சிகளுக்கும் உயர்தர சைவ & அசைவ விருந்து அனுபவத்தை வழங்குகிறது. உங்கள் வாழை இலை விஷ்லிஸ்டை உருவாக்கி விசாரணை அனுப்புங்கள் — எங்கள் மேலாளர் தொடர்பு கொள்வார்கள்.'}
              </p>

              <div className="hero-actions">
                <a href="#booking-section" className="btn btn-green" style={{ textDecoration: 'none' }}>
                  {language === 'en' ? 'Build Your Leaf & Enquire' : 'இலை அமைத்து விசாரணை செய்க'}
                </a>
                <a href="#menus" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                  {language === 'en' ? 'Explore Menus' : 'மெனுவை ஆராய்க'}
                </a>
              </div>

              <div className="feature-badge">
                <Flame size={14} />
                <span>
                  {language === 'en'
                    ? 'Hover over any menu item below to reveal its aroma & flavour story!'
                    : 'கீழுள்ள மெனு உணவுகளின் நறுமணத்தை அறிய ஹவர் செய்யுங்கள்!'}
                </span>
              </div>
            </div>

            {/* ── Banana Leaf Feast Image ── */}
            <div className="leaf-hero-visual">
              {/* Outer glow ring */}
              <div className="leaf-hero-glow" />

              {/* Main image card */}
              <div className="leaf-hero-card">
                <img
                  src="/banana_leaf_meal.png"
                  alt="Traditional South Indian Banana Leaf Feast"
                  className="leaf-hero-img"
                />
                {/* Vignette overlay */}
                <div className="leaf-hero-vignette" />

                {/* Steam fog rising from the food */}
                <div className="leaf-steam-wrap">
                  <div className="steam-cloud c1" />
                  <div className="steam-cloud c2" />
                  <div className="steam-cloud c3" />
                  <div className="steam-cloud c4" />
                  <div className="steam-cloud c5" />
                  <div className="steam-cloud c6" />
                  <div className="steam-cloud c7" />
                  <div className="steam-cloud c8" />
                </div>

                {/* Floating label badge */}
                <div className="leaf-hero-badge">
                  <span>🍃</span>
                  <span>{language === 'en' ? 'Served on Banana Leaf' : 'வாழை இலையில் பரிமாறப்படும்'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Special Offers ── */}
          <section className="offers-section">
            <div className="offers-title">
              <span className="sparkle-icon">✨</span>
              <h3>
                {language === 'en' ? 'Exclusive ' : 'பிரத்தியேக '}
                <span>{language === 'en' ? 'Special Offers' : 'சிறப்பு சலுகைகள்'}</span>
              </h3>
            </div>
            
            <div className="offers-grid">
              {/* Offer 1: Bulk booking */}
              <div className="offer-card bulk-booking-card">
                <div className="offer-badge pulse-badge">{language === 'en' ? '🔥 SUPER DEAL' : '🔥 சூப்பர் சலுகை'}</div>
                <div className="offer-icon-wrapper">
                  <Award size={36} className="animated-icon float-icon" />
                </div>
                <div className="offer-content">
                  <h4>{language === 'en' ? 'Grand Feast Bonus' : 'பெருவிருந்து போனஸ்'}</h4>
                  <p className="offer-main-text">
                    {language === 'en' ? (
                      <>Book for <span className="highlight-text">500+ Guests</span> & get <span className="highlight-text-green">50 Guests Food FREE!</span></>
                    ) : (
                      <><span className="highlight-text">500+ பேருக்கு</span> மேல் புக் செய்தால் <span className="highlight-text-green">50 பேருக்கு உணவு இலவசம்!</span></>
                    )}
                  </p>
                  <p className="offer-sub-text">
                    {language === 'en' ? '*Applicable on all grand wedding feast packages.' : '*அனைத்து திருமண விருந்து தொகுப்புகளுக்கும் பொருந்தும்.'}
                  </p>
                </div>
                <div className="card-shine" />
              </div>

              {/* Offer 2: Daily Curries */}
              <div className="offer-card daily-curry-card">
                <div className="offer-badge fresh-badge">{language === 'en' ? '⚡ 2-HOUR READY' : '⚡ 2-மணிநேரத் தயார்'}</div>
                <div className="offer-icon-wrapper">
                  <Leaf size={36} className="animated-icon float-icon-delay" />
                </div>
                <div className="offer-content">
                  <h4>{language === 'en' ? 'Daily Instant Meals' : 'தினசரி உடனடி உணவு'}</h4>
                  <p className="offer-main-text">
                    {language === 'en' ? (
                      <>Fresh <span className="highlight-text">White Rice</span> & all types of <span className="highlight-text-gold">Curries (Kulambu)</span> available daily.</>
                    ) : (
                      <>சுடச்சுட <span className="highlight-text">வெள்ளை சாதம்</span> & அனைத்து வகை <span className="highlight-text-gold">குழம்புகளும்</span> தினசரி கிடைக்கும்.</>
                    )}
                  </p>
                  <p className="offer-sub-text-accent">
                    {language === 'en' ? '📢 Inform us just 2 hours before — we will have it ready!' : '📢 2 மணி நேரத்திற்கு முன் சொன்னால் போதும் — தயார் செய்து தருவோம்!'}
                  </p>
                </div>
                <div className="card-shine" />
              </div>
            </div>
          </section>

          {/* ── Value Cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {[
              {
                icon: <Compass size={24} />,
                bg: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)',
                titleEN: 'Valarpirai Muhurtham', titleTA: 'வளர்பிறை முகூர்த்தம்',
                descEN:  'Auspicious date highlights on the booking calendar.',
                descTA:  'முகூர்த்த நாட்கள் தனிப்படுத்தப்பட்ட நாட்காட்டி.',
              },
              {
                icon: <Award size={24} />,
                bg: 'rgba(46,125,50,0.1)', color: 'var(--color-green-light)',
                titleEN: 'Veg & Non-Veg Feasts', titleTA: 'சைவம் & அசைவம்',
                descEN:  'Full range of traditional menus for every occasion.',
                descTA:  'அனைத்து விழாக்களுக்கும் பாரம்பரிய உணவு வகைகள்.',
              },
              {
                icon: <Phone size={24} />,
                bg: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)',
                titleEN: 'Enquiry-Based Booking', titleTA: 'விசாரணை அடிப்படை முன்பதிவு',
                descEN:  'No fixed prices — get a personalised quote from our manager.',
                descTA:  'நிலையான விலை இல்லை — தனிப்பட்ட மதிப்பீட்டை பெறுங்கள்.',
              },
              {
                icon: <MapPin size={24} />,
                bg: 'rgba(76,175,80,0.1)', color: 'var(--color-green-light)',
                titleEN: 'Dindigul Service Area', titleTA: 'திண்டுக்கல் & சுற்றுவட்டாரம்',
                descEN:  'Serving Dindigul, Palani, Madurai, Trichy, and surrounding regions.',
                descTA:  'திண்டுக்கல், பழனி, மதுரை, திருச்சி மற்றும் சுற்றியுள்ள பகுதிகள்.',
              },
            ].map(c => (
              <div key={c.titleEN} className="glass-card"
                style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: c.bg, color: c.color, padding: '0.75rem', borderRadius: '12px', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    {language === 'en' ? c.titleEN : c.titleTA}
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    {language === 'en' ? c.descEN : c.descTA}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Menu Viewer ── */}
          <MenuViewer language={language} />

          {/* ── Booking / Enquiry Section ── */}
          <div id="booking-section" style={{ padding: '4rem 0' }}>
            <div className="section-header">
              <h3>
                {language === 'en' ? 'Interactive Enquiry ' : 'ஊடாடும் விசாரணை '}
                <span>{language === 'en' ? 'Wizard' : 'வழிகாட்டி'}</span>
              </h3>
              <p>
                {language === 'en'
                  ? 'Select your event date, build your banana-leaf wishlist, choose add-on services, and see an estimated raw material breakdown — then submit for a personalised quote.'
                  : 'நிகழ்ச்சி தேதி தேர்ந்தெடுத்து, வாழை இலை விஷ்லிஸ்ட் உருவாக்கி, கூடுதல் சேவைகளைத் தேர்ந்தெடுத்து, மூலப்பொருள் மதிப்பீட்டைப் பார்த்து, தனிப்பட்ட மதிப்பீட்டிற்கு விசாரணை அனுப்பவும்.'}
              </p>
            </div>

            {bookingSuccess ? (
              /* ── Success Card ── */
              <div className="glass-card success-card">
                <div className="success-icon-wrapper">
                  <CheckCircle size={40} />
                </div>
                <h3>
                  {language === 'en'
                    ? 'Enquiry Submitted Successfully!'
                    : 'விசாரணை வெற்றிகரமாக அனுப்பப்பட்டது!'}
                </h3>
                <p>
                  {language === 'en'
                    ? `Thank you, ${bookingSuccess.name}. We have registered your enquiry for a ${bookingSuccess.eventType.toUpperCase()} event on ${bookingSuccess.selectedDate} for ${bookingSuccess.guestCount} guests${bookingSuccess.isMuhurthamDate ? ' (★ Auspicious Muhurtham Date)' : ''}. Our catering manager will contact you within 2–4 hours.`
                    : `நன்றி, ${bookingSuccess.name}. ${bookingSuccess.selectedDate} அன்றைய ${bookingSuccess.guestCount} விருந்தினர்களுக்கான உங்கள் விசாரணை பெறப்பட்டது. எங்கள் மேலாளர் 2–4 மணி நேரத்தில் தொடர்பு கொள்வார்கள்.`}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-green" onClick={() => setBookingSuccess(null)}>
                    {language === 'en' ? 'Submit Another Enquiry' : 'மேலும் ஒரு விசாரணை'}
                  </button>
                  <a href="#menus" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                    {language === 'en' ? 'Back to Menus' : 'மெனுக்களுக்குத் திரும்பு'}
                  </a>
                </div>
              </div>
            ) : (
              <BookingForm language={language} onBookingSuccess={handleBookingSuccess} />
            )}
          </div>

          {/* ── Service Areas (GEO Targeting) ── */}
          <section className="service-areas-section" style={{ padding: '2rem 0 4rem' }}>
            <div className="section-header">
              <h3>
                {language === 'en' ? 'Our Service ' : 'எங்கள் சேவை '}
                <span>{language === 'en' ? 'Locations' : 'பகுதிகள்'}</span>
              </h3>
              <p>
                {language === 'en'
                  ? 'We provide premium catering services across the Dindigul district and neighboring regions. Hosting a wedding or housewarming? We serve at your venue!'
                  : 'திண்டுக்கல் மாவட்டம் மற்றும் அதைச் சுற்றியுள்ள பகுதிகளில் உயர்தர கேட்டரிங் சேவைகளை வழங்குகிறோம். விழா மண்டபம் அல்லது இல்லம் — உங்கள் இடத்திற்கே வந்து பரிமாறுகிறோம்!'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-gold)' }}>
                <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} /> Dindigul Central
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  {language === 'en'
                    ? 'Serving Dindigul City, Vedasanthur, Vadamadurai, Natham, Batlagundu, and all local wedding mandapams.'
                    : 'திண்டுக்கல் நகரம், வேடசந்தூர், வடமதுரை, நத்தம், வத்தலக்குண்டு மற்றும் அனைத்து திருமண மண்டபங்களுக்கும் சமையல் சேவை.'}
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-green-light)' }}>
                <h4 style={{ color: 'var(--color-green-light)', fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} /> Palani & Oddanchatram
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  {language === 'en'
                    ? 'Providing traditional feasts for temple events, marriages, and family rituals in Palani, Oddanchatram, and Kodaikanal foothills.'
                    : 'பழனி, ஒட்டன்சத்திரம் மற்றும் கொடைக்கானல் அடிவாரப் பகுதிகளில் நடைபெறும் சுபநிகழ்ச்சிகளுக்கு பாரம்பரிய அசைவ & சைவ விருந்துகள்.'}
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-gold)' }}>
                <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} /> Madurai & Trichy Borders
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  {language === 'en'
                    ? 'Extending our premium catering and banana-leaf feasts to wedding halls on the Madurai and Tiruchirappalli district borders.'
                    : 'மதுரை மற்றும் திருச்சிராப்பள்ளி மாவட்ட எல்லைகளில் உள்ள விழா மண்டபங்களுக்கும் எங்களின் உயர்தர வாழை இலை கேட்டரிங் சேவை.'}
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ Section (SEO/Lead Gen) ── */}
          <section className="faq-section" style={{ padding: '2rem 0 4rem' }}>
            <div className="section-header">
              <h3>
                {language === 'en' ? 'Frequently Asked ' : 'அடிக்கடி கேட்கப்படும் '}
                <span>{language === 'en' ? 'Questions' : 'கேள்விகள்'}</span>
              </h3>
              <p>
                {language === 'en'
                  ? 'Got questions about our catering service in Dindigul? Find quick answers below or contact our manager directly.'
                  : 'எங்கள் கேட்டரிங் சேவை பற்றிய கேள்விகளுக்கான பதில்களை கீழே காணலாம். அல்லது நேரடியாக எங்களைத் தொடர்பு கொள்ளவும்.'}
              </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  id: 1,
                  qEN: 'Which areas in Dindigul does AGKS Catering serve?',
                  qTA: 'திண்டுக்கல்லில் எந்தெந்த பகுதிகளில் சேவை வழங்குகிறீர்கள்?',
                  aEN: 'We serve the entire Dindigul district including Dindigul City, Palani, Oddanchatram, Kodaikanal, Batlagundu, Vedasanthur, Vadamadurai, Natham, and surrounding villages. We also cater events in neighboring Madurai and Trichy.',
                  aTA: 'திண்டுக்கல் நகரம், பழனி, ஒட்டன்சத்திரம், கொடைக்கானல், வத்தலக்குண்டு, வேடசந்தூர், வடமதுரை, நத்தம் மற்றும் சுற்றியுள்ள கிராமங்கள் உட்பட திண்டுக்கல் மாவட்டம் முழுவதும் சேவை செய்கிறோம். மேலும் மதுரை, திருச்சி எல்லைகளுக்கும் சேவை செய்கிறோம்.'
                },
                {
                  id: 2,
                  qEN: 'What is the minimum guest count for booking?',
                  qTA: 'முன்பதிவு செய்வதற்கான குறைந்தபட்ச நபர் எண்ணிக்கை என்ன?',
                  aEN: 'We accept bookings for events starting from a minimum of 50 guests. We cater for grand weddings with 1000+ guests as well as small housewarming ceremonies and family gatherings.',
                  aTA: 'குறைந்தபட்சம் 50 நபர்கள் கொண்ட சிறிய நிகழ்ச்சிகள் முதல் 1000+ நபர்கள் வரையிலான பிரம்மாண்டமான திருமண விழாக்கள் வரை அனைத்து சுப நிகழ்ச்சிகளுக்கும் சிறந்த முறையில் சமையல் செய்து தருகிறோம்.'
                },
                {
                  id: 3,
                  qEN: 'Do you provide both Vegetarian and Non-Vegetarian menus?',
                  qTA: 'உங்களிடம் சைவம் மற்றும் அசைவம் ஆகிய இரு வகை உணவுகளும் கிடைக்குமா?',
                  aEN: 'Yes, we specialize in both traditional Vegetarian and flavorful Non-Vegetarian South Indian feasts. For auspicious occasions like Valakappu or Housewarming, we provide 100% vegetarian menus.',
                  aTA: 'ஆம், எங்களிடம் பாரம்பரிய சைவ விருந்து மற்றும் சுவையான அசைவ விருந்து ஆகிய இரண்டும் சிறந்த முறையில் கிடைக்கும். வளைகாப்பு, கிரகப்பிரவேசம் போன்ற சுப தினங்களுக்கு 100% தூய சைவ மெனுக்களை வழங்குகிறோம்.'
                },
                {
                  id: 4,
                  qEN: 'How can I get a price quote for my event?',
                  qTA: 'எனது நிகழ்ச்சிக்கு எவ்வாறு விலை மதிப்பீடு பெறுவது?',
                  aEN: 'Since we customize every menu based on your wishlist and guest count, we do not have a fixed per-leaf price. You can use our interactive Enquiry Wizard to build your banana leaf wishlist and submit it via WhatsApp to receive a personalized quote in 2 hours.',
                  aTA: 'ஒவ்வொரு சுப நிகழ்ச்சியிலும் உங்களது விருப்பத்திற்கேற்ப உணவுகள் மாறுபடுவதால் நிலையான விலை இல்லை. எங்களின் இலை விஷ்லிஸ்ட் வழிகாட்டியைப் பயன்படுத்தி வேண்டிய உணவுகளைத் தேர்ந்தெடுத்து வாட்ஸ்அப்பில் அனுப்பினால், 2 மணிநேரத்தில் உங்களுக்கான தனிப்பட்ட மதிப்பீட்டைத் தருவோம்.'
                }
              ].map(item => {
                const isOpen = expandedFAQ === item.id;
                return (
                  <div key={item.id} className={`faq-card glass-card ${isOpen ? 'active' : ''}`} style={{ overflow: 'hidden' }}>
                    <button 
                      onClick={() => setExpandedFAQ(isOpen ? null : item.id)}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#fff',
                        gap: '1rem'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: isOpen ? 'var(--color-gold-light)' : '#fff' }}>
                        {language === 'en' ? item.qEN : item.qTA}
                      </span>
                      <span style={{ color: 'var(--color-gold)', transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                      </span>
                    </button>
                    <div 
                      style={{
                        maxHeight: isOpen ? '250px' : '0px',
                        transition: 'max-height 0.3s cubic-bezier(0, 1, 0, 1), padding 0.3s ease',
                        padding: isOpen ? '0 1.5rem 1.25rem' : '0 1.5rem',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        borderTop: isOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        paddingTop: isOpen ? '1rem' : '0px'
                      }}
                    >
                      <p>{language === 'en' ? item.aEN : item.aTA}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="app-footer">
            <div className="footer-links">
              <a href="#menus">{language === 'en' ? 'Our Feasts'   : 'விருந்துகள்'}</a>
              <a href="#booking-section">{language === 'en' ? 'Enquiry Wizard' : 'விசாரணை வழிகாட்டி'}</a>
              <a href="#booking-section">{language === 'en' ? 'Muhurtham Days' : 'முகூர்த்த நாட்கள்'}</a>
            </div>
            <div className="footer-copy">
              <p>
                © {new Date().getFullYear()} <span>AGKS Catering Service</span>.
                {' '}{language === 'en' ? 'All Rights Reserved.' : 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
              </p>
            </div>
          </footer>

        </div>
      )}
    </>
  );
}
