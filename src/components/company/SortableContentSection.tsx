import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { InputWrapper } from "@/components/common/InputWrapper";
import { TextareaWrapper } from "@/components/common/TextareaWrapper";
import { CompanySettingsFormData } from "@/validations/companySettingsSchema";

interface SortableContentSectionProps {
  id: string;
  index: number;
  register: UseFormRegister<CompanySettingsFormData>;
  errors: FieldErrors<CompanySettingsFormData>;
  onRemove: () => void;
}

export function SortableContentSection({
  id,
  index,
  register,
  errors,
  onRemove,
}: SortableContentSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-md border p-3 md:p-4 space-y-4 bg-background"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-accent rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <h3 className="text-sm md:text-base font-medium">
            Section {index + 1}
          </h3>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <InputWrapper
        label="Section Title"
        type="text"
        placeholder="About Us"
        error={errors.contentSections?.[index]?.title}
        {...register(`contentSections.${index}.title`)}
      />

      <TextareaWrapper
        label="Section Content"
        placeholder="Enter your content here..."
        rows={4}
        error={errors.contentSections?.[index]?.content}
        {...register(`contentSections.${index}.content`)}
      />
    </div>
  );
}
