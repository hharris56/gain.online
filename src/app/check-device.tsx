import { headers } from "next/headers";

export default async function checkDevice() {
  const _headers = await headers();
  const userAgent = _headers.get("user-agent");

  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  );

  return [userAgent, isMobileView];
}
