const KEY = "local-game";

export const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const save = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
};

export const resetStorage = () => {
  localStorage.removeItem(KEY);
};
