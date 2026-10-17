import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Search, User, Sparkles, HandHeart, CheckCheck, Smile } from 'lucide-react';
import type { Conversation } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { cn } from '@/utils/cn';

interface MessagesTabProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string | null) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onViewProfile: (participantId: string) => void;
}

const quickReplies = [
  'I can bring it over right now! 🚪',
  'What time works best for you? ⏰',
  'Happy to lend a hand! 😊',
  'Sounds great, see you soon! 👍',
];

export function MessagesTab({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onViewProfile,
}: MessagesTabProps) {
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    if (activeConv) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConv?.messages.length, activeConversationId]);

  const handleSend = () => {
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (reply: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, reply);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()) ||
      (c.topic && c.topic.toLowerCase().includes(search.toLowerCase()))
  );

  // If a conversation is selected, show active chat
  if (activeConv) {
    return (
      <div className="flex flex-col h-[calc(100vh-170px)] sm:h-[680px] bg-white rounded-4xl shadow-soft border border-cream-200 overflow-hidden animate-fade-in">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-cream-100/90 border-b border-cream-200 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => onSelectConversation(null)}
              className="tap-scale p-1.5 rounded-full bg-white text-ink-700/70 hover:bg-cream-200 shadow-soft"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Avatar
              initials={activeConv.participantInitials}
              color={activeConv.participantAvatarColor}
              size="sm"
              online={activeConv.online}
            />
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-ink-900 truncate">{activeConv.participantName}</h3>
              <p className="text-[11px] text-ink-700/60 truncate flex items-center gap-1">
                <span>{activeConv.participantUnit}</span>
                {activeConv.online && <span className="text-sage-600 font-medium">· Active</span>}
              </p>
            </div>
          </div>

          <button
            onClick={() => onViewProfile(activeConv.participantId)}
            className="tap-scale flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-terracotta-600 shadow-soft border border-cream-200 hover:bg-cream-50"
          >
            <User className="h-3.5 w-3.5" />
            <span>Profile</span>
          </button>
        </div>

        {/* Topic Context Pill */}
        {activeConv.topic && (
          <div className="px-4 py-2 bg-cream-50/80 border-b border-cream-200/60 flex items-center gap-2 text-xs text-ink-700/70">
            {activeConv.topic.includes('Helping with') ? (
              <HandHeart className="h-3.5 w-3.5 text-terracotta-400 shrink-0" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-sage-500 shrink-0" />
            )}
            <span className="truncate font-medium">{activeConv.topic}</span>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          <div className="text-center my-2">
            <span className="inline-block rounded-full bg-cream-100 px-3 py-1 text-[11px] font-medium text-ink-700/50">
              Connected with neighbor in Maplewood
            </span>
          </div>

          {activeConv.messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                className={cn('flex flex-col animate-slide-up', isMe ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'max-w-[82%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed shadow-soft',
                    isMe
                      ? 'bg-terracotta-400 text-white rounded-br-sm'
                      : 'bg-cream-100 text-ink-900 border border-cream-200 rounded-bl-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-ink-700/40 px-1 font-medium">
                  {msg.time}
                  {isMe && <CheckCheck className="h-3 w-3 text-terracotta-400" />}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-3 pt-2 pb-1 overflow-x-auto no-scrollbar flex gap-1.5 border-t border-cream-200 bg-cream-50/50">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="tap-scale shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink-700/70 border border-cream-200 hover:border-terracotta-300 hover:text-terracotta-600 transition-colors shadow-soft"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-cream-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-2 rounded-2xl bg-cream-100 px-3.5 py-2.5 border border-cream-200 focus-within:border-terracotta-300 focus-within:bg-white transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeConv.participantName.split(' ')[0]}...`}
                className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
              />
              <button
                type="button"
                className="text-ink-700/40 hover:text-ink-700 transition-colors"
                aria-label="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={cn(
                'tap-scale flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all shadow-soft',
                inputText.trim()
                  ? 'bg-terracotta-400 text-white shadow-soft hover:shadow-glow'
                  : 'bg-cream-200 text-ink-700/40'
              )}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Conversation list view
  return (
    <div className="space-y-4 animate-fade-in pb-16">
      {/* Header & Search */}
      <div className="rounded-4xl bg-white p-4 shadow-soft border border-cream-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Neighbor Chats</h2>
            <p className="text-xs text-ink-700/50">Private messaging with your Maplewood community</p>
          </div>
          <span className="rounded-full bg-terracotta-100 px-2.5 py-1 text-xs font-bold text-terracotta-700">
            {conversations.length} Active
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 rounded-2xl bg-cream-100 px-3.5 py-2.5 border border-cream-200">
          <Search className="h-4 w-4 text-ink-700/40 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search neighbor chats or messages..."
            className="w-full bg-transparent text-xs text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-2.5">
        {filteredConversations.length === 0 ? (
          <div className="rounded-4xl bg-white p-8 text-center shadow-soft border border-cream-200">
            <p className="text-sm font-semibold text-ink-700">No conversations found</p>
            <p className="mt-1 text-xs text-ink-700/50">
              Start a chat by offering help in Bridge of Needs or connecting in Vibe Match!
            </p>
          </div>
        ) : (
          filteredConversations.map((conv, idx) => (
            <article
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className="tap-scale animate-slide-up rounded-4xl bg-white p-4 shadow-soft border border-cream-200 hover:border-terracotta-200 transition-all cursor-pointer"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  initials={conv.participantInitials}
                  color={conv.participantAvatarColor}
                  size="md"
                  online={conv.online}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-ink-900 truncate">{conv.participantName}</h3>
                    <span className="text-[11px] font-medium text-ink-700/50 shrink-0">{conv.lastTime}</span>
                  </div>

                  {conv.topic && (
                    <p className="mt-0.5 text-[11px] font-semibold text-terracotta-600 truncate flex items-center gap-1">
                      {conv.topic.includes('Helping') ? (
                        <HandHeart className="h-3 w-3 shrink-0" />
                      ) : (
                        <Sparkles className="h-3 w-3 shrink-0" />
                      )}
                      <span>{conv.topic}</span>
                    </p>
                  )}

                  <p className="mt-1 text-xs text-ink-700/70 truncate">{conv.lastMessage}</p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-terracotta-400 px-1.5 text-[10px] font-bold text-white shadow-soft shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
