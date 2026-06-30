import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Ban, ChevronDown, ChevronUp, Leaf } from 'lucide-react';

// ─── Verified food image URLs ──────────────────────────────────────────────────
// Local AI-generated images (accurate)
// Unsplash IDs chosen for correct dish match
const IMG = {
  // ── Drinks ────────────────────────────────────────────────────────────────
  roseMilk:      '/Menu/Welcome_Drinks/Rose%20Milk.jpg',
  roseSherbet:   '/Menu/Welcome_Drinks/Rose%20Sherbet.jpg',
  buttermilk:    '/Menu/Welcome_Drinks/Spiced%20Buttermilk.jpg',
  fruitPunch:    '/Menu/Welcome_Drinks/Fruit%20Punch.jpg',
  filterCoffee:  '/Menu/Welcome_Drinks/Filter%20Coffee.jpg',

  // ── Sweets / Desserts ──────────────────────────────────────────────────────
  sweetPongal:   '/Menu/Sweets_Desserts/Sweet%20Pongal.jpg',
  kashiHalwa:    '/Menu/Sweets_Desserts/Kashi%20Halwa.jpg',
  kesariPayasam: '/Menu/Sweets_Desserts/Kesari%20Payasam.jpg',
  breadHalwa:    '/Menu/Sweets_Desserts/Bread%20Halwa.jpg',

  // ── Starters ──────────────────────────────────────────────────────────────
  chicken65:     '/Menu/Starters_Soups/Chicken%2065.jpg',
  muttonKola:    '/Menu/Starters_Soups/Mutton%20Kola%20Urundai.jpg',
  muttonChops:   '/Menu/Starters_Soups/Mutton%20Chops.jpg',
  chickenLolly:  '/Menu/Starters_Soups/Chicken%20Lollipops.jpg',
  pepperSoup:    '/Menu/Starters_Soups/Pepper%20Mutton%20Soup.jpg',
  medhuVada:     '/Menu/Starters_Soups/Medhu%20Vada.jpg',
  masalaVada:    '/Menu/Starters_Soups/Masala%20Vada.jpg',

  // ── Rice / Biryani ─────────────────────────────────────────────────────────
  muttonBiryani:  '/Menu/Main_Rice_Biryani/Mutton%20Biryani.jpg',
  chickenBiryani: '/Menu/Main_Rice_Biryani/Chicken%20Biryani.jpg',
  tamarindRice:   '/Menu/Main_Rice_Biryani/Tamarind%20Rice.jpg',
  lemonRice:      '/Menu/Main_Rice_Biryani/Lemon%20Rice.jpg',
  coconutRice:    '/Menu/Main_Rice_Biryani/Coconut%20Rice.jpg',
  sesameRice:     '/Menu/Main_Rice_Biryani/Sesame%20Rice.jpg',
  curryleafRice:  '/Menu/Main_Rice_Biryani/Curry%20Leaf%20Rice.jpg',
  curdRice:       '/Menu/Main_Rice_Biryani/Curd%20Rice.jpg',

  // ── Gravies / Sides ────────────────────────────────────────────────────────
  muttonChukka:  '/Menu/Gravies_Side_Dishes/Mutton%20Chukka.jpg',
  pepperChicken: '/Menu/Gravies_Side_Dishes/Pepper%20Chicken.jpg',
  brinjalThokku: '/Menu/Gravies_Side_Dishes/Brinjal%20Thokku.jpg',
  onionRaitha:   '/Menu/Gravies_Side_Dishes/Onion%20Raitha.jpg',

  // ── Egg ───────────────────────────────────────────────────────────────────
  boiledEgg:     '/Menu/Egg_Dishes/Boiled%20Egg.jpg',
  eggMasala:     '/Menu/Egg_Dishes/Egg%20Masala.jpg',

  // ── Closing ────────────────────────────────────────────────────────────────
  pepperRasam:   '/Menu/Closing_Digestives/Pepper%20Rasam.jpg',
  sweetBeeda:    '/Menu/Closing_Digestives/Sweet%20Beeda.jpg',
};

