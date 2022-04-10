import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')) {
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// });

// export const fetchTicket = () => API.get('/listings');

interface CreateTicket {
  title: string;
  discipline: string;
  message: string;
  website: string;
  ticketImages: {}[];
  userId: number;
}

interface CreateTicketResponseData {
  error: string;
  status: number;
  message: string;
}

// interface S3Images {
//   image: {}[];
// }

// export const saveImages = (: CreateTicket) =>
//   API.post<CreateTicketResponseData>("/api/new_ticket_form.php", ticketData);

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
