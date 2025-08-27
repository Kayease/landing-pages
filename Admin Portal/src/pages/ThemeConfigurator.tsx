import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function setCssVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export default function ThemeConfigurator() {
  const [primary, setPrimary] = useState("#7c3aed");
  const [radius, setRadius] = useState(0.5);
  const [density, setDensity] = useState(0.85);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme-config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.primary) setPrimary(parsed.primary);
        if (parsed.radius) setRadius(parsed.radius);
        if (parsed.density) setDensity(parsed.density);
      }
    } catch {}
  }, []);

  useEffect(() => {
    // Primary color as HSL or HEX — here we set a CSS var used by theme
    setCssVar("--primary", primary);
    // Border radius scale
    setCssVar("--radius", `${radius}rem`);
    // Density via base font-size multiplier
    const base = 16 * density;
    document.documentElement.style.fontSize = `${base}px`;
  }, [primary, radius, density]);

  const save = () => {
    try {
      localStorage.setItem("theme-config", JSON.stringify({ primary, radius, density }));
    } catch {}
  };

  const reset = () => {
    setPrimary("#7c3aed");
    setRadius(0.5);
    setDensity(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Theme Configurator</h1>
        <p className="text-muted-foreground mt-1">Adjust brand color, radius, and density.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="primary">Primary color</Label>
            <div className="flex items-center gap-2">
              <Input id="primary" type="text" value={primary} onChange={(e) => setPrimary(e.target.value)} className="max-w-[160px]" />
              <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="h-9 w-9 bg-transparent" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Border radius</Label>
            <Slider value={[radius]} onValueChange={([v]) => setRadius(v)} min={0} max={1} step={0.05} />
            <div className="text-xs text-muted-foreground">{radius.toFixed(2)} rem</div>
          </div>

          <div className="space-y-2">
            <Label>Density</Label>
            <Slider value={[density]} onValueChange={([v]) => setDensity(v)} min={0.85} max={1.15} step={0.01} />
            <div className="text-xs text-muted-foreground">{density.toFixed(2)}x</div>
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


