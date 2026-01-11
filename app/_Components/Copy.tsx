import { Copy, Check } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // prevents card click navigation
        handleCopy();
      }}
      className="text-gray-400 hover:text-yellow-500 transition"
      title="Copy Order ID"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
export { CopyButton };
