export default function MapComponent({ location, routeData, onMapClick }) {
  const handleClick = () => {
    if (!onMapClick) return;
    onMapClick({ latitude: 12.9716, longitude: 77.5946 });
  };

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-950/70 p-3 shadow-2xl shadow-slate-900/50">
      <div className="mb-4 flex items-center justify-between gap-3 px-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Location panel</p>
          <h3 className="text-lg font-semibold text-white">Interactive map preview</h3>
        </div>
        <span className="inline-flex rounded-full bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          Clickable demo
        </span>
      </div>

      <div
        onClick={handleClick}
        className="group flex h-[620px] cursor-pointer items-center justify-center rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center text-slate-400 transition hover:border-sky-400/70 hover:text-white"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Map placeholder</p>
          <p className="mt-4 text-lg font-semibold text-white">Click anywhere to simulate a location query</p>
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-left text-sm leading-7 text-slate-300 shadow-inner shadow-slate-950/20">
            <p>Selected coordinates:</p>
            <p className="mt-2">Latitude: {location?.latitude ?? "12.9716"}</p>
            <p>Longitude: {location?.longitude ?? "77.5946"}</p>
            {routeData?.fastestRoute && (
              <p className="mt-3 text-slate-200">Fastest route available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
