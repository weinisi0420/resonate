import { useState } from 'react';
import { ArrowLeft, Building2, MapPin, Navigation, Trees, ZoomIn, ZoomOut, Coffee, Store, CalendarDays, Clock, X } from 'lucide-react';

interface NeighborhoodMapTabProps {
  onBack: () => void;
  isDarkMode?: boolean;
  onOpenBookings: () => void;
}

type Destination = { x: number; y: number };
type PlaceCategory = 'Towers' | 'Facilities' | 'Food & drinks';

const mockPlaces = [
  { name: 'Tower A', x: 18, y: 24, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 6 floors', walk: 2 },
  { name: 'Tower B', x: 38, y: 19, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 8 floors', walk: 3 },
  { name: 'Tower C', x: 76, y: 26, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 8 floors', walk: 4 },
  { name: 'Maple Garden', x: 25, y: 48, kind: 'park', category: 'Facilities' as PlaceCategory, detail: 'Garden · Open daily, 6 AM – 10 PM', walk: 2 },
  { name: 'Community pool', x: 78, y: 50, kind: 'amenity', category: 'Facilities' as PlaceCategory, detail: 'Swimming pool · Booking required', walk: 5 },
  { name: 'Clubhouse', x: 61, y: 70, kind: 'amenity', category: 'Facilities' as PlaceCategory, detail: 'Community space · Booking required', walk: 3 },
  { name: 'Tower D', x: 18, y: 78, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 6 floors', walk: 3 },
  { name: 'Tower E', x: 40, y: 80, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 8 floors', walk: 4 },
  { name: 'Tower F', x: 76, y: 78, kind: 'home', category: 'Towers' as PlaceCategory, detail: 'Residential tower · 6 floors', walk: 5 },
  { name: 'Maplewood Market', x: 12, y: 61, kind: 'shop', category: 'Food & drinks' as PlaceCategory, detail: 'Neighbourhood grocery · Open until 9 PM', walk: 4 },
  { name: 'Corner Café', x: 88, y: 62, kind: 'cafe', category: 'Food & drinks' as PlaceCategory, detail: 'Coffee and light bites · Open until 8 PM', walk: 5 },
];

export function NeighborhoodMapTab({ onBack, isDarkMode = false, onOpenBookings }: NeighborhoodMapTabProps) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>('Towers');
  const [selectedPlace, setSelectedPlace] = useState<(typeof mockPlaces)[number] | null>(null);

  const placePin = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setDestination({
      x: Math.max(2, Math.min(98, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(2, Math.min(98, ((event.clientY - bounds.top) / bounds.height) * 100)),
    });
  };

  const center = { x: 50, y: 55 };
  const road = isDarkMode ? 'bg-[#343747] border-[#46495B]' : 'bg-[#DCD6CA] border-white/90';
  const tile = isDarkMode ? 'bg-[#232334] border-[#3D3A50]' : 'bg-[#F4F0E7] border-white/80';

  return (
    <div className={`fixed inset-0 z-50 flex justify-center overflow-hidden ${isDarkMode ? 'bg-[#171725]/45' : 'bg-[#2C181C]/20'}`}>
      <div className={`relative h-full w-full max-w-md overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#171725]' : 'bg-[#EDE9DF]'}`}>
      <div className="absolute inset-0 cursor-crosshair overflow-hidden" onClick={placePin} aria-label="Map. Click to choose a destination.">
        {/* Mock map tiles and orderly neighborhood blocks */}
        <div className={`absolute inset-0 transition-transform duration-300`} style={{ transform: `scale(${zoom})`, backgroundImage: isDarkMode ? 'linear-gradient(#34354a 1px, transparent 1px), linear-gradient(90deg, #34354a 1px, transparent 1px)' : 'linear-gradient(#ffffff99 1px, transparent 1px), linear-gradient(90deg, #ffffff99 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className={`absolute left-[6%] top-[16%] h-[24%] w-[37%] rounded-[38%] ${isDarkMode ? 'bg-[#25483F]' : 'bg-[#CFE2CD]'}`} style={{ backgroundImage: isDarkMode ? 'radial-gradient(#8ED4A855 1px, transparent 1.5px)' : 'radial-gradient(#67976A55 1px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
        <div className={`absolute left-[8%] top-[38%] h-10 w-[86%] border-y-[5px] ${road}`} />
        <div className={`absolute left-[8%] top-[67%] h-10 w-[86%] border-y-[5px] ${road}`} />
        <div className={`absolute left-[46%] top-[8%] h-[84%] w-10 border-x-[5px] ${road}`} />
        <div className={`absolute left-[11%] top-[8%] h-[84%] w-8 border-x-[4px] ${road}`} />
        <div className={`absolute right-[10%] top-[8%] h-[84%] w-8 border-x-[4px] ${road}`} />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M8 55 C20 51 23 59 31 54 S41 45 47 52" fill="none" stroke={isDarkMode ? '#C9C5B4' : '#FFF8E7'} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 20 C21 24 30 17 39 23" fill="none" stroke={isDarkMode ? '#C9C5B4' : '#FFF8E7'} strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {mockPlaces.map((place) => <button type="button" key={place.name} onClick={(event) => { event.stopPropagation(); setSelectedPlace(place); setActiveCategory(place.category); }} aria-label={`View ${place.name}`} className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-all duration-200 ${place.category === activeCategory ? 'scale-105 opacity-100' : 'scale-90 opacity-25 grayscale'}`} style={{ left: `${place.x}%`, top: `${place.y}%` }}>
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg ${place.kind === 'park' ? 'bg-[#639579]' : place.kind === 'home' ? 'bg-[#CB6375]' : place.kind === 'shop' ? 'bg-[#B9844C]' : place.kind === 'cafe' ? 'bg-[#9A725D]' : 'bg-[#5999A6]'}`}>{place.kind === 'park' ? <Trees className="h-4 w-4"/> : place.kind === 'shop' ? <Store className="h-4 w-4"/> : place.kind === 'cafe' ? <Coffee className="h-4 w-4"/> : <Building2 className="h-4 w-4"/>}</span>
          <span className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold shadow ${isDarkMode ? 'bg-[#211F31]/95 text-white' : 'bg-white/95 text-ink-800'}`}>{place.name}</span>
        </button>)}

        <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {destination && <path d={`M ${center.x} ${center.y} Q ${(center.x + destination.x) / 2 + 5} ${(center.y + destination.y) / 2 - 4} ${destination.x} ${destination.y}`} fill="none" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 3px #0B2E7A88)' }} />}
        </svg>

        <div className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: `${center.x}%`, top: `${center.y}%` }}>
          <span className="absolute -inset-2 animate-ping rounded-full bg-rose-400/30" />
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#CB6375] text-white shadow-xl"><MapPin className="h-5 w-5"/></span>
          <span className={`absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold shadow ${isDarkMode ? 'bg-[#211F31] text-white' : 'bg-white text-ink-900'}`}>Starting point</span>
        </div>

        {destination && <div className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full" style={{ left: `${destination.x}%`, top: `${destination.y}%` }}><MapPin className="h-9 w-9 fill-[#2563EB] text-white drop-shadow-lg"/><span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-blue-700 px-2 py-1 text-[10px] font-bold text-white shadow">Destination</span></div>}
      </div>

      <header className={`absolute left-3 right-3 top-3 z-40 flex items-center gap-3 rounded-3xl border p-3 shadow-lg backdrop-blur-md ${isDarkMode ? 'border-[#55435D] bg-[#1C1A2B]/90 text-white' : 'border-rose-100 bg-white/90 text-ink-900'}`} onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onBack} aria-label="Back home" className={`rounded-full p-2 ${isDarkMode ? 'bg-[#342840] text-[#FFB0C0]' : 'bg-rose-50 text-rose-600'}`}><ArrowLeft className="h-4 w-4"/></button>
        <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-rose-500">Maplewood</p><h1 className="font-display text-base font-black">Neighborhood map</h1></div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">Mock map</span>
      </header>

      <nav aria-label="Map place categories" className="absolute left-3 right-3 top-[6.4rem] z-40 flex gap-2 overflow-x-auto rounded-2xl border border-rose-100 bg-white/90 p-1.5 shadow-lg backdrop-blur-md" onClick={(event) => event.stopPropagation()}>
        {(['Towers', 'Facilities', 'Food & drinks'] as const).map((category) => <button key={category} type="button" onClick={() => { setActiveCategory(category); setSelectedPlace(null); }} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${activeCategory === category ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft' : 'text-ink-700/55'}`}>{category}</button>)}
      </nav>

      {selectedPlace && <section className={`absolute bottom-[4.6rem] left-3 right-3 z-40 rounded-3xl border p-4 shadow-xl backdrop-blur-md ${isDarkMode ? 'border-[#55435D] bg-[#1C1A2B]/95 text-white' : 'border-rose-100 bg-white/95 text-ink-900'}`} onClick={(event) => event.stopPropagation()} aria-live="polite">
        <div className="flex items-start gap-3"><div className="min-w-0 flex-1"><h2 className="font-display text-base font-bold">{selectedPlace.name}</h2><p className={`mt-1 text-xs ${isDarkMode ? 'text-[#D8CCDC]' : 'text-ink-700/65'}`}>{selectedPlace.detail}</p><p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#CB6375]"><Clock className="h-3.5 w-3.5"/>About {selectedPlace.walk} min walk</p></div><button type="button" aria-label="Close place details" onClick={() => setSelectedPlace(null)} className="rounded-full p-1 text-ink-700/50"><X className="h-4 w-4"/></button></div>
        {selectedPlace.category === 'Facilities' && selectedPlace.name !== 'Maple Garden' && <button type="button" onClick={onOpenBookings} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-4 py-2.5 text-xs font-bold text-white shadow-soft"><CalendarDays className="h-4 w-4"/>Book this space</button>}
      </section>}

      <div className={`absolute bottom-5 left-3 z-40 max-w-[65%] rounded-2xl px-3 py-2 text-[11px] font-semibold shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-[#211F31]/90 text-[#E6D8EB]' : 'bg-white/90 text-ink-700/75'}`} onClick={(event) => event.stopPropagation()}>
        {destination ? <span className="flex items-center gap-1.5"><Navigation className="h-3.5 w-3.5 text-blue-600"/>Blue route ready · Click map to change destination</span> : 'Click anywhere to choose a destination'}
      </div>
      <div className={`absolute bottom-5 right-3 z-40 flex items-center gap-1 rounded-full p-1 shadow-lg ${isDarkMode ? 'bg-[#211F31]/95' : 'bg-white/95'}`} onClick={(event) => event.stopPropagation()}>
        <button onClick={() => setZoom((value) => Math.max(.8, Number((value - .1).toFixed(1))))} aria-label="Zoom out" className="rounded-full p-2 text-rose-600"><ZoomOut className="h-4 w-4"/></button>
        <span className={`min-w-8 text-center text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-ink-700'}`}>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom((value) => Math.min(1.5, Number((value + .1).toFixed(1))))} aria-label="Zoom in" className="rounded-full p-2 text-rose-600"><ZoomIn className="h-4 w-4"/></button>
      </div>
      </div>
    </div>
  );
}
