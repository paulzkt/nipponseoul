/** International phone numbers open WhatsApp without sending a message. */
export function ContactText({ text }: { text: string }) {
  return <>{text.split(/(\+\d[\d ()-]{7,}\d)/g).map((part, i) => part.startsWith('+')
    ? <a key={i} href={`https://wa.me/${part.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" aria-label={`Ouvrir WhatsApp : ${part}`}>{part}</a>
    : part)}</>;
}
