import ProjectRoutes from "./Projects.js";
import UserRoutes from "./Users.js";
import SectionRouters from "./Sections.js";

export default function loadRoutes(app) {
  app.use("/projects", ProjectRoutes);
  app.use("/users", UserRoutes);
  app.use("/sections", SectionRouters);
}

// export default {ProjectRoutes, UserRoutes, SectionRouters}
