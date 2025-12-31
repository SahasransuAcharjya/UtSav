// frontend/components/gemini/ChatBubble.tsx
import { MessageCircle, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  role: 'user' | 'ai';
  content: string;
  timestamp?: string;
  showAvatar?: boolean;
}

export default function ChatBubble({
  role,
  content,
  timestamp,
  showAvatar = true,
}: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn(
      'flex gap-3 mb-6 group',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {/* Avatar */}
      {showAvatar && (
        <div className={cn(
          'w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1',
          isUser 
            ? 'bg-gradient-to-r from-saffron to-gold order-2' 
            : 'bg-gradient-to-r from-velvet to-emerald order-1'
        )}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          )}
        </div>
      )}

      {/* Bubble */}
      <div className={cn(
        'max-w-xs lg:max-w-md p-5 rounded-3xl shadow-lg backdrop-blur-sm flex flex-col',
        isUser 
          ? 'bg-gradient-to-br from-saffron/90 to-gold/90 text-white rounded-br-sm translate-x-2 group-hover:translate-x-4 transition-all duration-300'
          : 'bg-white/80 border border-saffron/20 rounded-bl-sm hover:border-saffron/40 transition-all duration-300'
      )}>
        {/* Content */}
        <div className="font-jakarta leading-relaxed text-sm lg:text-base">
          {content}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className={cn(
            'text-xs opacity-75 mt-3 pt-3 border-t border-white/20 self-end',
            isUser ? 'text-white/90' : 'text-gray-500'
          )}>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  );
}
