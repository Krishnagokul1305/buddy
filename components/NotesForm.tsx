"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MarkdownPreview } from "@/components/markdown-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, Save } from "lucide-react";

type FormValues = {
  title: string;
  content: string;
  is_public: boolean;
};

function NotesForm({ defaultValues }: { defaultValues?: FormValues }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  console.log(defaultValues);

  const [activeTab, setActiveTab] = useState("write");
  const content = watch("content");
  const isPublic = watch("is_public");

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardDescription>
          Create a new note with markdown support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 animate-slide-up stagger-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Note title"
            {...register("title", { required: true })}
            className="form-field-animation"
          />
          {errors.title && (
            <p className="text-sm text-red-500">Title is required</p>
          )}
        </div>

        <div className="space-y-2 animate-slide-up stagger-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="content">Content</Label>
            <div className="text-xs text-muted-foreground">
              Markdown supported
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="h-auto p-0 bg-transparent justify-start border-b rounded-none w-auto">
              <TabsTrigger
                value="write"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Write
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="mt-0">
              <Textarea
                id="content"
                rows={15}
                placeholder="Write your note content here... You can use Markdown for formatting."
                className="form-field-animation font-mono resize-none"
                {...register("content", { required: true })}
              />
              {errors.content && (
                <p className="text-sm text-red-500">Content is required</p>
              )}
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="border rounded-md h-[360px] overflow-y-auto p-4">
                {content ? (
                  <MarkdownPreview content={content} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Nothing to preview</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center space-x-2 animate-slide-up stagger-3">
          <Switch
            id="is_public"
            checked={isPublic}
            onCheckedChange={(checked) =>
              setValue("is_public", checked, { shouldDirty: true })
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
              Creating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}

export default NotesForm;
