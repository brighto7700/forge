import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `https://forge.brgt.site/auth/login?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `https://forge.brgt.site/auth/login?error=no_code`
    );
  }

  // Pass code to client-side page for exchange
  return NextResponse.redirect(
    `https://forge.brgt.site/auth/confirm?code=${code}`
  );
}