// ─── Emoji fallback per category ──────────────────────────────────────────────
const EMOJI_FALLBACK = {
  drinks: '🥤', sweet: '🍮', starter: '🍗', mainRice: '🍛',
  gravy: '🥘', egg: '🥚', closing: '🍃',
};

// ─── Image component with fallback ───────────────────────────────────────────
function FoodThumb({ src, alt, isSelected, catId }) {
  const [failed, setFailed] = useState(false);
  const emoji = EMOJI_FALLBACK[catId] || '🍽️';
  return (
    <div style={{
      width: '70px', height: '70px', borderRadius: '50%',
      overflow: 'hidden',
      border: isSelected ? '2px solid var(--color-green-light)' : '2px solid rgba(212,175,55,0.35)',
      flexShrink: 0,
      background: failed ? 'linear-gradient(135deg,#1a1a2e,#16213e)' : '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: isSelected ? '0 0 10px rgba(76,175,80,0.4)' : '0 2px 8px rgba(0,0,0,0.5)',
      transition: 'all 0.2s ease',
    }}>
      {failed
        ? <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
        : <img src={src} alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy" onError={() => setFailed(true)} />
      }
    </div>
  );
}

// ─── Menu data ────────────────────────────────────────────────────────────────
const ALL_CATEGORIES = [
  {
    id: 'drinks',
    enLabel: 'Welcome Drink',
    taLabel: 'வரவேற்பு பானம்',
    emoji: '🥤',
    options: [
      { id: 'rose_milk',     en: 'Rose Milk',         ta: 'ரோஸ் மில்க்',     image: IMG.roseMilk,     isNonVeg: false },
      { id: 'rose_sherbet',  en: 'Rose Sherbet',      ta: 'ரோஸ் சர்பத்',     image: IMG.roseSherbet,  isNonVeg: false },
      { id: 'buttermilk',    en: 'Spiced Buttermilk', ta: 'நீர் மோர்',        image: IMG.buttermilk,   isNonVeg: false },
      { id: 'fruit_punch',   en: 'Fruit Punch',       ta: 'ஃப்ரூட் பஞ்ச்',  image: IMG.fruitPunch,   isNonVeg: false },
      { id: 'filter_coffee', en: 'Filter Coffee',     ta: 'பில்டர் காபி',     image: IMG.filterCoffee, isNonVeg: false },
    ],
  },
  {
    id: 'sweet',
    enLabel: 'Sweet / Dessert',
    taLabel: 'இனிப்பு / பாயசம்',
    emoji: '🍮',
    options: [
      { id: 'sweet_pongal',   en: 'Sweet Pongal',   ta: 'சர்க்கரை பொங்கல்', image: IMG.sweetPongal,   isNonVeg: false },
      { id: 'kasi_halwa',     en: 'Kashi Halwa',    ta: 'காசி அல்வா',        image: IMG.kashiHalwa,    isNonVeg: false },
      { id: 'kesari_payasam', en: 'Kesari Payasam', ta: 'கேசரி பாயசம்',     image: IMG.kesariPayasam, isNonVeg: false },
      { id: 'bread_halwa',    en: 'Bread Halwa',    ta: 'பிரட் அல்வா',       image: IMG.breadHalwa,    isNonVeg: false },
    ],
  },
  {
    id: 'starter',
    enLabel: 'Starter / Soup',
    taLabel: 'துவக்க உணவு / சூப்',
    emoji: '🍗',
    options: [
      { id: 'chicken_65',          en: 'Chicken 65',          ta: 'சிக்கன் 65',           image: IMG.chicken65,    isNonVeg: true },
      { id: 'mutton_kola_urundai', en: 'Mutton Kola Urundai', ta: 'மட்டன் கோலா உருண்டை', image: IMG.muttonKola,   isNonVeg: true },
      { id: 'mutton_chops',        en: 'Mutton Chops',        ta: 'மட்டன் சாப்ஸ்',        image: IMG.muttonChops,  isNonVeg: true },
      { id: 'chicken_lollipops',   en: 'Chicken Lollipops',   ta: 'சிக்கன் லாலிபாப்',     image: IMG.chickenLolly, isNonVeg: true },
      { id: 'pepper_mutton_soup',  en: 'Pepper Mutton Soup',  ta: 'மிளகு மட்டன் சூப்',   image: IMG.pepperSoup,   isNonVeg: true },
      { id: 'medhu_vada',          en: 'Medhu Vada',          ta: 'மெது வடை',             image: IMG.medhuVada,    isNonVeg: false },
      { id: 'masala_vada',         en: 'Masala Vada',         ta: 'மசாலா வடை',            image: IMG.masalaVada,   isNonVeg: false },
    ],
  },
  {
    id: 'mainRice',
    enLabel: 'Main Rice / Biryani',
    taLabel: 'முக்கிய சாதம் / பிரியாணி',
    emoji: '🍛',
    options: [
      { id: 'mutton_biryani',  en: 'Mutton Biryani',  ta: 'மட்டன் பிரியாணி',    image: IMG.muttonBiryani,  isNonVeg: true },
      { id: 'chicken_biryani', en: 'Chicken Biryani', ta: 'சிக்கன் பிரியாணி',   image: IMG.chickenBiryani, isNonVeg: true },
      { id: 'tamarind_rice',   en: 'Tamarind Rice',   ta: 'புளி சாதம்',          image: IMG.tamarindRice,   isNonVeg: false },
      { id: 'lemon_rice',      en: 'Lemon Rice',      ta: 'எலுமிச்சை சாதம்',    image: IMG.lemonRice,      isNonVeg: false },
      { id: 'coconut_rice',    en: 'Coconut Rice',    ta: 'தேங்காய் சாதம்',     image: IMG.coconutRice,    isNonVeg: false },
      { id: 'sesame_rice',     en: 'Sesame Rice',     ta: 'எள்ளு சாதம்',        image: IMG.sesameRice,     isNonVeg: false },
      { id: 'curryleaf_rice',  en: 'Curry Leaf Rice', ta: 'கறிவேப்பிலை சாதம்', image: IMG.curryleafRice,  isNonVeg: false },
      { id: 'curd_rice',       en: 'Curd Rice',       ta: 'தயிர் சாதம்',        image: IMG.curdRice,       isNonVeg: false },
    ],
  },
  {
    id: 'gravy',
    enLabel: 'Gravy / Side Dish',
    taLabel: 'கிரேவி / சைட் டிஷ்',
    emoji: '🥘',
    options: [
      { id: 'mutton_chukka',  en: 'Mutton Chukka',  ta: 'மட்டன் சுக்கா',        image: IMG.muttonChukka,  isNonVeg: true },
      { id: 'pepper_chicken', en: 'Pepper Chicken', ta: 'மிளகு சிக்கன்',        image: IMG.pepperChicken, isNonVeg: true },
      { id: 'brinjal_thokku', en: 'Brinjal Thokku', ta: 'கத்திரிக்காய் தொக்கு', image: IMG.brinjalThokku, isNonVeg: false },
      { id: 'onion_raitha',   en: 'Onion Raitha',   ta: 'வெங்காய ரைத்தா',       image: IMG.onionRaitha,   isNonVeg: false },
    ],
  },
  {
    id: 'egg',
    enLabel: 'Egg Dish',
    taLabel: 'முட்டை வகை',
    emoji: '🥚',
    vegBanned: true,
    options: [
      { id: 'boiled_egg',  en: 'Boiled Egg',  ta: 'அவித்த முட்டை', image: IMG.boiledEgg,  isNonVeg: true },
      { id: 'egg_masala',  en: 'Egg Masala',  ta: 'முட்டை மசாலா',  image: IMG.eggMasala,  isNonVeg: true },
    ],
  },
  {
    id: 'closing',
    enLabel: 'Closing / Digestive',
    taLabel: 'முத்தாய்ப்பு / செரிமானம்',
    emoji: '🍃',
    options: [
      { id: 'pepper_rasam', en: 'Pepper Rasam', ta: 'மிளகு ரசம்',  image: IMG.pepperRasam, isNonVeg: false },
      { id: 'sweet_beeda',  en: 'Sweet Beeda',  ta: 'இனிப்பு பீடா', image: IMG.sweetBeeda,  isNonVeg: false },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function BananaLeafBuilder({
  language,
  eventType = 'wedding',
  selectedItems,
  onSelectItem,
  onResetItems,
}) {
  const isVegEvent = ['valakappu', 'housewarming', 'shashtipoorthi', 'sadhabishegam'].includes(eventType);
  const [expandedId, setExpandedId] = useState('drinks');

  const categories = isVegEvent
    ? ALL_CATEGORIES.filter(c => !c.vegBanned)
    : ALL_CATEGORIES;

  const selectedCount = Object.values(selectedItems).flat().filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Veg Event Banner ── */}
      {isVegEvent && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.3)',
          borderRadius: '10px', padding: '0.85rem 1.25rem',
        }}>
          <Leaf size={18} style={{ color: 'var(--color-green-light)', flexShrink: 0 }} />
          <div>
            <p style={{ color: 'var(--color-green-light)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.1rem' }}>
              {language === 'en' ? '🌿 Vegetarian Mode — Valakappu' : '🌿 சைவ முறை — வளைகாப்பு'}
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
              {language === 'en'
                ? 'All non-vegetarian items are disabled for this event.'
                : 'அசைவ உணவுகள் முடக்கப்பட்டுள்ளன.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Count + Reset ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            {language === 'en' ? 'Selected:' : 'தேர்ந்தெடுக்கப்பட்டவை:'}
          </span>
          <span style={{
            background: selectedCount > 0 ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${selectedCount > 0 ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '20px', padding: '0.2rem 0.75rem',
            fontSize: '0.85rem', fontWeight: 'bold',
            color: selectedCount > 0 ? 'var(--color-gold-light)' : 'var(--color-text-muted)',
          }}>
            {selectedCount} {language === 'en' ? 'items' : 'உணவுகள்'}
          </span>
        </div>
        <button className="btn btn-secondary" onClick={onResetItems}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}>
          <RefreshCw size={13} />
          {language === 'en' ? 'Clear All' : 'அனைத்தும் நீக்கு'}
        </button>
      </div>

      {/* ── Wishlist Preview Strip ── */}
      {selectedCount > 0 && (
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(212,175,55,0.2)',
          borderRadius: '10px', padding: '0.75rem 1rem',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 'bold', marginRight: '0.25rem' }}>
            🍃 {language === 'en' ? 'Your Leaf:' : 'உங்கள் இலை:'}
          </span>
          {Object.entries(selectedItems).flatMap(([slotId, items]) =>
            (Array.isArray(items) ? items : items ? [items] : []).map(item => (
              <span key={`${slotId}-${item.id}`} style={{
                background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '20px', padding: '0.2rem 0.65rem', fontSize: '0.78rem', color: '#fff',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}>
                <CheckCircle size={11} style={{ color: 'var(--color-green-light)' }} />
                {language === 'en' ? item.en : item.ta}
              </span>
            ))
          )}
        </div>
      )}

      {/* ── Accordion Categories ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {categories.map((cat) => {
          const selection = Array.isArray(selectedItems[cat.id]) ? selectedItems[cat.id] : [];
          const isOpen = expandedId === cat.id;
          const hasSelection = selection.length > 0;
          const availableOptions = cat.options.filter(opt => isVegEvent ? !opt.isNonVeg : true);

          return (
            <div key={cat.id} style={{
              background: isOpen ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)',
              border: hasSelection
                ? '1px solid rgba(76,175,80,0.45)'
                : isOpen ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s ease',
            }}>

              {/* Header */}
              <button onClick={() => setExpandedId(isOpen ? null : cat.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', padding: '1rem 1.25rem',
                background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{cat.emoji}</span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{
                      fontWeight: 'bold', fontSize: '0.95rem',
                      color: hasSelection ? 'var(--color-green-light)' : isOpen ? 'var(--color-gold-light)' : '#fff',
                    }}>
                      {language === 'en' ? cat.enLabel : cat.taLabel}
                    </p>
                    {hasSelection && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-green-light)', display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                        <CheckCircle size={10} />
                        {selection.map(s => language === 'en' ? s.en : s.ta).join(' · ')}
                      </p>
                    )}
                    {!hasSelection && (
                      <p style={{ fontSize: '0.73rem', color: 'var(--color-text-muted)' }}>
                        {availableOptions.length} {language === 'en' ? 'options — select multiple' : 'வகைகள் — பல தேர்வு'}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {hasSelection && (
                    <span style={{
                      background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.35)',
                      color: 'var(--color-green-light)', borderRadius: '20px',
                      padding: '0.15rem 0.6rem', fontSize: '0.72rem', fontWeight: 'bold',
                    }}>
                      ✓ {selection.length} {language === 'en' ? 'selected' : 'தேர்ந்தெடுக்கப்பட்டது'}
                    </span>
                  )}
                  {isOpen
                    ? <ChevronUp size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                  }
                </div>
              </button>

              {/* Food Grid */}
              {isOpen && (
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1rem' }} />

                  {availableOptions.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      <Ban size={14} style={{ color: 'var(--color-gold)' }} />
                      {language === 'en' ? 'No vegetarian options in this category.' : 'சைவ வகைகள் இல்லை.'}
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginBottom: '0.75rem', opacity: 0.8 }}>
                        {language === 'en' ? '✦ Tap any item to add. Tap again to remove.' : '✦ உணவை தட்டி தேர்வு செய்யவும். மீண்டும் தட்டினால் நீக்கலாம்.'}
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                        gap: '0.75rem',
                      }}>
                        {availableOptions.map((option) => {
                          const isSelected = selection.some(s => s.id === option.id);
                          return (
                            <button
                              key={option.id}
                              onClick={() => onSelectItem(cat.id, option)}
                              style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '0.5rem',
                                padding: '0.75rem 0.4rem', borderRadius: '12px',
                                border: isSelected
                                  ? '2px solid var(--color-green-light)'
                                  : '1px solid rgba(255,255,255,0.09)',
                                background: isSelected
                                  ? 'rgba(76,175,80,0.13)'
                                  : 'rgba(255,255,255,0.03)',
                                cursor: 'pointer', transition: 'all 0.2s ease',
                                position: 'relative', color: '#fff',
                              }}
                            >
                              {/* Checkmark badge */}
                              {isSelected && (
                                <div style={{
                                  position: 'absolute', top: '-7px', right: '-7px',
                                  width: '22px', height: '22px', borderRadius: '50%',
                                  background: 'var(--color-green-light)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  boxShadow: '0 2px 6px rgba(76,175,80,0.5)',
                                }}>
                                  <CheckCircle size={14} style={{ color: '#fff' }} />
                                </div>
                              )}

                              {/* Food thumbnail */}
                              <FoodThumb
                                src={option.image}
                                alt={option.en}
                                isSelected={isSelected}
                                catId={cat.id}
                              />

                              {/* Primary name */}
                              <span style={{
                                fontSize: '0.76rem', fontWeight: '600',
                                textAlign: 'center', lineHeight: '1.3',
                                color: isSelected ? '#fff' : 'var(--color-text-light)',
                              }}>
                                {language === 'en' ? option.en : option.ta}
                              </span>

                              {/* Subtitle */}
                              <span style={{
                                fontSize: '0.62rem', color: 'var(--color-text-muted)',
                                textAlign: 'center', lineHeight: '1.2',
                              }}>
                                {language === 'en' ? option.ta : option.en}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {hasSelection && (
                    <p style={{ fontSize: '0.73rem', color: 'var(--color-text-muted)', marginTop: '0.85rem', textAlign: 'center' }}>
                      💡 {language === 'en' ? 'Tap a selected item again to remove it.' : 'தேர்ந்தெடுத்ததை மீண்டும் தட்டினால் நீக்கலாம்.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
