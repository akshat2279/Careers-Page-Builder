"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, ArrowLeft } from "lucide-react";
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

import { Button } from "@/components/common/Button";
import { ColorPicker } from "@/components/common/ColorPicker";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { InputWrapper } from "@/components/common/InputWrapper";
import { Toaster } from "@/components/common/Toast";
import { PreviewModal } from "@/components/company/PreviewModal";
import { SortableContentSection } from "@/components/company/SortableContentSection";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { UI_TEXT } from "@/constants/uiText";
import { ROUTES } from "@/config/routes";
import { useToast } from "@/hooks/useToast";
import { companyService } from "@/services/company.service";
import {
  companySettingsSchema,
  CompanySettingsFormData,
} from "@/validations/companySettingsSchema";

/**
 * Company settings page for managing branding and content
 */
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
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      tagline: "",
      logoUrl: "",
      bannerUrl: "",
      primaryColor: "#4f46e5",
      cultureVideoUrl: "",
      contentSections: [],
      benefitCards: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
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
            tagline: result.data.tagline || "",
            logoUrl: result.data.logoUrl || "",
            bannerUrl: result.data.bannerUrl || "",
            primaryColor: result.data.primaryColor || "#4f46e5",
            cultureVideoUrl: result.data.cultureVideoUrl || "",
            contentSections: result.data.contentSections || [],
            benefitCards: result.data.benefitCards && result.data.benefitCards.length === 3 
              ? result.data.benefitCards 
              : [
                  { title: "", description: "" },
                  { title: "", description: "" },
                  { title: "", description: "" },
                ],
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

  const { fields: benefitFields } = useFieldArray({
    control,
    name: "benefitCards",
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
      setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 1500);
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
          <p className="text-muted-foreground">{UI_TEXT.COMPANY_SETTINGS.LOADING}</p>
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
            onClick={() => router.push(ROUTES.HOME)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {UI_TEXT.COMPANY_SETTINGS.BACK_BUTTON}
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {UI_TEXT.COMPANY_SETTINGS.TITLE}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            {UI_TEXT.COMPANY_SETTINGS.SUBTITLE}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">
              {UI_TEXT.COMPANY_SETTINGS.SECTIONS.COMPANY_DETAILS}
            </h2>

            <InputWrapper
              label={UI_TEXT.COMPANY_SETTINGS.LABELS.COMPANY_NAME}
              type="text"
              placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.COMPANY_NAME}
              error={errors.name}
              {...register("name")}
            />

            <InputWrapper
              label={UI_TEXT.COMPANY_SETTINGS.LABELS.COMPANY_TAGLINE}
              type="text"
              placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.TAGLINE}
              error={errors.tagline}
              {...register("tagline")}
            />

            <InputWrapper
              label={UI_TEXT.COMPANY_SETTINGS.LABELS.LOGO_URL}
              type="url"
              placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.LOGO_URL}
              error={errors.logoUrl}
              {...register("logoUrl")}
            />

            <InputWrapper
              label={UI_TEXT.COMPANY_SETTINGS.LABELS.BANNER_URL}
              type="url"
              placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.BANNER_URL}
              error={errors.bannerUrl}
              {...register("bannerUrl")}
            />
          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">{UI_TEXT.COMPANY_SETTINGS.SECTIONS.BRAND_THEME}</h2>

            <Controller
              name="primaryColor"
              control={control}
              render={({ field }) => (
                <ColorPicker
                  label={UI_TEXT.COMPANY_SETTINGS.LABELS.PRIMARY_COLOR}
                  error={errors.primaryColor}
                  {...field}
                />
              )}
            />

          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">{UI_TEXT.COMPANY_SETTINGS.SECTIONS.CULTURE}</h2>

            <InputWrapper
              label={UI_TEXT.COMPANY_SETTINGS.LABELS.CULTURE_VIDEO_URL}
              type="url"
              placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.VIDEO_URL}
              error={errors.cultureVideoUrl}
              {...register("cultureVideoUrl")}
            />
          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">
              {UI_TEXT.COMPANY_SETTINGS.SECTIONS.BENEFITS}
            </h2>
            <p className="text-sm text-muted-foreground">
              {UI_TEXT.COMPANY_SETTINGS.SECTIONS.BENEFITS_DESC}
            </p>

            {benefitFields.map((field, index) => (
              <div key={field.id} className="rounded-md border p-3 md:p-4 space-y-4 bg-background">
                <h3 className="text-sm md:text-base font-medium">
                  {UI_TEXT.COMPANY_SETTINGS.LABELS.BENEFIT_CARD} {index + 1}
                </h3>

                <InputWrapper
                  label={UI_TEXT.COMPANY_SETTINGS.LABELS.TITLE}
                  type="text"
                  placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.BENEFIT_TITLE}
                  error={errors.benefitCards?.[index]?.title}
                  {...register(`benefitCards.${index}.title`)}
                />

                <InputWrapper
                  label={UI_TEXT.COMPANY_SETTINGS.LABELS.DESCRIPTION}
                  type="text"
                  placeholder={UI_TEXT.COMPANY_SETTINGS.PLACEHOLDERS.BENEFIT_DESC}
                  error={errors.benefitCards?.[index]?.description}
                  {...register(`benefitCards.${index}.description`)}
                />
              </div>
            ))}
          </div>

          <div className="rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-semibold">
                {UI_TEXT.COMPANY_SETTINGS.SECTIONS.CONTENT_SECTIONS}
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
                {UI_TEXT.COMPANY_SETTINGS.BUTTONS.ADD_SECTION}
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {UI_TEXT.COMPANY_SETTINGS.SECTIONS.NO_SECTIONS}
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
              {UI_TEXT.COMPANY_SETTINGS.BUTTONS.SAVE_CHANGES}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="w-full sm:w-auto"
            >
              {UI_TEXT.COMPANY_SETTINGS.BUTTONS.PREVIEW}
            </Button>
          </div>
        </form>
      </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewData={{
            name: watch("name") || UI_TEXT.COMPANY_SETTINGS.PREVIEW_DEFAULTS.COMPANY_NAME,
            tagline: watch("tagline") || undefined,
            logoUrl: watch("logoUrl") || undefined,
            bannerUrl: watch("bannerUrl") || undefined,
            primaryColor: watch("primaryColor") || "#4f46e5",
            cultureVideoUrl: watch("cultureVideoUrl") || undefined,
            contentSections: (watch("contentSections") || []).map((section, index) => ({
              ...section,
              order: index,
            })),
            benefitCards: watch("benefitCards") || [],
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
