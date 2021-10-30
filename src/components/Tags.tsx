import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

import { FilterTag } from 'types/filter';

export interface TagsProps {
  options: FilterTag[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ onSelectTag, options, selectedTag }) => {
  return (
    <Flex overflowX="auto">
      {options.map((tag) => (
        <Button
          key={tag.value}
          colorScheme="orange"
          minWidth="80px"
          mx={2}
          onClick={() => onSelectTag(tag.value)}
          size="xs"
          variant={tag.value === selectedTag ? 'solid' : 'outline'}
        >
          {tag.name}
        </Button>
      ))}
    </Flex>
  );
};

export default Tags;
