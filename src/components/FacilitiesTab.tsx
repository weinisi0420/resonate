import { useEffect, useRef, useState } from 'react';
import {
  Leaf,
  Laptop,
  WashingMachine,
  Sofa,
  Dumbbell,
  Clock,
  Sparkles,
  Send,
  Check,
  Megaphone,
  Shield,
  Calendar,
  X,
  CheckCircle2,
  Ticket,
} from 'lucide-react';
import {
  facilities as seedFacilities,
  type Facility,
  type VoiceFeedback,
  type FacilityBooking,
} from '@/data/mockData';
import { Badge } from '@/components/Badge';
import { cn } from '@/utils/cn';

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="h-5 w-5" />,
  laptop: <Laptop className="h-5 w-5" />,
  'washing-machine': <WashingMachine className="h-5 w-5" />,
  sofa: <Sofa className="h-5 w-5" />,
  dumbbell: <Dumbbell className="h-5 w-5" />,
};

const statusColor: Record<Facility['status'], string> = {
  Quiet: 'bg-sage-400',
  Comfortable: 'bg-sage-300',
  Busy: 'bg-rose-400',
  Full: 'bg-rose-500',
};

const statusTextColor: Record<Facility['status'], string> = {
  Quiet: 'text-sage-700',
  Comfortable: 'text-sage-600',
  Busy: 'text-[#CB6375]',
  Full: 'text-[#B54D5F]',
};

interface FacilitiesTabProps {
  focusVoiceBoxOnOpen?: boolean;
  onBookFacility?: (facility: Facility, date: string, timeSlot: string) => boolean;
  userBookings?: FacilityBooking[];
  onNavigateToProfile?: () => void;
  onSubmitFeedback: (feedback: VoiceFeedback) => void;
}

