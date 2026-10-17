import { useRef, useState } from 'react';
import {
  ArrowLeft, Building2, CalendarDays, Coffee, Dog, Dumbbell, MapPin,
  MessageCircle, Navigation, ShoppingBag, Sparkles, Trees, UsersRound,
  Waves, X, ZoomIn, ZoomOut, Bookmark,
} from 'lucide-react';

interface NeighborhoodMapTabProps {
  onBack: () => void;
  isDarkMode?: boolean;
  onNavigate?: (destination: 'facilities' | 'market' | 'friends') => void;
}

type Place = {
  name: string;
  kind: 'Homes' | 'Park' | 'Amenity' | 'Facility' | 'Shop';
  x: number;
  y: number;
  color: string;
  icon: 'home' | 'park' | 'shop' | 'facility' | 'pool' | 'cafe' | 'dog' | 'playground';
};

const places: Place[] = [
  { name: 'Tower A · Units 1–8', kind: 'Homes', x: 150, y: 110, color: '#81B49F', icon: 'home' },
  { name: 'Tower B · Units 1–8', kind: 'Homes', x: 385, y: 110, color: '#CB6375', icon: 'home' },
  { name: 'Tower C · Units 1–8', kind: 'Homes', x: 655, y: 110, color: '#D79E78', icon: 'home' },
  { name: 'Tower D · Units 1–8', kind: 'Homes', x: 150, y: 650, color: '#8FA8C5', icon: 'home' },
  { name: 'Tower E · Units 1–8', kind: 'Homes', x: 385, y: 650, color: '#B88FB9', icon: 'home' },
  { name: 'Tower F · Units 1–8', kind: 'Homes', x: 655, y: 650, color: '#81B49F', icon: 'home' },
  { name: 'Maple Garden', kind: 'Park', x: 280, y: 300, color: '#639579', icon: 'park' },
  { name: 'Dog park', kind: 'Amenity', x: 365, y: 335, color: '#6E9C68', icon: 'dog' },
  { name: 'Playground', kind: 'Amenity', x: 205, y: 405, color: '#75A06F', icon: 'playground' },
  { name: 'Community pool', kind: 'Amenity', x: 665, y: 365, color: '#5999A6', icon: 'pool' },
  { name: 'Clubhouse & gym', kind: 'Facility', x: 535, y: 570, color: '#CB6375', icon: 'facility' },
  { name: 'Maplewood Market', kind: 'Shop', x: 245, y: 850, color: '#B47A43', icon: 'shop' },
  { name: 'Corner café', kind: 'Shop', x: 665, y: 850, color: '#9D7156', icon: 'cafe' },
];

type Category = 'Homes' | 'Amenities' | 'Facilities & shops';

