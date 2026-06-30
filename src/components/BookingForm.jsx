import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin, ChevronRight, ChevronLeft, ArrowRight, Download, Check, ClipboardList } from 'lucide-react';
import BananaLeafBuilder from './BananaLeafBuilder';
import { generateEnquiryPDF } from '../utils/pdfGenerator';

// ─── Raw Material Estimation constants (per 100 guests) ─────────────────────
const RAW_MATERIAL_GUIDE = [
  { labelEN: 'Biryani Rice',      labelTA: 'பிரியாணி அரிசி',    minKg: 12, maxKg: 15, unit: 'kg',     note: 'Based on 150g/person' },
  { labelEN: 'Meat (Chicken/Mutton)', labelTA: 'இறைச்சி',        minKg: 15, maxKg: 18, unit: 'kg',     note: 'Bone-in standard cuts' },
  { labelEN: 'Variety Rice (7 types)', labelTA: 'வகை சாதம்',     minKg: 10, maxKg: 10, unit: 'kg',     note: 'Distributed across 7 types' },
  { labelEN: 'Sambar / Gravy',    labelTA: 'சாம்பார் / கூட்டு',   minKg: 15, maxKg: 20, unit: 'Litres', note: '' },
  { labelEN: 'Dessert (Halwa / Payasam)', labelTA: 'இனிப்பு',    minKg: 8,  maxKg: 10, unit: 'Litres', note: '' },
  { labelEN: 'Water (Serving + Drinking)', labelTA: 'தண்ணீர்',   minKg: 50, maxKg: 60, unit: 'Litres', note: 'Including serving and drinking' },
];

// ─── Checklist data ──────────────────────────────────────────────────────────
const CHECKLISTS = {
  breakfast: {
    titleEN: 'Breakfast Checklist',
    titleTA: 'காலை உணவு சோதனைப் பட்டியல்',
    items: [
      { id: 'mini_idli_vada',    en: 'Mini Idli & Medhu Vada',                 ta: 'மினி இட்லி & மெது வடை' },
      { id: 'ghee_pongal',       en: 'Ghee Pongal & Sambar',                   ta: 'நெய் பொங்கல் & சாம்பார்' },
      { id: 'chutneys',          en: 'Variety Chutneys (Coconut, Tomato, Mint)',ta: 'தேங்காய், தக்காளி, புதினா சட்னி' },
      { id: 'filter_coffee',     en: 'Filter Coffee / Tea Counter',             ta: 'பில்டர் காபி / டீ கவுண்டர்' },
      { id: 'live_dosa',         en: 'Live Dosa Counter (Podi, Masala)',        ta: 'நேரடி தோசை கவுண்டர் (பொடி, மசாலா)' },
    ]
  },
  reception: {
    titleEN: 'Evening Reception Checklist',
    titleTA: 'மாலை வரவேற்பு சோதனைப் பட்டியல்',
    items: [
      { id: 'welcome_drink',  en: 'Welcome Drink (Rose Milk / Fruit Punch)',   ta: 'வரவேற்பு பானம் (ரோஸ் மில்க் / பஞ்ச்)' },
      { id: 'live_chaat',     en: 'Live Chaat Counter (Pani Puri, Bhel)',      ta: 'நேரடி சாட் கவுண்டர் (பானி பூரி, பேல்)' },
      { id: 'cutlets',        en: 'Veg / Chicken Cutlets',                     ta: 'வெஜ் / சிக்கன் கட்லெட்' },
      { id: 'special_sweets', en: 'Special Sweets (Kaju Katli / Basundi)',     ta: 'ஸ்பெஷல் இனிப்பு (கஜு கட்லி / பசுந்தி)' },
      { id: 'ice_cream',      en: 'Ice Cream Counter with Toppings',           ta: 'ஐஸ்கிரீம் கவுண்டர்' },
    ]
  },
  bangle: {
    titleEN: 'Bangle Ritual Essentials',
    titleTA: 'வளைகாப்பு அத்தியாவசியங்கள்',
    items: [
      { id: 'glass_bangles',  en: 'Glass Bangles (Multiple colors & sizes)',   ta: 'கண்ணாடி வளையல்கள் (பல நிறங்கள்)' },
      { id: 'sandalwood',     en: 'Sandalwood Paste & Kumkum',                 ta: 'சந்தனம் & குங்குமம்' },
      { id: 'turmeric',       en: 'Turmeric & Flowers (Jasmine strings)',      ta: 'மஞ்சள் & மல்லிகை மாலைகள்' },
      { id: 'thamboolam',     en: 'Thamboolam Bags (Betel, nuts, coconut)',    ta: 'தாம்பூலம் பை (வெற்றிலை, பாக்கு, தேங்காய்)' },
    ]
  }
};

