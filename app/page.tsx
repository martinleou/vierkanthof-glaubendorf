"use client";

import React, { useState } from 'react';
import { 
  Home, Users, Bath, Droplet, TreePine, MapPin, Phone, Mail, 
  Calendar, ArrowRight, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein"),
  date: z.string().optional(),
  message: z.string().min(10, "Bitte schreiben Sie eine kurze Nachricht"),
});

type ContactForm = z.infer<typeof contactSchema>;

// Beautiful, authentic German copy inspired by premium Willhaben listings
const emotionalText = `Inmitten der sanften Hügel des Weinviertels, nur 40 Minuten von Wien entfernt, erwartet Sie ein außergewöhnliches Juwel: Ein vollständig renovierter historischer Vierkanthof, der die Seele alter österreichischer Landarchitektur mit modernem Wohnkomfort verbindet.

Dieses einzigartige Anwesen wurde mit außergewöhnlicher Sorgfalt und Respekt vor der Geschichte wiederbelebt. Die dicken Natursteinmauern, die beeindruckenden Gewölbe und der große offene Kamin erzählen Geschichten aus vergangenen Jahrhunderten – während großzügige, lichtdurchflutete Räume, ein privater Pool und eine separate Gästewohnung im Atelier zeitgemäßen Luxus bieten.

Der idyllische Innenhof mit seiner alten Kastanie lädt zum Verweilen ein. Die große Scheune bietet vielfältige Nutzungsmöglichkeiten – ob als Eventlocation, Atelier oder für Pferdehaltung. Hier finden Sie nicht nur ein Zuhause, sondern einen Ort der Ruhe, Inspiration und Geborgenheit.`;

// Property highlights
const highlights = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Offener Kamin",
    description: "Großer, originaler Kamin im Wohnbereich – das Herzstück an kühlen Abenden."
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    title: "Natursteingewölbe",
    description: "Beeindruckende historische Gewölbe aus Naturstein – einzigartiges architektonisches Erbe."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Atelier & Gästewohnung",
    description: "Separates Studio mit eigenem Bad – ideal für Gäste, Homeoffice oder kreatives Arbeiten."
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Große Scheune",
    description: "Historische Scheune mit enormem Potenzial – für Events, Pferde oder als Werkstatt."
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Idyllischer Innenhof",
    description: "Geschützter, von alten Mauern umgebener Innenhof mit alter Kastanie und Sitzplätzen."
  },
  {
    icon: <Droplet className="w-6 h-6" />,
    title: "Privater Pool",
    description: "Erfrischender Außenpool mit Liegewiese – perfekte Entspannung im eigenen Grün."
  },
];

