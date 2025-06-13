"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ReactElement,
  ReactNode,
} from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ReusableModalProps = {
  title?: string;
  description?: string;
  children?: ReactElement<any>;
  Trigger?: ReactElement;
};

export type ReusableModalHandle = {
  open: () => void;
  close: () => void;
};

const ReusableModal = forwardRef<ReusableModalHandle, ReusableModalProps>(
  ({ title, description, children, Trigger }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {Trigger && <DialogTrigger asChild>{Trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>
            {children &&
              React.cloneElement(children, { close: () => setOpen(false) })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ReusableModal.displayName = "ReusableModal";

export default ReusableModal;
