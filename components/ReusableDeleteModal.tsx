"use client";

import {
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  ForwardRefRenderFunction,
} from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReusableDeleteModalProps {
  trigger?: ReactNode;
  onDelete?: () => Promise<void>;
}

export interface DeleteModalRef {
  open: () => void;
  close: () => void;
}

const ReusableDeleteModal: ForwardRefRenderFunction<
  DeleteModalRef,
  ReusableDeleteModalProps
> = ({ trigger, onDelete = async () => {} }, ref) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      toast("Item deleted successfully");
      setOpen(false);
    } catch (error) {
      toast("Failed to delete item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default forwardRef(ReusableDeleteModal);
