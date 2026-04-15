import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "../utils/supabase";

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

export interface RsvpData {
  name: string;
  email: string;
  attending: string;
  guests_count: string;
  child_guest_count: string;
  dietary_needs: string;
  message: string;
  phone_number: string;
  needs_accomodation: string;
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

export async function saveRsvp(rsvp: RsvpData): Promise<PostgrestSingleResponse<any>> {
  return await supabase.from("rsvps").insert(rsvp)
}

export function getInviteLink(token: string): string {
  return `${window.location.origin}/?token=${token}`;
}