// ─── Muhurtham calendar helpers ──────────────────────────────────────────────
const MUHURTHAM_DAYS = [5, 10, 13, 19, 24, 29];
const CALENDAR_CELLS = [
  { day: null }, { day: null }, { day: null },
  ...[...Array(31)].map((_, i) => ({
    day: i + 1,
    isMuhurtham: MUHURTHAM_DAYS.includes(i + 1),
  }))
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingForm({ language, onBookingSuccess }) {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [eventType, setEventType] = useState('wedding');
  const [guestCount, setGuestCount] = useState(150);
  const [selectedDate, setSelectedDate] = useState('2026-07-10');
  const [venue, setVenue] = useState('');

  // Step 2 state — Banana Leaf wishlist (multi-select: each category stores an array)
  const EMPTY_DISHES = {
    drinks: [], sweet: [], starter: [], mainRice: [],
    gravy: [], egg: [], closing: [],
  };
  const [selectedDishes, setSelectedDishes] = useState(EMPTY_DISHES);

  // Step 3 state — Checklists
  const [checkedItems, setCheckedItems] = useState({});

  // Step 4 state — Contact
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // ── Helpers ──────────────────────────────────────────────────────────────
  const isSelectedDate = (day) => {
    if (!day) return false;
    return selectedDate === `2026-07-${day < 10 ? '0' + day : day}`;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(`2026-07-${day < 10 ? '0' + day : day}`);
  };

  // Toggle item in/out of the category's array
  const handleSelectItem = (slotId, option) => {
    setSelectedDishes(prev => {
      const current = prev[slotId] || [];
      const exists = current.some(i => i.id === option.id);
      return {
        ...prev,
        [slotId]: exists
          ? current.filter(i => i.id !== option.id)   // deselect
          : [...current, option],                       // add
      };
    });
  };

  const handleResetItems = () => setSelectedDishes(EMPTY_DISHES);

  const toggleCheckItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  // Quantity estimator
  const factor = guestCount / 100;
  const estimatedMaterials = RAW_MATERIAL_GUIDE.map(row => ({
    ...row,
    minVal: (row.minKg * factor).toFixed(1),
    maxVal: (row.maxKg * factor).toFixed(1),
  }));

  const isMuhurthamDate = MUHURTHAM_DAYS.includes(parseInt(selectedDate.split('-')[2]));

  const checkedAddonLabels = Object.entries(checkedItems)
    .filter(([, v]) => v)
    .map(([id]) => {
      for (const cat of Object.values(CHECKLISTS)) {
        const found = cat.items.find(i => i.id === id);
        if (found) return language === 'en' ? found.en : found.ta;
      }
      return id;
    });

  // Flatten all arrays into a flat list of selected dish names (language-aware, for UI display)
  const wishlistSummary = Object.values(selectedDishes)
    .flat()
    .filter(Boolean)
    .map(d => language === 'en' ? d.en : d.ta);

  // English-only versions for PDF (jsPDF cannot render Tamil Unicode with standard fonts)
  const wishlistSummaryEN = Object.values(selectedDishes)
    .flat()
    .filter(Boolean)
    .map(d => d.en);

  const checkedAddonLabelsEN = Object.entries(checkedItems)
    .filter(([, v]) => v)
    .map(([id]) => {
      for (const cat of Object.values(CHECKLISTS)) {
        const found = cat.items.find(i => i.id === id);
        if (found) return found.en;
      }
      return id;
    });

  const totalSelected = Object.values(selectedDishes).flat().filter(Boolean).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(language === 'en' ? 'Please fill in Name and Phone Number.' : 'பெயர் மற்றும் கைபேசி எண்ணை நிரப்பவும்.');
      return;
    }
    
    // Construct WhatsApp message with enquiry specs (always in English for compatibility)
    const waNumber = "918220627025";
    let msg = `*AGKS CATERING SERVICE - NEW ENQUIRY*\n`;
    msg += `======================================\n`;
    msg += `*Client Name:* ${name}\n`;
    msg += `*Phone Number:* ${phone}\n`;
    if (email) {
      msg += `*Email:* ${email}\n`;
    }
    msg += `*Event Type:* ${eventType.toUpperCase()}\n`;
    msg += `*Guest Count:* ${guestCount} persons\n`;
    msg += `*Preferred Date:* ${selectedDate}${isMuhurthamDate ? ' (* Muhurtham Day)' : ''}\n`;
    msg += `*Venue:* ${venue || 'To be confirmed'}\n\n`;

    if (wishlistSummaryEN.length > 0) {
      msg += `*Banana Leaf Wishlist:*\n`;
      wishlistSummaryEN.forEach(item => {
        msg += `- ${item}\n`;
      });
      msg += `\n`;
    }

    if (checkedAddonLabelsEN.length > 0) {
      msg += `*Add-on Services:*\n`;
      checkedAddonLabelsEN.forEach(item => {
        msg += `- ${item}\n`;
      });
      msg += `\n`;
    }

    msg += `*Estimated Quantities (for reference):*\n`;
    estimatedMaterials.forEach(row => {
      msg += `- ${row.labelEN}: ${row.minVal} - ${row.maxVal} ${row.unit}\n`;
    });

    const encodedText = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;
    window.open(waUrl, '_blank');

    onBookingSuccess({ name, eventType, guestCount, selectedDate, isMuhurthamDate, venue });
  };

  const handlePDFDownload = () => {
    generateEnquiryPDF({
      name, eventType, guestCount, selectedDate, isMuhurthamDate, venue,
      wishlistSummary: wishlistSummaryEN,
      checkedAddonLabels: checkedAddonLabelsEN,
      estimatedMaterials, language,
    });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="glass-card wizard-container" id="booking">
      {/* Step navigation */}
      <div className="wizard-header">
        {[
          { n: 1, enLabel: 'Event Details',    taLabel: 'நிகழ்ச்சி விவரம்' },
          { n: 2, enLabel: 'Wishlist Leaf',    taLabel: 'விஷ்லிஸ்ட் இலை' },
          { n: 3, enLabel: 'Addon Checklists', taLabel: 'கூடுதல் சேவைகள்' },
          { n: 4, enLabel: 'Review & Submit',  taLabel: 'சரிபார்த்து அனுப்பு' },
        ].map(({ n, enLabel, taLabel }) => (
          <div key={n} className={`wizard-step-node ${step === n ? 'active' : step > n ? 'completed' : ''}`}>
            <div className="node-number">{step > n ? <Check size={16} /> : n}</div>
            <span className="node-label">{language === 'en' ? enLabel : taLabel}</span>
          </div>
        ))}
      </div>

      {/* ── STEP 1: Event Details & Calendar ── */}
      {step === 1 && (
        <div>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textAlign: 'left' }}>
            {language === 'en' ? 'Step 1: Event Details & Auspicious Date' : 'படி 1: நிகழ்ச்சி விவரங்கள் & மங்களகரமான தேதி'}
          </h3>
          <div className="wizard-form-grid">
            <div className="form-group">
              <label>{language === 'en' ? 'Event Type' : 'நிகழ்ச்சி வகை'}</label>
              <select className="form-input" value={eventType} onChange={e => setEventType(e.target.value)}>
                <option value="wedding">{language === 'en' ? 'Marriage / Wedding (திருமணம்)' : 'திருமணம் (Thirumanam)'}</option>
                <option value="reception">{language === 'en' ? 'Reception (வரவேற்பு)' : 'வரவேற்பு (Varaverpu)'}</option>
                <option value="engagement">{language === 'en' ? 'Engagement (நிச்சயதார்த்தம்)' : 'நிச்சயதார்த்தம் (Nichayathartham)'}</option>
                <option value="housewarming">{language === 'en' ? 'Housewarming (கிரகப்பிரவேசம்)' : 'கிரகப்பிரவேசம் (Grahapravesam)'}</option>
                <option value="valakappu">{language === 'en' ? 'Baby Shower / Valakappu (வளைகாப்பு)' : 'வளைகாப்பு (Valaikaappu)'}</option>
                <option value="naming">{language === 'en' ? 'Naming Ceremony (பெயர் சூட்டும் விழா)' : 'பெயர் சூட்டும் விழா (Peyar Suttu Vizha)'}</option>
                <option value="earpiercing">{language === 'en' ? 'Ear Piercing Ceremony (காது குத்து விழா)' : 'காது குத்து விழா (Kaadhu Kuthu Vizha)'}</option>
                <option value="puberty">{language === 'en' ? 'Puberty Ceremony (மஞ்சள் நீராட்டு விழா)' : 'மஞ்சள் நீராட்டு விழா (Manjal Neerattu Vizha)'}</option>
                <option value="tonsure">{language === 'en' ? 'First Haircut / Tonsure (மொட்டை போடுதல்)' : 'மொட்டை போடுதல் (Mottai Podudhal)'}</option>
                <option value="birthday">{language === 'en' ? 'First Birthday (முதல் பிறந்தநாள்)' : 'முதல் பிறந்தநாள் (Mudhal Pirandhanaal)'}</option>
                <option value="shashtipoorthi">{language === 'en' ? '60th Birthday (சஷ்டி பூர்த்தி)' : 'சஷ்டி பூர்த்தி (Shashti Poorthi)'}</option>
                <option value="sadhabishegam">{language === 'en' ? '80th Birthday (சதாபிஷேகம்)' : 'சதாபிஷேகம் (Sadhabishegam)'}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{language === 'en' ? 'Expected Guest Count (Min 50)' : 'எதிர்பார்க்கப்படும் விருந்தினர்கள் (குறைந்தது 50)'}</label>
              <input type="number" min="50" className="form-input" value={guestCount}
                onChange={e => setGuestCount(Math.max(50, parseInt(e.target.value) || 50))} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>{language === 'en' ? 'Venue / Location (optional)' : 'விழா மண்டபம் / இடம் (விருப்பமானது)'}</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-gold)' }} />
                <input type="text" className="form-input" style={{ paddingLeft: '2.2rem', width: '100%' }}
                  placeholder={language === 'en' ? 'e.g. Vijay Marriage Hall, Dindigul' : 'எ.கா. விஜய் திருமண மண்டபம், திண்டுக்கல்'}
                  value={venue} onChange={e => setVenue(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Muhurtham Calendar */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label>
              {language === 'en'
                ? 'Select Preferred Date — Gold highlights = Valarpirai Muhurtham Days'
                : 'தேதியைத் தேர்ந்தெடுக்கவும் — தங்க நிறம் = வளர்பிறை முகூர்த்த நாட்கள்'}
            </label>
            <div className="calendar-widget">
              <div className="calendar-header">
                <span>{language === 'en' ? 'July 2026' : 'ஜூலை 2026'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                  ★ {language === 'en' ? 'Muhurtham Dates Highlighted' : 'முகூர்த்த நாட்கள் தனிப்படுத்தப்பட்டுள்ளன'}
                </span>
              </div>
              <div className="calendar-grid">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className={`calendar-day-label ${i === 0 ? 'sunday' : i === 6 ? 'saturday' : ''}`}>{d}</div>
                ))}
                {CALENDAR_CELLS.map((cell, i) => (
                  <div key={i} onClick={() => handleDateClick(cell.day)}
                    className={`calendar-cell ${!cell.day ? 'empty' : ''} ${cell.isMuhurtham ? 'muhurtham' : ''} ${isSelectedDate(cell.day) ? 'selected' : ''} ${cell.day && (i % 7 === 0) ? 'sunday' : ''} ${cell.day && (i % 7 === 6) ? 'saturday' : ''}`}>
                    {cell.day}
                  </div>
                ))}
              </div>
              <div className="muhurtham-hint">
                <div style={{ width: '14px', height: '14px', borderRadius: '4px', border: '1.5px solid var(--color-gold)', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#ffd54f', fontWeight: 'bold' }}>★</div>
                <span>
                  {language === 'en'
                    ? 'Auspicious Tamil Muhurtham dates are highlighted for your convenience.'
                    : 'வளர்பிறை முகூர்த்த நாட்கள் உங்கள் வசதிக்காக தனிப்படுத்தப்பட்டுள்ளன.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: Banana Leaf Wishlist Builder ── */}
      {step === 2 && (
        <div>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textAlign: 'left' }}>
            {language === 'en' ? 'Step 2: Build Your Banana Leaf Wishlist' : 'படி 2: உங்கள் வாழை இலை விஷ்லிஸ்டை உருவாக்குங்கள்'}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {language === 'en'
              ? 'Select the dishes you would like to have served on your event. This forms your enquiry wishlist — AGKS will review it and provide a customized quote.'
              : 'உங்கள் நிகழ்ச்சியில் வேண்டிய உணவுகளைத் தேர்ந்தெடுக்கவும். இது உங்கள் விசாரணை பட்டியலாக AGKS-க்கு அனுப்பப்படும்.'}
          </p>
          <BananaLeafBuilder
            language={language}
            eventType={eventType}
            selectedItems={selectedDishes}
            onSelectItem={handleSelectItem}
            onResetItems={handleResetItems}
          />
        </div>
      )}

      {/* ── STEP 3: Addon Checklists ── */}
      {step === 3 && (
        <div>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textAlign: 'left' }}>
            {language === 'en' ? 'Step 3: Select Add-On Services & Essentials' : 'படி 3: கூடுதல் சேவைகள் மற்றும் அத்தியாவசியங்களைத் தேர்ந்தெடுக்கவும்'}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {language === 'en'
              ? 'Check any additional services or ritual essentials you want included in your event enquiry.'
              : 'உங்கள் விழாவில் தேவையான கூடுதல் சேவைகள் மற்றும் நிகழ்ச்சி அத்தியாவசியங்களைக் குறிக்கவும்.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(CHECKLISTS).map(([key, list]) => (
              <div key={key} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <ClipboardList size={18} style={{ color: 'var(--color-gold)' }} />
                  <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>
                    {language === 'en' ? list.titleEN : list.titleTA}
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {list.items.map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item.id]}
                        onChange={() => toggleCheckItem(item.id)}
                        style={{ accentColor: 'var(--color-gold)', width: '18px', height: '18px', cursor: 'pointer', flexShrink: 0 }}
                      />
                      <span style={{ fontSize: '0.9rem', color: checkedItems[item.id] ? '#fff' : 'var(--color-text-muted)', transition: 'color 0.2s' }}>
                        {language === 'en' ? item.en : item.ta}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 4: Review, Quantity Estimator & Submit ── */}
      {step === 4 && (
        <div>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textAlign: 'left' }}>
            {language === 'en' ? 'Step 4: Review Enquiry & Submit' : 'படி 4: விசாரணையை சரிபார்த்து அனுப்பவும்'}
          </h3>

          <div className="wizard-review-grid">
            {/* Left: Quantity Estimator */}
            <div>
              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.25rem', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
                  {language === 'en' ? '📦 Raw Material Estimation' : '📦 மூலப்பொருள் மதிப்பீடு'}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  {language === 'en'
                    ? `Based on ${guestCount} guests. These are approximate quantities for your reference.`
                    : `${guestCount} விருந்தினர்களின் அடிப்படையில். இவை தோராயமான அளவுகள் மட்டுமே.`}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>
                      {language === 'en' ? 'Item' : 'பொருள்'}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>
                      {language === 'en' ? 'Estimated Qty' : 'தோராய அளவு'}
                    </span>
                  </div>
                  {estimatedMaterials.map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div>
                        <span style={{ fontSize: '0.88rem', color: '#fff' }}>{language === 'en' ? row.labelEN : row.labelTA}</span>
                        {row.note && <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>{row.note}</p>}
                      </div>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-gold-light)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {row.minVal} – {row.maxVal} {row.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wishlist summary */}
              {(wishlistSummary.length > 0 || checkedAddonLabels.length > 0) && (
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>
                    {language === 'en' ? '🍃 Your Enquiry Summary' : '🍃 உங்கள் விசாரணை சுருக்கம்'}
                  </h4>
                  {wishlistSummary.length > 0 && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', fontWeight: 'bold', marginBottom: '0.35rem' }}>
                        {language === 'en' ? 'Leaf Wishlist:' : 'இலை விஷ்லிஸ்ட்:'}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {wishlistSummary.map((d, i) => (
                          <span key={i} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '20px', padding: '0.2rem 0.65rem', fontSize: '0.8rem', color: '#fff' }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {checkedAddonLabels.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-green-light)', fontWeight: 'bold', marginBottom: '0.35rem' }}>
                        {language === 'en' ? 'Addon Services:' : 'கூடுதல் சேவைகள்:'}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {checkedAddonLabels.map((d, i) => (
                          <span key={i} style={{ background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.2)', borderRadius: '20px', padding: '0.2rem 0.65rem', fontSize: '0.8rem', color: '#fff' }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Contact Form */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                {language === 'en' ? 'Submit via WhatsApp' : 'வாட்ஸ்அப் மூலம் சமர்ப்பிக்கவும்'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                {language === 'en'
                  ? 'Fill in your details. Submitting will launch WhatsApp to connect with our catering manager directly at +91 8220627025.'
                  : 'உங்கள் விவரங்களை நிரப்பவும். சமர்ப்பிப்பதன் மூலம் எங்கள் மேலாளரை +91 8220627025 என்ற வாட்ஸ்அப்பில் நேரடியாகத் தொடர்பு கொள்ளலாம்.'}
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <User size={16} />, val: name, set: setName, ph: 'Krishnan Sundaram', type: 'text',  labelEN: 'Full Name',     labelTA: 'முழு பெயர்',       required: true },
                  { icon: <Phone size={16}/>, val: phone,set: setPhone,ph: '+91 98400 54321', type: 'tel',   labelEN: 'Phone Number',  labelTA: 'கைபேசி எண்',       required: true },
                  { icon: <Mail size={16} />, val: email, set: setEmail,ph: 'user@email.com',  type: 'email', labelEN: 'Email Address (Optional)', labelTA: 'மின்னஞ்சல் முகவரி (விருப்பமானது)',required: false },
                ].map(({ icon, val, set, ph, type, labelEN, labelTA, required }) => (
                  <div key={labelEN} className="form-group">
                    <label>{language === 'en' ? labelEN : labelTA}</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-gold)' }}>{icon}</span>
                      <input type={type} required={required} className="form-input"
                        style={{ paddingLeft: '2.2rem', width: '100%' }}
                        placeholder={ph} value={val} onChange={e => set(e.target.value)} />
                    </div>
                  </div>
                ))}

                <button type="button" className="btn btn-secondary" onClick={handlePDFDownload}
                  style={{ width: '100%', gap: '0.5rem', justifyContent: 'center' }}>
                  <Download size={16} />
                  {language === 'en' ? 'Download Enquiry PDF' : 'விசாரணை PDF பதிவிறக்கு'}
                </button>

                <button type="submit" className="btn btn-green"
                  style={{ width: '100%', gap: '0.5rem', justifyContent: 'center', marginTop: '0.25rem', background: '#25D366', borderColor: '#25D366', color: '#fff', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}>
                  {language === 'en' ? 'Submit & Chat on WhatsApp' : 'வாட்ஸ்அப்பில் சமர்ப்பித்து அரட்டையடிக்கவும்'}
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Wizard navigation */}
      <div className="wizard-actions">
        <button className="btn btn-secondary" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} style={{ opacity: step === 1 ? 0.3 : 1 }}>
          <ChevronLeft size={16} />
          {language === 'en' ? 'Back' : 'பின்செல்'}
        </button>
        {step < 4 && (
          <button className="btn btn-primary" onClick={() => setStep(s => Math.min(4, s + 1))}>
            {language === 'en' ? 'Next Step' : 'அடுத்த படி'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
