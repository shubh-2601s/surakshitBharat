import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserRole } from '@surakshit-bharat/shared';

export interface UserProfile {
  id: string;
  email?: string;
  full_name: string;
  role: UserRole;
  district?: string;
  organization?: string;
  is_demo?: boolean;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInAsDemo: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sb_active_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Sync Supabase Auth state
  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email);
        }
      } catch (err) {
        console.warn('Supabase auth session fetch:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.email);
      } else if (!localStorage.getItem('sb_demo_session')) {
        setUser(null);
        setProfile(null);
        localStorage.removeItem('sb_active_profile');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        const userProf: UserProfile = {
          id: data.id,
          email: email || '',
          full_name: data.full_name || 'Verified User',
          role: data.role || 'citizen',
          district: data.district_id,
          organization: data.organization
        };
        setProfile(userProf);
        localStorage.setItem('sb_active_profile', JSON.stringify(userProf));
      } else {
        // Fallback user metadata
        const fallbackProf: UserProfile = {
          id: userId,
          email: email || '',
          full_name: email?.split('@')[0] || 'Civic User',
          role: 'citizen'
        };
        setProfile(fallbackProf);
        localStorage.setItem('sb_active_profile', JSON.stringify(fallbackProf));
      }
    } catch (e) {
      console.warn('Profile fetch error, using fallback:', e);
    }
  };

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: profileData.full_name,
            role: profileData.role || 'citizen',
            organization: profileData.organization
          }
        }
      });

      if (error) {
        // If Supabase has rate-limit or signup disabled, we handle cleanly
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Try to insert profile row
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: profileData.full_name,
            role: profileData.role || 'citizen',
            organization: profileData.organization
          });
        } catch (dbErr) {
          console.warn('Profile insert note:', dbErr);
        }

        const newProf: UserProfile = {
          id: data.user.id,
          email,
          full_name: profileData.full_name || 'Citizen',
          role: profileData.role || 'citizen',
          organization: profileData.organization
        };
        setProfile(newProf);
        localStorage.setItem('sb_active_profile', JSON.stringify(newProf));
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };

      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, data.user.email);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Demo Role Login for fast interactive testing without email verification delays
  const signInAsDemo = async (role: UserRole) => {
    const demoProfiles: Record<UserRole, UserProfile> = {
      citizen: {
        id: 'demo-citizen-01',
        email: 'aaditya.sharma@surakshit.gov.in',
        full_name: 'Aaditya Sharma',
        role: 'citizen',
        district: 'Bengaluru Urban, KA',
        is_demo: true
      },
      manufacturer: {
        id: 'demo-mfg-01',
        email: 'compliance@bharatcables.in',
        full_name: 'Rohan Mehra (QA Director)',
        role: 'manufacturer',
        organization: 'Bharat Heavy Cables & Conductors Ltd',
        district: 'Pune, MH',
        is_demo: true
      },
      authority: {
        id: 'demo-auth-01',
        email: 'nodal.officer@bbmp.gov.in',
        full_name: 'S. K. Ramanathan, IAS',
        role: 'authority',
        organization: 'Municipal Disaster & Arterial Infrastructure Division',
        district: 'Bengaluru Urban, KA',
        is_demo: true
      },
      admin: {
        id: 'demo-admin-01',
        email: 'national.admin@surakshitbharat.gov.in',
        full_name: 'Dr. Priya Nambiar',
        role: 'admin',
        organization: 'National Safety Intelligence Command Center',
        district: 'Central Delhi, DL',
        is_demo: true
      },
      public: {
        id: 'demo-public-01',
        email: 'public@surakshit.in',
        full_name: 'Public Viewer',
        role: 'public',
        is_demo: true
      }
    };

    const targetProf = demoProfiles[role];
    setUser({ id: targetProf.id, email: targetProf.email });
    setProfile(targetProf);
    localStorage.setItem('sb_demo_session', 'true');
    localStorage.setItem('sb_active_profile', JSON.stringify(targetProf));
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('sb_demo_session');
    localStorage.removeItem('sb_active_profile');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || 'public',
        isAuthenticated: !!profile,
        isLoading,
        signUp,
        signIn,
        signInAsDemo,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