// Real photos provided by the user – optimized local images from public/images
const galleryImages = [
  { 
    id: 1, 
    url: "/images/gallery-1.jpg", 
    alt: "Historischer Vierkanthof mit geschütztem Innenhof und alter Kastanie in Glaubendorf", 
    caption: "Historischer Vierkanthof mit geschütztem Innenhof und alter Kastanie" 
  },
  { 
    id: 2, 
    url: "/images/gallery-2.jpg", 
    alt: "Wohnzimmer mit großem offenem Kamin im renovierten historischen Vierkanthof", 
    caption: "Wohnzimmer mit großem offenem Kamin" 
  },
  { 
    id: 3, 
    url: "/images/gallery-3.jpg", 
    alt: "Privater Pool mit sonniger Liegewiese im idyllischen Garten des Anwesens", 
    caption: "Privater Pool mit sonniger Liegewiese" 
  },
  { 
    id: 4, 
    url: "/images/gallery-4.jpg", 
    alt: "Hochwertige Küche in historischem Ambiente des renovierten Vierkanthofs", 
    caption: "Hochwertige Küche in historischem Ambiente" 
  },
  { 
    id: 5, 
    url: "/images/gallery-5.jpg", 
    alt: "Helles Wohnzimmer mit großzügigen Fensterfronten und sichtbaren Holzelementen", 
    caption: "Helles Wohnzimmer mit großzügigen Fensterfronten und sichtbaren Holzelementen" 
  },
  { 
    id: 6, 
    url: "/images/gallery-6.jpg", 
    alt: "Masterbedroom mit beeindruckendem historischem Natursteingewölbe", 
    caption: "Masterbedroom mit beeindruckendem historischem Natursteingewölbe" 
  },
  { 
    id: 7, 
    url: "/images/gallery-7.jpg", 
    alt: "Elegantes Bad en Suite mit freistehender Badewanne im historischen Ambiente", 
    caption: "Elegantes Bad en Suite mit freistehender Badewanne" 
  },
  { 
    id: 8, 
    url: "/images/gallery-8.jpg", 
    alt: "Zweites von drei geräumigen Schlafzimmern im Vierkanthof", 
    caption: "Zweites von 3 geräumigen Schlafzimmern" 
  },
  { 
    id: 9, 
    url: "/images/gallery-9.jpg", 
    alt: "Atelier und separates Gästehaus des renovierten historischen Anwesens", 
    caption: "Atelier und separates Gästehaus" 
  },
  { 
    id: 10, 
    url: "/images/gallery-10.jpg", 
    alt: "Wohnzimmer des Gästehauses direkt am Pool mit elegantem Interieur", 
    caption: "Wohnzimmer des Gästehauses am Pool" 
  },
  { 
    id: 11, 
    url: "/images/gallery-11.jpg", 
    alt: "Badezimmer des Gästehauses mit stilvoller Ausstattung", 
    caption: "Badezimmer des Gästehauses" 
  },
  { 
    id: 12, 
    url: "/images/gallery-12.jpg", 
    alt: "Großzügige Scheune mit vielseitigen Nutzungsmöglichkeiten auf dem Anwesen", 
    caption: "Großzügige Scheune mit vielseitigen Nutzungsmöglichkeiten" 
  },
];

// Key facts
const keyFacts = [
  { icon: <Home className="w-5 h-5" />, label: "Wohnfläche", value: "240,11 m²" },
  { icon: <Users className="w-5 h-5" />, label: "Zimmer", value: "6" },
  { icon: <Home className="w-5 h-5" />, label: "Schlafzimmer", value: "4" },
  { icon: <Bath className="w-5 h-5" />, label: "Badezimmer", value: "3" },
  { icon: <Droplet className="w-5 h-5" />, label: "Pool", value: "Ja" },
  { icon: <TreePine className="w-5 h-5" />, label: "Grundstück", value: "4.375 m²" },
];

