import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

function Journey() {
  const containerRef = useRef(null);
  const [draggedPhotos, setDraggedPhotos] = useState({});

  // Data statis
  const viewData = {
    view2: {
      pcl: 510,
      pml: 57,
      provinsi: 3,
      kabupaten: 15,
    },
    view3: {
      flights: [
        { 
          type: "commercial",
          airline: "GARUDA INDONESIA",
          from: "CGK (Soetta)", 
          dest: "Banda Aceh (BTJ)", 
          code: "GA-146", 
          time: "06:00", 
          date: "14 Jan 26", 
          seat: "12A",
          icon: "✈" 
        },
        { 
          type: "military", // HERCULES
          airline: "TNI AU / HERCULES",
          from: "HLP (Halim)", 
          dest: "Medan (KNO)", 
          code: "A-1319", 
          time: "05:30", 
          date: "14 Jan 26", 
          seat: "JUMP-SEAT",
          icon: "✪" 
        },
        { 
          type: "commercial",
          airline: "LION AIR",
          from: "CGK (Soetta)", 
          dest: "Padang (PDG)", 
          code: "JT-352", 
          time: "07:15", 
          date: "14 Jan 26", 
          seat: "21F",
          icon: "✈" 
        },
      ],
    },
    view11: {
      quotes: [
        { text: "Rumah kami masih bocor kalau hujan deras, nak...", name: "Ibu Siti, Aceh Timur", sentiment: "worried" },
        { text: "Alhamdulillah, pendataan ini memberi kami harapan baru.", name: "Pak Ahmad, Aceh Tengah", sentiment: "hopeful" },
        { text: "Sekolah anak-anak hancur, mereka belajar di tenda.", name: "Ibu Ratna, Gayo Lues", sentiment: "concerned" },
        { text: "Kami butuh akses jalan, jembatan putus total.", name: "Pak Hadi, Mandailing Natal", sentiment: "urgent" },
        { text: "Terima kasih sudah jauh-jauh datang mendata kami.", name: "Nenek Fatimah, Pasaman", sentiment: "hopeful" },
      ],
    },
    view13: {
      progress: [
        { day: "Hari 1-3", target: 1200, realisasi: 980, percentage: 82, note: "Adaptasi Medan" },
        { day: "Hari 4-7", target: 2400, realisasi: 2150, percentage: 90, note: "Kejar Tayang" },
        { day: "Hari 8-12", target: 3600, realisasi: 3420, percentage: 95, note: "Lembur Malam" },
        { day: "Hari 13-18", target: 5000, realisasi: 4890, percentage: 98, note: "Menyisir Wilayah" },
        { day: "Hari 19-21", target: 5500, realisasi: 5467, percentage: 99, note: "Finalisasi Data" },
      ],
    },
  };

  // Photos for draggable section
  const [photos] = useState([
    { id: 1, src: "/images/struggle-1.jpg", alt: "Sepatu berlumpur di Aceh", rotation: -5, zIndex: 5 },
    { id: 2, src: "/images/struggle-2.jpg", alt: "Hujan deras di Sumut", rotation: 3, zIndex: 4 },
    { id: 3, src: "/images/struggle-3.jpg", alt: "Jalan terjal Sumbar", rotation: -2, zIndex: 3 },
    { id: 4, src: "/images/struggle-4.jpg", alt: "Mendaki bukit", rotation: 7, zIndex: 2 },
    { id: 5, src: "/images/struggle-5.jpg", alt: "Menyeberang sungai", rotation: -4, zIndex: 1 },
  ]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- UTILS ---
      const randomRot = () => Math.random() * 4 - 2;
      
      // --- VIEW 1: HERO ---
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: ".view-1",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      tlHero.to(".view-1 .torn-paper-top", { y: -50 }, 0)
            .to(".view-1 .hero-title", { y: 100, opacity: 0 }, 0)
            .to(".view-1 .hero-subtitle", { y: 80, opacity: 0 }, 0);

      // STOP MOTION ENTRY
      gsap.from(".view-1 .hero-title", {
        y: 80, opacity: 0, scale: 0.8, rotation: -5,
        duration: 0.8, ease: "elastic.out(1, 0.6)", delay: 0.3
      });
      gsap.from(".view-1 .hero-date", {
        scale: 0, rotation: -25, opacity: 0, 
        duration: 0.6, delay: 1, ease: "back.out(3)"
      });
      
      // FLOATING IDLE
      gsap.to(".view-1 .hero-title", {
        y: "+=8", rotation: 1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

      // --- VIEW 2: SCALE (STAMP EFFECT) ---
      gsap.from(".view-2 .stat-card", {
        scrollTrigger: { trigger: ".view-2", start: "top 70%" },
        scale: 0, rotation: () => randomRot() * 3, opacity: 0,
        stagger: { amount: 0.5, from: "random", ease: "steps(3)" },
        duration: 0.5, ease: "back.out(4)",
      });

      // IDLE FLOAT
      document.querySelectorAll(".view-2 .stat-card").forEach((card) => {
        gsap.to(card, {
          y: `+=${Math.random() * 12 + 3}`,
          rotation: `+=${Math.random() * 3 - 1.5}`,
          duration: Math.random() * 3 + 4,
          repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      });

      // --- VIEW 3: FLIGHTS (STOP MOTION PLANES) ---
      gsap.from(".view-3 .boarding-pass", {
        scrollTrigger: { trigger: ".view-3", start: "top 75%" },
        x: (i) => (i % 2 === 0 ? -150 : 150),
        rotation: (i) => (i % 2 === 0 ? -8 : 8),
        opacity: 0, scale: 0.7, 
        stagger: 0.25, 
        duration: 0.5, 
        ease: "back.out(2)",
      });

      // COMMERCIAL PLANE (SMOOTH STEPS)
      gsap.to(".plane-commercial", {
        scrollTrigger: { trigger: ".view-3", start: "top 80%", end: "bottom 20%", scrub: 1 },
        x: "120vw", y: -60, rotation: 12, ease: "steps(12)",
      });

      // HERCULES (HEAVIER, SLOWER STEPS)
      gsap.fromTo(".plane-hercules", 
        { x: -150, y: 120, rotation: -8 },
        {
          scrollTrigger: { trigger: ".view-3", start: "top 60%", end: "bottom top", scrub: 2 },
          x: "115vw", y: -30, rotation: 2, ease: "steps(18)",
        }
      );

      // PROPELLER ROTATION
      gsap.to(".propeller", {
        rotation: 360, repeat: -1, duration: 0.6, ease: "steps(6)",
      });

      // CLOUDS PARALLAX
      gsap.to(".cloud-bg", {
        scrollTrigger: { trigger: ".view-3", scrub: 0.8 },
        y: (i) => (i + 1) * -40, ease: "none"
      });

      // --- VIEW 4: POLAROIDS (SNAP & DROP) ---
      gsap.from(".view-4 .polaroid-stack", {
        scrollTrigger: { trigger: ".view-4", start: "top 70%" },
        y: -250, rotation: () => Math.random() * 50 - 25, scale: 1.3, opacity: 0,
        stagger: 0.18, duration: 0.6, ease: "bounce.out",
      });

      // STAMP EFFECT
      gsap.from(".view-4 .arrival-stamp", {
        scrollTrigger: { trigger: ".view-4", start: "top 60%" },
        scale: 4, opacity: 0, rotation: -30,
        duration: 0.3, delay: 1.2, ease: "power4.in",
        onComplete: () => { 
          gsap.to(".view-4 .arrival-stamp", { 
            scale: 1, rotation: -15, duration: 0.15, ease: "back.out(2)" 
          }); 
        }
      });

      // --- VIEW 5: ORIENTATION (STICKY NOTES POP) ---
      gsap.from(".view-5 .orientation-note", {
        scrollTrigger: { trigger: ".view-5", start: "top 75%" },
        scale: 0, rotation: () => randomRot() * 4, opacity: 0,
        stagger: 0.12, duration: 0.5, ease: "back.out(4)",
      });
      gsap.from(".view-5 .pushpin", {
        scrollTrigger: { trigger: ".view-5", start: "top 70%" },
        y: -80, opacity: 0, scale: 0,
        stagger: 0.12, duration: 0.4, delay: 0.6, ease: "elastic.out(1, 0.5)",
      });

      // --- VIEW 6: MEMO (PAPER DROP) ---
      gsap.from(".view-6 .memo-sheet", {
        scrollTrigger: { trigger: ".view-6", start: "top 75%" },
        y: -120, rotation: 5, opacity: 0, scale: 0.9,
        duration: 0.8, ease: "power3.out",
      });
      gsap.from(".view-6 .memo-line", {
        scrollTrigger: { trigger: ".view-6", start: "top 65%" },
        scaleX: 0, transformOrigin: "left", opacity: 0, 
        stagger: 0.08, duration: 0.6, ease: "steps(5)",
      });

      // --- VIEW 7: COORDINATION (THROWING PAPERS) ---
      gsap.from(".view-7 .meeting-doc", {
        scrollTrigger: { trigger: ".view-7", start: "top 70%" },
        y: -150, 
        rotation: () => Math.random() * 60 - 30,
        opacity: 0, 
        scale: 0.8,
        stagger: 0.15, 
        duration: 0.7, 
        ease: "power2.out"
      });
      
      // COFFEE STAIN SPREADS
      gsap.from(".view-7 .coffee-stain", {
        scrollTrigger: { trigger: ".view-7", start: "top 60%" },
        scale: 0, opacity: 0, 
        duration: 1.2, delay: 1, ease: "power3.out"
      });

      // PEN SCATTER
      gsap.from(".view-7 .pen-scatter", {
        scrollTrigger: { trigger: ".view-7", start: "top 60%" },
        scale: 0, rotation: 180, opacity: 0,
        duration: 0.5, delay: 1.5, ease: "back.out(3)"
      });

      // --- VIEW 8: EQUIPMENT (KNOLLING POP) ---
      gsap.from(".view-8 .equipment-item", {
        scrollTrigger: { trigger: ".view-8", start: "top 70%" },
        scale: 0, 
        opacity: 0, 
        rotation: () => Math.random() * 120 - 60,
        stagger: { amount: 0.7, from: "random", ease: "steps(3)" }, 
        duration: 0.5, 
        ease: "back.out(2.5)",
      });
      
      // CHECKLIST STAMP
      gsap.from(".view-8 .checklist-note", {
         scrollTrigger: { trigger: ".view-8", start: "top 50%" },
         scale: 0, rotation: 20, opacity: 0,
         duration: 0.4, delay: 1.2, ease: "elastic.out(1, 0.4)"
      });

      // --- VIEW 9-10: STRUGGLE (MUD & RAIN) ---
      // PHOTOS DROP & SCATTER
      gsap.from(".struggle-photo", {
        scrollTrigger: { trigger: ".view-9", start: "top 70%" },
        y: 250, 
        rotation: () => Math.random() * 50 - 25,
        opacity: 0, 
        scale: 0.7,
        stagger: 0.12, 
        duration: 0.7, 
        ease: "power2.out", 
      });
      
      // MUD SPLATTERS
      gsap.from(".mud-splat", {
        scrollTrigger: { trigger: ".view-9", start: "top 60%" },
        scale: 0,
        opacity: 0,
        rotation: () => Math.random() * 360,
        stagger: 0.15,
        duration: 0.3,
        ease: "elastic.out(1, 0.4)"
      });

      // RAIN START
      gsap.from(".rain-overlay .raindrop", {
        scrollTrigger: { trigger: ".view-9", start: "top 60%" },
        opacity: 0,
        duration: 0.5,
        stagger: 0.02
      });

      // --- VIEW 11: QUOTES (STICKY SCATTER) ---
      gsap.from(".view-11 .quote-sticky", {
        scrollTrigger: { trigger: ".view-11", start: "top 75%" },
        scale: 0, rotation: () => randomRot() * 5, opacity: 0,
        stagger: 0.12, duration: 0.5, ease: "back.out(3)",
      });
      
      // IDLE SWAY
      document.querySelectorAll(".view-11 .quote-sticky").forEach((sticky) => {
        gsap.to(sticky, {
          y: `+=${Math.random() * 10 + 2}`, 
          rotation: `+=${Math.random() * 2}`,
          duration: Math.random() * 4 + 3, 
          repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      });

      // --- VIEW 12: INTERVIEW (PHOTO SLIDE) ---
      gsap.from(".view-12 .interview-photo.main-photo", {
        scrollTrigger: { trigger: ".view-12", start: "top 70%" },
        x: -150, rotation: -15, opacity: 0, scale: 0.9,
        duration: 0.8, ease: "power3.out"
      });
      gsap.from(".view-12 .interview-photo.secondary-photo", {
        scrollTrigger: { trigger: ".view-12", start: "top 70%" },
        x: 150, rotation: 15, opacity: 0, scale: 0.9,
        duration: 0.8, delay: 0.2, ease: "power3.out"
      });
      gsap.from(".view-12 .handwritten-caption", {
        scrollTrigger: { trigger: ".view-12", start: "top 60%" },
        opacity: 0, y: 30, scale: 0.8, rotation: 10,
        duration: 0.6, delay: 0.5, ease: "back.out(2)"
      });

      // --- VIEW 13: CHART (BARS FILL) ---
      gsap.from(".view-13 .progress-bar-container", {
        scrollTrigger: { trigger: ".view-13", start: "top 70%" },
        opacity: 0, x: -30, 
        stagger: 0.1, duration: 0.4,
      });
      gsap.from(".view-13 .progress-fill", {
        scrollTrigger: { trigger: ".view-13", start: "top 65%" },
        scaleX: 0, transformOrigin: "left", 
        stagger: 0.15, duration: 1.2, ease: "power2.out",
      });

      // --- VIEW 14: SYNC (SCREEN FLIP) ---
      gsap.from(".view-14 .laptop-screen", {
        scrollTrigger: { trigger: ".view-14", start: "top 70%" },
        rotationX: 90, opacity: 0, scale: 0.8,
        duration: 1, ease: "power3.out"
      });

      // COFFEE & NOTEBOOK POP
      gsap.from(".view-14 .coffee-cup", {
        scrollTrigger: { trigger: ".view-14", start: "top 65%" },
        scale: 0, rotation: -180, opacity: 0,
        duration: 0.5, delay: 0.5, ease: "back.out(3)"
      });

      gsap.from(".view-14 .notebook", {
        scrollTrigger: { trigger: ".view-14", start: "top 65%" },
        scale: 0, rotation: 30, opacity: 0,
        duration: 0.5, delay: 0.7, ease: "back.out(3)"
      });

      // --- VIEW 15: ENVELOPE (DROP & SEAL) ---
      gsap.from(".view-15 .envelope", {
        scrollTrigger: { trigger: ".view-15", start: "top 70%" },
        y: -150, opacity: 0, rotation: -5, scale: 0.9,
        duration: 1, ease: "power3.out"
      });
      
      // WAX SEAL STAMP
      gsap.from(".view-15 .stamp-seal", {
        scrollTrigger: { trigger: ".view-15", start: "top 60%" },
        scale: 6, opacity: 0, rotation: 180,
        duration: 0.25, delay: 1, ease: "power4.in",
        onComplete: () => {
          gsap.to(".view-15 .stamp-seal", {
            scale: 1, rotation: 0, duration: 0.15, ease: "back.out(3)"
          });
        }
      });

      // Scroll Progress
      gsap.to(".scroll-progress", {
        scaleX: 1, transformOrigin: "left", ease: "none",
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top top", 
          end: "bottom bottom", 
          scrub: true 
        },
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Drag handlers
  const handleDragStart = (e, photoId) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("photoId", photoId);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, photoId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("photoId");
    if (!draggedId) return;
    setDraggedPhotos((prev) => ({
      ...prev,
      [draggedId]: { x: e.nativeEvent.offsetX - 140, y: e.nativeEvent.offsetY - 160 },
    }));
  };

  return (
    <div className="journey-container" ref={containerRef}>
      <div className="scroll-progress-bar"><div className="scroll-progress"></div></div>

      {/* VIEW 1: HERO */}
      <section className="story-view view-1">
        <div className="torn-paper-top"></div>
        <div className="noise-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Perjalanan Pendataan R3P</h1>
          <p className="hero-subtitle">Catatan visual 510 Mahasiswa di Aceh, Sumut, dan Sumbar</p>
          <div className="hero-date"><span className="date-stamp">14 Jan - 2 Feb 2026</span></div>
        </div>
        <div className="torn-paper-bottom"></div>
        <div className="tape-corner top-left"></div>
        <div className="tape-corner top-right"></div>
      </section>

      {/* VIEW 2: SCALE */}
      <section className="story-view view-2">
        <div className="view-header">
          <h2 className="section-title handwritten">Skala Misi Kami</h2>
          <div className="underline-sketch"></div>
        </div>
        <div className="stats-grid">
          <div className="stat-card pcl-card">
            <div className="tape-strip"></div>
            <div className="stat-number">{viewData.view2.pcl}</div>
            <div className="stat-label">PCL Mahasiswa</div>
            <div className="stat-note">Ujung tombak data</div>
          </div>
          <div className="stat-card pml-card">
            <div className="tape-strip"></div>
            <div className="stat-number">{viewData.view2.pml}</div>
            <div className="stat-label">PML & Pengawas</div>
            <div className="stat-note">Quality Control</div>
          </div>
          <div className="stat-card provinsi-card">
            <div className="tape-strip"></div>
            <div className="stat-number">{viewData.view2.provinsi}</div>
            <div className="stat-label">Provinsi</div>
            <div className="stat-note">Wilayah bencana</div>
          </div>
          <div className="stat-card kabupaten-card">
            <div className="tape-strip"></div>
            <div className="stat-number">{viewData.view2.kabupaten}</div>
            <div className="stat-label">Kab/Kota</div>
            <div className="stat-note">Cakupan area</div>
          </div>
        </div>
        <div className="doodle-arrow"></div>
      </section>

      {/* VIEW 3: FLIGHTS (PAPER CUTOUT THEME) */}
      <section className="story-view view-3">
        <div className="cloud-layer">
           <div className="cloud-bg c1"></div>
           <div className="cloud-bg c2"></div>
           <div className="cloud-bg c3"></div>
        </div>
        <div className="planes-container">
           {/* COMMERCIAL PLANE */}
           <div className="airplane-element plane-commercial">
              <div className="plane-body"></div>
              <div className="plane-wing"></div>
              <div className="plane-tail"></div>
              <div className="plane-window w1"></div>
              <div className="plane-window w2"></div>
              <div className="plane-window w3"></div>
           </div>
           
           {/* HERCULES PLANE */}
           <div className="airplane-element plane-hercules">
              <div className="hercules-fuselage"></div>
              <div className="hercules-cockpit"></div>
              <div className="hercules-wing-main">
                 <div className="propeller-housing ph1">
                   <div className="propeller p1"></div>
                 </div>
                 <div className="propeller-housing ph2">
                   <div className="propeller p2"></div>
                 </div>
              </div>
              <div className="hercules-tail-vertical"></div>
              <div className="hercules-tail-horizontal"></div>
              <div className="hercules-cargo-ramp"></div>
           </div>
        </div>
        
        <div className="view-header">
          <h2 className="section-title">Menuju Lokasi Tugas</h2>
          <p className="section-subtitle">06:00 WIB • Jalur Udara</p>
        </div>
        
        <div className="boarding-passes-container">
          {viewData.view3.flights.map((flight, index) => (
            <div key={index} className={`boarding-pass ${flight.type === 'military' ? 'pass-military' : 'pass-commercial'}`}>
              <div className="pass-left">
                <div className="airline-header">
                  <span className="airline-name">{flight.airline}</span>
                  <span className="airline-icon">{flight.icon}</span>
                </div>
                <div className="pass-route">
                  <div className="city from-city">{flight.from.split(' ')[0]}</div>
                  <div className="route-arrow">{flight.type === 'military' ? '==>' : '➝'}</div>
                  <div className="city dest-highlight">{flight.dest.split(' ')[0].toUpperCase()}</div>
                </div>
                <div className="pass-details">
                  <div className="detail-block"><label>CODE</label><span>{flight.code}</span></div>
                  <div className="detail-block"><label>DATE</label><span>{flight.date}</span></div>
                  <div className="detail-block"><label>TIME</label><span>{flight.time}</span></div>
                  <div className="detail-block"><label>SEAT</label><span>{flight.seat}</span></div>
                </div>
                {flight.type === 'military' && <div className="stamp-confidential">MILITARY TRANSPORT</div>}
              </div>
              <div className="pass-separator"></div>
              <div className="pass-right">
                <div className="boarding-barcode"></div>
                <div className="stub-info">
                  <span className="stub-code">{flight.code}</span>
                  <span className="stub-dest">{flight.dest.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIEW 4: ARRIVAL */}
      <section className="story-view view-4">
        <div className="view-header">
          <h2 className="section-title handwritten">Tiba di Lapangan</h2>
        </div>
        <div className="polaroid-grid">
          <div className="polaroid-stack" style={{ "--rotation": "-3deg" }}>
            <div className="tape-top"></div>
            <div className="polaroid-image aceh-arrival"></div>
            <div className="polaroid-caption">Langit Banda Aceh</div>
          </div>
          <div className="polaroid-stack" style={{ "--rotation": "2deg" }}>
            <div className="tape-top"></div>
            <div className="polaroid-image sumut-arrival"></div>
            <div className="polaroid-caption">Tim Sumut Siap!</div>
          </div>
          <div className="polaroid-stack" style={{ "--rotation": "-4deg" }}>
            <div className="tape-top"></div>
            <div className="polaroid-image sumbar-arrival"></div>
            <div className="polaroid-caption">Posko Padang</div>
          </div>
        </div>
        <div className="arrival-stamp">
          <div className="stamp-ring">
            <div className="stamp-text">ARRIVED - SAFE</div>
            <div className="stamp-date">14 JAN 2026</div>
          </div>
        </div>
      </section>

      {/* VIEW 5: ORIENTATION */}
      <section className="story-view view-5">
        <div className="view-header">
          <h2 className="section-title">Briefing & Protokol</h2>
          <p className="section-subtitle">Arahan penting sebelum turun ke lapangan</p>
        </div>
        <div className="orientation-board">
          <div className="orientation-note note-yellow">
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>Protokol Data</h4>
              <ul>
                <li>Cek baterai CAPI (HP)</li>
                <li>Download peta offline</li>
                <li>Validasi prelist responden</li>
              </ul>
            </div>
          </div>
          <div className="orientation-note note-blue">
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>Safety First!</h4>
              <ul>
                <li>Jangan jalan sendirian</li>
                <li>Sedia jas hujan & obat</li>
                <li>Lapor Korkab jika darurat</li>
              </ul>
            </div>
          </div>
          <div className="orientation-note note-pink">
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>Target Harian</h4>
              <ul>
                <li>Min. 15 Ruta Complete</li>
                <li>Upload data sebelum jam 23.00</li>
                <li>Jaga sopan santun!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIEW 6: MEMO */}
      <section className="story-view view-6">
        <div className="view-header">
          <h2 className="section-title">Surat Tugas</h2>
        </div>
        <div className="memo-sheet">
          <div className="paper-texture"></div>
          <div className="memo-header">
            <div className="memo-logo">BPS</div>
            <div className="memo-meta">
              <div className="memo-title">MEMO LAPANGAN</div>
              <div className="memo-date">14 Januari 2026</div>
            </div>
          </div>
          <div className="memo-body">
            <div className="memo-line-group">
              <div className="memo-line full"></div>
              <div className="memo-line full"></div>
              <div className="memo-line three-quarter"></div>
            </div>
            <div className="memo-content-text">
              <p><strong>Kepada Tim PKL 65,</strong></p>
              <p>Data yang Anda kumpulkan adalah landasan kebijakan rehabilitasi pasca bencana. Kerjakan dengan hati, teliti, dan jujur.</p>
              <p className="memo-highlight">"Data mencerdaskan bangsa, data memulihkan bencana."</p>
            </div>
            <div className="memo-line-group bottom">
              <div className="memo-line full"></div>
              <div className="memo-line half"></div>
            </div>
          </div>
          <div className="memo-signature">
            <div className="stamp-bps"></div>
            <div className="signature-scribble"></div>
            <div className="signature-name">Kepala BPS Provinsi</div>
          </div>
          <div className="paper-clip"></div>
        </div>
      </section>

      {/* VIEW 7: COORDINATION (CHAOS TABLE) */}
      <section className="story-view view-7">
        <div className="view-header">
          <h2 className="section-title handwritten">Rapat Alot</h2>
          <p className="section-subtitle">Koordinasi dengan Pemda & BPS Daerah</p>
        </div>
        <div className="meeting-table">
          <div className="meeting-doc doc-map"></div>
          <div className="meeting-doc doc-notes"></div>
          <div className="meeting-doc doc-photo-1"></div>
          <div className="meeting-doc doc-photo-2"></div>
          <div className="meeting-doc doc-agenda"></div>
          <div className="coffee-stain"></div>
          <div className="coffee-stain coffee-stain-2"></div>
          <div className="pen-scatter"></div>
          <div className="pen-scatter pen-2"></div>
        </div>
      </section>

      {/* VIEW 8: EQUIPMENT (KNOLLING) */}
      <section className="story-view view-8">
        <div className="view-header">
          <h2 className="section-title">Survival Kit</h2>
          <p className="section-subtitle">Senjata PCL di Medan Bencana</p>
        </div>
        <div className="flatlay-container">
          <div className="equipment-item vest" style={{ "--x": "15%", "--y": "10%" }}>
            <div className="item-image vest-img"></div>
            <div className="item-label">Rompi BPS</div>
          </div>
          <div className="equipment-item boots" style={{ "--x": "55%", "--y": "15%" }}>
            <div className="item-image boots-img"></div>
            <div className="item-label">Boots Anti Lumpur</div>
          </div>
          <div className="equipment-item phone" style={{ "--x": "35%", "--y": "40%" }}>
            <div className="item-image phone-img"></div>
            <div className="item-label">HP CAPI Full Bat</div>
          </div>
          <div className="equipment-item raincoat" style={{ "--x": "70%", "--y": "50%" }}>
            <div className="item-image raincoat-img"></div>
            <div className="item-label">Jas Hujan</div>
          </div>
          <div className="equipment-item powerbank" style={{ "--x": "20%", "--y": "65%" }}>
            <div className="item-image powerbank-img"></div>
            <div className="item-label">Powerbank 20k mAh</div>
          </div>
          <div className="equipment-item bag" style={{ "--x": "50%", "--y": "70%" }}>
            <div className="item-image bag-img"></div>
            <div className="item-label">Dry Bag Dokumen</div>
          </div>
        </div>
        <div className="checklist-note">
          <span className="check-mark">✓</span>
          <span className="check-text">SIAP TEMPUR!</span>
        </div>
      </section>

      {/* VIEW 9-10: STRUGGLE (MUD & RAIN) */}
      <section className="story-view view-9 view-10">
        <div className="rain-overlay">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="raindrop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}></div>
          ))}
        </div>
        <div className="mud-splat s1"></div>
        <div className="mud-splat s2"></div>
        <div className="mud-splat s3"></div>
        <div className="mud-splat s4"></div>
        
        <div className="view-header">
          <h2 className="section-title handwritten">Menembus Batas</h2>
          <p className="section-subtitle">Hujan, Lumpur, dan Hilang Sinyal</p>
        </div>
        
        <div className="struggle-container">
          <div className="drag-instruction handwritten">(Geser foto-foto ini)</div>
          <div className="photo-pile" onDragOver={handleDragOver}>
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="struggle-photo" 
                draggable 
                onDragStart={(e) => handleDragStart(e, photo.id)} 
                onDrop={(e) => handleDrop(e, photo.id)} 
                style={{ 
                  transform: draggedPhotos[photo.id] 
                    ? `translate(${draggedPhotos[photo.id].x}px, ${draggedPhotos[photo.id].y}px) rotate(${photo.rotation}deg)` 
                    : `rotate(${photo.rotation}deg)`, 
                  zIndex: photo.zIndex 
                }}
              >
                <div className="photo-tape-corner"></div>
                <div className="photo-placeholder" style={{ backgroundImage: `url(${photo.src})` }}></div>
                <div className="photo-caption-strip">{photo.alt}</div>
                <div className="mud-smudge"></div>
              </div>
            ))}
          </div>
          <div className="struggle-caption handwritten">
            "Tidak ada jalan yang terlalu lunak untuk kaki yang bertekad baja."
          </div>
        </div>
      </section>

      {/* VIEW 11: QUOTES */}
      <section className="story-view view-11">
        <div className="view-header">
          <h2 className="section-title">Suara Responden</h2>
          <p className="section-subtitle">Cerita di balik angka</p>
        </div>
        <div className="quotes-wall">
          {viewData.view11.quotes.map((quote, index) => (
            <div 
              key={index} 
              className={`quote-sticky ${quote.sentiment}`} 
              style={{ 
                "--rotation": `${index % 2 === 0 ? -2 + index * 0.5 : 2 - index * 0.5}deg`, 
                "--x": `${5 + index * 18}%`, 
                "--y": `${10 + (index % 3) * 15}%` 
              }}
            >
              <div className="sticky-tape"></div>
              <div className="quote-text">"{quote.text}"</div>
              <div className="quote-author">— {quote.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VIEW 12: INTERVIEW */}
      <section className="story-view view-12">
        <div className="view-header">
          <h2 className="section-title handwritten">Dari Hati ke Hati</h2>
        </div>
        <div className="interview-layout">
          <div className="interview-photo main-photo">
            <div className="washi-tape top-left"></div>
            <div className="washi-tape bottom-right"></div>
            <div className="interview-image"></div>
          </div>
          <div className="handwritten-caption">
            "Mendengar keluh kesah mereka membuat kami sadar, data ini bukan sekadar angka statistik."
          </div>
          <div className="interview-photo secondary-photo">
            <div className="washi-tape top-center"></div>
            <div className="interview-image-2"></div>
          </div>
        </div>
      </section>

      {/* VIEW 13: CHART */}
      <section className="story-view view-13">
        <div className="view-header">
          <h2 className="section-title">Progress Monitoring</h2>
          <p className="section-subtitle">Update Real-time Dashboard</p>
        </div>
        <div className="chart-container">
          <div className="paper-texture"></div>
          <div className="chart-title handwritten">Target vs Realisasi</div>
          <div className="progress-chart">
            {viewData.view13.progress.map((item, index) => (
              <div key={index} className="progress-bar-container">
                <div className="progress-info">
                  <span className="p-day">{item.day}</span>
                  <span className="p-note handwritten">({item.note})</span>
                </div>
                <div className="progress-bars">
                  <div className="progress-bar target-bar">
                    <div className="bar-pattern"></div>
                  </div>
                  <div className="progress-bar realisasi-bar">
                    <div className="progress-fill" style={{ width: `${item.percentage}%` }}>
                      <div className="fill-texture"></div>
                    </div>
                  </div>
                </div>
                <div className="progress-val handwritten">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIEW 14: SYNC */}
      <section className="story-view view-14">
        <div className="view-header">
          <h2 className="section-title">Sinkronisasi Malam</h2>
          <p className="section-subtitle">Pejuang sinyal di malam hari</p>
        </div>
        <div className="sync-scene">
          <div className="laptop-screen">
            <div className="screen-bezel">
              <div className="screen-display">
                <div className="sync-terminal">
                  <p>{`> Connecting to server...`}</p>
                  <p className="success">{`> Connection established.`}</p>
                  <p>{`> Uploading 15 questionnaires...`}</p>
                  <p>{`> [||||||||||||||||    ] 80%`}</p>
                  <p className="blinking">{`> Syncing...`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="coffee-cup">
            <div className="steam"></div>
          </div>
          <div className="notebook">
            <div className="pen"></div>
          </div>
        </div>
        <div className="time-caption handwritten">23:55 WIB - Menunggu server BPS</div>
      </section>

      {/* VIEW 15: CLOSING */}
      <section className="story-view view-15">
        <div className="view-header">
          <h2 className="section-title handwritten">Misi Selesai</h2>
        </div>
        <div className="envelope-container">
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="envelope-content">
                <h3 className="envelope-title">Untuk Indonesia,</h3>
                <p className="envelope-message">
                  Sebuah kehormatan bagi kami, 510 mahasiswa Politeknik Statistika STIS, 
                  dapat berkontribusi dalam pemulihan negeri ini.
                </p>
                <div className="envelope-signature handwritten">Salam, PKL Angkatan 65</div>
              </div>
            </div>
          </div>
          <div className="stamp-seal">
            <div className="seal-wax">
              <span className="seal-text">65</span>
            </div>
          </div>
        </div>
        <div className="closing-note handwritten">Terima Kasih.</div>
      </section>

      {/* NAVIGATION */}
      <div className="story-navigation">
        <Link to="/" className="nav-button back">
          <span className="nav-icon">←</span>
          <span className="nav-text">Kembali</span>
        </Link>
        <Link to="/findings" className="nav-button next">
          <span className="nav-text">Hasil Temuan</span>
          <span className="nav-icon">→</span>
        </Link>
      </div>
    </div>
  );
}

export default Journey;