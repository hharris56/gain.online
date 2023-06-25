import { headers } from 'next/headers';

export default function checkDevice() {

  const _headers = headers();
  const userAgent = _headers.get('user-agent');

  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return [userAgent, isMobileView];
}