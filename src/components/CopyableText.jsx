import { useState } from "react";

function CopyableText({ label, value }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!value) return;
        navigator.clipboard.writeText(value.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div
            onClick={handleCopy}
            style={{
                cursor: value ? 'pointer' : 'default',
                padding: '6px 10px',
                borderRadius: '4px',
                backgroundColor: copied ? '#d4edda' : 'transparent',
                userSelect: 'none',
                marginBottom: 8,
            }}
            title="Click to copy"
        >
            <strong>{label}:</strong> {<pre>{value}</pre> || '—'}
        </div>
    );
}

export default CopyableText;