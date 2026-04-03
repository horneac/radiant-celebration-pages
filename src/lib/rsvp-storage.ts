

export interface Guest {
  id: string;
  token: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface RsvpResponse {
  id: string;
  guestToken: string | null;
  name: string;
  email: string;
  attending: string;
  guests: string;
  childGuests: string;
  dietary: string;
  message: string;
  submittedAt: string;
}

const GUESTS_KEY = "wedding_guests";
const RSVPS_KEY = "wedding_rsvps";

function generateToken(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Guest management
export function getGuests(): Guest[] {
  const data = localStorage.getItem(GUESTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addGuest(name: string, email: string): Guest {
  const guests = getGuests();
  const guest: Guest = {
    id: generateId(),
    token: generateToken(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  guests.push(guest);
  localStorage.setItem(GUESTS_KEY, JSON.stringify(guests));
  return guest;
}

export function getGuestByToken(token: string): Guest | undefined {
  return getGuests().find((g) => g.token === token);
}

// RSVP management
export function getRsvps(): RsvpResponse[] {
  const data = localStorage.getItem(RSVPS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRsvp(rsvp: Omit<RsvpResponse, "id" | "submittedAt">): RsvpResponse {
  const rsvps = getRsvps();
  const entry: RsvpResponse = {
    ...rsvp,
    id: generateId(),
    submittedAt: new Date().toISOString(),
  };
  rsvps.push(entry);
  localStorage.setItem(RSVPS_KEY, JSON.stringify(rsvps));
  return entry;
}

export function getInviteLink(token: string): string {
  return `${window.location.origin}/?token=${token}`;
}
