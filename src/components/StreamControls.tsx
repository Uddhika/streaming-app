import { Button } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@/components/ui/radio';

interface StreamControlsProps {
  isStreaming: boolean;
  onStart: () => void;
  onStop: () => void;
  streamType: 'text' | 'chars';
  setStreamType: (type: 'text' | 'chars') => void;
}

const StreamControls: React.FC<StreamControlsProps> = ({
  isStreaming,
  onStart,
  onStop,
  setStreamType,
}) => {
  return (
    <div>
      <Flex gap="4" justify="center" py={5}>
        <Button paddingInline={3} onClick={onStart} disabled={isStreaming}>
          Start Streaming
        </Button>
        <Button paddingInline={3} onClick={onStop} disabled={!isStreaming}>
          Stop
        </Button>
      </Flex>
      <Flex gap="4" justify="center" paddingBottom={5}>
        <RadioGroup
          onValueChange={(e) =>
            e.value == 'text' ? setStreamType('text') : setStreamType('chars')
          }
          disabled={isStreaming}
          defaultValue="text"
        >
          <HStack gap="5">
            <Radio value="text">Stream Words</Radio>
            <Radio value="chars">Stream Characters</Radio>
          </HStack>
        </RadioGroup>
      </Flex>
    </div>
  );
};

export default StreamControls;
