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
  pushToken?: string;
};

export type Career = {
  id: string;
  name: string;
  faculty: string;
  semesters?: Semester[];
  createdAt?: any;
};

export type Semester = {
  semester: number;
  subjects: string[];
};

export type Announcement = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "passed" | "hidden";
  image: string;
  description: string;
  date: string;
  campus: string[];
  content: string;
  likes: string[];
  createdAt?: any;
  creatorPushToken?: string;
};

export interface AnnouncementCardProps {
  id: string;
  image: string;
  description: string;
  date: string;
  campus: string[];
  status: "pending" | "accepted" | "rejected" | "passed" | "hidden";
  isPending?: boolean;
  isRejected?: boolean;
  isHidden?: boolean;
  index?: number;
  creatorPushToken?: string;
}

export type Event = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "passed";
  title: string;
  date: string;
  time: string;
  campus: string[];
  place: string;
  category: string;
  description: string;
  image: string;
  content: string;
  attendees: string[];
  likes: string[];
  createdAt?: any;
  createdBy?: string;
  locations: { lat: number; lng: number }[];
  modality: string;
  creatorPushToken?: string;
};

export type EventCardProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  category: string;
  description: string;
  image: string;
  content: string;
  campus: string;
  status: "pending" | "accepted" | "rejected" | "passed";
  isPending?: boolean;
  index?: number;
  isRejected?: boolean;
  createdBy?: string;
  createdAt?: any;
  creatorPushToken?: string;
};

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
