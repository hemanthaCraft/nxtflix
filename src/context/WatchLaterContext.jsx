import { createContext, useEffect, useState } from "react";

export const WatchLaterContext = createContext();

function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState(() => {
    const savedMovies = localStorage.getItem("watchLater");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  return (
    <WatchLaterContext.Provider
      value={{ watchLater, setWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export default WatchLaterProvider;