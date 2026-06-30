# AGKS Catering Service: Digital Strategy & Enquiry-Based Booking Plan

This document provides the finalized, comprehensive roadmap for the **AGKS Catering Service** website. It integrates high-end 3D animations, traditional and modern menu options (Veg & Non-Veg), and a streamlined enquiry-based booking workflow.

---

## 1. Creative Design Concept: "The Modern Tradition"

The visual identity of AGKS will bridge the gap between ancient culinary heritage and futuristic digital design.

### Visual Identity
*   **Color Palette:**
    *   **Royal Gold (#D4AF37):** Representing the richness of traditional spices and brass vessels.
    *   **Leaf Green (#2E7D32):** Symbolizing the freshness of the banana leaf service.
    *   **Deep Charcoal (#121212):** Providing a premium, high-contrast background for 3D elements.
*   **Typography:**
    *   **Headings:** *Playfair Display* (Serif) for a sophisticated, high-end look.
    *   **Body:** *Noto Sans Tamil* for perfect readability across all bilingual content.

---

## 2. 3D Loading Experience: "Antigravity Spices"

To utilize the full potential of the **Antigravity IDE**, the entry point of the website will be a cinematic 3D loading sequence created using **Spline** and **Three.js**.

### The Animation Workflow
1.  **Scene Setup:** A floating 3D **Brass Uruli** (traditional South Indian vessel) centered in a dark, atmospheric void.
2.  **The "Antigravity" Effect:** Instead of a standard loading bar, virtual ingredients—**Cardamom pods, Star Anise, and Curry Leaves**—will float upwards in slow motion around the vessel.
3.  **Interaction:** As the loading progress increases, the spices begin to swirl faster, eventually converging into the center of the Uruli to form the **AGKS Gold Logo**.
4.  **Transition:** Upon completion, the camera "dives" into the vessel, transitioning seamlessly into the main dashboard.

---

## 3. Function-Wise Menu Listings (Veg & Non-Veg)

### A. Non-Vegetarian Feast (அசைவ விருந்து)
| Category | English Item | தமிழ் உருப்படி |
| :--- | :--- | :--- |
| **Starters** | Chicken 65 / Mutton Kola Urundai | சிக்கன் 65 / மட்டன் கோலா உருண்டை |
| **Main Rice** | Mutton Biryani / Chicken Biryani | மட்டன் பிரியாணி / சிக்கன் பிரியாணி |
| **Gravy** | Mutton Chukka / Pepper Chicken | மட்டன் சுக்கா / மிளகு சிக்கன் |
| **Egg** | Boiled Egg / Egg Masala | அவித்த முட்டை / முட்டை மசாலா |
| **Sides** | Onion Raitha / Brinjal Thokku | வெங்காய ரைத்தா / கத்திரிக்காய் தொக்கு |
| **Closing** | Pepper Rasam / Sweet Beeda | மிளகு ரசம் / இனிப்பு பீடா |

### B. Traditional Valakappu (வளைகாப்பு - 7 Variety Rice)
| No. | Variety Rice (English) | வகை சாதம் (Tamil) |
| :--- | :--- | :--- |
| 1 | Tamarind Rice | புளி சாதம் |
| 2 | Lemon Rice | எலுமிச்சை சாதம் |
| 3 | Coconut Rice | தேங்காய் சாதம் |
| 4 | Curd Rice | தயிர் சாதம் |
| 5 | Sesame Rice | எள்ளு சாதம் |
| 6 | Curry Leaf Rice | கருவேப்பிலை சாதம் |
| 7 | Sweet Pongal | சர்க்கரை பொங்கல் |
| **Sides** | Potato Fry, Vadai, Appalam, Pickle | உருளைக்கிழங்கு வறுவல், வடை, அப்பளம், ஊறுகாய் |

---

## 4. Quantity Estimation Guide (Per 100 Guests)

| Item Type | Estimated Quantity | Notes |
| :--- | :--- | :--- |
| **Biryani (Rice)** | 12 - 15 kg | Based on 150g per person |
| **Meat (Chicken/Mutton)** | 15 - 18 kg | Bone-in, standard cuts |
| **Variety Rice** | 10 kg total | Distributed across 7 types |
| **Sambar/Gravy** | 15 - 20 Liters | |
| **Dessert (Halwa/Payasam)** | 8 - 10 Liters | |
| **Water** | 50 - 60 Liters | Including serving and drinking |

---

## 5. Function Checklists

### Breakfast Checklist (காலை உணவு)
- [ ] Mini Idli & Medhu Vada
- [ ] Ghee Pongal & Sambar
- [ ] Variety of Chutneys (Coconut, Tomato, Mint)
- [ ] Filter Coffee / Tea Counter
- [ ] Live Dosa Counter (Podi Dosa, Masala Dosa)

### Evening Reception Checklist (மாலை வரவேற்பு)
- [ ] Welcome Drink (Rose Milk / Fruit Punch)
- [ ] Live Chaat Counter (Pani Puri, Bhel Puri)
- [ ] Veg / Chicken Cutlets
- [ ] Special Sweets (Kaju Katli / Basundi)
- [ ] Ice Cream Counter with Toppings

### Bangle Ritual (Valakappu) Essentials
- [ ] Glass Bangles (Multiple colors & sizes)
- [ ] Sandalwood Paste & Kumkum
- [ ] Turmeric & Flowers (Jasmine strings)
- [ ] Thamboolam Bags (Betel leaves, nuts, coconut)

---

## 6. Enquiry-Based Booking System (No Per-Leaf Pricing)

The system is redesigned to focus on **Consultation and Customization** rather than fixed transactions.

### Workflow:
1.  **Function Selection:** User selects the type of event (Wedding, Valakappu, etc.).
2.  **Item Wishlist:** User browses the menus and "Adds to Wishlist" the items they want to include.
3.  **Guest & Details:** User enters the expected guest count, date, and venue location.
4.  **Enquiry Submission:** User submits the enquiry without seeing a final price.
5.  **Admin Dashboard:** AGKS receives the detailed wishlist and contacts the user for a personalized quote.

---

## 7. Technical Implementation in Antigravity

*   **Framework:** React.js with Vite.
*   **3D Engine:** Spline for the "Antigravity" loading page.
*   **Form Logic:** Formik or React Hook Form for the detailed enquiry submission.
*   **Backend:** Supabase for storing enquiries and managing the menu database.

---
**Prepared by:** Manus AI  
**For:** AGKS Catering Service  
**Status:** Finalized Plan  
**Date:** June 23, 2026