export function NeighborhoodMapTab({ onBack, isDarkMode = false, onNavigate }: NeighborhoodMapTabProps) {
  const [offset, setOffset] = useState({ x: -140, y: -136 });
  const [zoom, setZoom] = useState(1.3);
  const [category, setCategory] = useState<Category>('Amenities');
  const [selected, setSelected] = useState<Place | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const currentLocation = { x: 450, y: 485 };

  const matchesCategory = (place: Place) => {
    if (category === 'Homes') return place.kind === 'Homes';
    if (category === 'Amenities') return place.kind === 'Amenity' || place.kind === 'Park';
    return place.kind === 'Facility' || place.kind === 'Shop';
  };
  const visiblePlaces = places.filter(matchesCategory);
  const distanceTo = (place: Place) => Math.round((Math.abs(currentLocation.x - place.x) + Math.abs(currentLocation.y - place.y)) * 0.42);
  const minutesTo = (place: Place) => Math.max(1, Math.round(distanceTo(place) / 80));

  const centerPlace = (place: Place) => {
    setSelected(place);
    const width = mapRef.current?.clientWidth ?? 448;
    const height = mapRef.current?.clientHeight ?? 560;
    setOffset({
      x: Math.min(0, Math.max(width - 900 * zoom, width / 2 - place.x * zoom)),
      y: Math.min(0, Math.max(height - 1080 * zoom, height / 2 - place.y * zoom)),
    });
  };

  const changeZoom = (nextZoom: number) => {
    const width = mapRef.current?.clientWidth ?? 448;
    const height = mapRef.current?.clientHeight ?? 560;
    const centerX = (width / 2 - offset.x) / zoom;
    const centerY = (height / 2 - offset.y) / zoom;
    setOffset({
      x: Math.min(0, Math.max(width - 900 * nextZoom, width / 2 - centerX * nextZoom)),
      y: Math.min(0, Math.max(height - 1080 * nextZoom, height / 2 - centerY * nextZoom)),
    });
    setZoom(nextZoom);
  };

  const iconFor = (place: Place) => {
    switch (place.icon) {
      case 'park': return <Trees className="h-4 w-4"/>;
      case 'dog': return <Dog className="h-4 w-4"/>;
      case 'playground': return <Sparkles className="h-4 w-4"/>;
      case 'shop': return <ShoppingBag className="h-4 w-4"/>;
      case 'facility': return <Dumbbell className="h-4 w-4"/>;
      case 'pool': return <Waves className="h-4 w-4"/>;
      case 'cafe': return <Coffee className="h-4 w-4"/>;
      default: return <Building2 className="h-4 w-4"/>;
    }
  };

  const mapSurface = isDarkMode ? 'border-[#58405A] bg-[#191A27]' : 'border-rose-100 bg-[#F3EEE4]';
  const lightRoad = isDarkMode ? 'border-[#373B49] bg-[#2A2E3B]' : 'border-white/90 bg-[#DDD5C8]';
  const parkGround = isDarkMode ? 'border-[#477763] bg-[#26483F]' : 'border-[#B7D3B4] bg-[#D6E8D7]';

  return (
    <section className="space-y-4 animate-fade-in pb-16">
      <header className={`flex items-center gap-3 rounded-4xl border p-4 shadow-soft ${isDarkMode ? 'border-[#58405A] bg-[#1D1B2A]' : 'border-rose-100 bg-white/90'}`}>
        <button onClick={onBack} aria-label="Back home" className={`rounded-full p-2 ${isDarkMode ? 'bg-[#342840] text-[#FFB0C0]' : 'bg-rose-50 text-rose-600'}`}><ArrowLeft className="h-4 w-4"/></button>
        <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-rose-500">Maplewood</p><h1 className={`font-display text-xl font-black ${isDarkMode ? 'text-[#FFF8FE]' : 'text-ink-900'}`}>Neighborhood map</h1></div>
      </header>

      <div className={`grid grid-cols-3 gap-1 rounded-2xl border p-1 shadow-soft ${isDarkMode ? 'border-[#58405A] bg-[#282236]' : 'border-rose-100 bg-white'}`} role="tablist" aria-label="Places on the map">
        {(['Homes', 'Amenities', 'Facilities & shops'] as const).map((item) => <button key={item} role="tab" aria-selected={category === item} onClick={() => { setCategory(item); setSelected(null); }} className={`rounded-xl px-2 py-2.5 text-[10px] font-bold transition-all ${category === item ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white' : isDarkMode ? 'text-[#E6D8EB]' : 'text-ink-700/70'}`}>{item}</button>)}
      </div>

      <div ref={mapRef} className={`relative h-[560px] overflow-hidden rounded-4xl border shadow-soft ${mapSurface}`} aria-label="Draggable residential area map" style={{ touchAction: 'none', cursor: drag.current ? 'grabbing' : 'grab' }} onPointerDown={(event) => { drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (drag.current) setOffset({ x: drag.current.ox + event.clientX - drag.current.x, y: drag.current.oy + event.clientY - drag.current.y }); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <div className={`absolute left-0 top-0 h-[1080px] w-[900px] origin-top-left ${drag.current ? '' : 'transition-transform duration-200'}`} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}>
          {/* Straight, evenly spaced streets form residential blocks. */}
          {[78, 500, 840].map((left) => <div key={`v-${left}`} className={`absolute top-[-40px] h-[1160px] w-10 border-x-[5px] ${lightRoad}`} style={{ left }}><span className={`absolute inset-y-0 left-1/2 border-l border-dashed ${isDarkMode ? 'border-[#A3A7B566]' : 'border-white/70'}`}/></div>)}
          {[180, 520, 870].map((top) => <div key={`h-${top}`} className={`absolute left-[-40px] h-10 w-[980px] border-y-[5px] ${lightRoad}`} style={{ top }}><span className={`absolute inset-x-0 top-1/2 border-t border-dashed ${isDarkMode ? 'border-[#A3A7B566]' : 'border-white/70'}`}/></div>)}

          {/* Central park with textured lawn and two tidy looping paths. */}
          <div className={`absolute left-[110px] top-[190px] h-[275px] w-[360px] rotate-[-8deg] rounded-[42%] border ${parkGround}`} style={{ backgroundImage: isDarkMode ? 'radial-gradient(#8ED4A855 1.2px, transparent 1.4px), radial-gradient(#8ED4A833 1px, transparent 1.2px)' : 'radial-gradient(#5D936340 1.2px, transparent 1.4px), radial-gradient(#5D936325 1px, transparent 1.2px)', backgroundSize: '12px 12px, 19px 19px', backgroundPosition: '0 0, 6px 8px' }}/>
          <svg className="pointer-events-none absolute left-[110px] top-[190px] z-[2] h-[275px] w-[360px]" viewBox="0 0 360 275" fill="none">
            <path d="M22 189 C74 136 108 228 155 166 S241 97 328 138" stroke={isDarkMode ? '#D8CBA8' : '#F7F0D9'} strokeWidth="13" strokeLinecap="round"/>
            <path d="M62 54 C113 91 165 54 203 102 S281 209 338 204" stroke={isDarkMode ? '#D8CBA8' : '#F7F0D9'} strokeWidth="11" strokeLinecap="round"/>
            <path d="M22 189 C74 136 108 228 155 166 S241 97 328 138" stroke={isDarkMode ? '#BBAF91' : '#E5D8B9'} strokeWidth="1.5" strokeDasharray="3 5"/>
            <path d="M62 54 C113 91 165 54 203 102 S281 209 338 204" stroke={isDarkMode ? '#BBAF91' : '#E5D8B9'} strokeWidth="1.5" strokeDasharray="3 5"/>
          </svg>
          <div className={`absolute left-[530px] top-[880px] h-36 w-48 rounded-[45%] ${isDarkMode ? 'bg-[#26483F]' : 'bg-[#D6E8D7]'}`}/>

          {/* Warm path lights are soft by day and glow after dark. */}
          {([['216px','266px'], ['315px','295px'], ['412px','323px'], ['177px','368px'], ['347px','408px']] as const).map(([left, top], index) => <span key={index} className={`absolute z-[3] h-2.5 w-2.5 rounded-full border-2 ${isDarkMode ? 'border-[#FFE2A3] bg-[#FFF3BD] shadow-[0_0_8px_3px_#FFD56A99]' : 'border-white bg-[#E5B55C] shadow-[0_1px_4px_#43372866]'}`} style={{ left, top }}/>) }

          {selected && <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"><path d={`M ${currentLocation.x} ${currentLocation.y} L ${currentLocation.x} ${selected.y} L ${selected.x} ${selected.y}`} fill="none" stroke={isDarkMode ? '#FF9FB7' : '#CB6375'} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 10" style={isDarkMode ? { filter: 'drop-shadow(0 0 8px #FF8FAA)' } : undefined}/><circle cx={selected.x} cy={selected.y} r="13" fill={isDarkMode ? '#FF9FB7' : '#CB6375'} stroke={isDarkMode ? '#211C30' : 'white'} strokeWidth="6"/></svg>}

          {places.map((place) => <button key={place.name} onClick={(event) => { event.stopPropagation(); centerPlace(place); }} className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 ${matchesCategory(place) ? '' : 'opacity-45'}`} style={{ left: place.x, top: place.y }} aria-label={`${place.kind}: ${place.name}`}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-soft ${isDarkMode && place.name === 'Playground' ? 'ring-2 ring-[#FFF3BD] animate-pulse-soft' : ''}`} style={{ backgroundColor: place.color, boxShadow: isDarkMode ? `0 0 0 2px #30233F, 0 0 ${place.name === 'Playground' ? 28 : 17}px ${place.color}B0, 0 6px 12px #08071099` : '0 6px 12px #21172530' }}>{iconFor(place)}</span>
            <span className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold shadow-soft ${isDarkMode ? 'bg-[#292438]/95 text-[#FFF8FE]' : 'bg-white/95 text-ink-800'}`}>{place.name.split(' · ')[0]}</span>
          </button>)}
          <div className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[#CB6375] px-3 py-2 text-[10px] font-bold text-white shadow-soft" style={{ left: currentLocation.x, top: currentLocation.y }}><MapPin className="h-3.5 w-3.5"/>You are here</div>
        </div>

        {selected && <div onPointerDown={(event) => event.stopPropagation()} className={`absolute left-3 top-3 z-20 w-[min(270px,calc(100%-24px))] rounded-3xl border p-3.5 shadow-soft-lg backdrop-blur-xl ${isDarkMode ? 'border-[#704D68] bg-[#211C30]/95 text-[#FFF8FE]' : 'border-rose-100 bg-white/95 text-ink-900'}`}>
          <div className="flex items-start gap-2.5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-soft" style={{ backgroundColor: selected.color, boxShadow: isDarkMode ? `0 0 16px ${selected.color}A0` : undefined }}>{iconFor(selected)}</span><div className="min-w-0 flex-1"><p className="text-[9px] font-bold uppercase tracking-wider text-rose-500">{selected.kind}</p><h3 className="text-xs font-bold leading-snug">{selected.name}</h3><p className={`mt-1 text-[10px] ${isDarkMode ? 'text-[#D8CCDF]' : 'text-ink-700/60'}`}>{selected.name === 'Maple Garden' ? 'Community park · Walking paths, lawns & play areas' : selected.name === 'Dog park' ? 'Off-leash area · Open to residents' : selected.name === 'Playground' ? 'Play area · Beside Maple Garden' : selected.kind === 'Homes' ? 'Residential building · Maplewood' : selected.kind === 'Shop' ? 'Neighborhood shop · Nearby' : 'Community facility · Open to residents'}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close place details" className="rounded-full p-1"><X className="h-3.5 w-3.5"/></button></div>
          <div className="mt-3 flex gap-2"><button type="button" onClick={() => centerPlace(selected)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-2 py-2 text-[10px] font-bold text-white"><Navigation className="h-3.5 w-3.5"/>Route · {minutesTo(selected)} min</button>
            {selected.kind === 'Facility' ? <button type="button" onClick={() => onNavigate?.('facilities')} className="flex items-center gap-1 rounded-xl bg-rose-50 px-2 py-2 text-[10px] font-bold text-rose-600"><CalendarDays className="h-3.5 w-3.5"/>Bookings</button> : selected.kind === 'Shop' ? <button type="button" onClick={() => onNavigate?.('market')} className="flex items-center gap-1 rounded-xl bg-rose-50 px-2 py-2 text-[10px] font-bold text-rose-600"><ShoppingBag className="h-3.5 w-3.5"/>Market</button> : selected.kind === 'Homes' ? <button type="button" onClick={() => onNavigate?.('friends')} className="flex items-center gap-1 rounded-xl bg-rose-50 px-2 py-2 text-[10px] font-bold text-rose-600"><UsersRound className="h-3.5 w-3.5"/>Residents</button> : <button type="button" onClick={() => setSavedPlaces((items) => items.includes(selected.name) ? items.filter((name) => name !== selected.name) : [...items, selected.name])} className="flex items-center gap-1 rounded-xl bg-rose-50 px-2 py-2 text-[10px] font-bold text-rose-600"><Bookmark className="h-3.5 w-3.5"/>{savedPlaces.includes(selected.name) ? 'Saved' : 'Save place'}</button>}
          </div>
        </div>}

        <div className={`pointer-events-none absolute bottom-3 left-3 rounded-2xl px-3 py-2 text-[10px] font-semibold shadow-soft ${isDarkMode ? 'bg-[#211C30]/90 text-[#E6D8EB]' : 'bg-white/90 text-ink-700/70'}`}>Drag to explore · Tap a marker for details</div>
        <div className={`absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full p-1 shadow-soft ${isDarkMode ? 'bg-[#292438]/95' : 'bg-white/95'}`} onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" onClick={() => changeZoom(Math.max(0.6, Number((zoom - 0.2).toFixed(1))))} disabled={zoom <= 0.6} aria-label="Zoom out to see more of the neighborhood" className="rounded-full p-2 text-rose-600 disabled:opacity-35"><ZoomOut className="h-4 w-4"/></button>
          <span className={`min-w-9 text-center text-[10px] font-bold ${isDarkMode ? 'text-[#FFF8FE]' : 'text-ink-700'}`}>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => changeZoom(Math.min(1.6, Number((zoom + 0.2).toFixed(1))))} disabled={zoom >= 1.6} aria-label="Zoom in for a closer map view" className="rounded-full p-2 text-rose-600 disabled:opacity-35"><ZoomIn className="h-4 w-4"/></button>
        </div>
      </div>

      <section className="space-y-2"><h2 className={`px-1 font-display text-sm font-bold ${isDarkMode ? 'text-[#FFF8FE]' : 'text-ink-900'}`}>{category} <span className={`font-sans text-xs font-medium ${isDarkMode ? 'text-[#D8CCDF]' : 'text-ink-700/50'}`}>· {visiblePlaces.length} places</span></h2><div className="space-y-2">{visiblePlaces.map((place) => <button key={place.name} onClick={() => centerPlace(place)} className={`flex w-full items-center gap-3 rounded-3xl border p-3 text-left shadow-soft transition-all ${isDarkMode ? 'border-[#58405A] bg-[#282236]' : 'border-rose-100 bg-white'} ${selected?.name === place.name ? 'ring-2 ring-rose-400' : ''}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-soft" style={{ backgroundColor: place.color, boxShadow: isDarkMode ? `0 0 12px ${place.color}90` : undefined }}>{iconFor(place)}</span><span className="min-w-0 flex-1"><span className={`block text-xs font-bold ${isDarkMode ? 'text-[#FFF8FE]' : 'text-ink-900'}`}>{place.name}</span><span className={`text-[10px] ${isDarkMode ? 'text-[#D8CCDF]' : 'text-ink-700/55'}`}>{place.kind}</span></span><span className="text-right"><span className="block text-[10px] font-bold text-rose-500">{minutesTo(place)} min</span><span className={`text-[9px] ${isDarkMode ? 'text-[#D8CCDF]' : 'text-ink-700/50'}`}>walk · {distanceTo(place)} m</span></span></button>)}</div></section>
    </section>
  );
}
