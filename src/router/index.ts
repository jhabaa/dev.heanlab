import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ProtoView from "@/views/ProtoView.vue";
import ProjectDetailsView from "@/views/ProjectDetailsView.vue";

import { backgroundPosition, use3DBackground } from "@/stores/use3DBackground";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/projects/:name",
      name: "projects_details",
      component: () => import("@/views/ProjectDetailsView.vue"),
    },
    {
      path: "/prototypes",
      name: "prototypes",
      component: ProtoView,
    },
    {
      path: "/prototypes/:name",
      name: "prototypes_details",
      component: () => import("@/views/ProtoDetailsView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const background3D = use3DBackground();
  if (to.name == "home") {
    background3D.cameraZ = 40;
    background3D.updatingCameraZ = true;
    background3D.position = backgroundPosition.down;
  } else {
    background3D.cameraZ = 44;
    background3D.position = backgroundPosition.up;
    background3D.updatingCameraZ = true;
  }
});

export default router;
