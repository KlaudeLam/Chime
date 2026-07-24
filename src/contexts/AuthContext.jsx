import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Wait for the initial session check before reacting -- otherwise this
    // effect fires once on mount with session still undefined, resetting
    // profileLoading to false a render before it flips back to true once the
    // real session arrives. That one-render gap let AdminRoute see a stale
    // "no profile yet" state and wrongly conclude the user isn't an admin.
    if (loading) return;
    if (!session?.user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) setProfile(data);
      })
      .finally(() => setProfileLoading(false));
  }, [loading, session?.user?.id]);

  async function signUp(email, password, { username, isArtist }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, is_artist: isArtist } },
    });
    if (error) throw error;
    return { needsEmailConfirmation: !data.session };
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  const value = { session, user: session?.user ?? null, profile, loading, profileLoading, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
