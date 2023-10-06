import { PublicGoogleSheetsParser } from "./deps.ts";

export const handler: Deno.ServeHandler = async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const parser = new PublicGoogleSheetsParser();

  const url = new URL(req.url);
  const [spreadsheetId, sheetName] = url.pathname.split("/").filter(Boolean);

  try {
    return Response.json(
      await parser.parse(
        spreadsheetId,
        sheetName ? decodeURIComponent(sheetName) : undefined,
      ),
    );
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
