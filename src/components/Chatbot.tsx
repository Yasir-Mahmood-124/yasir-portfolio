"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Hey! I'm Yasir's AI assistant. Ask me anything about his work, skills, or how he can help with your project.",
  },
];

const QUICK_PROMPTS = [
  "What does Yasir do?",
  "Tell me about his projects",
  "What's his tech stack?",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 max-w-[85%]">
      <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-accent" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-glass border border-glass-border">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent/60"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex gap-2.5",
        isBot ? "items-end justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-accent" />
        </div>
      )}
      <div
        className={cn(
          "px-4 py-2.5 text-sm leading-relaxed max-w-[80%]",
          isBot
            ? "rounded-2xl rounded-bl-md bg-glass border border-glass-border text-secondary"
            : "rounded-2xl rounded-br-md bg-accent text-white"
        )}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

function ChatFAB({ onClick }: { onClick: () => void }) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 260 }}
      className="fixed bottom-6 right-6 z-40 flex items-end gap-3"
    >
      {/* Greeting tooltip */}
      <AnimatePresence>
        {showGreeting && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative mb-2"
          >
            <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-card border border-border shadow-xl shadow-black/20 backdrop-blur-xl max-w-[200px]">
              <p className="text-xs text-foreground font-medium leading-relaxed">
                Hi there! Need help exploring my work?
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDismissed(true);
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={onClick}
        className="relative w-16 h-16 rounded-full cursor-pointer group"
        aria-label="Open chat"
      >
        {/* Animated glow ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent via-cyan-400 to-accent opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-300 animate-pulse" />
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-accent via-cyan-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Profile image */}
        <span className="relative block w-full h-full rounded-full overflow-hidden border-2 border-accent/80 shadow-lg shadow-accent/30">
          <img
            src="/profile.png"
            alt="Yasir Mahmood"
            className="w-full h-full object-cover object-top"
          />
        </span>

        {/* AI bot badge */}
        <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-accent border-[2.5px] border-background flex items-center justify-center shadow-md">
          <Bot className="w-3 h-3 text-white" />
        </span>

        {/* Online pulse */}
        <span className="absolute top-0 right-0 w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative block w-3 h-3 rounded-full bg-emerald-400 border-2 border-background" />
        </span>
      </button>
    </motion.div>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const botId = `bot-${Date.now()}`;
    setMessages((prev) => [...prev, { id: botId, role: "bot", text: "" }]);

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "bot" ? "assistant" as const : "user" as const,
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("API request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              accumulated += token;
              const text = accumulated;
              setMessages((prev) =>
                prev.map((m) => (m.id === botId ? { ...m, text } : m))
              );
            }
          } catch {
            // skip malformed chunks
          }
        }
      }

      if (!accumulated.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? { ...m, text: "Sorry, I couldn't generate a response. Please try again." }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botId
            ? { ...m, text: "Something went wrong. Please try again or reach out through the contact form." }
            : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && <ChatFAB onClick={() => setIsOpen(true)} />}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.92 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              data-lenis-prevent
              className={cn(
                "fixed z-50 flex flex-col overflow-hidden",
                "bg-card border border-border shadow-2xl shadow-black/30",
                // Mobile: full screen with safe areas
                "inset-0 sm:inset-auto rounded-none",
                // Desktop: floating panel bottom-right
                "sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[560px] sm:rounded-3xl"
              )}
            >
              {/* Header */}
              <div className="relative shrink-0 px-5 py-4 border-b border-border">
                {/* Subtle aurora glow */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={cn(
                      `[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]
                      dark:[background-image:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%),var(--aurora)]
                      [background-image:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%),var(--aurora)]
                      [background-size:300%,_200%]
                      filter blur-[10px] invert dark:invert-0
                      pointer-events-none absolute -inset-[10px]
                      opacity-10 will-change-transform
                      [mask-image:radial-gradient(ellipse_at_0%_0%,black_10%,var(--transparent)_60%)]`
                    )}
                  />
                </div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-tight">
                        Yasir&apos;s Assistant
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] text-muted font-mono">Online</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-muted hover:text-foreground hover:bg-glass transition-colors duration-200 cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 chatbot-scrollbar">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              {messages.length <= 1 && !isTyping && (
                <div className="shrink-0 px-5 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="px-3 py-1.5 rounded-xl bg-glass border border-glass-border text-xs text-secondary hover:text-accent hover:border-accent/30 transition-colors duration-200 cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="shrink-0 p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-glass border border-border text-sm text-foreground outline-none placeholder:text-muted/50 transition-all duration-200 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.08)]"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer",
                      input.trim() && !isTyping
                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                        : "bg-glass border border-border text-muted cursor-not-allowed"
                    )}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
