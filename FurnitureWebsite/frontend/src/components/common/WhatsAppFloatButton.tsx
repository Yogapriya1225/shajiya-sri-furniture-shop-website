import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/utils/constants";

export default function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-card-hover transition-transform duration-300 hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      <MessageCircle className="relative h-7 w-7 fill-white text-white" strokeWidth={0} />
    </a>
  );
}
