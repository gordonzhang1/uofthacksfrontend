import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Download } from "lucide-react";

interface ExportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: (resolution: string) => void;
}

const ExportDialog = ({
  open = true,
  onOpenChange,
  onExport = () => {},
}: ExportDialogProps) => {
  const [selectedResolution, setSelectedResolution] = React.useState("medium");

  const handleExport = () => {
    onExport(selectedResolution);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Mosaic</DialogTitle>
          <DialogDescription>
            Choose the resolution for your mosaic export.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            defaultValue="medium"
            value={selectedResolution}
            onValueChange={setSelectedResolution}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low Resolution (1024x1024)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium Resolution (2048x2048)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High Resolution (4096x4096)</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
