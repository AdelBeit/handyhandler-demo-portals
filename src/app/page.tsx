import { redirect } from "next/navigation";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = new URLSearchParams();

  if (searchParams) {
    const resolvedSearchParams = await searchParams;
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (Array.isArray(value)) {
        value.forEach((entry) => params.append(key, entry));
      } else if (value !== undefined) {
        params.append(key, value);
      }
    }
  }

  const queryString = params.toString();
  redirect(queryString ? `/dashboard?${queryString}` : "/dashboard");
}
