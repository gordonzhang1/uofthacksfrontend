import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ConfigurationPanelProps {
  tileSize: number;
  density: number;
  useAiMatching: boolean;
  onTileSizeChange?: (value: number[]) => void;
  onDensityChange?: (value: number[]) => void;
  onAiMatchingChange?: (checked: boolean) => void;
}

const ConfigurationPanel = ({
  tileSize = 50,
  density = 75,
  useAiMatching = false,
  onTileSizeChange = () => {},
  onDensityChange = () => {},
  onAiMatchingChange = () => {},
}: ConfigurationPanelProps) => {
  return (
    <Card className="w-[300px] h-[600px] p-6 space-y-8 bg-background">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Mosaic Settings</h2>
        <p className="text-sm text-muted-foreground">
          Adjust the parameters to customize your mosaic
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="tile-size">Tile Size</Label>
          <Slider
            id="tile-size"
            min={10}
            max={100}
            step={1}
            value={[tileSize]}
            onValueChange={onTileSizeChange}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">Current: {tileSize}px</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="density">Density</Label>
          <Slider
            id="density"
            min={0}
            max={100}
            step={1}
            value={[density]}
            onValueChange={onDensityChange}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">Current: {density}%</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="ai-matching">AI Color Matching</Label>
            <p className="text-sm text-muted-foreground">
              Use AI to optimize tile placement
            </p>
          </div>
          <Switch
            id="ai-matching"
            checked={useAiMatching}
            onCheckedChange={onAiMatchingChange}
          />
        </div>
      </div>

      <div className="pt-6 border-t">
        <p className="text-sm text-muted-foreground">
          Changes will be reflected in the preview panel in real-time.
        </p>
      </div>
    </Card>
  );
};

export default ConfigurationPanel;
