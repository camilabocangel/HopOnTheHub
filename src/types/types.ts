export type User = {
  id: string;
  picture?: string;
  userName: string;
  name: string;
  lastName: string;
  secondLastName?: string;
  role: "admin" | "normal";
  campus: string;
  career?: string;
  semester?: number;
  likedEvents: string[];
  likedAnnouncements: string[];
  createdAt: any;
};

export type Career = {
  id: string;
  name: string;
  semesters?: Semester[];
  createdAt?: any;
};

export type Semester = {
  semester: number;
  subjects: string[];
};

export interface AnnouncementCardProps {
  id: string;
  image: string;
  description: string;
  date: string;
  campus: string[];
  onLikeToggle: (id: string) => void;
}

export interface Announcement {
  id: string;
  image: string;
  description: string;
  date: string;
  campus: string[];
  content: string;
  likes: string[];
  createdAt: any;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
  secondLastName: string;
  isAdmin: boolean;
  campus: string;
  career: string;
  semester: number | null;
  photo: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}
