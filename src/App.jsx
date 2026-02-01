import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ChevronRight,
  Calendar as CalendarIcon,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Cloud,
  Apple,
  PlayCircle,
  Clock,
  MapPin,
  Smartphone,
  ShieldCheck,
  Zap
} from 'lucide-react';

import { format } from 'date-fns';
import { prayerTimes as allPrayerTimes } from './data';
import { getMinutesFromPrayer } from './utils/timeUtils';
import clsx from 'clsx';
import mockupImg from './assets/mockup.png';
import bgImg from './assets/bg.png';

const PrayerRow = ({ name, time, icon: Icon, active, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className={clsx(
      "flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
      active ? "bg-amber-400/20 border-amber-400/30" : "hover:bg-white/5 border-transparent",
      "border"
    )}
  >
    <div className="flex items-center gap-4">
      <div className={clsx(
        "p-2 rounded-xl",
        active ? "bg-amber-400 text-black" : "bg-white/10 text-white"
      )}>
        <Icon size={20} />
      </div>
      <div>
        <p className={clsx("text-sm transition-colors", active ? "text-amber-400 font-medium" : "text-white/60")}>
          {name}
        </p>
        <p className={clsx("text-lg font-semibold", active ? "text-amber-400" : "text-white")}>
          {time}
        </p>
      </div>
    </div>
    {active && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-3 py-1 bg-amber-400 text-black text-xs font-bold rounded-full uppercase tracking-wider"
      >
        Now
      </motion.div>
    )}
  </motion.div>
);

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);

  const currentMonth = format(selectedDate, 'MMMM');
  const currentDate = selectedDate.getDate();

  const displayData = allPrayerTimes.find(
    p => p.month === currentMonth && p.date === currentDate
  ) || {
    fajr: '--:--',
    sunrise: '--:--',
    dhuhr: '--:--',
    asr: '--:--',
    maghrib: '--:--',
    isha: '--:--'
  };

  useEffect(() => {
    const updateNextPrayer = () => {
      const now = new Date();
      const today = format(now, 'yyyy-MM-dd');
      const selected = format(selectedDate, 'yyyy-MM-dd');

      if (today !== selected) {
        setNextPrayer(null);
        return;
      }

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const prayers = [
        { name: 'Fajr', time: displayData.fajr },
        { name: 'Dhuhr', time: displayData.dhuhr },
        { name: 'Asr', time: displayData.asr },
        { name: 'Maghrib', time: displayData.maghrib },
        { name: 'Isha', time: displayData.isha },
      ];

      let found = false;
      for (const prayer of prayers) {
        if (getMinutesFromPrayer(prayer.time, prayer.name) > currentMinutes) {
          setNextPrayer(prayer.name);
          found = true;
          break;
        }
      }
      if (!found) setNextPrayer('Fajr');
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [selectedDate, displayData]);

  return (
    <div className="relative min-h-screen bg-[#080C14] text-white selection:bg-amber-400 selection:text-black">
      {/* Background Decor */}
      <div
        className="fixed inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#080C14]/80 to-[#080C14]" />

      {/* Navigation */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-16 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Clock className="text-black" size={24} />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight font-display">MEEQAT</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-white/70">
          <a href="#features" className="hover:text-amber-400 transition-colors uppercase tracking-widest text-xs">Features</a>
          <a href="#prayer-times" className="hover:text-amber-400 transition-colors uppercase tracking-widest text-xs">Prayer Times</a>
          <a href="#download" className="btn-primary px-6 py-3">Download App</a>
        </div>
        {/* Mobile Download Button */}
        <div className="md:hidden">
          <a href="#download" className="btn-primary px-4 py-2 text-sm">Download</a>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 md:pt-24 pb-24 md:pb-48 grid lg:grid-cols-2 gap-12 md:gap-24 items-center">


        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs md:text-sm font-bold mb-8 md:mb-12 tracking-wide uppercase">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Your Spiritual Companion
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-8 md:mb-12 font-display">
            Never miss a <span className="text-amber-400">Prayer</span> again.
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 md:mb-14 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience the most accurate prayer times app with a stunning design. Built for those who value punctuality and spiritual mindfulness.
          </p>


          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
            <a href="#" className="btn-outline w-full sm:w-auto py-4 px-8 text-base md:text-lg">
              <Apple size={24} />
              App Store
            </a>
            <a href="#" className="btn-primary w-full sm:w-auto py-4 px-8 text-base md:text-lg">
              <PlayCircle size={24} />
              Google Play
            </a>
            <a
              href="/meeqat_app.apk"
              download
              className="flex items-center gap-3 text-white/50 hover:text-amber-400 transition-colors py-2 px-4 group"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 group-hover:bg-amber-400/5">
                <Smartphone size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-none">Manual APK</p>
                <p className="text-[10px] uppercase tracking-tighter opacity-70 leading-none mt-1">Direct Install</p>
              </div>
            </a>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[450px]">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-amber-400/20 blur-3xl rounded-full z-0" />
            <img
              src={mockupImg}
              alt="Meeqat App Mockup"
              className="relative z-10 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-24 md:py-48 border-t border-white/5">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">Why Choose Meeqat?</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Designed with simplicity and precision in mind, Meeqat is more than just a prayer times app.
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {[
            {
              title: "High Accuracy",
              desc: "Based on local astronomical calculations for pinpoint precision.",
              icon: Clock
            },
            {
              title: "Elegant Design",
              desc: "A beautiful, distraction-free interface that respects your focus.",
              icon: Sunrise
            },
            {
              title: "Offline Access",
              desc: "Check prayer times even without an internet connection.",
              icon: Cloud
            },
            {
              title: "Customizable",
              desc: "Adjust times and notifications to suit your local mosque.",
              icon: MapPin
            }
          ].map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all"
            >
              <div className="w-12 h-12 bg-amber-400/10 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
                <feat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{feat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Download CTA section */}
      <section id="download" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 md:py-48">
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-400/20 rounded-[2.5rem] md:rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative glass rounded-[2.5rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-20 overflow-hidden border-amber-400/20 bg-[#0A0F1A]/80">
            {/* Abstract geometric patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-display leading-tight">
                    Elevate your <br className="hidden md:block" />
                    <span className="text-amber-400">Prayer Routine.</span>
                  </h2>
                  <p className="text-white/60 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Join a community of mindful believers. Get the most accurate timings, elegant interface, and reliable notifications.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: ShieldCheck, text: "Privacy Focused" },
                      { icon: Zap, text: "Always Updated" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-center lg:justify-start gap-2 text-white/40">
                        <item.icon size={16} className="text-amber-400/50" />
                        <span className="text-xs font-medium uppercase tracking-widest">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a href="#" className="btn-primary w-full sm:w-auto py-4 px-8 text-base group shadow-xl shadow-amber-400/10">
                      <Apple size={20} />
                      <div className="text-left">
                        <p className="text-[9px] uppercase font-bold opacity-70 leading-none">Download on</p>
                        <p className="text-sm font-bold">App Store</p>
                      </div>
                    </a>
                    <a href="#" className="btn-outline w-full sm:w-auto py-4 px-8 text-base group bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                      <PlayCircle size={20} />
                      <div className="text-left">
                        <p className="text-[9px] uppercase font-bold opacity-70 leading-none">Get it on</p>
                        <p className="text-sm font-bold">Google Play</p>
                      </div>
                    </a>

                    {/* APK Download Button */}
                    <div className="hidden sm:block w-px h-10 bg-white/10 mx-2"></div>

                    <a
                      href="/meeqat_app.apk"
                      download
                      className="flex items-center gap-3 text-white/50 hover:text-amber-400 transition-colors py-2 group"
                    >
                      <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 group-hover:bg-amber-400/5">
                        <Smartphone size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold">Manual APK</p>
                        <p className="text-[9px] uppercase tracking-tighter opacity-70 leading-none italic">Direct Install</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 hidden lg:block overflow-hidden rounded-3xl translate-x-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex justify-center"
                >
                  <img
                    src={mockupImg}
                    alt="App Preview"
                    className="w-full max-w-[320px] md:max-w-none relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* Prayer Times Section */}
      <section id="prayer-times" className="relative z-10 container mx-auto px-6 py-24 md:py-48 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-display">Live Prayer Times</h2>
              <p className="text-white/50 flex items-center gap-2">
                <MapPin size={16} />
                Showing times for Srinagar,Kashmir
              </p>
            </div>


            <div className="relative group">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl group-hover:border-amber-400/30 transition-all">
                <div className="p-3 bg-white/5 rounded-xl">
                  <CalendarIcon className="text-amber-400" size={20} />
                </div>
                <div className="pr-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Select Date</p>
                  <input
                    type="date"
                    className="bg-transparent border-none focus:ring-0 text-white font-semibold cursor-pointer outline-none"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 glass p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem]">


            <PrayerRow name="Fajr" time={displayData.fajr} icon={Cloud} index={0} active={nextPrayer === 'Fajr'} />
            <PrayerRow name="Sunrise" time={displayData.sunrise} icon={Sunrise} index={1} />
            <PrayerRow name="Dhuhr" time={displayData.dhuhr} icon={Sun} index={2} active={nextPrayer === 'Dhuhr'} />
            <PrayerRow name="Asr" time={displayData.asr} icon={Sun} index={3} active={nextPrayer === 'Asr'} />
            <PrayerRow name="Maghrib" time={displayData.maghrib} icon={Sunset} index={4} active={nextPrayer === 'Maghrib'} />
            <PrayerRow name="Isha" time={displayData.isha} icon={Moon} index={5} active={nextPrayer === 'Isha'} />
          </div>

          <div className="mt-12 text-center text-white/40 italic">
            "إِنَّ الصَّلاَةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا"
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-16 md:py-24 mt-24 md:mt-32">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">


          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <Clock className="text-black" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">MEEQAT</span>
          </div>
          <p className="text-white/40 text-sm">
            Made with ❤️ by Ibraheem Rashid Khaja
          </p>
          <div className="flex gap-6">
            <a href="https://x.com/IbraheemKhaja" className="text-white/40 hover:text-white transition-colors">Twitter</a>
            <a href="https://www.instagram.com/ibraheem.khaja/" className="text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/ibraheem-rashid-khaja-ba8a11399/" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Bottom Download Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 bg-gradient-to-t from-[#080C14] to-transparent">
        <a href="#download" className="btn-primary w-full justify-center py-4 shadow-2xl">
          Download Meeqat App
        </a>
      </div>
    </div>
  );
}

export default App;
