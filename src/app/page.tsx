'use client';
import { useState, useRef } from 'react';
import { Text } from '@chakra-ui/react';
import StreamControls from '../components/StreamControls';
import StreamDisplay from '../components/StreamDisplay';

export default function Home() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedData, setStreamedData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [streamType, setStreamType] = useState<'text' | 'chars'>('text');
  const controllerRef = useRef<AbortController | null>(null);

  const startStreaming = async () => {
    setIsStreaming(true);
    setError(null);
    setStreamedData([]);
    controllerRef.current = new AbortController();

    const endpoint =
      streamType === 'text'
        ? 'http://localhost:5000/stream-text'
        : 'http://localhost:5000/stream-chars';

    try {
      const response = await fetch(endpoint, {
        signal: controllerRef.current.signal,
      });

      if (!response.body) {
        throw new Error('Streaming not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;

        const chunk = decoder.decode(value);
        setStreamedData((prev) => [...prev, chunk]);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream aborted');
      } else {
        setError('An error occurred while streaming.');
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const stopStreaming = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setIsStreaming(false);
  };

  return (
    <div>
      <Text textStyle="2xl" fontWeight="bold" textAlign="center">
        True Streaming Text Demo
      </Text>
      <StreamControls
        isStreaming={isStreaming}
        onStart={startStreaming}
        onStop={stopStreaming}
        streamType={streamType}
        setStreamType={setStreamType}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <StreamDisplay data={streamedData} />
    </div>
  );
}
