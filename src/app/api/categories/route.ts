import data from "@/data.json";

export const GET = async () => {
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
};
