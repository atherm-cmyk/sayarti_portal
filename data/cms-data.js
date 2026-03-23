/**
 * Sayarti Portal - CMS Data Layer
 * All product, vehicle, banner, and content data
 */

const SayartiData = {

  site: {
    name: 'Sayarti',
    tagline: 'By AlSayer',
    currency: 'KWD',
    phone: '+965 1234 5678',
    year: 2026,
    cmsVersion: '2.4.0',
    logoUrl: 'https://lh3.googleusercontent.com/aida/ADBb0uiEKpLgd4oXw3sqmQ-bFhlymDxqBPoA3qfAjCN7gMnKgFbKwhN25qcpUdrscZdrH8Y9Rr5vVevJ0G23_brRQdLK54hbKotmGARsp0TJep9PIXjcXrhY0t1Jc3S21Fkd0PTT2sAfll5yffpYDn6NSRdRYoqwsYv0-V1PrEJYiFYl9WrQEMAjUah-CUcTWnZPB9JxPGMpIg9xs8_Jwvk4uRpkRMCCQmMKfREBKPzHAM5q_BqYOUv1cWkDCQeXK2yGlv3ALejSTWEQ'
  },

  lifestyleCategories: [
    { id: 'protected', name: 'Protected', tagline: 'DRIVE WITH CONFIDENCE', description: 'Shield your investment from the elements.', longDescription: 'Engineered for the extremes. Our protection series shields your investment with high-impact armor and advanced film technologies.', icon: 'shield', heroLabel: 'Premium Armor', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Pz5_xidqL16WMHT1_Q5yIOLF75ILQrE8XVBcvuRwi0Yri5aaJxpQgRde-QUjnBchKmNuzPoC77gW8XLiVsvuIhZ8D8exH0aOFC1e-LEujT27o4QFSTPPmQI42JWmgdpapEhMDcO_cz-iRJvAZo1n7F7bRIasf0sR3SaP_RVB_flVqbBJWf2WZGA4sCMfRWpigwHRnCjVfa5m2L9pad7o2gvbI933wN0HqbYCHL5UVgrHuFBNmOp_w7dbzsRy-jjkPxgb62KGqz8' },
    { id: 'off-grid', name: 'Off-Grid', tagline: 'EXPLORE BEYOND', description: 'Gear for the road less traveled.', longDescription: 'Built for the bold. Our off-grid series equips you with expedition-grade gear for any terrain.', icon: 'terrain', heroLabel: 'Adventure Gear', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIEszaAqs3tLkR-KX0YL2HRl5MVy99YV3O707b7T9Qa_EpAPTkRxFtCXwAp8LpfUKsb542J-jHnWWIXOCDVG4GzwnD6RPBo5ms44tTNbOA-9s6vIf_iys_-5H6ox033pxCNQVsm2BxkLWU1d6kVIQH9eeHgiuYvq9Yf-9k5SFqoqY0T09mUJs7gLwwYLrxM_Oo4CrFIc4RIr7hvSCQr8Y9uc1kVYn1otlXZ1ejKeUvTfiZwDnShf7759nIM-_VLBtNykt37KKp078' },
    { id: 'connected', name: 'Connected', tagline: 'DRIVE SMARTER', description: 'Smart tech for a seamless journey.', longDescription: 'Stay ahead with intelligent accessories that keep you connected, informed, and in control.', icon: 'settings_input_antenna', heroLabel: 'Smart Tech', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl-V90YuD-Ban63P5dYuBlWX8fyv48ZGSNGqwXTb1XCtLp30RGRqt_FeCi8xoE1Mm6-hlhvJ0sOSRu1w8kRqgHdj9hl9R818OFMpcKPe6F43mVpt5pnIFUp0esyHMGSiYv2YjzIVP3s2Zi0mWnzTY4CLP7ewvoCP3jTiyIvRyYs3bLOKhyu5iO0n5NPFyI-Mlv5SJRKVpTskh76OiVlImNke8qACNP9XMM_AylEw7EaWliYq2o7JNP50yZ10WWEJp9V7SrFAtDgCo' },
    { id: 'accessorized', name: 'Accessorized', tagline: 'REFLECTS YOU', description: 'The final touch for personal style.', longDescription: 'Express yourself with premium cosmetic and styling accessories crafted for a perfect fit.', icon: 'minor_crash', heroLabel: 'Style & Custom', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy4LAXG-pNPqy4Y2Z4xjHuwmBtkKALtW5XQX3GtaxvhHvBKx32Lf14QVp2YDWlgQrNh_lG8o7YBBIh3wO_LoBvyN7pES6AEL0TU_M5cnEwL1t1khTtOkZO2mnfefBzSHZO-e-523i1RhNfVHDBdvHZ0nm6xGPJBsFTXR5bvlqGXqXazLfBSqdO9HNgudXh_tfiMwj_s3C5CPjIOVYu8Q5HmHoZbcJO6N_LNZL3YfojKW4nRQjS4TV6uZHesgpCN7Iny4bSG9PO8Ps' }
  ],

  vehicles: [
    { id: 'land-cruiser', name: 'Land Cruiser', year: '2024', type: 'Premium SUV', tagline: 'KING OF THE ADVENTURE', description: 'Engineered for resilience. Refined for the elite.' },
    { id: 'prado', name: 'Prado', year: '2024', type: 'Luxury SUV', tagline: 'ENGINEERED FOR EXTREMES', description: 'Elevate your adventure with genuine Toyota accessories.' },
    { id: 'rav4', name: 'RAV4', year: '2024', type: 'Compact SUV', tagline: 'RAV4 EVOLVED', description: 'Adventure meets urban sophistication.' },
    { id: 'camry', name: 'Camry', year: '2024', type: 'Sedan', tagline: 'CAMRY PRECISION', description: 'Engineered to enhance your urban driving experience.' },
    { id: 'fortuner', name: 'Fortuner', year: '2024', type: 'Large SUV', tagline: 'FORTUNER EQUIPMENT', description: 'Enhance your Fortuner dominance with precision-engineered accessories.' },
    { id: 'corolla', name: 'Corolla', year: '2024', type: 'Sedan', tagline: 'PRECISION ENGINEERING', description: 'Elevate your daily drive with genuine accessories.' },
    { id: 'corolla-cross', name: 'Corolla Cross', year: '2024', type: 'Compact SUV', tagline: 'COROLLA CROSS HYBRID', description: 'Hybrid-focused accessory ecosystem.' }
  ],

  lifestyleProducts: {
    'protected': [
      { id: 'p-armor-01', name: 'Heavy-Duty Aluminum Underbody Armor', sku: 'TRD-PRT-245', price: 245.000, rating: 4.9, reviews: 156, badge: 'Best Seller', category: 'protected', featured: true, description: 'Full-chassis protection for extreme off-roading. Lightweight yet indestructible 6mm aluminum.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KIk-qfMhhsErDtKnVj6VH1IEix1cLB6EWFcpJqLQHjzn_fTD0wf9X1q4X1q9LyIBNlt9J8cUhM_IFzKD4I6wJrv8pnySSdkIv-3rrFsXPBuAoaTAmoZHnW-DBgXQAAYLjuVpX-hBBT5ZTYBowthhOJKLNwPnHrdj4AyCunXg48HN2jgEj5c4KwAgzT9BImqL5fV64viERnu0j7lRzaGzQToPqhgDYaf2wVUeftAICrSDjqhHWyZIQhmk_PSpkcOeY3Ez7w6YYd4', installTime: '60-90 min', difficulty: 'Moderate', fitment: '2024 Tacoma', features: ['6mm aircraft-grade aluminum', 'CNC precision-cut', 'Bolt-on installation', 'Powder-coated finish'], inBox: ['Armor plate assembly', 'Mounting hardware kit', 'Installation guide', 'Warranty card'] },
      { id: 'p-film-02', name: 'Ceramic Pro Paint Protection Film', sku: 'TRD-PRT-120', price: 120.000, rating: 4.7, reviews: 89, badge: 'New Arrival', category: 'protected', description: 'Self-healing technology for chips and scratches.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAniP8hJ5rkCFIXCBeAsQ02sCNQiJW7cRVUeP7VsjfS1ZfgPbV0dLa8xRD19oR4qQTXKBbYyha2726hja9Y4SICLgB7_D-NnGvQsZeSH5GpEawc2B5sWF-QlHHVA033tbJPXnkSQKunBPxQpdhxVaR_GGN7D3K-kJRWIbsyolcfxyLeN7CKSc8GNMmq6bogsO8jOIotrXGrkHoGScHkIoqpYPwLAQa90M5bw6QZha19BWCcur0s2SG9Tlx3hbvsb8IM5X8KcennAlY' },
      { id: 'p-slider-03', name: 'High-Tensile Steel Rock Sliders', sku: 'TRD-PRT-185', price: 185.500, rating: 4.8, reviews: 67, category: 'protected', description: 'Side panel protection for rocky trails.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5xWSDZYI1cn-etKI6ZRRg7OFgIfwQuQklLAoWXZyzu73sunb32rsqlgPjSjSpBRD_ohEJCnZDaDLYuq-FVr2ZsEGvujBp_syimSlNq2AzZjQMDzmzi3yVGTfMLBH6EQdeeleuq86k7Zoi7OGLLaY8Emnshd6ZBubsVm3FXOUYPrCaz2Q_EFUH0hzA_1BRHWsuyEQWjru3tCBRHyuxC-asRKEdDqPNiqPZud67qIBRS5wgW14qwAtNUieZhYoiuhKcaJaYCddKgs' },
      { id: 'p-mats-04', name: 'All-Weather Heavy Duty Mats', sku: 'TRD-PRT-045', price: 45.000, rating: 4.6, reviews: 234, category: 'protected', description: 'Laser-measured for a perfect waterproof fit.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv0twFET87XSVzPECbC_ECoqXcRB-0Z8u-OkJULQP0CaRyKE7YTjglEwj1MaYYCZ0uIeXHGGKuM7Ph1QiynnjUv3ng0rV9VnzHfRmnTDJmv58fioQ_9sMRu2m8fB4m1nJA73rIFqeNTSLeVzmMeJueTd4ZjMkjoDH1YnRgnbBcMpQ6cgHmtZM1voyu_-PNsqsUsHr-jLc-uIDNEYbYUvdPnvMJGCJ4hIa4Uha3cFX42Q5cLT1PZwfm5gjgMUT82FNUjLXsIP-pbE' },
      { id: 'p-bumper-05', name: 'Tough-Guard Bumper Protector', sku: 'TRD-PRT-032', price: 32.000, rating: 4.5, reviews: 112, badge: 'Essential', category: 'protected', description: 'Reinforced polymer rear step protection.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZdDFCYKy0ONNldJomA8L0hk9rXwS-LChLFSh7i84Gmlg2gZhioRkMCa89dXXoe_reywahgQTUpnQlaghSVmtRXMGOGLmOMbCWdWvYXscjG2XcUCDeII07m4DaGbTmQFHKCtlq_mdyOQpeMRfCqAqZEfHIuFcnHax-8lc547nFqg_Z03OylwZpInaCh-I9y5WvwEhvhUdNUpp2mkZvPq4s3gb3cpvDdVQaAJp1zwV-Ca3QzsRF5JoBLD3LiW2o1UPxmQuZ20a4oc' }
    ],
    'off-grid': [
      { id: 'og-rack-01', name: 'Heavy-Duty Expedition Roof Rack', sku: 'TRD-OFF-884', price: 1249.000, rating: 4.9, reviews: 185, badge: 'Best Seller', category: 'off-grid', featured: true, description: 'Expedition-grade roof rack with aerodynamic profile and T-slot mounting.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwJdw0e1GfTR0k8jO3K2Dkm7S6nQQpwBdgghMwFynnYcbPb7a5X_VXAgXqeFZJPjWxMtWRLzXXSK-FV2Obd4e9g-BYFMqUKJoETxpWZ2mE9S5RDZNbchqx3FxaD6CZSblqK5KbvPK48Z9tOt3fKthJHQ-b0QC1swAJPjmHaXPPKbXSTFJPnJfRt1mlULkKUb19f9xKN-F8MnzCqVqLAvN-yfAG2DqIxepBJi_6wPyNWrFdxxNTK7g3j3VfgsPdFHBB7DNwZiDh2uw', installTime: '45-60 min', fitment: '2024 Tacoma', features: ['Lightweight forged aluminum', 'Off-road tested', 'OEM fitment', 'Aerodynamic T-slot'], inBox: ['Roof rack assembly', 'Mounting brackets (4x)', 'Hardware kit', 'Installation manual'] },
      { id: 'og-light-02', name: 'Trail-Blaze LED Light Bar', sku: 'TRD-OFF-340', price: 340.000, rating: 4.8, reviews: 94, badge: 'New', category: 'off-grid', description: '50" curved LED light bar with 30,000 lumens.' },
      { id: 'og-winch-03', name: 'Recovery Winch System', sku: 'TRD-OFF-890', price: 890.000, rating: 4.7, reviews: 56, badge: 'Under Offer', category: 'off-grid', description: '12,000lb synthetic rope winch with wireless remote.' },
      { id: 'og-snorkel-04', name: 'Safari Air Intake Snorkel', sku: 'TRD-OFF-195', price: 195.000, rating: 4.6, reviews: 78, category: 'off-grid', description: 'Raised air intake for deep water crossings.' },
      { id: 'og-suspension-05', name: 'TRD Off-Road Suspension Kit', sku: 'TRD-OFF-550', price: 550.000, rating: 4.9, reviews: 143, badge: 'Premium Pick', category: 'off-grid', description: 'Complete 2" lift with performance-tuned Bilstein shocks.' },
      { id: 'og-bumper-06', name: 'Steel Front Bull Bar', sku: 'TRD-OFF-420', price: 420.000, rating: 4.8, reviews: 67, badge: 'Low Stock', category: 'off-grid', description: 'Heavy-gauge steel bar with integrated light mounts.' }
    ],
    'connected': [
      { id: 'cn-nav-01', name: 'Precision Navigation Module', sku: 'NAV-SYS-900', price: 185.000, rating: 4.8, reviews: 124, badge: 'Best Seller', category: 'connected', featured: true, description: 'Advanced GPS with real-time traffic and voice command.', installTime: '45-60 min', installNote: 'Installation included', fitment: '2024 Tacoma', features: ['Dual-core processor', '10.1" touch display', 'Voice command', 'Real-time traffic'], inBox: ['Navigation unit', 'Wiring harness', 'Mounting bracket', 'User manual'] },
      { id: 'cn-dashcam-02', name: '4K Smart Dash Camera', sku: 'NAV-CAM-420', price: 145.000, rating: 4.6, reviews: 87, category: 'connected', description: 'Front and rear recording with night vision and cloud storage.' },
      { id: 'cn-charger-03', name: 'Qi Wireless Charging Pad', sku: 'NAV-CHG-085', price: 42.000, rating: 4.5, reviews: 156, category: 'connected', description: 'Integrated console wireless charging for all Qi devices.' },
      { id: 'cn-park-04', name: 'Intelligent Park Assist', sku: 'NAV-PRK-120', price: 120.000, rating: 4.9, reviews: 92, category: 'connected', description: 'Front and rear ultrasonic sensors with visual display.' },
      { id: 'cn-tracker-05', name: 'GPS Vehicle Tracker', sku: 'NAV-TRK-075', price: 75.000, rating: 4.4, reviews: 45, badge: 'New', category: 'connected', description: 'Real-time location tracking with geofence alerts.' }
    ],
    'accessorized': [
      { id: 'ac-wheels-01', name: '21" TRD Forged Alloy Wheels', sku: 'TRD-ACC-840', price: 840.000, rating: 4.9, reviews: 212, badge: 'Best Seller', category: 'accessorized', featured: true, description: 'Lightweight forged aluminum with aggressive off-road styling.', installTime: '45-60 min', fitment: '2024 Tacoma', features: ['Lightweight forged aluminum', 'Off-road tested', 'OEM fitment guaranteed', 'Premium matte finish'], inBox: ['4x Forged wheels', 'Lug nut set', 'Center caps', 'Torque specifications card'] },
      { id: 'ac-spoiler-02', name: 'TRD Carbon Fiber Rear Spoiler', sku: 'TRD-ACC-320', price: 320.000, rating: 4.7, reviews: 56, category: 'accessorized', description: 'Genuine carbon fiber with UV-resistant clear coat.' },
      { id: 'ac-bodykit-03', name: 'Aero Sport Body Kit', sku: 'TRD-ACC-650', price: 650.000, rating: 4.8, reviews: 34, badge: 'Premium Pick', category: 'accessorized', description: 'Complete front, side skirts and rear styling package.' },
      { id: 'ac-grille-04', name: 'Sport Mesh Grille Insert', sku: 'TRD-ACC-180', price: 180.000, rating: 4.5, reviews: 89, category: 'accessorized', description: 'Aggressive honeycomb design with chrome accents.' },
      { id: 'ac-exhaust-05', name: 'Performance Exhaust Tips', sku: 'TRD-ACC-095', price: 95.000, rating: 4.6, reviews: 123, badge: 'New', category: 'accessorized', description: 'Polished stainless steel dual exhaust tips.' }
    ]
  },

  vehicleProducts: {
    'land-cruiser': [
      { id: 'lc-winch-01', name: 'WARN Heavy-Duty Winch (12,000 lbs)', sku: 'TY-LC-WRN-12K-HD', price: 450.000, rating: 4.9, reviews: 128, badge: 'Best Seller', featured: true, description: 'Integrated mounting for LC300. Waterproof IP68 rated.', features: ['High-tensile steel rope', 'Waterproof IP68', 'Precision laser-cut brackets'], fitment: 'Land Cruiser 300, 2022-2024' },
      { id: 'lc-susp-02', name: 'ARB BP-51 Bypass Suspension Kit', sku: 'TY-LC-ARB-BP51', price: 1250.000, badge: 'New Arrival', rating: 4.9, reviews: 45, description: 'Premium bypass suspension for ultimate off-road control.' },
      { id: 'lc-leather-03', name: 'Heritage Nappa Leather Set', sku: 'TY-LC-NAP-890', price: 890.000, rating: 4.8, reviews: 34, description: 'Premium hand-stitched leather interior upgrade.' },
      { id: 'lc-rims-04', name: '20" Forged Matte Black Alloy Rims', sku: 'TY-LC-RIM-20', price: 210.000, rating: 4.7, reviews: 67, description: 'Per piece. Lightweight forged construction.' },
      { id: 'lc-skid-05', name: 'Urban Armor Skid Plate', sku: 'TY-LC-SKD-145', price: 145.000, rating: 4.6, reviews: 89, description: 'Underbody protection for urban and light off-road.' }
    ],
    'prado': [
      { id: 'pr-bar-01', name: 'StealthSeries Heavy-Duty Bull Bar', sku: 'TY-PR-STL-425', price: 425.000, rating: 4.9, reviews: 124, badge: 'Most Popular', featured: true, description: 'Toyota Safety Sense compatible. Matte black powder coat with integrated light bar mounts.', features: ['Toyota Safety Sense compatible', 'Matte black powder coat', 'Integrated light bar mounts'], inBox: ['Bull Bar Assembly', 'Stainless Steel Bolt Kit', 'Mounting Brackets', 'Installation Guide'], fitment: '2024 Prado' },
      { id: 'pr-rack-02', name: 'Aero Roof Rack System', sku: 'TY-PR-RACK-095', price: 95.000, rating: 4.7, reviews: 89, description: 'Low wind noise, high durability.' },
      { id: 'pr-info-03', name: '12.3" Infotainment Upgrade', sku: 'TY-PR-INF-420', price: 420.000, rating: 4.8, reviews: 56, description: 'HD touchscreen with Apple CarPlay and Android Auto.' },
      { id: 'pr-mats-04', name: 'All-Weather Rubber Mats', sku: 'TY-PR-MAT-045', price: 45.000, rating: 4.6, reviews: 178, description: 'Custom-molded for perfect fit.' },
      { id: 'pr-steps-05', name: 'Illuminated Side Steps', sku: 'TY-PR-STP-210', price: 210.000, rating: 4.7, reviews: 45, description: 'LED-lit aluminium side steps.' }
    ],
    'rav4': [
      { id: 'rv-roof-01', name: 'Thule Adventure Roof Box XL', sku: 'TY-RV-THU-185', price: 185.000, rating: 4.7, reviews: 98, badge: 'In Stock', featured: true, description: 'Aerodynamic 420L storage with SlideLock Pro security.', features: ['420L capacity', 'Drag reduction profile', 'SlideLock Pro security', 'PowerClick mounting'], fitment: 'RAV4, 2021-2024' },
      { id: 'rv-wheels-02', name: '18" Gloss Black Alloy Wheels', sku: 'TY-RV-WHL-320', price: 320.000, rating: 4.8, reviews: 67, description: 'Precision-crafted for enhanced handling.' },
      { id: 'rv-bike-03', name: 'Tow-Ball Mounted Bike Carrier', sku: 'TY-RV-BKC-142', price: 142.000, rating: 4.5, reviews: 34, description: 'Carries up to 3 bikes securely.' },
      { id: 'rv-led-04', name: 'Ambient LED Footwell Lighting', sku: 'TY-RV-LED-028', price: 28.500, badge: 'New', rating: 4.3, reviews: 56, description: 'Multi-color footwell ambient lighting kit.' },
      { id: 'rv-steps-05', name: 'Aluminum Side Steps', sku: 'TY-RV-STP-115', price: 115.000, rating: 4.6, reviews: 78, description: 'Anti-slip aluminum with integrated brackets.' }
    ],
    'camry': [
      { id: 'cm-bodykit-01', name: 'Aero Sport Body Kit', sku: 'TY-CAM-24-ASB', price: 550.000, rating: 5.0, reviews: 24, badge: 'Premium', featured: true, description: 'Wind-tunnel tested. Factory paint matched. Compatible 2018-2024 SE, XSE, TRD trims.', features: ['Wind-tunnel tested', 'Factory-paint matched', 'Aggressive stance', 'High-impact ABS'], fitment: 'Camry 2018-2024 SE/XSE/TRD' },
      { id: 'cm-dashcam-02', name: 'Premium 4K Dash Cam', sku: 'TY-CAM-DSH-350', price: 350.000, badge: 'Popular', rating: 4.7, reviews: 45, description: 'Front and rear 4K recording with night vision.' },
      { id: 'cm-mats-03', name: 'All-Weather Floor Liners', sku: 'TY-CAM-MAT-085', price: 85.000, rating: 4.6, reviews: 123, description: 'Laser-measured precision fit with raised edges.' },
      { id: 'cm-spoiler-04', name: 'Camry TRD Rear Spoiler', sku: 'TY-CAM-SPL-110', price: 110.000, rating: 4.8, reviews: 34, description: 'Aerodynamic rear spoiler in factory-match paint.' },
      { id: 'cm-wheels-05', name: '19" Gloss Black Alloy Wheels', sku: 'TY-CAM-WHL-320', price: 320.000, rating: 4.7, reviews: 56, description: 'Premium sport alloy wheels.' }
    ],
    'fortuner': [
      { id: 'ft-bar-01', name: 'Premium Steel Bull Bar', sku: 'TY-FTN-BULL-01', price: 425.000, rating: 5.0, reviews: 124, badge: 'Best Seller', featured: true, description: 'Armor-grade steel with winch-ready design for the Fortuner.', features: ['Armor-grade 3mm steel', 'Winch ready', 'Integrated LED mounts', 'Textured black powder coat'], inBox: ['Bull Bar Assembly', 'Mounting Bracket Kit', 'Hardware Pack', 'Installation Manual'], fitment: 'Fortuner 2020-2024', installTime: '3.5 hours' },
      { id: 'ft-steps-02', name: 'Heavy Duty Side Steps', sku: 'TY-FTN-STP-185', price: 185.000, rating: 4.8, reviews: 89, description: 'Anti-slip perforated steel construction.' },
      { id: 'ft-cargo-03', name: 'Smart Cargo Organizer', sku: 'TY-FTN-CRG-045', price: 45.000, rating: 4.5, reviews: 67, description: 'Collapsible multi-compartment trunk organizer.' },
      { id: 'ft-snorkel-04', name: 'Air Intake Snorkel', sku: 'TY-FTN-SNK-095', price: 95.000, rating: 4.7, reviews: 45, description: 'Raised air intake for water crossing capability.' }
    ],
    'corolla': [
      { id: 'cr-wheels-01', name: '18" Gloss Black Alloy Wheels', sku: 'TY-CR-WHL-185', price: 185.000, rating: 4.7, reviews: 78, featured: true, description: 'Precision-crafted for enhanced handling and style.', fitment: 'Corolla 2020-2024' },
      { id: 'cr-tint-02', name: 'Premium Ceramic Window Tint', sku: 'TY-CR-TNT-045', price: 45.000, badge: 'UV-Shield', rating: 4.6, reviews: 134, description: 'Ceramic nano-technology for heat and UV rejection.' },
      { id: 'cr-park-03', name: 'Intelligent Park Assist', sku: 'TY-PR24-BB01', price: 120.000, rating: 4.9, reviews: 92, description: 'Front and rear ultrasonic sensors. Including installation.', features: ['Ultrasonic precision 40kHz', 'Multi-tone alerts', 'Color-coded visual feedback', 'Smart auto-activation'], fitment: 'Corolla 2020-2024' },
      { id: 'cr-film-04', name: 'Body Protection Film', sku: 'TY-CR-BPF-210', price: 210.000, rating: 4.7, reviews: 56, description: 'Self-healing paint protection film.' },
      { id: 'cr-mats-05', name: 'All-Weather Floor Mats', sku: 'TY-CR-MAT-018', price: 18.000, rating: 4.5, reviews: 234, description: 'Custom-molded heavy-duty floor protection.' }
    ],
    'corolla-cross': [
      { id: 'ccx-cargo-01', name: 'Weather-Proof Cargo Mat', sku: 'TY-CCX-CRG-028', price: 28.000, rating: 4.6, reviews: 89, featured: true, description: 'High-density polyethylene cargo protection.', fitment: 'Corolla Cross 2021-2024' },
      { id: 'ccx-roof-02', name: 'Aerodynamic Roof Bars', sku: 'TY-CCX-RFB-085', price: 85.000, rating: 4.7, reviews: 45, description: 'Reduced wind noise and drag.' },
      { id: 'ccx-charger-03', name: 'Qi Wireless Smartphone Charger', sku: 'TY-CCX-QI-2024', price: 42.000, rating: 4.7, reviews: 124, description: '15W Qi-certified rapid wireless charging.', features: ['15W Qi-certified', 'Non-slip silicone surface', 'Seamless console integration', 'LED indicator'], fitment: 'Corolla Cross 2021-2024' },
      { id: 'ccx-lights-04', name: 'Hybrid Precision Lighting', sku: 'TY-CCX-LED-120', price: 120.000, badge: 'Adaptive LED', rating: 4.8, reviews: 34, description: 'Adaptive LED upgrade kit with 45-min install.' }
    ]
  },

  merchandise: [
    { id: 'merch-jersey-01', name: 'GR Mens L/S Winter Cycling Jersey', sku: 'MER-APP-CYC', price: 2107.590, badge: 'GR Performance Wear', featured: true, description: 'Technical cycling jersey for winter conditions.', colors: ['Black', 'GR Red'], sizes: ['S', 'M', 'L', 'XL'], features: ['Thermal insulation', 'Moisture-wicking', 'Reflective elements', 'Full-zip front'] },
    { id: 'merch-jacket-02', name: 'GR Technical Series Jacket', sku: 'MER-APP-JKT', price: 185.000, badge: 'New Arrival', featured: true, description: 'Performance motorsport jacket with GAZOO RACING branding.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
    { id: 'merch-polo-03', name: 'GR Racing Polo Shirt', sku: 'MER-APP-POL', price: 45.000, description: 'Lightweight performance polo with GR emblem.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'merch-cap-04', name: 'GR Motorsport Cap', sku: 'MER-ACC-CAP', price: 25.000, description: 'Adjustable racing cap with curved brim.' },
    { id: 'merch-mug-05', name: 'GR Heritage Travel Mug', sku: 'MER-ACC-MUG', price: 18.000, description: 'Double-wall insulated stainless steel travel mug.' }
  ],

  featuredItems: [
    { name: 'TRD Off-Road Suspension Kit', category: 'Performance', price: 1299.00, description: 'Built to handle extreme conditions while maintaining Toyota reliability.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoZoMs8kmRMxbsm4QAvR9oEnCC1W3mR-0go0g1f3KccGv8AbByLKJUYgpiweG_nFnrp0_GOMhAJ0NDVxHLoSExUy7HF1c8YEBE0s2ClFdquAjrRDhJKP0KWzdOoEOehvQwhM7ViGPKYrPHLs-BeaZofhBIz2wPpK5_xXhre8ziqTh4Uz0r5lGNepDNuydX8ME80A_EomexEyUznpJw-LqqNqqb_-Eygf5_LI8NLktJBZZJS78SNxa_KLr06YHX57FBmCl9lV7Fw0E', featured: true },
    { name: 'LED Fog Lights', icon: 'wb_sunny', price: 345.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsaSxi-DjZeF3kDVjmbTR3QCuXAUQ6ErTieQfWnaIrimHKXzDykjbgExCbomYAAABLp8yEtC1GZxMtwShxOODxdhefFrPDkCXCE_TFYWUtnUD7oKseknzCTxgiVSF_XYLAakBZVYBD35nqmVyaz7Ym0byuEoS9ePmVWkjW5eoOsrSMEVCJ9Zr0sbWp_xVdfrB2aqbjXQxPVVHR9V_t6qk0LKuK5QYqxNXyyVfXwmRZ21V-CS2DAkBvlzYBiVMcxnk4Okv8UagZdPg' },
    { name: 'Cargo Net', icon: 'storage', price: 89.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBothCMWyPFFhLScdXTdRi3dhUezNbDD51_vaIqBFBQJvHz_liVhML2nwlLS1NueIke2J_yFVm251UcFzX8wrvyL0iQ2ofhBUy4C3odJXLr48wvMHzBqJBWA96KnjuLGIZ9Kv58vQg1uYmaVALuoBqcZ74MOxrD_nKjDwbPU-0kpj_SFBp52bKZx9NdoEC9eXnjDKxdPKjbc45j0soguhAf7mj8vrY71KT5BYNDYR6M19prwRqaCHx6gOcrrDS2ciCUuE5tqvKE-KU' }
  ],

  banners: [
    { id: 1, headline: 'Summer Performance Sale', subtext: '25% off performance alloys', ctaLabel: 'Shop Collection', link: '#/accessorized', order: 1, visible: true },
    { id: 2, headline: 'New Arrival: Off-Road Tech', subtext: 'Latest suspension and lighting upgrades', ctaLabel: 'Explore Now', link: '#/off-grid', order: 2, visible: true },
    { id: 3, headline: 'Vintage Classics Restoration', subtext: 'Authentic parts for timeless icons', ctaLabel: 'View Parts', link: '#/protected', order: 3, visible: true }
  ],

  sampleUser: {
    name: 'Ahmed Al-Farsi', email: 'ahmed.alfarsi@email.com', phone: '+965 9876 5432',
    vehicles: [{ model: 'Land Cruiser 300', year: '2024', plate: '12-3456' }, { model: 'GR Supra', year: '2023', plate: '78-9012' }],
    orders: [{ id: 'SAY-2026-001', item: 'TRD Suspension Kit', date: 'Mar 15, 2026', amount: 1299.000, status: 'Delivered' }, { id: 'SAY-2026-002', item: 'LED Fog Lights', date: 'Mar 10, 2026', amount: 345.000, status: 'Processing' }],
    inquiries: [{ id: 'INQ-001', subject: 'Bull Bar Installation', status: 'Responded', date: 'Mar 12, 2026' }, { id: 'INQ-002', subject: 'Wheel Fitment Check', status: 'Pending', date: 'Mar 18, 2026' }],
    wishlist: ['p-armor-01', 'ac-wheels-01', 'og-rack-01', 'cn-nav-01']
  },

  cmsInquiries: [
    { id: 'SAY-992841', customer: 'Ahmed Al-Rashidi', email: 'ahmed.r@email.com', type: 'Accessory', status: 'New', priority: 'High', vehicle: 'Toyota Supra GR 2024', plate: '22-9481', message: 'Looking for GR Heritage Carbon Fiber Rear Wing for my 2024 Supra.', item: { name: 'GR Heritage Carbon Fiber Rear Wing', sku: 'TOY-GR-992-CF', price: 425.000 }, date: 'Oct 26, 2023' },
    { id: 'SAY-992842', customer: 'Sarah Williams', email: 'sarah.w@email.com', type: 'Merchandise', status: 'Processing', priority: 'Medium', vehicle: null, message: 'Need to exchange my GR Racing Jacket for a larger size.', item: { name: 'GR Racing Jacket', sku: 'MER-APP-JKT', price: 185.000 }, date: 'Oct 25, 2023' },
    { id: 'SAY-992843', customer: 'Khalid Ben Zeid', email: 'khalid.bz@email.com', type: 'Accessory', status: 'Responded', priority: 'Low', vehicle: 'Land Cruiser 300', message: 'Checking availability of stainless steel side steps for LC300.', item: { name: 'Stainless Steel Side Steps', sku: 'TY-LC-STP-210', price: 210.000 }, date: 'Oct 24, 2023' },
    { id: 'SAY-992844', customer: 'Fatimah Hussain', email: 'fatimah.h@email.com', type: 'Merchandise', status: 'New', priority: 'Medium', vehicle: null, message: 'Interested in custom branding for fleet polo shirts. Need 50 units.', item: { name: 'GR Racing Polo (Custom)', sku: 'MER-APP-POL-C', price: 55.000 }, date: 'Oct 23, 2023' }
  ],

  cmsAnalytics: {
    totalInquiries: 3842, totalSales: 187650, conversionRate: 12.7, avgDaysToClose: 2.4,
    totalOrders: 488, avgOrderValue: 384.7, activeCustomers: 1256, returningRate: 34.2,
    inquiryByCategory: { 'Exterior Protection': 980, 'Off-Road & Adventure': 724, 'Tech & Connected': 612, 'Interior Comfort': 546, 'Performance': 490, 'Merchandise': 490 },
    vehicleBreakdown: { 'Land Cruiser 300': 892, 'Prado 250': 614, 'Hilux GR-S': 498, 'Camry': 412, 'Corolla Cross': 356, 'RAV4': 318, 'Supra GR': 264, 'Yaris Cross': 198, 'Fortuner': 178, 'Others': 112 },
    monthlySales: [
      { month: 'JAN', sales: 11250 }, { month: 'FEB', sales: 13480 }, { month: 'MAR', sales: 15920 },
      { month: 'APR', sales: 14100 }, { month: 'MAY', sales: 16850 }, { month: 'JUN', sales: 19200 },
      { month: 'JUL', sales: 14600 }, { month: 'AUG', sales: 12300 }, { month: 'SEP', sales: 17450 },
      { month: 'OCT', sales: 21800 }, { month: 'NOV', sales: 24300 }, { month: 'DEC', sales: 26400 }
    ],
    topProducts: [
      { name: 'GR Heritage Carbon Fiber Rear Wing', sales: 68, revenue: 28900, trend: 'up' },
      { name: 'Land Cruiser Bull Bar Kit', sales: 54, revenue: 24300, trend: 'up' },
      { name: 'Premium All-Weather Floor Mats', sales: 142, revenue: 18460, trend: 'up' },
      { name: 'TRD Performance Air Intake', sales: 38, revenue: 13300, trend: 'down' },
      { name: 'Dash Cam Pro 4K System', sales: 46, revenue: 11500, trend: 'up' }
    ],
    recentActivity: [
      { type: 'order', icon: 'shopping_cart', color: 'green', msg: 'New order #SAY-4821 — Land Cruiser Bull Bar Kit', time: '5 min ago' },
      { type: 'inquiry', icon: 'support_agent', color: 'blue', msg: 'New inquiry from Khalid Al-Mutairi — Prado roof rack', time: '18 min ago' },
      { type: 'review', icon: 'star', color: 'amber', msg: '5-star review on GR Carbon Fiber Rear Wing', time: '42 min ago' },
      { type: 'order', icon: 'shopping_cart', color: 'green', msg: 'New order #SAY-4820 — Premium Floor Mats (x3)', time: '1 hr ago' },
      { type: 'stock', icon: 'warning', color: 'red', msg: 'Low stock alert: TRD Exhaust System (4 remaining)', time: '2 hrs ago' },
      { type: 'inquiry', icon: 'support_agent', color: 'blue', msg: 'Inquiry from Fatimah Hassan — Camry dash cam install', time: '3 hrs ago' },
      { type: 'order', icon: 'shopping_cart', color: 'green', msg: 'New order #SAY-4819 — Hilux GR-S Skid Plate Set', time: '4 hrs ago' },
      { type: 'review', icon: 'star', color: 'amber', msg: '4-star review on Premium Leather Seat Covers', time: '5 hrs ago' }
    ]
  },

  cmsInventory: [
    { sku: 'SY-ACC-1029', name: 'Leather Key Fob Cover', category: 'Accessory', stock: 142, reorderPoint: 25, status: 'In Stock', location: 'Shuwaikh WH-A' },
    { sku: 'SY-MER-4421', name: 'AlSayer Racing Polo (M)', category: 'Merchandise', stock: 12, reorderPoint: 15, status: 'Low Stock', location: 'Ahmadi Hub' },
    { sku: 'SY-ACC-9902', name: 'Performance Air Filter', category: 'Accessory', stock: 0, reorderPoint: 10, status: 'Out of Stock', location: 'Main Warehouse' },
    { sku: 'SY-MER-1182', name: 'Insulated Travel Mug', category: 'Merchandise', stock: 84, reorderPoint: 20, status: 'In Stock', location: 'Fahaheel Showroom' }
  ],

  cmsCampaigns: [
    { id: 'CMP-001', name: '15% Off Floor Mats', type: 'percentage', value: 15, status: 'Active', categories: ['Interior', 'Protective Gear'] },
    { id: 'CMP-002', name: 'New Year Launch Event', type: 'fixed', value: 50, status: 'Scheduled', categories: ['All'] },
    { id: 'CMP-003', name: 'Winter Gear Sale', type: 'percentage', value: 20, status: 'Active', categories: ['Apparel', 'Off-Grid'] }
  ],

  governorates: ['Al Asimah', 'Hawalli', 'Al Farwaniyah', 'Mubarak Al-Kabeer', 'Al Ahmadi', 'Al Jahra'],

  /* ===== Admin Users ===== */
  adminUsers: [
    {
      email: 'admin@sayarti.kw', password: 'Sayarti@2026', name: 'Ahmad Al-Sayer', role: 'Super Admin',
      permissions: ['analytics', 'products', 'inventory', 'banners', 'inquiries', 'campaigns', 'translations', 'users'],
      status: 'active', lastLogin: '2026-03-23 09:15', avatar: 'AS'
    },
    {
      email: 'editor@sayarti.kw', password: 'Editor@2026', name: 'Sara Al-Rashidi', role: 'Content Manager',
      permissions: ['banners', 'products', 'inquiries'],
      status: 'active', lastLogin: '2026-03-22 14:32', avatar: 'SR'
    },
    {
      email: 'pricing@sayarti.kw', password: 'Pricing@2026', name: 'Khalid Al-Mutairi', role: 'Pricing Manager',
      permissions: ['products', 'inventory', 'campaigns'],
      status: 'active', lastLogin: '2026-03-21 11:20', avatar: 'KM'
    },
    {
      email: 'translator@sayarti.kw', password: 'Trans@2026', name: 'Fatimah Hassan', role: 'Arabic Translator',
      permissions: ['translations'],
      status: 'active', lastLogin: '2026-03-20 16:45', avatar: 'FH'
    },
    {
      email: 'viewer@sayarti.kw', password: 'View@2026', name: 'Mohammed Al-Enezi', role: 'Viewer',
      permissions: ['analytics'],
      status: 'inactive', lastLogin: '2026-02-15 08:00', avatar: 'ME'
    }
  ],

  /* ===== CMS-Managed Translations ===== */
  translations: {
    en: {
      shop: 'Shop', merchandise: 'Merchandise', offers: 'Offers', locations: 'Locations',
      home: 'Home', search: 'Search accessories, parts, merchandise...',
      addToCart: 'Add to Cart', addToWishlist: 'Add to Wishlist', checkout: 'Checkout',
      placeOrder: 'Place Order', orderSummary: 'Order Summary', total: 'Total',
      subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free',
      firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone',
      address: 'Address', governorate: 'Governorate', password: 'Password',
      createAccount: 'Create Account', signIn: 'Sign In', editProfile: 'Edit Profile',
      myAccount: 'My Account', orders: 'Orders', vehicles: 'My Vehicles',
      wishlist: 'Wishlist', inquiries: 'Inquiries',
      browseByLifestyle: 'Browse by Lifestyle', shopByVehicle: 'Shop by Vehicle',
      featuredAccessories: 'Featured Accessories', viewAll: 'View All',
      allModels: 'All Models', findAccessories: 'Find Accessories', selectModel: 'Select Model',
      products: 'products', accessories: 'accessories',
      keyFeatures: 'Key Features', whatsInBox: "What's in the Box",
      fitment: 'Fitment', installTime: 'Install Time', size: 'Size', color: 'Color',
      backToHome: 'Back to Home', pageNotFound: 'Page Not Found',
      cartEmpty: 'Your cart is empty', browseToStart: 'Browse our accessories to get started',
      yourCart: 'Your Cart', proceedToCheckout: 'Proceed to Checkout',
      officialMerchandise: 'Official Merchandise', offersDeals: 'Offers & Deals',
      ourLocations: 'Our Locations', shippingInfo: 'Shipping Information',
      paymentMethod: 'Payment Method', offersTagline: 'Premium Toyota genuine accessories and merchandise.',
      protected: 'Protected', offGrid: 'Off-Grid', connected: 'Connected', accessorized: 'Accessorized',
      privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service',
      returnPolicy: 'Return Policy', warrantyInfo: 'Warranty Info',
      navigation: 'Navigation', legal: 'Legal', connect: 'Connect',
      copyright: '© 2026 Sayarti by AlSayer. All rights reserved.',
      knet: 'KNET', visaMastercard: 'Visa / Mastercard', cashOnDelivery: 'Cash on Delivery',
      logout: 'Logout', personalInfo: 'Personal Info',
      orderId: 'Order ID', items: 'Items', date: 'Date', status: 'Status',
      inquiryId: 'Inquiry ID', noOrders: 'No orders yet', noInquiries: 'No inquiries yet',
      submitInquiry: 'Submit Inquiry', inquiryHint: 'Not ready to order? Submit an inquiry instead.',
      fillAllFields: 'Please fill in all required fields', invalidCivilId: 'Please enter a valid Civil ID',
      acceptTerms: 'Please accept the terms and conditions', accountCreated: 'Account created successfully!',
      welcomeBack: 'Welcome back,', invalidCredentials: 'Invalid Civil ID or phone number',
      loggedOut: 'You have been logged out', orderPlaced: 'Order placed successfully!',
      inquirySubmitted: 'Inquiry submitted successfully!', confirmation: 'Confirmation'
    },
    ar: {
      shop: 'المتجر', merchandise: 'البضائع', offers: 'العروض', locations: 'المواقع',
      home: 'الرئيسية', search: 'ابحث عن إكسسوارات، قطع غيار، بضائع...',
      addToCart: 'أضف إلى السلة', addToWishlist: 'أضف للمفضلة', checkout: 'الدفع',
      placeOrder: 'تأكيد الطلب', orderSummary: 'ملخص الطلب', total: 'المجموع',
      subtotal: 'المجموع الفرعي', shipping: 'الشحن', free: 'مجاني',
      firstName: 'الاسم الأول', lastName: 'اسم العائلة', email: 'البريد الإلكتروني', phone: 'الهاتف',
      address: 'العنوان', governorate: 'المحافظة', password: 'كلمة المرور',
      createAccount: 'إنشاء حساب', signIn: 'تسجيل الدخول', editProfile: 'تعديل الملف',
      myAccount: 'حسابي', orders: 'الطلبات', vehicles: 'مركباتي',
      wishlist: 'المفضلة', inquiries: 'الاستفسارات',
      browseByLifestyle: 'تصفح حسب نمط الحياة', shopByVehicle: 'تسوق حسب المركبة',
      featuredAccessories: 'إكسسوارات مميزة', viewAll: 'عرض الكل',
      allModels: 'جميع الموديلات', findAccessories: 'ابحث عن الإكسسوارات', selectModel: 'اختر الموديل',
      products: 'منتجات', accessories: 'إكسسوارات',
      keyFeatures: 'المميزات الرئيسية', whatsInBox: 'محتويات العلبة',
      fitment: 'التوافق', installTime: 'وقت التركيب', size: 'المقاس', color: 'اللون',
      backToHome: 'العودة للرئيسية', pageNotFound: 'الصفحة غير موجودة',
      cartEmpty: 'سلة التسوق فارغة', browseToStart: 'تصفح الإكسسوارات للبدء',
      yourCart: 'سلتك', proceedToCheckout: 'متابعة الدفع',
      officialMerchandise: 'البضائع الرسمية', offersDeals: 'العروض والخصومات',
      ourLocations: 'مواقعنا', shippingInfo: 'معلومات الشحن',
      paymentMethod: 'طريقة الدفع', offersTagline: 'إكسسوارات وبضائع تويوتا الأصلية.',
      protected: 'محمي', offGrid: 'الطرق الوعرة', connected: 'متصل', accessorized: 'مُجهّز',
      privacyPolicy: 'سياسة الخصوصية', termsOfService: 'شروط الخدمة',
      returnPolicy: 'سياسة الإرجاع', warrantyInfo: 'معلومات الضمان',
      navigation: 'التنقل', legal: 'قانوني', connect: 'تواصل',
      copyright: '© ٢٠٢٦ سيارتي من الساير. جميع الحقوق محفوظة.',
      knet: 'كي نت', visaMastercard: 'فيزا / ماستركارد', cashOnDelivery: 'الدفع عند الاستلام',
      logout: 'تسجيل الخروج', personalInfo: 'المعلومات الشخصية',
      orderId: 'رقم الطلب', items: 'المنتجات', date: 'التاريخ', status: 'الحالة',
      inquiryId: 'رقم الاستفسار', noOrders: 'لا توجد طلبات بعد', noInquiries: 'لا توجد استفسارات بعد',
      submitInquiry: 'إرسال استفسار', inquiryHint: 'غير مستعد للطلب؟ أرسل استفساراً بدلاً من ذلك.',
      fillAllFields: 'يرجى ملء جميع الحقول المطلوبة', invalidCivilId: 'يرجى إدخال رقم مدني صحيح',
      acceptTerms: 'يرجى الموافقة على الشروط والأحكام', accountCreated: 'تم إنشاء الحساب بنجاح!',
      welcomeBack: 'مرحباً بعودتك،', invalidCredentials: 'رقم مدني أو رقم هاتف غير صحيح',
      loggedOut: 'تم تسجيل الخروج', orderPlaced: 'تم تقديم الطلب بنجاح!',
      inquirySubmitted: 'تم إرسال الاستفسار بنجاح!', confirmation: 'التأكيد'
    }
  }
};

if (typeof window !== 'undefined') { window.SayartiData = SayartiData; }

