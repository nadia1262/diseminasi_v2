import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

function Journey() {
  const containerRef = useRef(null);
  const [draggedPhotos, setDraggedPhotos] = useState({});
  const [currentView, setCurrentView] = useState(1);

  // Data untuk setiap view
  const viewData = {
    view2: {
      pcl: 510,
      pml: 57,
      provinsi: 3,
      kabupaten: 15,
    },
    view3: {
      flights: [
        { dest: "Banda Aceh (BTJ)", code: "GA-101", time: "06:30", date: "14 Jan 2026" },
        { dest: "Medan (KNO)", code: "GA-102", time: "07:15", date: "14 Jan 2026" },
        { dest: "Padang (PDG)", code: "GA-103", time: "08:00", date: "14 Jan 2026" },
      ],
    },
    view11: {
      quotes: [
        { text: "Rumah kami masih bocor kalau hujan deras", name: "Ibu Siti, Aceh Timur", sentiment: "worried" },
        { text: "Alhamdulillah sudah mulai ada bantuan untuk perbaikan", name: "Pak Ahmad, Aceh Tengah", sentiment: "hopeful" },
        { text: "Anak-anak belum bisa sekolah normal, sekolah masih rusak", name: "Ibu Ratna, Gayo Lues", sentiment: "concerned" },
        { text: "Kami butuh akses jalan yang lebih baik", name: "Pak Hadi, Mandailing Natal", sentiment: "urgent" },
      ],
    },
    view13: {
      progress: [
        { day: "Hari 1-3", target: 1200, realisasi: 980, percentage: 82 },
        { day: "Hari 4-7", target: 2400, realisasi: 2150, percentage: 90 },
        { day: "Hari 8-12", target: 3600, realisasi: 3420, percentage: 95 },
        { day: "Hari 13-18", target: 5000, realisasi: 4890, percentage: 98 },
        { day: "Hari 19-21", target: 5500, realisasi: 5467, percentage: 99 },
      ],
    },
  };

  // Photos for draggable section
  const [photos] = useState([
    { id: 1, src: "/images/struggle-1.jpg", alt: "Sepatu berlumpur", rotation: -5, zIndex: 5 },
    { id: 2, src: "/images/struggle-2.jpg", alt: "Medan hujan", rotation: 3, zIndex: 4 },
    { id: 3, src: "/images/struggle-3.jpg", alt: "Jalan terjal", rotation: -2, zIndex: 3 },
    { id: 4, src: "/images/struggle-4.jpg", alt: "Pendakian", rotation: 7, zIndex: 2 },
    { id: 5, src: "/images/struggle-5.jpg", alt: "Sungai", rotation: -4, zIndex: 1 },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // VIEW 1: HERO TORN PAPER EFFECT
      gsap.from(".view-1 .torn-paper-top", {
        scrollTrigger: {
          trigger: ".view-1",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
      });

      gsap.from(".view-1 .hero-title", {
        scrollTrigger: {
          trigger: ".view-1",
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".view-1 .hero-subtitle", {
        scrollTrigger: {
          trigger: ".view-1",
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".view-1 .hero-date", {
        scrollTrigger: {
          trigger: ".view-1",
          start: "top 60%",
        },
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      // Add floating animation to hero elements
      gsap.to(".view-1 .hero-title", {
        y: "+=8",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // VIEW 2: SCALE WITH MARKER CIRCLES
      gsap.from(".view-2 .stat-card", {
        scrollTrigger: {
          trigger: ".view-2",
          start: "top 70%",
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(".view-2 .marker-circle", {
        scrollTrigger: {
          trigger: ".view-2",
          start: "top 60%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });

      // Floating animation for stat cards
      document.querySelectorAll(".view-2 .stat-card").forEach((card, i) => {
        gsap.to(card, {
          y: "+=6",
          rotation: `+=${i % 2 === 0 ? 1 : -1}`,
          duration: 4 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // VIEW 3: BOARDING PASSES
      gsap.from(".view-3 .boarding-pass", {
        scrollTrigger: {
          trigger: ".view-3",
          start: "top 70%",
        },
        x: (i) => (i % 2 === 0 ? -300 : 300),
        rotation: (i) => (i % 2 === 0 ? -180 : 180),
        opacity: 0,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
      });

      // Subtle float for boarding passes
      document.querySelectorAll(".view-3 .boarding-pass").forEach((pass, i) => {
        gsap.to(pass, {
          y: "+=5",
          rotation: `+=${i % 2 === 0 ? 0.5 : -0.5}`,
          duration: 5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // VIEW 4: ARRIVAL
      gsap.from(".view-4 .polaroid-stack", {
        scrollTrigger: {
          trigger: ".view-4",
          start: "top 70%",
        },
        scale: 0,
        rotation: -90,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(".view-4 .arrival-stamp", {
        scrollTrigger: {
          trigger: ".view-4",
          start: "top 60%",
        },
        scale: 0,
        rotation: 720,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "elastic.out(1, 0.5)",
      });

      // VIEW 5: ORIENTATION
      gsap.from(".view-5 .orientation-note", {
        scrollTrigger: {
          trigger: ".view-5",
          start: "top 70%",
        },
        x: -100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".view-5 .pushpin", {
        scrollTrigger: {
          trigger: ".view-5",
          start: "top 65%",
        },
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(2)",
      });

      // VIEW 6: BPS BRIEFING
      gsap.from(".view-6 .memo-sheet", {
        scrollTrigger: {
          trigger: ".view-6",
          start: "top 70%",
        },
        y: 100,
        rotation: 10,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".view-6 .memo-line", {
        scrollTrigger: {
          trigger: ".view-6",
          start: "top 60%",
        },
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      // VIEW 7: COORDINATION
      gsap.from(".view-7 .photo-strip", {
        scrollTrigger: {
          trigger: ".view-7",
          start: "top 70%",
        },
        x: -200,
        rotation: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".view-7 .tape-piece", {
        scrollTrigger: {
          trigger: ".view-7",
          start: "top 65%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(2)",
      });

      // VIEW 8: FLATLAY EQUIPMENT
      gsap.from(".view-8 .equipment-item", {
        scrollTrigger: {
          trigger: ".view-8",
          start: "top 70%",
        },
        scale: 0,
        rotation: (i) => i * 45,
        opacity: 0,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Floating equipment
      document.querySelectorAll(".view-8 .equipment-item").forEach((item, i) => {
        gsap.to(item, {
          y: `+=${5 + (i % 3) * 2}`,
          rotation: `+=${i % 2 === 0 ? 1 : -1}`,
          duration: 4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // VIEW 9-10: THE STRUGGLE (Photos)
      gsap.from(".struggle-photo", {
        scrollTrigger: {
          trigger: ".view-9",
          start: "top 70%",
        },
        scale: 0,
        rotation: (i) => i * 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // VIEW 11: QUOTES
      gsap.from(".view-11 .quote-sticky", {
        scrollTrigger: {
          trigger: ".view-11",
          start: "top 70%",
        },
        y: -100,
        rotation: (i) => (i % 2 === 0 ? -10 : 10),
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Floating stickies
      document.querySelectorAll(".view-11 .quote-sticky").forEach((sticky, i) => {
        gsap.to(sticky, {
          y: "+=6",
          rotation: `+=${i % 2 === 0 ? 0.5 : -0.5}`,
          duration: 5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // VIEW 12: WAWANCARA
      gsap.from(".view-12 .interview-photo", {
        scrollTrigger: {
          trigger: ".view-12",
          start: "top 70%",
        },
        scale: 0,
        rotation: 20,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      gsap.from(".view-12 .handwritten-caption", {
        scrollTrigger: {
          trigger: ".view-12",
          start: "top 65%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      // VIEW 13: PROGRESS CHART
      gsap.from(".view-13 .progress-bar-container", {
        scrollTrigger: {
          trigger: ".view-13",
          start: "top 70%",
        },
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".view-13 .progress-fill", {
        scrollTrigger: {
          trigger: ".view-13",
          start: "top 65%",
        },
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.2,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      // VIEW 14: SINKRONISASI
      gsap.from(".view-14 .laptop-screen", {
        scrollTrigger: {
          trigger: ".view-14",
          start: "top 70%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".view-14 .data-point", {
        scrollTrigger: {
          trigger: ".view-14",
          start: "top 65%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(2)",
      });

      // VIEW 15: ENVELOPE CLOSING
      gsap.from(".view-15 .envelope", {
        scrollTrigger: {
          trigger: ".view-15",
          start: "top 70%",
        },
        y: 100,
        rotation: -10,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".view-15 .stamp-seal", {
        scrollTrigger: {
          trigger: ".view-15",
          start: "top 60%",
        },
        scale: 0,
        rotation: 720,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Subtle floating for envelope
      gsap.to(".view-15 .envelope", {
        y: "+=8",
        rotation: "+=1",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll progress indicator
      gsap.to(".scroll-progress", {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Drag functionality for struggle photos
  const handleDragStart = (e, photoId) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("photoId", photoId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, photoId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("photoId");
    
    setDraggedPhotos((prev) => ({
      ...prev,
      [draggedId]: {
        x: e.clientX - 100,
        y: e.clientY - 100,
      },
    }));
  };

  return (
    <div className="journey-container" ref={containerRef}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress"></div>
      </div>

      {/* VIEW 1: HERO COVER */}
      <section className="story-view view-1">
        <div className="torn-paper-top"></div>
        <div className="hero-content">
          <h1 className="hero-title">Perjalanan Pendataan R3P</h1>
          <p className="hero-subtitle">
            Cerita 510 Mahasiswa di 3 Provinsi, 15 Kabupaten/Kota
          </p>
          <div className="hero-date">
            <span className="date-stamp">14 Jan - 2 Feb 2026</span>
          </div>
        </div>
        <div className="torn-paper-bottom"></div>
        <div className="tape-corner top-left"></div>
        <div className="tape-corner top-right"></div>
      </section>

      {/* VIEW 2: SCALE */}
      <section className="story-view view-2">
        <div className="view-header">
          <h2 className="section-title handwritten">Skala Pendataan</h2>
          <div className="underline-sketch"></div>
        </div>

        <div className="stats-grid">
          <div className="stat-card pcl-card">
            <div className="marker-circle"></div>
            <div className="stat-number">{viewData.view2.pcl}</div>
            <div className="stat-label">Mahasiswa PCL</div>
            <div className="stat-note">Turun ke lapangan</div>
          </div>

          <div className="stat-card pml-card">
            <div className="marker-circle"></div>
            <div className="stat-number">{viewData.view2.pml}</div>
            <div className="stat-label">PML BPS</div>
            <div className="stat-note">Membimbing & supervisi</div>
          </div>

          <div className="stat-card provinsi-card">
            <div className="marker-circle"></div>
            <div className="stat-number">{viewData.view2.provinsi}</div>
            <div className="stat-label">Provinsi</div>
            <div className="stat-note">Aceh, Sumut, Sumbar</div>
          </div>

          <div className="stat-card kabupaten-card">
            <div className="marker-circle"></div>
            <div className="stat-number">{viewData.view2.kabupaten}</div>
            <div className="stat-label">Kab/Kota</div>
            <div className="stat-note">Area pendataan</div>
          </div>
        </div>

        <div className="doodle-arrow"></div>
      </section>

      {/* VIEW 3: BOARDING PASSES */}
      <section className="story-view view-3">
        <div className="view-header">
          <h2 className="section-title">Menuju Lokasi Tugas</h2>
          <p className="section-subtitle">Diberangkatkan ke 3 provinsi</p>
        </div>

        <div className="boarding-passes-container">
          {viewData.view3.flights.map((flight, index) => (
            <div key={index} className="boarding-pass" style={{ "--rotation": `${index % 2 === 0 ? -3 : 3}deg` }}>
              <div className="boarding-pass-header">
                <div className="airline-logo">PKL 65</div>
                <div className="flight-code">{flight.code}</div>
              </div>
              <div className="boarding-pass-body">
                <div className="destination">
                  <div className="dest-label">Tujuan</div>
                  <div className="dest-city">{flight.dest}</div>
                </div>
                <div className="flight-details">
                  <div className="detail-item">
                    <span className="detail-label">Waktu</span>
                    <span className="detail-value">{flight.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tanggal</span>
                    <span className="detail-value">{flight.date}</span>
                  </div>
                </div>
              </div>
              <div className="boarding-pass-stub">
                <div className="barcode"></div>
              </div>
              <div className="perforation"></div>
            </div>
          ))}
        </div>

        <div className="map-doodle"></div>
      </section>

      {/* VIEW 4: ARRIVAL */}
      <section className="story-view view-4">
        <div className="view-header">
          <h2 className="section-title handwritten">Tiba dengan Selamat</h2>
        </div>

        <div className="polaroid-grid">
          <div className="polaroid-stack" style={{ "--rotation": "-5deg" }}>
            <div className="polaroid-image aceh-arrival"></div>
            <div className="polaroid-caption">Aceh - Langit cerah pagi hari</div>
          </div>

          <div className="polaroid-stack" style={{ "--rotation": "3deg" }}>
            <div className="polaroid-image sumut-arrival"></div>
            <div className="polaroid-caption">Sumut - Siap menjalankan misi</div>
          </div>

          <div className="polaroid-stack" style={{ "--rotation": "-2deg" }}>
            <div className="polaroid-image sumbar-arrival"></div>
            <div className="polaroid-caption">Sumbar - Energi penuh!</div>
          </div>
        </div>

        <div className="arrival-stamp">
          <div className="stamp-text">ARRIVED</div>
          <div className="stamp-date">14 JAN 2026</div>
        </div>
      </section>

      {/* VIEW 5: ORIENTATION */}
      <section className="story-view view-5">
        <div className="view-header">
          <h2 className="section-title">Briefing & Koordinasi</h2>
          <p className="section-subtitle">Arahan PML, koordinasi dengan BPS Kab/Kot dan Pemda</p>
        </div>

        <div className="orientation-board">
          <div className="orientation-note" style={{ "--rotation": "-2deg", "--color": "#FFE5B4" }}>
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>Protokol Pendataan</h4>
              <ul>
                <li>Persiapan peralatan CAPI</li>
                <li>Verifikasi daftar responden</li>
                <li>Koordinasi dengan pendamping lokal</li>
              </ul>
            </div>
          </div>

          <div className="orientation-note" style={{ "--rotation": "3deg", "--color": "#E6F3FF" }}>
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>K3 & Keamanan</h4>
              <ul>
                <li>Selalu berpasangan minimal 2 orang</li>
                <li>Lapor posisi setiap sore</li>
                <li>Siaga cuaca & kondisi medan</li>
              </ul>
            </div>
          </div>

          <div className="orientation-note" style={{ "--rotation": "-4deg", "--color": "#FFE6E6" }}>
            <div className="pushpin"></div>
            <div className="note-content">
              <h4>Target Harian</h4>
              <ul>
                <li>Minimal 15 rumah tangga per hari</li>
                <li>Sinkronisasi malam hari</li>
                <li>Konsultasi jika ada kendala</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIEW 6: BPS BRIEFING */}
      <section className="story-view view-6">
        <div className="view-header">
          <h2 className="section-title">Koordinasi BPS</h2>
        </div>

        <div className="memo-sheet">
          <div className="memo-header">
            <div className="memo-logo">BPS</div>
            <div className="memo-title">Memo Koordinasi</div>
            <div className="memo-date">14 Januari 2026</div>
          </div>

          <div className="memo-body">
            <div className="memo-line">
              <span className="memo-label">Kepada:</span>
              <span className="memo-value">Tim Pencacah PKL 65</span>
            </div>
            <div className="memo-line">
              <span className="memo-label">Dari:</span>
              <span className="memo-value">BPS Provinsi</span>
            </div>
            <div className="memo-line">
              <span className="memo-label">Perihal:</span>
              <span className="memo-value">Pendataan Rehabilitasi & Rekonstruksi</span>
            </div>

            <div className="memo-content">
              <p>Selamat datang tim PKL STIS 65,</p>
              <p>Terima kasih atas partisipasi dalam pendataan R3P pasca bencana. Data yang kalian kumpulkan akan menjadi dasar perencanaan pemulihan daerah.</p>
              <p className="memo-highlight">Koordinator Wilayah sudah disiapkan di setiap kecamatan. Jangan ragu untuk berkonsultasi.</p>
            </div>
          </div>

          <div className="memo-signature">
            <div className="signature-line"></div>
            <div className="signature-name">Kepala BPS Provinsi</div>
          </div>
        </div>

        <div className="paper-clip"></div>
      </section>

      {/* VIEW 7: COORDINATION PHOTOS */}
      <section className="story-view view-7">
        <div className="view-header">
          <h2 className="section-title handwritten">Koordinasi Tim</h2>
        </div>

        <div className="photo-strip">
          <div className="tape-piece top"></div>
          <div className="strip-photo photo-1"></div>
          <div className="strip-photo photo-2"></div>
          <div className="strip-photo photo-3"></div>
          <div className="tape-piece bottom"></div>
          <div className="strip-caption">Briefing bersama PML & petugas BPS lokal</div>
        </div>
      </section>

      {/* VIEW 8: EQUIPMENT FLATLAY */}
      <section className="story-view view-8">
        <div className="view-header">
          <h2 className="section-title">Siap Turun Lapangan</h2>
          <p className="section-subtitle">Boots, jas hujan, HP, form digital</p>
        </div>

        <div className="flatlay-container">
          <div className="equipment-item vest" style={{ "--rotation": "-8deg", "--x": "10%", "--y": "15%" }}>
            <div className="item-image vest-img"></div>
            <div className="item-label">Rompi PKL</div>
          </div>

          <div className="equipment-item boots" style={{ "--rotation": "5deg", "--x": "60%", "--y": "20%" }}>
            <div className="item-image boots-img"></div>
            <div className="item-label">Sepatu Lapangan</div>
          </div>

          <div className="equipment-item phone" style={{ "--rotation": "-3deg", "--x": "35%", "--y": "45%" }}>
            <div className="item-image phone-img"></div>
            <div className="item-label">HP CAPI</div>
          </div>

          <div className="equipment-item raincoat" style={{ "--rotation": "7deg", "--x": "70%", "--y": "60%" }}>
            <div className="item-image raincoat-img"></div>
            <div className="item-label">Jas Hujan</div>
          </div>

          <div className="equipment-item id-card" style={{ "--rotation": "-4deg", "--x": "20%", "--y": "70%" }}>
            <div className="item-image id-img"></div>
            <div className="item-label">ID Card</div>
          </div>

          <div className="equipment-item bag" style={{ "--rotation": "2deg", "--x": "50%", "--y": "75%" }}>
            <div className="item-image bag-img"></div>
            <div className="item-label">Tas Lapangan</div>
          </div>
        </div>

        <div className="checklist-note">
          <div className="checklist-title handwritten">Checklist Lengkap! ✓</div>
        </div>
      </section>

      {/* VIEW 9-10: THE STRUGGLE - DRAGGABLE PHOTOS */}
      <section className="story-view view-9 view-10">
        <div className="view-header">
          <h2 className="section-title handwritten">Medan Tidak Mudah</h2>
          <p className="section-subtitle">Hujan, lumpur, jarak jauh - tapi tidak menyurutkan semangat</p>
        </div>

        <div className="struggle-container">
          <div className="drag-instruction handwritten">
            ← Geser foto untuk lihat yang lain →
          </div>

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
                  zIndex: photo.zIndex,
                }}
              >
                <div className="photo-placeholder" style={{ backgroundImage: `url(${photo.src})` }}>
                  <div className="photo-overlay">
                    <span className="photo-text">{photo.alt}</span>
                  </div>
                </div>
                <div className="photo-tape"></div>
              </div>
            ))}
          </div>

          <div className="struggle-caption handwritten">
            Sepatu berlumpur, hujan deras, tanjakan curam... tapi data harus tetap terkumpul!
          </div>
        </div>
      </section>

      {/* VIEW 11: QUOTES - STICKY NOTES */}
      <section className="story-view view-11">
        <div className="view-header">
          <h2 className="section-title">Di Balik Angka, Ada Cerita</h2>
          <p className="section-subtitle">Suara langsung dari responden</p>
        </div>

        <div className="quotes-wall">
          {viewData.view11.quotes.map((quote, index) => (
            <div
              key={index}
              className={`quote-sticky ${quote.sentiment}`}
              style={{
                "--rotation": `${index % 2 === 0 ? -3 + index : 3 - index}deg`,
                "--x": `${10 + index * 20}%`,
                "--y": `${15 + (index % 2) * 25}%`,
              }}
            >
              <div className="sticky-top"></div>
              <div className="quote-text">"{quote.text}"</div>
              <div className="quote-author">— {quote.name}</div>
            </div>
          ))}
        </div>

        <div className="heart-doodle"></div>
      </section>

      {/* VIEW 12: INTERVIEW MOMENT */}
      <section className="story-view view-12">
        <div className="view-header">
          <h2 className="section-title handwritten">Wawancara Pintu ke Pintu</h2>
        </div>

        <div className="interview-layout">
          <div className="interview-photo main-photo">
            <div className="photo-border"></div>
            <div className="interview-image"></div>
            <div className="photo-shadow"></div>
          </div>

          <div className="handwritten-caption">
            "Setiap rumah punya cerita. Kami dengarkan dengan hati, catat dengan teliti."
          </div>

          <div className="caption-arrow"></div>

          <div className="interview-photo secondary-photo" style={{ "--rotation": "5deg" }}>
            <div className="photo-border"></div>
            <div className="interview-image-2"></div>
          </div>
        </div>

        <div className="washi-tape horizontal"></div>
      </section>

      {/* VIEW 13: PROGRESS CHART */}
      <section className="story-view view-13">
        <div className="view-header">
          <h2 className="section-title">Update Setiap Hari</h2>
          <p className="section-subtitle">Monitoring real-time pendataan</p>
        </div>

        <div className="chart-container">
          <div className="chart-title handwritten">Target vs Realisasi</div>

          <div className="progress-chart">
            {viewData.view13.progress.map((item, index) => (
              <div key={index} className="progress-bar-container">
                <div className="progress-day">{item.day}</div>
                <div className="progress-bars">
                  <div className="progress-bar target-bar">
                    <div className="bar-label">Target: {item.target}</div>
                  </div>
                  <div className="progress-bar realisasi-bar">
                    <div
                      className="progress-fill"
                      style={{ "--width": `${item.percentage}%` }}
                    >
                      <div className="bar-label">Realisasi: {item.realisasi}</div>
                    </div>
                  </div>
                </div>
                <div className="progress-percentage">{item.percentage}%</div>
              </div>
            ))}
          </div>

          <div className="chart-note handwritten">
            Alhamdulillah, target tercapai 99% 🎉
          </div>
        </div>
      </section>

      {/* VIEW 14: SINKRONISASI */}
      <section className="story-view view-14">
        <div className="view-header">
          <h2 className="section-title">Sinkronisasi Malam Hari</h2>
          <p className="section-subtitle">Validasi & approval data</p>
        </div>

        <div className="sync-scene">
          <div className="laptop-screen">
            <div className="screen-header">
              <div className="screen-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="screen-title">Dashboard Monitoring PKL 65</div>
            </div>

            <div className="screen-content">
              <div className="data-grid">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="data-point" style={{ "--delay": `${i * 0.05}s` }}></div>
                ))}
              </div>

              <div className="sync-status">
                <div className="status-indicator syncing"></div>
                <span className="status-text">Menyinkronkan data...</span>
              </div>
            </div>
          </div>

          <div className="coffee-cup"></div>
          <div className="notebook"></div>
        </div>

        <div className="time-caption handwritten">23:47 WIB - Terakhir disinkronkan</div>
      </section>

      {/* VIEW 15: ENVELOPE CLOSING */}
      <section className="story-view view-15">
        <div className="view-header">
          <h2 className="section-title handwritten">3 Minggu yang Bermakna</h2>
          <p className="section-subtitle">Ribuan data terkumpul, ribuan cerita tersimpan</p>
        </div>

        <div className="envelope-container">
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="envelope-content">
                <h3 className="envelope-title">Data Hari Ini,</h3>
                <h3 className="envelope-title">Pemulihan Esok Hari</h3>
                <p className="envelope-message">
                  Dari 510 mahasiswa untuk Indonesia yang lebih tangguh.
                </p>
                <div className="envelope-signature">— PKL 65 STIS</div>
              </div>
            </div>
          </div>

          <div className="stamp-seal">
            <div className="seal-outer"></div>
            <div className="seal-inner">
              <div className="seal-text">PKL</div>
              <div className="seal-number">65</div>
              <div className="seal-year">2026</div>
            </div>
          </div>
        </div>

        <div className="closing-note handwritten">
          Terima kasih telah mengikuti perjalanan kami 🙏
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="story-navigation">
        <Link to="/" className="nav-button back">
          <span className="nav-icon">←</span>
          <span className="nav-text">Kembali ke Beranda</span>
        </Link>
        <Link to="/findings" className="nav-button next">
          <span className="nav-text">Lihat Hasil Temuan</span>
          <span className="nav-icon">→</span>
        </Link>
      </div>
    </div>
  );
}

export default Journey;