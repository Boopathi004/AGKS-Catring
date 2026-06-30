import React, { useState, useRef } from 'react';
import { Flame } from 'lucide-react';

// ─── Reliable food image map using specific Unsplash photo IDs ────────────────
const FOOD_IMAGES = {
  // Non-veg starters
  chicken65:      '/Menu/Starters_Soups/Chicken%2065.jpg',
  muttonKola:     '/Menu/Starters_Soups/Mutton%20Kola%20Urundai.jpg',
  // Biryani
  biryani:        '/Menu/Main_Rice_Biryani/Mutton%20Biryani.jpg',
  // Dry meat
  muttonChukka:   '/Menu/Gravies_Side_Dishes/Mutton%20Chukka.jpg',
  pepperChicken:  '/Menu/Gravies_Side_Dishes/Pepper%20Chicken.jpg',
  // Egg
  egg:            '/Menu/Egg_Dishes/Boiled%20Egg.jpg',
  eggMasala:      '/Menu/Egg_Dishes/Egg%20Masala.jpg',
  // Raita / sides
  raitha:         '/Menu/Gravies_Side_Dishes/Onion%20Raitha.jpg',
  brinjal:        '/Menu/Gravies_Side_Dishes/Brinjal%20Thokku.jpg',
  // Rasam / closing
  rasam:          '/Menu/Closing_Digestives/Pepper%20Rasam.jpg',
  beeda:          '/Menu/Closing_Digestives/Sweet%20Beeda.jpg',
  // Variety rice
  tamarindRice:   '/Menu/Main_Rice_Biryani/Tamarind%20Rice.jpg',
  coconutRice:    '/Menu/Main_Rice_Biryani/Coconut%20Rice.jpg',
  sesameRice:     '/Menu/Main_Rice_Biryani/Sesame%20Rice.jpg',
  curdRice:       '/Menu/Main_Rice_Biryani/Curd%20Rice.jpg',
  sweetPongal:    '/Menu/Sweets_Desserts/Sweet%20Pongal.jpg',
  potatoFry:      'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&h=300&auto=format&fit=crop&q=80',
  // Marriage feast
  roseSherbet:    '/Menu/Welcome_Drinks/Rose%20Sherbet.jpg',
  muttonChops:    '/Menu/Starters_Soups/Mutton%20Chops.jpg',
  chickenLolly:   '/Menu/Starters_Soups/Chicken%20Lollipops.jpg',
  muttonSoup:     '/Menu/Starters_Soups/Pepper%20Mutton%20Soup.jpg',
  halwa:          '/Menu/Sweets_Desserts/Kashi%20Halwa.jpg',
  payasam:        '/Menu/Sweets_Desserts/Kesari%20Payasam.jpg',
};

// Gradient placeholder when image fails
const FALLBACK_GRADIENT = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

