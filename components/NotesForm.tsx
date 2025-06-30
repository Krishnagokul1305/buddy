"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Save } from "lucide-react";
import type { Note, NotesFormValues } from "@/types/note";
import { createNoteAction, updateNoteAction } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "./MarkdownEditor";

function NotesForm({
  note,
  isEdit = false,
}: {
  note?: Note | null;
  isEdit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NotesFormValues>({
    defaultValues: {
      content: note?.content || "",
      isPublic: note?.isPublic || false,
      title: note?.title || "",
    },
  });

  const router = useRouter();
  const isPublic = watch("isPublic");

  async function onSubmit(data: NotesFormValues) {
    try {
      if (!isEdit) {
        await createNoteAction(data);
        toast("Created new note");
      }
      if (isEdit && note) {
        await updateNoteAction(note?.id, data);
        toast("Updated Successfully");
      }
      router.push("/notes");
    } catch (error) {
      toast("Error creating note");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4 mt-5">
        <div className="space-y-2 animate-slide-up stagger-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Note title"
            {...register("title", { required: "Title is required" })}
            className="form-field-animation"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2 animate-slide-up stagger-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="content">Content</Label>
            <div className="text-xs text-muted-foreground">
              Rich text editor
            </div>
          </div>

          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <MarkdownEditor value={field.value} onChange={field.onChange} />
            )}
          />

          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 animate-slide-up stagger-3">
          <Switch
            id="is_public"
            checked={isPublic}
            onCheckedChange={(checked) =>
              setValue("isPublic", checked, { shouldDirty: true })
            }
          />
          <Label htmlFor="is_public">Make this note public</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" asChild>
          <Link href="/notes">Cancel</Link>
        </Button>
        <Button
          type="submit"
          className="btn-hover-effect"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Update Note" : "Save Note"}
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}

export default NotesForm;
