import { jsPDF } from 'jspdf';

export function generateEnquiryPDF({
  name,
  eventType,
  guestCount,
  selectedDate,
  isMuhurthamDate,
  venue,
  wishlistSummary,
  checkedAddonLabels,
  estimatedMaterials,
  language,
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // ── Colour palette ─────────────────────────────────────────────────────────
  const gold      = [170, 124, 17];
  const green     = [46,  125, 50];
  const darkText  = [33,  33,  33];
  const mutedText = [100, 100, 100];
  const lightLine = [220, 220, 220];

  // ── Page border ────────────────────────────────────────────────────────────
  doc.setDrawColor(...gold);
  doc.setLineWidth(1.5);
  doc.rect(5, 5, 200, 287);

  // ── Brand header ──────────────────────────────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...gold);
  doc.text('AGKS CATERING SERVICE', 15, 22);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...mutedText);
  doc.text('THE MODERN TRADITION  |  ENQUIRY & WISHLIST SPECIFICATION SHEET', 15, 28);

  // Enquiry meta — right side
  const enquiryId = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text(`ENQUIRY ID: ${enquiryId}`, 140, 20);
  doc.setFont('Helvetica', 'normal');
  doc.text(`DATE: ${new Date().toLocaleDateString()}`, 140, 25);
  doc.text('Status: Pending Review by AGKS', 140, 30);

  // Divider
  doc.setDrawColor(...lightLine);
  doc.setLineWidth(0.4);
  doc.line(15, 34, 195, 34);

  // ── Section 1: Event & Client Details ─────────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text('1. EVENT & CLIENT DETAILS', 15, 43);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkText);

  const details = [
    ['Client Name',   name || 'Valued Customer'],
    ['Event Type',    eventType.toUpperCase()],
    ['Guest Count',   `${guestCount} persons`],
    ['Preferred Date', selectedDate + (isMuhurthamDate ? '  (* Auspicious Muhurtham Day)' : '')],
    ['Venue / Location', venue || 'To be confirmed'],
  ];

  let y = 51;
  details.forEach(([label, value]) => {
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(...mutedText);
    doc.text(`${label}:`, 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(...darkText);
    doc.text(value, 65, y);
    y += 7;
  });

  if (isMuhurthamDate) {
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(...green);
    doc.text('(*)  Auspicious Valarpirai Muhurtham Date - Highly recommended for events!', 15, y);
    y += 7;
  }

  // Divider
  doc.setDrawColor(...lightLine);
  doc.line(15, y + 2, 195, y + 2);
  y += 10;

  // ── Section 2: Banana Leaf Wishlist ───────────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text('2. BANANA LEAF MEAL WISHLIST', 15, y);
  y += 8;

  if (wishlistSummary.length > 0) {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...darkText);

    // Draw items in a 2-column grid
    wishlistSummary.forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = col === 0 ? 15 : 105;
      const yPos = y + row * 7;
      doc.text(`• ${item}`, xPos, yPos);
    });
    y += Math.ceil(wishlistSummary.length / 2) * 7 + 4;
  } else {
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...mutedText);
    doc.text('No specific leaf items selected — AGKS will suggest based on event type.', 15, y);
    y += 8;
  }

  // Divider
  doc.setDrawColor(...lightLine);
  doc.line(15, y, 195, y);
  y += 8;

  // ── Section 3: Add-On Checklist Services ──────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text('3. ADD-ON SERVICES & RITUAL ESSENTIALS', 15, y);
  y += 8;

  if (checkedAddonLabels.length > 0) {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...darkText);

    checkedAddonLabels.forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = col === 0 ? 15 : 105;
      const yPos = y + row * 7;
      doc.setTextColor(...green);
      doc.text('[v]', xPos, yPos);
      doc.setTextColor(...darkText);
      doc.text(item, xPos + 5, yPos);
    });
    y += Math.ceil(checkedAddonLabels.length / 2) * 7 + 4;
  } else {
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...mutedText);
    doc.text('No additional services selected.', 15, y);
    y += 8;
  }

  // Divider
  doc.setDrawColor(...lightLine);
  doc.line(15, y, 195, y);
  y += 8;

  // ── Section 4: Raw Material Estimation ───────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text(`4. RAW MATERIAL ESTIMATION  (for ${guestCount} guests)`, 15, y);
  y += 8;

  // Table header
  doc.setFillColor(245, 245, 245);
  doc.rect(15, y - 4, 180, 7, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...mutedText);
  doc.text('Item',              15,  y);
  doc.text('Min Quantity',     110, y);
  doc.text('Max Quantity',     155, y);
  y += 7;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  estimatedMaterials.forEach((row, i) => {
    doc.setTextColor(...darkText);
    doc.text(row.labelEN, 15, y);
    doc.setTextColor(...gold);
    doc.text(`${row.minVal} ${row.unit}`, 110, y);
    doc.text(`${row.maxVal} ${row.unit}`, 155, y);
    if (row.note) {
      doc.setTextColor(...mutedText);
      doc.setFontSize(7.5);
      doc.text(`  ${row.note}`, 15, y + 3.5);
      doc.setFontSize(9);
      y += 4;
    }
    doc.setDrawColor(...lightLine);
    doc.line(15, y + 2, 195, y + 2);
    y += 8;
  });

  y += 4;

  // ── Section 5: Next Steps ─────────────────────────────────────────────────
  doc.setFillColor(250, 249, 244);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.rect(15, y, 180, 30, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...gold);
  doc.text('NEXT STEPS', 20, y + 7);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text('1. Our catering manager will review this enquiry and call you within 2–4 hours.', 20, y + 14);
  doc.text('2. A detailed, personalised quotation will be shared after the consultation call.', 20, y + 20);
  doc.text('3. Menu adjustments can be made up to 10 days before the event date.', 20, y + 26);

  y += 38;

  // ── Footer ────────────────────────────────────────────────────────────────
  doc.setDrawColor(...lightLine);
  doc.line(15, 275, 195, 275);
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedText);
  doc.text(
    'AGKS Catering Service  |  WhatsApp: +91 82206 27025',
    105, 281, { align: 'center' }
  );

  doc.save(`AGKS_Enquiry_${enquiryId}.pdf`);
}