function FoodImage({ src, alt, style, className }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div style={{ ...style, background: FALLBACK_GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }} className={className}>
      🍽️
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

export default function MenuViewer({ language }) {
  const [activeTab, setActiveTab] = useState('nonveg');
  const [hoveredItem, setHoveredItem] = useState(null);
  const hoverTimeout = useRef(null);
  const menus = {
    nonveg: {
      title: language === 'en' ? 'Non-Vegetarian Feast' : 'அசைவ விருந்து',
      desc: language === 'en'
        ? 'A rich assortment of traditional South Indian meats, aromatic Biryani, and spiced delicacies.'
        : 'காரசாரமான மசாலாக்கள் மற்றும் நறுமண சீரக சம்பா பிரியாணி அடங்கிய பாரம்பரிய அசைவ விருந்து.',
      image: '/nonveg_feast.png',
      items: [
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Chicken 65 / Mutton Kola Urundai',
          taName: 'சிக்கன் 65 / மட்டன் கோலா உருண்டை',
          image: FOOD_IMAGES.chicken65,
          scent: language === 'en' ? 'Spiced Curry Leaf & Fried Garlic' : 'வறுத்த பூண்டு & மசாலா நறுமணம்',
          profile: language === 'en'
            ? 'Deep-fried spicy chicken florets seasoned with curry leaves, or traditional crispy minced mutton balls flavored with fennel.'
            : 'மொறுமொறுப்பான சிக்கன் 65 அல்லது சோம்பு மணம் கமழும் மட்டன் கோலா உருண்டை.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Mutton Biryani / Chicken Biryani',
          taName: 'மட்டன் பிரியாணி / சிக்கன் பிரியாணி',
          image: FOOD_IMAGES.biryani,
          scent: language === 'en' ? 'Seeraga Samba Ghee & Mint' : 'நெய் மணம் கமழும் சீரக சம்பா & புதினா',
          profile: language === 'en'
            ? 'Aromatic Seeraga Samba rice cooked with succulent pieces of mutton or chicken, whole spices, mint, and pure ghee.'
            : 'காரசாரமான சீரக சம்பா பிரியாணி நெய் மற்றும் புதினா மணம் கமழ.',
        },
        {
          category: language === 'en' ? 'Gravy' : 'கூடுதல் சைட் டிஷ்',
          enName: 'Mutton Chukka / Pepper Chicken',
          taName: 'மட்டன் சுக்கா / மிளகு சிக்கன்',
          image: FOOD_IMAGES.muttonChukka,
          scent: language === 'en' ? 'Fresh Ground Pepper & Shallots' : 'மிளகுத் தூள் & வதக்கிய சின்ன வெங்காயம்',
          profile: language === 'en'
            ? 'Dry-roasted spicy mutton bits slow-cooked with shallots, or chicken pan-fried with freshly-crushed black peppercorns.'
            : 'சின்ன வெங்காயத்துடன் வதக்கிய மட்டன் சுக்கா அல்லது காரசாரமான மிளகு சிக்கன் வறுவல்.',
        },
        {
          category: language === 'en' ? 'Egg' : 'முட்டை வகை',
          enName: 'Boiled Egg / Egg Masala',
          taName: 'அவித்த முட்டை / முட்டை மசாலா',
          image: FOOD_IMAGES.eggMasala,
          scent: language === 'en' ? 'Tangy Tomato-Onion Gravy' : 'தக்காளி வெங்காய மசாலா மணம்',
          profile: language === 'en'
            ? 'Simple hard-boiled egg served warm, or eggs simmered in a rich tomato, ginger, and garlic spiced gravy.'
            : 'அவித்த முட்டை அல்லது தக்காளி இஞ்சி பூண்டு விழுதில் செய்த முட்டை மசாலா.',
        },
        {
          category: language === 'en' ? 'Sides' : 'கூட்டு & பச்சடி',
          enName: 'Onion Raitha / Brinjal Thokku',
          taName: 'வெங்காய ரைத்தா / கத்திரிக்காய் தொக்கு',
          image: FOOD_IMAGES.raitha,
          scent: language === 'en' ? 'Cooling Yogurt & Sour Tamarind' : 'குளிர்ச்சியான தயிர் & புளிப்பு கத்திரி',
          profile: language === 'en'
            ? 'Chilled yogurt mixed with finely-chopped raw onions and green chilis, or sour tamarind brinjal gravy perfect for Biryani.'
            : 'குளுமையான வெங்காய பச்சடி அல்லது பிரியாணிக்கு உகந்த எண்ணெய் கத்திரிக்காய் தொக்கு.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Cumin Tamarind & Refreshing Betel' : 'சீரகம், புளி & நறுமண வெற்றிலை',
          profile: language === 'en'
            ? 'Spiced, sour tamarind water boiled with cumin and crushed black pepper, finished with sweet betel leaf digestive fold.'
            : 'செரிமானத்திற்கு உகந்த காரசாரமான மிளகு ரசம் மற்றும் இனிப்பு வெற்றிலை பாக்கு (பீடா).',
        },
      ],
    },

    marriage: {
      title: language === 'en' ? 'Marriage & Reception' : 'திருமணம் & வரவேற்பு',
      desc: language === 'en'
        ? 'An elegant wedding feast featuring classic South Indian delicacies, curated for unforgettable celebrations.'
        : 'நினைவில் நிற்கும் திருமண மற்றும் வரவேற்பு விழாவுக்கான பாரம்பரிய தென்னிந்திய விருந்து.',
      image: '/marriage_feast.png',
      items: [
        {
          category: language === 'en' ? 'Welcome Drink' : 'வரவேற்பு பானம்',
          enName: 'Rose Sherbet / Buttermilk',
          taName: 'ரோஸ் சர்பத் / மோர்',
          image: FOOD_IMAGES.roseSherbet,
          scent: language === 'en' ? 'Floral Rose & Cool Mint' : 'ரோஜா மலர் & குளிர்ந்த புதினா',
          profile: language === 'en'
            ? 'Chilled rose-flavored sherbet or spiced buttermilk with ginger and asafoetida to welcome guests.'
            : 'குளிர்ந்த ரோஜா சர்பத் அல்லது இஞ்சி பெருங்காயம் சேர்த்த மணமான மோர்.',
        },
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Mutton Chops / Chicken Lollipops',
          taName: 'மட்டன் சாப்ஸ் / சிக்கன் லாலிபாப்',
          image: FOOD_IMAGES.chickenLolly,
          scent: language === 'en' ? 'Smoky Char & Aromatic Spices' : 'புகை நறுமணம் & மணமான மசாலா',
          profile: language === 'en'
            ? 'Tender marinated mutton chops and grilled chicken lollipops served with mint chutney and onion rings.'
            : 'மரினேட் செய்யப்பட்ட மட்டன் சாப்ஸ் மற்றும் கிரில் சிக்கன் லாலிபாப், புதினா சட்னியுடன்.',
        },
        {
          category: language === 'en' ? 'Soup' : 'சூப்',
          enName: 'Pepper Mutton Soup',
          taName: 'மிளகு மட்டன் சூப்',
          image: FOOD_IMAGES.muttonSoup,
          scent: language === 'en' ? 'Bold Pepper & Bone Broth' : 'காரமான மிளகு & எலும்பு சாறு',
          profile: language === 'en'
            ? 'Rich bone broth simmered with freshly ground black pepper, turmeric, and fresh herbs.'
            : 'பதப்படுத்திய எலும்பு சாற்றில் மிளகு, மஞ்சள், மூலிகைகள் சேர்த்த சூடான சூப்.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Mutton Biryani / Chicken Biryani',
          taName: 'மட்டன் பிரியாணி / சிக்கன் பிரியாணி',
          image: FOOD_IMAGES.biryani,
          scent: language === 'en' ? 'Fragrant Saffron, Ghee & Mint' : 'மஞ்சள், நெய் & புதினா நறுமணம்',
          profile: language === 'en'
            ? 'Aromatic Seeraga Samba rice layered with succulent mutton or chicken, infused with saffron and pure ghee.'
            : 'சீரக சம்பா சாதத்தில் மட்டன் அல்லது சிக்கன் வைத்து, மஞ்சள் நெய் ஊற்றி சமைத்த பிரியாணி.',
        },
        {
          category: language === 'en' ? 'Gravy' : 'கிரேவி',
          enName: 'Mutton Chukka / Pepper Chicken',
          taName: 'மட்டன் சுக்கா / மிளகு சிக்கன்',
          image: FOOD_IMAGES.muttonChukka,
          scent: language === 'en' ? 'Fresh Ground Pepper & Shallots' : 'மிளகுத் தூள் & சின்ன வெங்காயம்',
          profile: language === 'en'
            ? 'Dry-roasted mutton slow-cooked with shallots, or chicken pan-fried with freshly crushed black pepper.'
            : 'சின்ன வெங்காயம் சேர்த்த மட்டன் சுக்கா அல்லது மிளகு சிக்கன் வறுவல்.',
        },
        {
          category: language === 'en' ? 'Sides' : 'சைட் டிஷ்',
          enName: 'Onion Raitha / Brinjal Thokku',
          taName: 'வெங்காய ரைத்தா / கத்திரிக்காய் தொக்கு',
          image: FOOD_IMAGES.raitha,
          scent: language === 'en' ? 'Cooling Yogurt & Sour Tamarind' : 'குளிர்ந்த தயிர் & புளிப்பு கத்திரி',
          profile: language === 'en'
            ? 'Chilled yogurt with finely chopped raw onions and green chilis, or sour tamarind brinjal gravy for Biryani.'
            : 'குளுமையான வெங்காய பச்சடி அல்லது கத்திரிக்காய் தொக்கு.',
        },
        {
          category: language === 'en' ? 'Desserts' : 'இனிப்பு வகைகள்',
          enName: 'Kashi Halwa / Kesari Payasam',
          taName: 'காசி அல்வா / கேசரி பாயசம்',
          image: FOOD_IMAGES.halwa,
          scent: language === 'en' ? 'Sweet Saffron, Cardamom & Ghee' : 'மஞ்சள், ஏலக்காய் & நெய் மணம்',
          profile: language === 'en'
            ? 'Golden saffron Kashi Halwa made from ash gourd, or creamy vermicelli Kesari Payasam garnished with cashews.'
            : 'நெய் மணக்கும் காசி அல்வா மற்றும் கேசரி வர்ண பாயசம், முந்திரி தூவி பரிமாறப்படும்.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Cumin Tamarind & Refreshing Betel' : 'சீரகம், புளி & நறுமண வெற்றிலை',
          profile: language === 'en'
            ? 'Spiced sour tamarind rasam boiled with cumin and crushed pepper, finished with a sweet betel leaf digestive fold.'
            : 'காரசாரமான மிளகு ரசம் மற்றும் இனிப்பு வெற்றிலை பாக்கு (பீடா).',
        },
      ],
    },

    valakappu: {
      title: language === 'en' ? 'Baby Shower (Valakappu)' : 'வளைகாப்பு (Valaikaappu)',
      desc: language === 'en'
        ? 'A festive assortment of seven auspicious variety rices representing fertility and South Indian ritual tradition.'
        : 'மங்களகரமான ஏழு வகையான பாரம்பரிய கலவை சாதங்கள் மற்றும் சுவையான தொடுகறிகள்.',
      image: '/valakappu_feast.png',
      items: [
        {
          category: language === 'en' ? 'Rice 1 & 2' : 'வகை சாதம் 1 & 2',
          enName: 'Tamarind Rice / Lemon Rice',
          taName: 'புளி சாதம் / எலுமிச்சை சாதம்',
          image: FOOD_IMAGES.tamarindRice,
          scent: language === 'en' ? 'Sour Tamarind & Zesty Lemon' : 'காரசாரமான புளி சாதம் & புளிப்பு எலுமிச்சை',
          profile: language === 'en'
            ? 'Traditional tangy tamarind puliyodharai cooked with peanuts, or yellow turmeric-lemon rice tempered with mustard.'
            : 'கோவில் புளியோதரை மற்றும் வேர்க்கடலை தூவிய எலுமிச்சை சாதம்.',
        },
        {
          category: language === 'en' ? 'Rice 3 & 4' : 'வகை சாதம் 3 & 4',
          enName: 'Coconut Rice / Curd Rice',
          taName: 'தேங்காய் சாதம் / தயிர் சாதம்',
          image: FOOD_IMAGES.coconutRice,
          scent: language === 'en' ? 'Sweet Coconut Oil & Creamy Yogurt' : 'தேங்காய் எண்ணெய் & குளுமையான தயிர் சாதம்',
          profile: language === 'en'
            ? 'Steamed rice tossed with freshly grated coconut oil and cashews, or cooling yogurt rice topped with mustard seeds.'
            : 'தேங்காய் துருவல் சாதம் மற்றும் மாதுளை முத்துக்கள் தூவிய குளுமையான தயிர் சாதம்.',
        },
        {
          category: language === 'en' ? 'Rice 5 & 6' : 'வகை சாதம் 5 & 6',
          enName: 'Sesame Rice / Curry Leaf Rice',
          taName: 'எள்ளு சாதம் / கறிவேப்பிலை சாதம்',
          image: FOOD_IMAGES.sesameRice,
          scent: language === 'en' ? 'Toasted Sesame & Fresh Herb Roast' : 'வறுத்த எள்ளு & நறுமண கறிவேப்பிலை பொடி',
          profile: language === 'en'
            ? 'Rice mixed with roasted ground black sesame seeds, or green rice infused with rich spiced curry leaf powder.'
            : 'நறுமண எள்ளுப் பொடி சாதம் அல்லது இரும்புச்சத்து நிறைந்த கறிவேப்பிலை சாதம்.',
        },
        {
          category: language === 'en' ? 'Rice 7 & Sides' : 'வகை சாதம் 7 & தொடுகறி',
          enName: 'Sweet Pongal / Potato Fry & Vadai',
          taName: 'சர்க்கரை பொங்கல் / உருளை வறுவல் & வடை',
          image: FOOD_IMAGES.sweetPongal,
          scent: language === 'en' ? 'Caramel Jaggery, Cardamom & Crunchy Dal' : 'வெல்ல பாகு, ஏலக்காய் & மொறுமொறு வடை',
          profile: language === 'en'
            ? 'Rice and lentils cooked with golden jaggery, cardamom, and ghee, accompanied by spicy roasted potatoes and crunchy lentil vada.'
            : 'நெய் மணக்கும் சர்க்கரை பொங்கல், காரசாரமான உருளைக்கிழங்கு வறுவல் மற்றும் மொறுமொறுப்பான வடை, அப்பளம், ஊறுகாய்.',
        },
      ],
    },

    engagement: {
      title: language === 'en' ? 'Engagement Feast' : 'நிச்சயதார்த்த விருந்து',
      desc: language === 'en'
        ? 'A delightful traditional vegetarian feast featuring special variety rice, curries, payasam, and warm hospitality.'
        : 'மங்களகரமான நிச்சயதார்த்த விழாவுக்கான சுவையான சைவ கலவை சாதங்கள் மற்றும் பாயசம் அடங்கிய விருந்து.',
      image: '/marriage_feast.png',
      items: [
        {
          category: language === 'en' ? 'Welcome Drink' : 'வரவேற்பு பானம்',
          enName: 'Filter Coffee / Fruit Punch',
          taName: 'பில்டர் காபி / ஃப்ரூட் பஞ்ச்',
          image: FOOD_IMAGES.payasam,
          scent: language === 'en' ? 'Aromatic Coffee & Sweet Fruit' : 'பில்டர் காபி & நறுமண பழச்சாறு',
          profile: language === 'en'
            ? 'Authentic South Indian brass-tumbler filter coffee or fresh fruit punch mocktail.'
            : 'பாரம்பரிய பில்டர் காபி அல்லது நறுமண பழச்சாறு.',
        },
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Medhu Vada / Masala Vada',
          taName: 'மெது வடை / மசாலா வடை',
          image: FOOD_IMAGES.chicken65,
          scent: language === 'en' ? 'Crispy Lentil & Deep Fried Fennel' : 'மொறுமொறுப்பான உளுந்து வடை & சோம்பு மணம்',
          profile: language === 'en'
            ? 'Crispy golden Medhu Vada or crunchy spiced Masala Vada served with fresh coconut chutney.'
            : 'தேங்காய் சட்னியுடன் பரிமாறப்படும் மொறுமொறுப்பான உளுந்து வடை அல்லது மசாலா வடை.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Tamarind Rice / Coconut Rice',
          taName: 'புளி சாதம் / தேங்காய் சாதம்',
          image: FOOD_IMAGES.tamarindRice,
          scent: language === 'en' ? 'Tangy Tamarind & Creamy Coconut' : 'புளிப்பு புளியோதரை & நறுமண தேங்காய் எண்ணெய் சாதம்',
          profile: language === 'en'
            ? 'Temple-style tangy tamarind rice cooked with peanuts, or coconut rice finished with mustard and red chilies.'
            : 'வேர்க்கடலை சேர்த்த கோயில் புளியோதரை மற்றும் தேங்காய் துருவல் சாதம்.',
        },
        {
          category: language === 'en' ? 'Gravy & Sides' : 'கிரேவி & சைட் டிஷ்',
          enName: 'Brinjal Thokku / Potato Fry',
          taName: 'கத்திரிக்காய் தொக்கு / உருளைக்கிழங்கு வறுவல்',
          image: FOOD_IMAGES.brinjal,
          scent: language === 'en' ? 'Rich Spiced Curry & Roast Garlic' : 'எண்ணெய் கத்திரிக்காய் & வறுத்த பூண்டு',
          profile: language === 'en'
            ? 'Slow-simmered brinjal thokku gravy or crispy roasted baby potato fry with cumin.'
            : 'சுவையான எண்ணெய் கத்திரிக்காய் தொக்கு மற்றும் காரசாரமான உருளைக்கிழங்கு வறுவல்.',
        },
        {
          category: language === 'en' ? 'Desserts' : 'இனிப்பு வகை',
          enName: 'Kesari Payasam / Bread Halwa',
          taName: 'கேசரி பாயசம் / பிரட் அல்வா',
          image: FOOD_IMAGES.payasam,
          scent: language === 'en' ? 'Caramel Ghee & Saffron Milk' : 'நெய் மணம் கமழும் அல்வா & ஏலக்காய் பாயசம்',
          profile: language === 'en'
            ? 'Creamy vermicelli payasam rich with cardamom, or sweet bread halwa glistening with ghee.'
            : 'முந்திரி தூவிய ஏலக்காய் பாயசம் அல்லது நெய் மணக்கும் பிரெட் அல்வா.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Digestive Pepper & Sweet Betel Wrap' : 'மிளகுச் சாறு & நறுமண வெற்றிலை',
          profile: language === 'en'
            ? 'Warm, tangy pepper rasam for digestion, followed by a sweet betel leaf beeda fold.'
            : 'செரிமானத்திற்கு உகந்த மிளகு ரசம் மற்றும் நறுமண இனிப்பு வெற்றிலை பீடா.',
        },
      ],
    },

    housewarming: {
      title: language === 'en' ? 'Housewarming & Naming' : 'கிரகப்பிரவேசம் & பெயர் சூட்டுதல்',
      desc: language === 'en'
        ? 'A sacred vegetarian meal cooked with pure ghee, showcasing traditional South Indian variety rices, sweets, and vadai.'
        : 'புதிய இல்லம் புகும் கிரகப்பிரவேசம் மற்றும் மங்களகரமான பெயர் சூட்டும் விழாவுக்கான பாரம்பரிய சைவ உணவு.',
      image: '/valakappu_feast.png',
      items: [
        {
          category: language === 'en' ? 'Welcome Drink' : 'வரவேற்பு பானம்',
          enName: 'Spiced Buttermilk / Rose Milk',
          taName: 'நீர் மோர் / ரோஸ் மில்க்',
          image: FOOD_IMAGES.roseSherbet,
          scent: language === 'en' ? 'Cool Ginger Mint & Floral Rose' : 'இஞ்சி மணம் கமழும் மோர் & ரோஜா மில்க்',
          profile: language === 'en'
            ? 'Chilled spiced buttermilk with curry leaves and ginger, or fragrant rose milk.'
            : 'குளுமையான நீர் மோர் அல்லது நறுமண ரோஸ் மில்க்.',
        },
        {
          category: language === 'en' ? 'Sweets' : 'இனிப்பு வகை',
          enName: 'Sweet Pongal / Kesari Payasam',
          taName: 'சர்க்கரை பொங்கல் / கேசரி பாயசம்',
          image: FOOD_IMAGES.sweetPongal,
          scent: language === 'en' ? 'Jaggery Cardamom & Melted Ghee' : 'வெல்ல பாகு, ஏலக்காய் & நெய் மணக்கும் சாதம்',
          profile: language === 'en'
            ? 'Traditional sweet pongal made with fresh jaggery and cashews, or rich vermicelli payasam.'
            : 'நெய் மணக்கும் கோவில் சர்க்கரை பொங்கல் அல்லது கேசரி பாயசம்.',
        },
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Masala Vada / Medhu Vada',
          taName: 'மசாலா வடை / மெது வடை',
          image: FOOD_IMAGES.raitha,
          scent: language === 'en' ? 'Crispy Fennel Dal & Fluffy Lentil' : 'வறுத்த கடலைப்பருப்பு & சோம்பு வடை',
          profile: language === 'en'
            ? 'Crispy golden masala vada or light fluffy medhu vada served with mint chutney.'
            : 'புதினா சட்னியுடன் பரிமாறப்படும் மொறுமொறுப்பான வடை வகைகள்.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Lemon Rice / Curd Rice',
          taName: 'எலுமிச்சை சாதம் / தயிர் சாதம்',
          image: FOOD_IMAGES.coconutRice,
          scent: language === 'en' ? 'Zesty Turmeric & Cool Creamy Yogurt' : 'மஞ்சள் எலுமிச்சை & குளுமையான தயிர் சாதம்',
          profile: language === 'en'
            ? 'Tangy yellow lemon rice tempered with mustard, or cooling cream curd rice.'
            : 'கடுகு தாளித்த எலுமிச்சை சாதம் மற்றும் மாதுளை தூவிய தயிர் சாதம்.',
        },
        {
          category: language === 'en' ? 'Sides' : 'தொடுகறி',
          enName: 'Brinjal Thokku / Potato Fry',
          taName: 'கத்திரிக்காய் தொக்கு / உருளைக்கிழங்கு வறுவல்',
          image: FOOD_IMAGES.brinjal,
          scent: language === 'en' ? 'Tamarind Garlic & Spiced Chili Pepper' : 'புளிப்பு கத்திரி & காரசாரமான உருளைக்கிழங்கு',
          profile: language === 'en'
            ? 'Rich tamarind-cooked brinjal thokku or pan-roasted baby potatoes.'
            : 'சுவையான எண்ணெய் கத்திரிக்காய் தொக்கு மற்றும் காரசாரமான உருளை வறுவல்.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Tangy Tamarind Pepper & Refreshing Betel' : 'மிளகு ரசம் & நறுமண வெற்றிலை பீடா',
          profile: language === 'en'
            ? 'Hot pepper rasam for digestion, concluded with a sweet betel leaf fold.'
            : 'செரிமானத்திற்கு உகந்த மிளகு ரசம் மற்றும் இனிப்பு வெற்றிலை பீடா.',
        },
      ],
    },

    temple: {
      title: language === 'en' ? 'Tonsure, Puberty & Ear Piercing' : 'மொட்டை, காதுகுத்து & மஞ்சள் நீராட்டு',
      desc: language === 'en'
        ? 'A grand non-vegetarian feast designed for family functions, tonsure ceremonies, and traditional temple events.'
        : 'மொட்டை போடுதல், காது குத்து மற்றும் மஞ்சள் நீராட்டு விழா போன்ற பாரம்பரிய குடும்ப விழாக்களுக்கான அசைவ விருந்து.',
      image: '/nonveg_feast.png',
      items: [
        {
          category: language === 'en' ? 'Welcome Drink' : 'வரவேற்பு பானம்',
          enName: 'Rose Sherbet / Fruit Punch',
          taName: 'ரோஸ் சர்பத் / ஃப்ரூட் பஞ்ச்',
          image: FOOD_IMAGES.roseSherbet,
          scent: language === 'en' ? 'Cool Rose Syrup & Citric Punch' : 'குளிர்ந்த ரோஜா சர்பத் & பழச்சாறு',
          profile: language === 'en'
            ? 'Refreshing sweet rose sherbet or cold fruit punch mocktail.'
            : 'வரவேற்புக்கு உகந்த சர்பத் அல்லது பழச்சாறு.',
        },
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Chicken 65 / Mutton Kola Urundai',
          taName: 'சிக்கன் 65 / மட்டன் கோலா உருண்டை',
          image: FOOD_IMAGES.chicken65,
          scent: language === 'en' ? 'Spiced Curry Leaf & Fried Garlic' : 'வறுத்த பூண்டு & மசாலா நறுமணம்',
          profile: language === 'en'
            ? 'Deep-fried crispy Chicken 65 seasoned with curry leaves, or soft minced mutton balls.'
            : 'வறுத்த சிக்கன் 65 அல்லது சோம்பு மணக்கும் மட்டன் கோலா உருண்டை.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Mutton Biryani / Chicken Biryani',
          taName: 'மட்டன் பிரியாணி / சிக்கன் பிரியாணி',
          image: FOOD_IMAGES.biryani,
          scent: language === 'en' ? 'Aromatic Seeraga Samba Rice & Ghee' : 'நெய் மணம் கமழும் சீரக சம்பா சாதம்',
          profile: language === 'en'
            ? 'Aromatic Seeraga Samba rice layered with mutton or chicken, mint, and pure ghee.'
            : 'நெய் மற்றும் புதினா சேர்த்து சமைத்த நறுமண சீரக சம்பா சாத பிரியாணி.',
        },
        {
          category: language === 'en' ? 'Gravy' : 'கூடுதல் சைட் டிஷ்',
          enName: 'Mutton Chukka / Pepper Chicken',
          taName: 'மட்டன் சுக்கா / மிளகு சிக்கன்',
          image: FOOD_IMAGES.muttonChukka,
          scent: language === 'en' ? 'Black Pepper & Caramelized Onion' : 'மிளகுத் தூள் & வதக்கிய சின்ன வெங்காயம்',
          profile: language === 'en'
            ? 'Dry roasted spicy mutton slow-cooked with shallots, or chicken pan-fried with black pepper.'
            : 'வெங்காயத்துடன் வதக்கிய மட்டன் சுக்கா அல்லது மிளகு சிக்கன் வறுவல்.',
        },
        {
          category: language === 'en' ? 'Sides' : 'பச்சடி',
          enName: 'Onion Raitha / Brinjal Thokku',
          taName: 'வெங்காய ரைத்தா / கத்திரிக்காய் தொக்கு',
          image: FOOD_IMAGES.raitha,
          scent: language === 'en' ? 'Creamy Yogurt & Sour Tamarind' : 'குளிர்ச்சியான தயிர் & புளிப்பு கத்திரி',
          profile: language === 'en'
            ? 'Chilled onion raitha and tamarind brinjal thokku.'
            : 'பிரியாணிக்கு உகந்த வெங்காய பச்சடி மற்றும் எண்ணெய் கத்திரிக்காய் தொக்கு.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Tamarind Water & Sweet Betel wrap' : 'மிளகு ரசம் & செரிமான பீடா',
          profile: language === 'en'
            ? 'Hot spiced tamarind rasam and a sweet digestive betel roll.'
            : 'செரிமானத்திற்கு உகந்த காரசாரமான மிளகு ரசம் மற்றும் இனிப்பு வெற்றிலை பீடா.',
        },
      ],
    },

    shashtipoorthi: {
      title: language === 'en' ? '60th & 80th Birthday Feast' : 'சஷ்டி பூர்த்தி & சதாபிஷேகம்',
      desc: language === 'en'
        ? 'A premium vegetarian feast prepared with authentic heritage recipes to honor elders on their auspicious milestones.'
        : 'சஷ்டி பூர்த்தி (60 வயது பூர்த்தி) மற்றும் சதாபிஷேகம் (80 வயது) போன்ற சுப நிகழ்ச்சிகளுக்கான உயர்தர பாரம்பரிய சைவ விருந்து.',
      image: '/valakappu_feast.png',
      items: [
        {
          category: language === 'en' ? 'Welcome Drink' : 'வரவேற்பு பானம்',
          enName: 'Spiced Buttermilk / Filter Coffee',
          taName: 'நீர் மோர் / பில்டர் காபி',
          image: FOOD_IMAGES.roseSherbet,
          scent: language === 'en' ? 'Cool Ginger & Roasted Coffee Bean' : 'இஞ்சி மணம் கமழும் மோர் & சுடச்சுட காபி',
          profile: language === 'en'
            ? 'Chilled buttermilk tempered with mustard, or brass-tumbler South Indian filter coffee.'
            : 'நீர் மோர் அல்லது நறுமண பில்டர் காபி.',
        },
        {
          category: language === 'en' ? 'Sweets' : 'இனிப்பு வகை',
          enName: 'Kashi Halwa / Sweet Pongal',
          taName: 'காசி அல்வா / சர்க்கரை பொங்கல்',
          image: FOOD_IMAGES.halwa,
          scent: language === 'en' ? 'Saffron Pumpkin Ghee & Jaggery Cardamom' : 'நெய் அல்வா & ஏலக்காய் பொங்கல் மணம்',
          profile: language === 'en'
            ? 'Ash gourd Halwa glistening with ghee, or sweet pongal cooked with jaggery and cashews.'
            : 'நெய் மணக்கும் காசி அல்வா அல்லது சர்க்கரை பொங்கல்.',
        },
        {
          category: language === 'en' ? 'Starters' : 'துவக்க உணவு',
          enName: 'Medhu Vada / Masala Vada',
          taName: 'மெது வடை / மசாலா வடை',
          image: FOOD_IMAGES.raitha,
          scent: language === 'en' ? 'Crispy Lentil & Fennel Roast' : 'மொறுமொறுப்பான உளுந்து வடை & சோம்பு மணம்',
          profile: language === 'en'
            ? 'Fluffy golden medhu vada or crunchy masala vada served with fresh coconut chutney.'
            : 'தேங்காய் சட்னியுடன் பரிமாறப்படும் மெது வடை மற்றும் மசாலா வடை.',
        },
        {
          category: language === 'en' ? 'Main Rice' : 'முக்கிய சாதம்',
          enName: 'Tamarind Rice / Curd Rice',
          taName: 'புளி சாதம் / தயிர் சாதம்',
          image: FOOD_IMAGES.tamarindRice,
          scent: language === 'en' ? 'Auspicious Tamarind & Cream Yogurt' : 'புளிப்பு புளியோதரை & குளுமையான தயிர் சாதம்',
          profile: language === 'en'
            ? 'Temple-style tangy tamarind rice cooked with peanuts, or cooling curd rice with mustard tempering.'
            : 'கோயில் புளியோதரை சாதம் மற்றும் குளுமையான தயிர் சாதம்.',
        },
        {
          category: language === 'en' ? 'Sides' : 'தொடுகறி',
          enName: 'Brinjal Thokku / Potato Fry',
          taName: 'கத்திரிக்காய் தொக்கு / உருளைக்கிழங்கு வறுவல்',
          image: FOOD_IMAGES.brinjal,
          scent: language === 'en' ? 'Rich Spiced Curry & Chili Roast' : 'எண்ணெய் கத்திரிக்காய் & காரசாரமான உருளைக்கிழங்கு',
          profile: language === 'en'
            ? 'Tamarind-simmered brinjal thokku or spiced roasted baby potato fry.'
            : 'சுவையான எண்ணெய் கத்திரிக்காய் தொக்கு மற்றும் காரசாரமான உருளை வறுவல்.',
        },
        {
          category: language === 'en' ? 'Closing' : 'முத்தாய்ப்பு',
          enName: 'Pepper Rasam / Sweet Beeda',
          taName: 'மிளகு ரசம் / இனிப்பு பீடா',
          image: FOOD_IMAGES.rasam,
          scent: language === 'en' ? 'Digestive Pepper Cumin & Refreshing Betel' : 'மிளகு ரசம் & நறுமண வெற்றிலை பீடா',
          profile: language === 'en'
            ? 'Tangy pepper rasam for digestion, and a sweet digestive betel fold.'
            : 'செரிமானத்திற்கு உகந்த மிளகு ரசம் மற்றும் இனிப்பு வெற்றிலை பீடா.',
        },
      ],
    },
  };

  const activeMenu = menus[activeTab];

  const handleMouseEnter = (idx) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredItem(idx);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredItem(null), 100);
  };

  return (
    <section className="menu-section" id="menus">
      <div className="section-header">
        <h3>
          {language === 'en' ? 'Our Traditional ' : 'எங்கள் பாரம்பரிய '}
          <span>{language === 'en' ? 'Feast Options' : 'உணவு வகைகள்'}</span>
        </h3>
        <p>
          {language === 'en'
            ? 'Browse our traditional menus. Hover over each dish to experience the aroma profiles and details. Add them to your wishlist below.'
            : 'எங்கள் பாரம்பரிய உணவு வகைகளை ஆராயுங்கள். அவற்றின் நறுமணத்தை அறிய மவுஸை நகர்த்தவும்.'}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {Object.keys(menus).map((key) => (
          <button
            key={key}
            className={`btn ${activeTab === key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(key)}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          >
            {menus[key].title}
          </button>
        ))}
      </div>

      {/* Selected Category Content */}
      <div className="glass-card menu-category-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Category Hero Image */}
        {activeMenu.image && (
          <FoodImage
            src={activeMenu.image}
            alt={activeMenu.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'block',
            }}
          />
        )}

        <div className="menu-category-title">
          <span>{activeMenu.title}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>
            {activeMenu.items.length} {language === 'en' ? 'Courses' : 'பிரிவுகள்'}
          </span>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem', textAlign: 'left' }}>
          {activeMenu.desc}
        </p>

        {/* Items List */}
        <div className="menu-items-list">
          {activeMenu.items.map((item, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="menu-item-row"
              style={{ display: 'flex', flexDirection: 'row', gap: '1.25rem', alignItems: 'center', position: 'relative' }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dish Small Circular Image with Gold Border */}
              <div style={{
                flexShrink: 0,
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '2px solid var(--color-gold)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                backgroundColor: '#1E1E1E',
              }}>
                <FoodImage
                  src={item.image}
                  alt={item.enName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Details */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div className="menu-item-header">
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 'bold', textTransform: 'uppercase', marginRight: '0.75rem', flexShrink: 0 }}>
                    {item.category}
                  </span>
                  <span className="menu-item-name">
                    {language === 'en' ? item.enName : item.taName}
                  </span>
                  <div className="menu-item-dots" />
                  <span className="menu-item-tag" style={{ color: 'var(--color-green-light)', flexShrink: 0 }}>
                    {language === 'en' ? 'Auspicious' : 'மங்களகரம்'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span className="menu-item-desc" style={{ textAlign: 'left', flexGrow: 1, color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                    {language === 'en'
                      ? item.enName.replace(' / ', ' or ')
                      : item.taName.replace(' / ', ' அல்லது ')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)', opacity: 0.7, flexShrink: 0, marginLeft: '0.5rem' }}>
                    <Flame size={12} style={{ animation: 'float 3s infinite ease-in-out' }} />
                    <span style={{ fontSize: '0.72rem' }}>{language === 'en' ? 'Hover' : 'நறுமணம்'}</span>
                  </div>
                </div>
              </div>

              {/* Hover Scent Tooltip */}
              {hoveredItem === idx && (
                <div
                  className="scent-tooltip"
                  style={{
                    opacity: 1,
                    transform: 'translateX(-50%) translateY(0)',
                    pointerEvents: 'auto',
                    left: '50%',
                    bottom: 'calc(100% + 12px)',
                    top: 'auto',
                  }}
                >
                  {/* Large Image inside Tooltip */}
                  <FoodImage
                    src={item.image}
                    alt={item.enName}
                    style={{
                      width: '100%',
                      height: '110px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '0.6rem',
                      border: '1px solid rgba(212,175,55,0.3)',
                      display: 'block',
                    }}
                  />
                  <div className="steam-container" style={{ left: '50%', transform: 'translateX(-50%)', top: '-15px' }}>
                    <div className="steam-line" />
                    <div className="steam-line" />
                    <div className="steam-line" />
                  </div>
                  <div className="scent-badge">
                    <Flame size={10} style={{ color: 'var(--color-gold)' }} />
                    {item.scent}
                  </div>
                  <p style={{ color: '#fff', fontSize: '0.8rem', lineHeight: '1.4', marginTop: '0.4rem' }}>
                    {item.profile}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
