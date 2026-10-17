import { useState } from 'react';
import { History, MessageCircle, Send, Volume2 } from 'lucide-react';
import type { VoiceFeedback } from '@/data/mockData';

interface VoiceBoxTabProps {
  history: VoiceFeedback[];
  onSubmit: (item: VoiceFeedback) => void;
  onFollowUp: () => void;
}

export function VoiceBoxTab({ history, onSubmit, onFollowUp }: VoiceBoxTabProps) {
  const [draft, setDraft] = useState('');
  const [category, setCategory] = useState('Amenities');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onSubmit({ id: `v${Date.now()}`, topic: draft.trim().slice(0, 60), preview: draft.trim(), category, date: 'Just now', status: 'Sent to Property Mgmt' });
    setDraft('');
    setSubmitted(true);
  };
  return <section className="space-y-4 animate-fade-in pb-16">
    <header className="rounded-4xl bg-gradient-to-r from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] p-5 text-white shadow-soft"><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/80"><Volume2 className="h-4 w-4"/> Maplewood</span><h1 className="mt-1 font-display text-2xl font-black">Voice Box</h1><p className="mt-1 text-xs text-white/85">Share a concern or suggestion with property management.</p></header>
    <form onSubmit={submit} className="space-y-3 rounded-4xl border border-rose-100 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between"><h2 className="font-display text-base font-bold text-ink-900">Your request</h2><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"><option>Amenities</option><option>Maintenance</option><option>Safety</option><option>Other</option></select></div>
      <textarea value={draft} onChange={(e) => { setDraft(e.target.value); setSubmitted(false); }} rows={4} placeholder="Tell us what needs attention…" className="w-full resize-none rounded-2xl border border-rose-100 bg-rose-50/40 p-3 text-sm text-ink-900 placeholder:text-ink-700/45 focus:outline-none focus:ring-2 focus:ring-rose-300"/>
      {submitted && <p role="status" className="text-xs font-semibold text-emerald-700">Sent to property management. You can follow up in chat.</p>}
      <button type="submit" disabled={!draft.trim()} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] py-3 text-sm font-bold text-white disabled:opacity-45"><Send className="h-4 w-4"/> Send request</button>
    </form>
    <button onClick={onFollowUp} className="flex w-full items-center justify-between rounded-3xl border border-rose-100 bg-white p-4 text-left shadow-soft"><span className="flex items-center gap-3"><span className="rounded-2xl bg-rose-50 p-2.5 text-rose-600"><MessageCircle className="h-5 w-5"/></span><span><span className="block text-sm font-bold text-ink-900">Chat with property management</span><span className="block text-xs text-ink-700/60">Follow up on a complaint or request</span></span></span><MessageCircle className="h-4 w-4 text-rose-500"/></button>
    <section className="space-y-3"><h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-900"><History className="h-4 w-4 text-rose-500"/>Voice Box history</h2>{history.length === 0 ? <div className="rounded-3xl bg-white p-6 text-center text-sm text-ink-700/60 shadow-soft">Your requests will appear here.</div> : history.map((item) => <article key={item.id} className="rounded-3xl border border-rose-100 bg-white p-4 shadow-soft"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-ink-900">{item.category}</h3><span className="text-[10px] text-ink-700/55">{item.date}</span></div><p className="mt-2 text-sm text-ink-800">{item.preview}</p><p className="mt-2 text-[11px] font-semibold text-sage-700">{item.status === 'Sent to Property Mgmt' ? 'Sent to property management' : 'Submitted'}</p></article>)}</section>
  </section>;
}
