import React from 'react';
import fetch from 'cross-fetch';

export function useBlocks(nodeUrl) {
  const [boxes, setBoxes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchBlocks() {
      try {
        setLoading(true);
        const response = await fetch(`${nodeUrl}/api/v1/blocks`);
        const { data } = await response.json();
        setBoxes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, [nodeUrl]);

  return [boxes, loading, error];
}