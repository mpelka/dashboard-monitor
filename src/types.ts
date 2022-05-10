export type Application = {
  admin: {
    email: string;
    first_name: string;
    last_name: string;
  };
  id: number;
  number_of_active_users: number;
  number_of_users: number;
  company: string;
  logo: string;
  name: string;
  server_address: string;
};

export type ApplicationPartial = Pick<Application, "id" | "name" | "company">;
