import { configureStore } from "@reduxjs/toolkit";
import Auth from "./authSlice";
import User from "./usersSlice";
import Setting from "./settingSlice";
import Customer from "./customerSlice";
import Department from "./departmentSlice";
import Address from "./addressSlice";
import TicketStatusSlice from "./ticketStatusSlice";
import TicketTopicSlice from "./ticketTopicSlice";
import TicketTypeSlice from "./ticketTypeSlice";
import Ticket from "./ticketSlice";
import Purpose from "./callPurposeSlice";
import CallNote from "./callNoteSlice";
import UserStatus from "./usersStatusSlice";
import UsersPositionSlice from "./usersPositionSlice";
import UserAcademicLever from "./usersAcademicLevelSlice";
import Dashboard from "./dashboardSlice";
import CustomerCare from "./customerCareSlice";
import CallMonitorSlice from "./callMonitorSlice";
import SynchronizedSlice from "./SynchronizedSlice";
export const store = configureStore({
  reducer: {
    Auth: Auth,
    User: User,
    Setting: Setting,
    Customer: Customer,
    Department: Department,
    Address: Address,
    TicketStatusSlice: TicketStatusSlice,
    TicketTopic: TicketTopicSlice,
    TicketType: TicketTypeSlice,
    Ticket: Ticket,
    Purpose: Purpose,
    CallNote: CallNote,
    UserStatus: UserStatus,
    UserPosition: UsersPositionSlice,
    AcademicLevel: UserAcademicLever,
    Dashboard: Dashboard,
    CustomerCare: CustomerCare,
    CallMonitor: CallMonitorSlice,
    Synchronized: SynchronizedSlice,
  },
});
