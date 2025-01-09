import { useState, useEffect } from 'react';

export const usePoll = (pollRequest, timeout = 2000) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignorePoll = false;
    let ignoreTimer = false;

    const poll = async (ignore) => {
      const response = await pollRequest();
      if (!ignore) setData(response);
    };

    poll(ignorePoll);

    const timer = setInterval(() => poll(ignoreTimer), timeout);

    return () => {
      ignorePoll = true;
      ignoreTimer = true;
      clearInterval(timer);
    };
  }, []);

  return data;
};
