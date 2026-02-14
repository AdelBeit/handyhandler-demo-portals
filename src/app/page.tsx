import { redirect } from "next/navigation";

type HomeProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Home({ searchParams }: HomeProps) {
  const params = new URLSearchParams();

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (Array.isArray(value)) {
        value.forEach((entry) => params.append(key, entry));
      } else if (value !== undefined) {
        params.append(key, value);
      }
    }
  }

  const queryString = params.toString();
  redirect(queryString ? `/login?${queryString}` : "/login");
}
