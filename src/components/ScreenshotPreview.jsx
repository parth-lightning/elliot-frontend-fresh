export default function ScreenshotPreview({ imageUrl }) {
  return (
    <div className="bg-panel border border-line rounded-xl p-6 flex flex-col">
      <h2 className="font-display font-semibold text-ink">Screenshot Preview</h2>
      <div className="mt-4 flex-1 rounded-lg border border-line bg-paper overflow-hidden flex items-center justify-center min-h-[220px]">
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded screenshot" className="max-h-[320px] w-auto object-contain" />
        ) : (
          <p className="text-sm text-muted font-mono">No screenshot uploaded yet</p>
        )}
      </div>
    </div>
  )
}
