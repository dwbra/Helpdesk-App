import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')) {
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// });

//need to directly type a single param
type FetchTicket = string | number;

//fetch all ticket data
export const fetchTicket = (ticket_id: FetchTicket) =>
  API.post("/api/get_single_ticket.php", ticket_id);

type FetchMessages = string | number;

//fetch comments for each ticket
export const fetchMessages = (ticketID: FetchMessages) =>
  API.post("/api/get_messages.php", ticketID);

type GetImageNames = string | number;

//get the imageNames
export const getImageNames = (ticket_id: GetImageNames) =>
  API.post("/api/get_image_names.php", ticket_id);

type FetchTickets = {};

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

export const fetchTickets = (user: FetchTickets) =>
  API.post<FetchTicketResponseData>("/api/get_all_user_tickets.php", user);

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

interface CreateTicketCommentResponse {
  error: string;
  status: number;
  message: string;
}

interface CreateTicketComment {
  comment: string;
  ticketID: number;
  userId: string | number;
}

export const createTicketComment = (commentData: CreateTicketComment) =>
  API.post<CreateTicketCommentResponse>(
    "/api/new_ticket_comment.php",
    commentData
  );

type TicketStatus = {};

export const updateTicketStatus = (ticketStatus: TicketStatus) =>
  API.post("/api/update_ticket_status.php", ticketStatus);

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
