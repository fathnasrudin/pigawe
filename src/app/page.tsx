import { ROUTES } from "@/constants/routes";
import { permanentRedirect } from "next/navigation";

export default function Root() {
  permanentRedirect(ROUTES.home.path);
}
