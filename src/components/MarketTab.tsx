import { useRef, useState } from 'react';
import { Camera, Check, ImagePlus, MessageCircle, Plus, Store, X } from 'lucide-react';
import { Avatar } from '@/components/Avatar';

export interface MarketListing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  unit: string;
  initials: string;
  avatarColor: string;
  request?: 'pending' | 'declined';
}

interface MarketTabProps {
  listings: MarketListing[];
  onCreate: (listing: MarketListing) => void;
  onWant: (listing: MarketListing) => void;
  onDecision: (listing: MarketListing, accepted: boolean) => void;
  currentUserName: string;
  onOpenChat: (listing: MarketListing) => void;
}

export const starterListings: MarketListing[] = [
  { id: 'market-1', title: 'Ceramic plant pots', description: 'Set of three, gently used. Perfect for a sunny windowsill.', price: 12, image: '', seller: 'Priya', unit: 'Unit 4B', initials: 'Pr', avatarColor: 'bg-rose-400' },
  { id: 'market-2', title: 'Desk lamp', description: 'Warm light, adjustable neck. Works perfectly.', price: 18, image: '', seller: 'Alex Chen', unit: 'Unit 3A', initials: 'Al', avatarColor: 'bg-sage-500' },
  { id: 'market-3', title: 'Board game bundle', description: 'Two family games, all pieces included.', price: 10, image: '', seller: 'Sarah K.', unit: 'Unit 5A', initials: 'Sa', avatarColor: 'bg-rose-500' },
];

export function MarketTab({ listings, onCreate, onWant, onDecision, currentUserName, onOpenChat }: MarketTabProps) {
  const [marketView, setMarketView] = useState<'find' | 'mine'>('find');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const visibleListings = marketView === 'mine' ? listings.filter((item) => item.seller === currentUserName) : listings.filter((item) => item.seller !== currentUserName);

  const publish = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !price) return;
    onCreate({ id: `market-${Date.now()}`, title: title.trim(), description: description.trim(), price: Number(price), image, seller: currentUserName, unit: 'Unit 3B', initials: 'Jo', avatarColor: 'bg-rose-500' });
    setTitle(''); setDescription(''); setPrice(''); setImage(''); setShowForm(false);
  };

  return <section className="space-y-4 animate-fade-in pb-16">
    <header className="flex items-center justify-between rounded-4xl border border-rose-100 bg-white/90 p-4 shadow-soft">
      <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-rose-500">Maplewood neighbors</p><h1 className="font-display text-2xl font-black text-ink-900">Market</h1><p className="mt-0.5 text-xs text-ink-700/60">Give good things a new home.</p></div>
      {marketView === 'mine' && <button onClick={() => setShowForm(true)} className="tap-scale flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-3.5 py-2.5 text-xs font-bold text-white shadow-soft"><Plus className="h-4 w-4"/> List an item</button>}
    </header>
    <div className="grid grid-cols-2 rounded-2xl border border-rose-100 bg-white p-1 shadow-soft" role="tablist" aria-label="Market listings">
      {([['find', 'Find goods'], ['mine', 'My goods']] as const).map(([view, label]) => <button key={view} role="tab" aria-selected={marketView === view} onClick={() => setMarketView(view)} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${marketView === view ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft' : 'text-ink-700/65'}`}>{label}</button>)}
    </div>
    <div className="flex items-center gap-2 px-1 text-xs font-semibold text-ink-700/60"><Store className="h-4 w-4 text-rose-500"/>{visibleListings.length} items nearby</div>
    {visibleListings.length === 0 && <div className="rounded-4xl bg-white p-8 text-center shadow-soft"><p className="font-bold text-ink-900">{marketView === 'mine' ? 'No items listed yet' : 'Nothing listed yet'}</p><p className="mt-1 text-sm text-ink-700/60">{marketView === 'mine' ? 'Post an unwanted item for your neighbors.' : 'Check back soon for neighbor listings.'}</p>{marketView === 'mine' && <button onClick={() => setShowForm(true)} className="mt-4 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-4 py-2 text-xs font-bold text-white">List an item</button>}</div>}
    <div className="space-y-3">
      {visibleListings.map((item) => <article key={item.id} className="overflow-hidden rounded-4xl border border-rose-100/80 bg-white shadow-soft">
        {item.image ? <img src={item.image} alt={item.title} className="h-44 w-full object-cover"/> : <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#F9E6E8] via-[#F5EAF0] to-[#E7F1EC]"><ImagePlus className="h-8 w-8 text-rose-300"/></div>}
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-lg font-bold text-ink-900">{item.title}</h2><p className="mt-1 text-sm leading-relaxed text-ink-700/70">{item.description}</p></div><span className="shrink-0 rounded-full bg-[#F8E9DA] px-3 py-1.5 text-sm font-black text-rose-700">${item.price}</span></div>
          <div className="flex items-center justify-between border-t border-rose-50 pt-3"><div className="flex items-center gap-2"><Avatar initials={item.initials} color={item.avatarColor} size="sm"/><div><p className="text-xs font-bold text-ink-900">{item.seller}</p><p className="text-[10px] text-ink-700/55">{item.unit}</p></div></div>{item.seller === currentUserName ? item.request === 'pending' ? <div className="flex items-center gap-1.5"><button onClick={() => onDecision(item, false)} className="rounded-full border border-rose-200 px-3 py-2 text-[11px] font-semibold text-rose-600">Decline</button><button onClick={() => onDecision(item, true)} className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white"><Check className="h-3.5 w-3.5"/>Accept</button></div> : item.request === 'declined' ? <span className="rounded-full bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-600">Declined</span> : <span className="text-[11px] font-semibold text-ink-700/50">Your listing</span> : item.request === 'pending' ? <button onClick={() => onOpenChat(item)} className="rounded-full bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-800">Request sent · Chat</button> : <button onClick={() => { onWant(item); onOpenChat(item); }} className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-4 py-2.5 text-xs font-bold text-white shadow-soft"><MessageCircle className="h-3.5 w-3.5"/>I want this</button>}</div>
        </div>
      </article>)}
    </div>
    {showForm && <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/45 p-3 backdrop-blur-sm sm:items-center" onClick={() => setShowForm(false)}><form onSubmit={publish} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-t-4xl border border-rose-100 bg-white p-5 shadow-soft-lg sm:rounded-4xl">
      <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-rose-500">Pass it along</p><h2 className="font-display text-xl font-black text-ink-900">List an item</h2></div><button type="button" onClick={() => setShowForm(false)} className="rounded-full bg-rose-50 p-2 text-rose-600"><X className="h-4 w-4"/></button></div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setImage(URL.createObjectURL(file)); }}/>
      <button type="button" onClick={() => fileRef.current?.click()} className="flex h-32 w-full items-center justify-center overflow-hidden rounded-3xl border border-dashed border-rose-200 bg-rose-50/60 text-sm font-semibold text-rose-600">{image ? <img src={image} className="h-full w-full object-cover" alt="Item preview"/> : <span className="flex items-center gap-2"><Camera className="h-5 w-5"/>Take or choose a photo</span>}</button>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What are you sharing?" className="w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-700/45 focus:outline-none focus:ring-2 focus:ring-rose-300" required/>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description" rows={3} className="w-full resize-none rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-700/45 focus:outline-none focus:ring-2 focus:ring-rose-300" required/>
      <label className="flex items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3"><span className="text-sm font-bold text-ink-700">$</span><input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-700/45 focus:outline-none" required/></label>
      <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] py-3 text-sm font-bold text-white shadow-soft">Post item</button>
    </form></div>}
  </section>;
}