export default function VierkanthofGlaubendorf() {
  const [LightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Open lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'visible';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation in lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!LightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [LightboxOpen]);

  // Contact form submission — posts to /api/contact, which emails the owner
  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Senden fehlgeschlagen.');
      }

      toast.success("Vielen Dank für Ihre Anfrage!", {
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen, um einen Besichtigungstermin zu vereinbaren.",
        duration: 6000,
      });

      reset();
    } catch (error) {
      toast.error("Ihre Anfrage konnte nicht gesendet werden.", {
        description: error instanceof Error ? error.message : "Bitte versuchen Sie es später erneut.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2C2522]">
      {/* Elegant Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#D4C9B8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#9C5C3B] flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold tracking-[-0.5px] text-xl">Vierkanthof Glaubendorf</div>
              <div className="text-[10px] text-[#8A7F75] -mt-1">Weinviertel • Österreich</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-[0.5px]">
            <a href="#highlights" className="hover:text-[#9C5C3B] transition-colors">Highlights</a>
            <a href="#galerie" className="hover:text-[#9C5C3B] transition-colors">Galerie</a>
            <a href="#lage" className="hover:text-[#9C5C3B] transition-colors">Lage</a>
            <a href="#contact" className="hover:text-[#9C5C3B] transition-colors">Kontakt</a>
          </div>

          <button 
            onClick={scrollToContact}
            className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium tracking-[0.3px] flex items-center gap-2"
          >
            Besichtigung vereinbaren
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[100dvh] min-h-[680px] flex items-center justify-center pt-20 overflow-hidden">
        {/* Hero Background Image - using real photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/hero.jpg')` 
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center text-white">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs tracking-[2px] mb-6 border border-white/20">
            WEINVIERTEL • NUR 40 MINUTEN VON WIEN
          </div>

          <h1 className="hero-title text-6xl md:text-7xl lg:text-[82px] leading-[0.96] font-medium tracking-[-2.5px] mb-4 serif">
            Einmalige<br />Gelegenheit
          </h1>
          
          <p className="text-2xl md:text-3xl tracking-[-0.5px] text-white/90 mb-3">
            Renovierter historischer Vierkanthof
          </p>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-md mx-auto">
            3704 Glaubendorf • € 1.290.000
          </p>

          <button 
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 bg-white text-[#2C2522] px-10 py-4 rounded-full text-base font-medium tracking-[0.5px] hover:bg-[#F8F5F0] transition-all active:scale-[0.985]"
          >
            BESICHTIGUNGSTERMIN VEREINBAREN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 text-xs tracking-[2px]">
          <div>SCROLLEN</div>
          <div className="h-px w-6 bg-white/40 my-2" />
        </div>
      </section>

      {/* KEY FACTS BAR */}
      <div className="border-b border-[#D4C9B8] bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8">
          {keyFacts.map((fact, index) => (
            <div key={index} className="fact-item flex items-center gap-4 px-2">
              <div className="text-[#9C5C3B] flex-shrink-0">
                {fact.icon}
              </div>
              <div>
                <div className="text-sm text-[#8A7F75]">{fact.label}</div>
                <div className="font-semibold text-xl tracking-tight">{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EMOTIONAL DESCRIPTION */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="text-[#9C5C3B] text-xs tracking-[3px] mb-3">EIN ORT MIT GESCHICHTE</div>
        <h2 className="serif text-5xl leading-none tracking-[-1.5px] mb-10">
          Wo Geschichte<br />auf Lebensqualität trifft.
        </h2>
        
        <div className="text-[17px] leading-relaxed text-[#3D2B1F] max-w-2xl mx-auto whitespace-pre-line">
          {emotionalText}
        </div>
        
        <div className="mt-10 text-sm text-[#8A7F75]">
          Besichtigung nur nach vorheriger Terminvereinbarung
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section id="galerie" className="bg-white py-16 border-y border-[#D4C9B8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[#9C5C3B] text-xs tracking-[3px] mb-1">AUSGEWÄHLTE ANSICHTEN</div>
              <h3 className="serif text-5xl tracking-[-1.5px]">Galerie</h3>
            </div>
            <p className="hidden md:block max-w-xs text-[#5C5149] text-sm">
              Klicken Sie auf die Bilder, um sie in voller Größe zu betrachten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id} 
                onClick={() => openLightbox(index)}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#EDE4D8]"
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="gallery-img absolute inset-0 w-full h-full object-cover"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-sm font-medium tracking-tight pr-8">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL HIGHLIGHTS */}
      <section id="highlights" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-[#9C5C3B] text-xs tracking-[3px] mb-2">BESONDERE MERKMALE</div>
          <h3 className="serif text-6xl tracking-[-1.8px]">Was dieses Anwesen<br />auszeichnet</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="highlight-card bg-white p-9 rounded-3xl group"
            >
              <div className="text-[#9C5C3B] mb-6 transition group-hover:scale-110">
                {highlight.icon}
              </div>
              <h4 className="font-semibold text-2xl tracking-tight mb-3">{highlight.title}</h4>
              <p className="text-[#5C5149] leading-relaxed text-[15px]">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section id="lage" className="bg-white py-16 border-y border-[#D4C9B8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-x-16 gap-y-10 items-center">
            <div className="md:col-span-2">
              <div className="text-[#9C5C3B] text-xs tracking-[3px] mb-3">PERFEKTE LAGE</div>
              <h3 className="serif text-6xl tracking-[-1.5px] leading-none mb-6">
                Weinviertel.<br />Glaubendorf.
              </h3>
              <div className="space-y-4 text-[#3D2B1F] text-[15px] leading-relaxed pr-4">
                <p>
                  Nur 40 Minuten von Wien entfernt, im Herzen des Weinviertels gelegen. 
                  Die ruhige Lage in Glaubendorf bietet absolute Privatsphäre und gleichzeitig 
                  hervorragende Anbindung an die Hauptstadt.
                </p>
                <p>
                  Genießen Sie die sanfte Hügellandschaft, exzellente Weingüter in unmittelbarer 
                  Nähe und die hohe Lebensqualität der Region.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-[#9C5C3B]">
                <MapPin className="w-4 h-4" /> 3704 Glaubendorf, Niederösterreich
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="md:col-span-3">
              <div className="map-container rounded-3xl overflow-hidden shadow-sm aspect-video md:aspect-auto md:h-[420px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13288.5!2d15.85!3d48.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d3c8f8f8f8f8f%3A0x1234567890abcdef!2s3704%20Glaubendorf%2C%20%C3%96sterreich!5e0!3m2!1sde!2sat!4v1700000000000"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lageplan Vierkanthof Glaubendorf"
                />
              </div>
              <p className="text-xs text-[#8A7F75] mt-3 text-center md:text-left">
                Die genaue Adresse wird nach Vereinbarung eines Besichtigungstermins mitgeteilt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-[#9C5C3B] text-xs tracking-[3px] mb-3">NÄCHSTER SCHRITT</div>
          <h3 className="serif text-6xl tracking-[-1.5px]">Vereinbaren Sie einen Besichtigungstermin</h3>
          <p className="mt-4 text-[#5C5149] max-w-md mx-auto">
            Lassen Sie sich dieses außergewöhnliche Anwesen in Ruhe zeigen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-[#9C5C3B] tracking-widest mb-2">IHRE ANSPRECHPERSON</div>
              <div className="text-4xl tracking-tight font-medium">Leo Uvizl</div>
            </div>
            <a href="tel:+436643000876" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-5 h-5 text-[#9C5C3B]" />
              </div>
              <div>
                <div className="text-sm text-[#8A7F75]">Telefon</div>
                <div className="font-medium text-lg group-hover:text-[#9C5C3B] transition-colors">+43 664 300 0876</div>
              </div>
            </a>
            <a href="mailto:uvizleo@msn.com" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail className="w-5 h-5 text-[#9C5C3B]" />
              </div>
              <div>
                <div className="text-sm text-[#8A7F75]">E-Mail</div>
                <div className="font-medium text-lg group-hover:text-[#9C5C3B] transition-colors">uvizleo@msn.com</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 text-[#9C5C3B]" />
              </div>
              <div>
                <div className="text-sm text-[#8A7F75]">Adresse</div>
                <div className="font-medium text-lg">3704 Glaubendorf, Niederösterreich</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-3xl shadow-sm space-y-5">
            <div>
              <label className="block text-sm text-[#8A7F75] mb-1">Name *</label>
              <input
                {...register('name')}
                className="w-full border border-[#D4C9B8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#9C5C3B]"
                placeholder="Ihr Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#8A7F75] mb-1">E-Mail *</label>
              <input
                {...register('email')}
                type="email"
                className="w-full border border-[#D4C9B8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#9C5C3B]"
                placeholder="ihre@email.at"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#8A7F75] mb-1">Telefon *</label>
              <input
                {...register('phone')}
                className="w-full border border-[#D4C9B8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#9C5C3B]"
                placeholder="+43 ..."
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#8A7F75] mb-1">Gewünschtes Datum</label>
              <input
                {...register('date')}
                type="date"
                className="w-full border border-[#D4C9B8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#9C5C3B]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8A7F75] mb-1">Nachricht *</label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full border border-[#D4C9B8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#9C5C3B]"
                placeholder="Ihre Nachricht..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 rounded-full font-medium tracking-[0.3px] disabled:opacity-60"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#D4C9B8] py-10 text-center text-sm text-[#8A7F75]">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Vierkanthof Glaubendorf • Alle Rechte vorbehalten
        </div>
      </footer>

      <AnimatePresence>
        {LightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white" onClick={closeLightbox}><X className="w-8 h-8" /></button>
            <button className="absolute left-4 text-white" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}><ChevronLeft className="w-10 h-10" /></button>
            <img src={galleryImages[currentImageIndex].url} alt={galleryImages[currentImageIndex].alt} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 text-white" onClick={(e) => { e.stopPropagation(); goToNext(); }}><ChevronRight className="w-10 h-10" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
