"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { Toaster } from "@/components/common/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWrapper } from "@/components/common/InputWrapper";
import { ColorPicker } from "@/components/common/ColorPicker";
import { Button } from "@/components/common/Button";
import { PreviewModal } from "@/components/company/PreviewModal";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SortableContentSection } from "@/components/company/SortableContentSection";
import {
  companySettingsSchema,
  CompanySettingsFormData,
} from "@/validations/companySettingsSchema";
import { Plus, ArrowLeft } from "lucide-react";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { companyService } from "@/services/company.service";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function CompanySettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanySettingsFormData>({
    resolver: yupResolver(companySettingsSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      logoUrl: "",
      bannerUrl: "",
      primaryColor: "#4f46e5",
      cultureVideoUrl: "",
      contentSections: [],
    },
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const result = await companyService.getCompanySettings();
        
        if (result.success && result.data) {
          // Populate form with fetched data
          reset({
            name: result.data.name || "",
            logoUrl: result.data.logoUrl || "",
            bannerUrl: result.data.bannerUrl || "",
            primaryColor: result.data.primaryColor || "#4f46e5",
            cultureVideoUrl: result.data.cultureVideoUrl || "",
            contentSections: result.data.contentSections || [],
          });
        } else {
          toast.error(result.error || ERROR_MESSAGES.FAILED_TO_LOAD);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "contentSections",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const onSubmit = async (data: CompanySettingsFormData) => {
    const result = await companyService.updateCompanySettings(data);

    if (result.success) {
      toast.success(SUCCESS_MESSAGES.SETTINGS_SAVED);
    } else {
      toast.error(result.error || ERROR_MESSAGES.FAILED_TO_LOAD);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading company settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Toaster />
      <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/home")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Company Settings
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Manage your company profile and branding
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Company Details
            </h2>

            <InputWrapper
              label="Company Name"
              type="text"
              placeholder="Acme Inc."
              error={errors.name}
              {...register("name")}
            />

            <InputWrapper
              label="Logo URL"
              type="url"
              placeholder="https://example.com/logo.png"
              error={errors.logoUrl}
              {...register("logoUrl")}
            />

            <InputWrapper
              label="Banner Image URL"
              type="url"
              placeholder="https://example.com/banner.jpg"
              error={errors.bannerUrl}
              {...register("bannerUrl")}
            />
          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">Brand Theme</h2>

            <Controller
              name="primaryColor"
              control={control}
              render={({ field }) => (
                <ColorPicker
                  label="Primary Color"
                  error={errors.primaryColor}
                  {...field}
                />
              )}
            />

          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">Culture</h2>

            <InputWrapper
              label="Culture Video URL"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              error={errors.cultureVideoUrl}
              {...register("cultureVideoUrl")}
            />
          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-semibold">
                Content Sections
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ title: "", content: "", order: fields.length })
                }
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No content sections yet. Click &quot;Add Section&quot; to create
                one.
              </p>
            )}

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableContentSection
                    key={field.id}
                    id={field.id}
                    index={index}
                    register={register}
                    errors={errors}
                    onRemove={() => remove(index)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="w-full sm:w-auto"
            >
              Preview
            </Button>
          </div>
        </form>
      </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewData={{
            name: watch("name") || "Your Company",
            logoUrl: watch("logoUrl") || undefined,
            bannerUrl: watch("bannerUrl") || undefined,
            primaryColor: watch("primaryColor") || "#4f46e5",
            cultureVideoUrl: watch("cultureVideoUrl") || undefined,
            contentSections: watch("contentSections") || [],
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
