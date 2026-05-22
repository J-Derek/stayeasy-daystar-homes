import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'landlord' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
}

interface Booking {
  id: string;
  accommodationId: string;
  accommodationName: string;
  roomNo: string;
  roomType: string;
  price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  requestedAt: string;
}

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  savedIds: string[];
  isAuthenticated: boolean;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'requestedAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  toggleSaved: (id: string) => void;
}

const mockUsers: Record<string, User> = {
  student: { id: 'stu-1', name: 'Alex Mwangi', email: 'alex@daystar.ac.ke', role: 'student', avatar: '', phone: '+254 700 111 222' },
  landlord: { id: 'lnd-1', name: 'James Kariuki', email: 'james@email.com', role: 'landlord', avatar: '', phone: '+254 712 345 678' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'bk-demo-1',
      accommodationId: 'heri-homes',
      accommodationName: 'Heri Homes Athi River',
      roomNo: 'B201',
      roomType: '1BR',
      price: 12000,
      status: 'active',
      requestedAt: '2026-04-15',
    },
  ]);
  const [savedIds, setSavedIds] = useState<string[]>(['rawa-apartments', 'safari-heights']);

  const signIn = (role: UserRole) => {
    if (role) setUser(mockUsers[role]);
  };

  const signOut = () => setUser(null);

  const addBooking = (b: Omit<Booking, 'id' | 'requestedAt'>) => {
    setBookings(prev => [...prev, { ...b, id: `bk-${Date.now()}`, requestedAt: new Date().toISOString().split('T')[0] }]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const toggleSaved = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <AuthContext.Provider value={{ user, bookings, savedIds, isAuthenticated: !!user, signIn, signOut, addBooking, updateBookingStatus, toggleSaved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
