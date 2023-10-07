import { GoogleSheet } from "https://deno.land/x/google_sheets_parser@1.0.0/mod.ts";

export const handler: Deno.ServeHandler = async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const [spreadsheetId, sheetName] = url.pathname.split("/").filter(Boolean);

  try {
    const sheet = await GoogleSheet.fetch(
      spreadsheetId,
      { sheetName: sheetName ? decodeURIComponent(sheetName) : undefined },
    );
    return Response.json(sheet.entries());
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
