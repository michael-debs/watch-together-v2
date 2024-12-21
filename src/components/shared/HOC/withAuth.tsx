import React, { ComponentType } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface WithAuthProps {
}

function withAuth<T extends object>(
  WrappedComponent: ComponentType<T>,
  options?: WithAuthProps
) {
  const WithAuth: React.FC<T & WithAuthProps> = async (props) => {
    const jwtSecret = process.env.JWT_SECRET;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token?.value && jwtSecret) {
      try {
        jwt.verify(token.value, jwtSecret) as UserType;
        return <WrappedComponent {...(props as T)} />;
      } catch (error) {
        console.error(error);
        redirect("/login");
      }
    }

    redirect("/login");
  };

  return WithAuth;
}

export default withAuth;
