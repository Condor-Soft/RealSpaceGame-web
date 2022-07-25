//import Login from "pages/Login.js";
import Dashboard from "views/Dashboard.js";
import GeneralQuestions from "views/GeneralQuestions";
import SortQuestions from "views/SortQuestions";
import KeyWords from "views/KeyWords";
import Users from "views/Users";
import UserProfile from "views/UserProfile";

var routes = [
  {
    path: "/dashboard",
    name: "Panel Principal",
    rtlName: "",
    icon: "tim-icons icon-controller",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/general-questions",
    name: "Preguntas Generales",
    rtlName: "",
    icon: "tim-icons icon-paper",
    component: GeneralQuestions,
    layout: "/admin"
  },
  {
    path: "/sort-questions",
    name: "Preguntas Clasificadas",
    rtlName: "",
    icon: "tim-icons icon-book-bookmark",
    component: SortQuestions,
    layout: "/admin"
  },
  {
    path: "/keywords",
    name: "KeyWords",
    rtlName: "",
    icon: "tim-icons icon-key-25",
    component: KeyWords,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Usuarios",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Perfil de Usuario",
    rtlName: "",
    icon: "tim-icons icon-planet",
    component: UserProfile,
    layout: "/admin"
  },
];
export default routes;