export function FacilitiesTab({
  focusVoiceBoxOnOpen = false,
  onBookFacility,
  userBookings = [],
  onNavigateToProfile,
  onSubmitFeedback,
}: FacilitiesTabProps) {
  const voiceBoxRef = useRef<HTMLElement | null>(null);
  const [facilities] = useState<Facility[]>(seedFacilities);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    facility: Facility;
    date: string;
    timeSlot: string;
    bookingCode: string;
  } | null>(null);

  // Constructive Voice Box State
  const [draft, setDraft] = useState('');
  const [category, setCategory] = useState('Amenities');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!focusVoiceBoxOnOpen) return;
    const frame = requestAnimationFrame(() => {
      voiceBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [focusVoiceBoxOnOpen]);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    const newFb: VoiceFeedback = {
      id: `v${Date.now()}`,
      topic: draft.trim().slice(0, 60),
      preview: draft.trim(),
      category,
      date: 'Just now',
      status: 'AI Polished',
    };
    onSubmitFeedback(newFb);
    setDraft('');
    setSubmitted(true);
  };

  const handleBookingConfirm = (date: string, timeSlot: string) => {
    if (!selectedFacility) return;
    if (onBookFacility) {
      onBookFacility(selectedFacility, date, timeSlot);
    }

    const code = `HSH-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      facility: selectedFacility,
      date,
      timeSlot,
      bookingCode: code,
    });
    setSelectedFacility(null);
  };

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      {/* Pink Gradient Banner */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] p-5 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDF2E1]/90">Facility Passes</span>
            <h2 className="font-display text-xl font-black mt-0.5">Book Community Spaces</h2>
          </div>
        </div>

      </section>

      {/* Booking Confirmed Ticket Banner */}
      {confirmedBooking && (
        <div className="rounded-3xl bg-gradient-to-br from-[#F5B5B8]/30 via-white to-[#FDF2E1] border border-[#EB99A7]/50 p-4 shadow-soft animate-slide-up space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Ticket className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-bold text-xs text-ink-900">Pass Confirmed: {confirmedBooking.facility.name}</h4>
                <p className="text-[11px] text-[#CB6375] font-semibold">{confirmedBooking.date} · {confirmedBooking.timeSlot}</p>
              </div>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="tap-scale text-ink-700/40 hover:text-ink-900 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-rose-100 text-ink-700/70">
            <span>Access Code: <strong className="text-ink-900 font-mono">{confirmedBooking.bookingCode}</strong></span>
            {onNavigateToProfile && (
              <button onClick={onNavigateToProfile} className="text-[#CB6375] font-bold hover:underline">
                View in My Bookings &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Facilities List & Booking Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-ink-900">Available Amenities</h3>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-ink-700/50">
            <span className="h-2 w-2 rounded-full bg-sage-400 animate-pulse-soft" /> Real-time status
          </span>
        </div>

        <div className="space-y-3">
          {facilities.map((f, idx) => {
            return (
              <article
                key={f.id}
                className="animate-slide-up rounded-4xl bg-white p-4 shadow-soft border border-[#EB99A7]/30 hover:border-[#CB6375]/50 transition-all"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4D6D3]/60 text-[#CB6375]">
                    {iconMap[f.icon]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-ink-900 truncate">{f.name}</h4>
                      <span className={cn('text-xs font-bold shrink-0', statusTextColor[f.status])}>
                        {f.status}
                      </span>
                    </div>

                    <p className="text-xs text-ink-700/65 mt-0.5 leading-relaxed">{f.note}</p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-700/50">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {f.hours}
                      </span>
                      <span className="font-semibold">{f.occupancy}% occupancy</span>
                    </div>

                    <div className="mt-1.5 relative h-1.5 w-full overflow-hidden rounded-full bg-cream-200">
                      <div
                        className={cn('absolute inset-y-0 left-0 rounded-full', statusColor[f.status])}
                        style={{ width: `${f.occupancy}%` }}
                      />
                    </div>

                    {/* Booking Action Row */}
                    <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-rose-50">
                      <span className="text-[11px] text-ink-700/50">Free reservation</span>

                      <button
                        onClick={() => setSelectedFacility(f)}
                        className={cn(
                          'tap-scale flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-soft',
                          'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white hover:shadow-glow'
                        )}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Interactive Booking Modal */}
      {selectedFacility && (
        <BookFacilityModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
          onConfirm={handleBookingConfirm}
        />
      )}

      {/* Constructive Voice Box */}
      <section ref={voiceBoxRef} id="voice-box" className="relative scroll-mt-4 overflow-hidden rounded-4xl bg-gradient-to-br from-[#F5B5B8]/25 via-white to-[#FDF2E1] p-5 shadow-soft border border-[#EB99A7]/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CB6375] to-[#EB99A7] text-white shadow-soft">
            <Megaphone className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-ink-900">Constructive Voice Box</h3>
            <p className="text-[11px] text-ink-700/60">Anonymous amenity suggestions to property management.</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Badge tone="terracotta" icon={<Sparkles className="h-3 w-3" />}>
            AI Polished for Management
          </Badge>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-ink-700/45">
            <Shield className="h-3 w-3" /> Anonymous
          </span>
        </div>

        <div className="mt-3 rounded-2xl bg-white p-3 shadow-soft border border-rose-100">
          <div className="flex gap-1.5 mb-2 overflow-x-auto no-scrollbar">
            {['Amenities', 'Maintenance', 'Safety', 'Quiet Hours'].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'tap-scale shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all',
                  category === c ? 'bg-[#CB6375] text-white' : 'bg-cream-100 text-ink-700/60'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Share constructive amenities suggestions..."
            rows={2}
            className="w-full resize-none rounded-xl bg-cream-100 px-3 py-2 text-xs text-ink-800 placeholder:text-ink-700/40 focus:outline-none"
          />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-ink-700/40">{draft.length}/300</span>
            <button
              onClick={handleSubmit}
              disabled={!draft.trim()}
              className={cn(
                'tap-scale flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all',
                draft.trim() ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft' : 'bg-cream-200 text-ink-700/40'
              )}
            >
              <Send className="h-3.5 w-3.5" /> Submit
            </button>
          </div>
        </div>
      </section>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/45 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="voice-success-title">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-soft-lg">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700"><CheckCircle2 className="h-6 w-6" /></span>
            <h3 id="voice-success-title" className="mt-3 font-display text-lg font-bold text-ink-900">Suggestion submitted</h3>
            <p className="mt-1 text-sm text-ink-700/70">You can find it in Profile → Voice Box.</p>
            <button onClick={() => setSubmitted(false)} className="tap-scale mt-5 w-full rounded-2xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-4 py-3 text-sm font-bold text-white">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookFacilityModal({
  facility,
  onClose,
  onConfirm,
}: {
  facility: Facility;
  onClose: () => void;
  onConfirm: (date: string, timeSlot: string) => void;
}) {
  const dates = [
    { label: 'Today', date: 'Oct 17' },
    { label: 'Tomorrow', date: 'Oct 18' },
    { label: 'Saturday', date: 'Oct 19' },
    { label: 'Sunday', date: 'Oct 20' },
  ];

  const timeSlots = [
    '9:00 AM – 10:30 AM',
    '11:00 AM – 12:30 PM',
    '2:00 PM – 3:30 PM',
    '4:00 PM – 5:30 PM',
    '6:30 PM – 8:00 PM',
    '8:30 PM – 10:00 PM',
  ];

  const [selectedDate, setSelectedDate] = useState(`${dates[0].label}, ${dates[0].date}`);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[2]);
  const [duration, setDuration] = useState<'1.5 hrs' | '3 hrs'>('1.5 hrs');


  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/40 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-4xl bg-gradient-to-b from-[#FDF2E1] via-white to-[#FDF2E1] p-5 shadow-soft-lg animate-slide-up border border-[#EB99A7]/50 space-y-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#F4D6D3]">
          <div>
            <h3 className="font-display text-base font-black text-ink-900">Reserve Space Session</h3>
            <p className="text-xs text-[#CB6375] font-bold">{facility.name}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-white p-1.5 shadow-soft hover:bg-rose-50">
            <X className="h-4 w-4 text-ink-700/60" />
          </button>
        </div>

        {/* Date Selector (Interactive buttons) */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-ink-700/60">Choose Day</label>
          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
            {dates.map((d) => {
              const val = `${d.label}, ${d.date}`;
              const isSel = selectedDate === val;
              return (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setSelectedDate(val)}
                  className={cn(
                    'tap-scale flex flex-col items-center py-2 px-1 rounded-2xl border text-center transition-all',
                    isSel
                      ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white border-[#CB6375] shadow-soft'
                      : 'bg-white text-ink-700/70 border-rose-100 hover:border-rose-300'
                  )}
                >
                  <span className="text-[10px] font-medium">{d.label}</span>
                  <span className="text-xs font-bold">{d.date}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selector (Interactive buttons) */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-ink-700/60">Choose Time Slot</label>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {timeSlots.map((slot) => {
              const isSel = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    'tap-scale py-2 px-2.5 rounded-xl border text-center text-xs font-bold transition-all',
                    isSel
                      ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white border-[#CB6375] shadow-soft'
                      : 'bg-white text-ink-700/70 border-rose-100 hover:border-rose-300'
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration toggle */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="font-bold text-ink-700/70">Session Duration:</span>
          <div className="flex gap-1 bg-white p-1 rounded-xl border border-rose-100">
            {(['1.5 hrs', '3 hrs'] as const).map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setDuration(dur)}
                className={cn(
                  'tap-scale px-3 py-1 rounded-lg text-xs font-bold transition-all',
                  duration === dur
                    ? 'bg-[#CB6375] text-white'
                    : 'text-ink-700/60 hover:text-ink-900'
                )}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onConfirm(selectedDate, selectedSlot)}
          className="tap-scale flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] hover:shadow-glow py-3 px-4 text-xs font-black text-white shadow-soft transition-all"
        >
          <Check className="h-4 w-4" />
          <span>Confirm reservation</span>
        </button>
      </div>
    </div>
  );
}
