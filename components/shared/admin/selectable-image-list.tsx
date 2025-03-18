import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

interface SelectableImageListProps {
  images: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

const SelectableImageList = ({
  images,
  value,
  onChange,
}: SelectableImageListProps) => {
  return (
    <RadioGroup
      value={value[0] || ''}
      onValueChange={(selected) => onChange([selected])}
      className="grid grid-cols-2 gap-4"
    >
      {images.map((image, index) => (
        <Label key={index} className="cursor-pointer relative">
          <RadioGroupItem
            value={image}
            className={`absolute top-2 left-2 ${
              value[0] === image ? '' : 'opacity-40'
            }`}
          />
          <Card
            className={`p-2 border-2 h-full ${
              value[0] === image ? 'border-primary' : ''
            }`}
          >
            <div className="h-full flex justify-center items-center p-2">
              <Image
                src={image}
                alt="Product case image"
                width={80}
                height={80}
              />
            </div>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default SelectableImageList;
