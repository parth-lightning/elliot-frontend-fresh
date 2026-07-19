import { useRef, useState } from 'react'

export default function UploadPanel({ onFileSelected, onAnalyze, selectedFile, analyzing, error }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  function pick(file) {
    if (file) onFileSelected(file)
  }

  return (
    <div className="bg-panel border border-line rounded-xl p-6">
      <h2 className="font-display font-semibold text-ink">Upload Screenshot</h2>
      <p className="text-sm text-muted mt-1">Upload a screenshot of your website or application</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); pick(e.dataTransfer.files?.[0]) }}
        onClick={() => inputRef.current?.click()}
        className={`mt-4 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-signal bg-signal-dim' : 'border-line hover:border-ink/30'
        }`}
      >
        <div className="w-10 h-10 mx-auto rounded-full bg-signal-dim flex items-center justify-center mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B5FE0" strokeWidth="2">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-ink">Drag &amp; drop your image here</p>
        <p className="text-sm text-muted">or click to browse</p>
        <p className="font-mono text-[11px] text-muted mt-2">Supports: JPG, PNG, WEBP</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink/80 truncate">{selectedFile.name}</span>
          <span className="text-good">✓</span>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-critical font-mono">{error}</p>}

      <button
        onClick={onAnalyze}
        disabled={!selectedFile || analyzing}
        className="mt-4 w-full py-2.5 rounded-lg bg-signal text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-signal/90 transition-colors"
      >
        {analyzing ? 'Analyzing…' : 'Analyze UI/UX'}
      </button>
    </div>
  )
}
