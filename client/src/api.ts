import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')) {
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// });

interface FetchTickets {
  userId: number;
}

interface FetchTicketResponseData {
  title: string;
  discipline: string;
  website: string;
  userId: number;
  ticketId: number;
  ticketStatus: string;
  created: string;
  message: string;
}

export const fetchTickets = (userId: FetchTickets) =>
  API.post<FetchTicketResponseData>("/api/get_all_user_tickets.php", userId);

interface CreateTicket {
  title: string;
  discipline: string;
  message: string;
  website: string;
  ticketImages: {}[];
  userId: number;
  imageNames: {};
}

interface CreateTicketResponseData {
  error: string;
  status: number;
  message: string;
}

export const createTicket = (ticketData: CreateTicket) =>
  API.post<CreateTicketResponseData>("/api/new_ticket_form.php", ticketData);
// export const updateListing = (id, updatedListing) => API.patch(`/listings/${id}`, updatedListing);
// export const deleteListing = (id) => API.delete(`/listings/${id}`);

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

interface LoginUserFormData {
  email: string;
  password: string;
}

interface AuthResponseData {
  id: number;
  email: string;
  message: string;
  status: number;
  error: string;
}

export const signUp = (formData: CreateUserFormData) =>
  API.post<AuthResponseData>("/api/create_user.php", formData);
export const signIn = (formData: LoginUserFormData) =>
  API.post<AuthResponseData>("/api/login.php", formData);
