import { createContext, useContext, useState } from 'react';

const TrackContextMenuContext = createContext(null);

export function TrackContextMenuProvider({ children }) {
  const [menu, setMenu] = useState(null); // { x, y, trackId } | null

  function openMenu(event, trackId) {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY, trackId });
  }

  function closeMenu() {
    setMenu(null);
  }

  return (
    <TrackContextMenuContext.Provider value={{ menu, openMenu, closeMenu }}>
      {children}
    </TrackContextMenuContext.Provider>
  );
}

export function useTrackContextMenu() {
  const ctx = useContext(TrackContextMenuContext);
  if (!ctx) throw new Error('useTrackContextMenu must be used within TrackContextMenuProvider');
  return ctx;
}
