import SignupForm from "@/components/SignupForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Signup() {
  const { data: session } = useSession();
  if (session) redirect("/");

  return <SignupForm />;
}
