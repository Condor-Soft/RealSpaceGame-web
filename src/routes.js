//import Login from "pages/Login.js";
import Dashboard from "views/Dashboard.js";
import GeneralQuestions from "views/GeneralQuestions";
import SortQuestions from "views/SortQuestions";
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
    path: "/tables",
    name: "Usuarios",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: SortQuestions,
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
