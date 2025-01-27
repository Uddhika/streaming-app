import { Textarea } from '@chakra-ui/react';

interface StreamDisplayProps {
  data: string[];
}

const StreamDisplay: React.FC<StreamDisplayProps> = ({ data }) => {
  return (
    <Textarea
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        height: '200px',
        overflowY: 'auto',
      }}
      value={data.join('\n')}
      readOnly
    />
  );
};

export default StreamDisplay;
