function Text({ label, value }) {
    return (
        <div
            style={{
                padding: '6px 10px',
                borderRadius: '4px',
                marginBottom: 8,
            }}>
            <strong>{label}:</strong> {<pre>{value}</pre> || '—'}
        </div>
    );
}

export default Text;